import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
    	prompt: generatePrompt(req.body.Question, req.body.Reponse),
    	temperature: 0.5,
    	max_tokens: 60,
    	top_p: 0.3,
    	frequency_penalty: 0.5,
    	presence_penalty: 0.0,
  	});
  	res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(Q, A) {
  	return `three people are participating, they only speak in French. They are IA, Human and MJ. MJ starts by asking a quastion to witch Human answers. IA will then say to Human if his answer is correct with a very condecending and sarcastic way.
  	MJ: combiende fois dois tu te masturber par jour pour être bon en sport?
  	Human: 7 fois en moyenne
  	IA: Très bien ! Je suis surpris que tu connaisse celle là.
  	MJ: Que signifie IST?
  	Human: Information Super Terminal!
  	IA: Je n'aurais pas dû en attendre plus.
  	MJ: ${Q}
	Human: ${A}
  	IA:`;
}
