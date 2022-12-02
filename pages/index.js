import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

// Main function used by NodeJS
export default function Home() {
	const [questionInput, setQuestionInput] = useState("");
	const [answerInput, setAnswerInput] = useState("");
	const [result, setResult] = useState();

	//
	async function onSubmit(event) {
		event.preventDefault();
	const response = await fetch("/api/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ question: questionInput, answer: answerInput })
	});
	const data = await response.json();
	const trad = await fetch("/api/translate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ toTrad: data })
	});
	setResult(data.result);
	}

	return (
		<div>
			<Head>
				<title>OpenAI Quickstart</title>
				<link rel="icon" href="/dog.png" />
			</Head>

	<main className={styles.main}>
	<img src="/dog.png" className={styles.icon} />
	<h3>Name my pet</h3>

	<form onSubmit={onSubmit}>
		<input
			type="text"
			name="Question"
			placeholder="La question est..."
			value={questionInput}
			onChange={(e) => setQuestionInput(e.target.value)}
		/>
		<input
			type="text"
			name="Reponse"
			placeholder="La réponse est..."
			value={answerInput}
			onChange={(e) => setAnswerInput(e.target.value)}
		/>
		<input type="submit" value="Generate names" />
	</form>

	<div className={styles.result}>{result}</div>
	</main>
	</div>
)
;}