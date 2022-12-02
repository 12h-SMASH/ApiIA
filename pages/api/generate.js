import { Configuration, OpenAIApi } from "openai";

// importation de la clef API
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// envoie de la demande à OpenIA
export default async function (req, res) {
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
    	prompt: generatePrompt(req.body.question, req.body.answer),
    	temperature: 0.5,
    	max_tokens: 60,
    	top_p: 0.3,
    	frequency_penalty: 0.5,
    	presence_penalty: 0.0,
  	});
  	res.status(200).json({ result: completion.data.choices[0].text });
}

// constructeur de la prompt qui va être envoyé à OpenIA
function generatePrompt(Q, A) {
  	return `Une question et une réponse sont données ci-dessous. Juger leur corrélation avec condéscendance.
Question: Que signifie IST ?
Réponse: Infections Sexuellement Transmissibles
Jugement: Mmh... c'est... juste.
Question: Vrai ou Faux ? Les IST et les MST sont les mêmes choses.
Réponse: Faux
Jugement: C'est nul !
Question: Vrai ou Faux ? Les femmes sont les plus touchées par la syphilis.
Réponse: Faux
Jugement: Mouais... ça passe...
Question: Quelle est l’IST la plus fréquente ?
Réponse: VIH
Jugement: Pathétique !
Question: ${Q}
Réponse: ${A}
Jugement:`;
}
