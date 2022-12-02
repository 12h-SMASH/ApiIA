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
  	return `Trois personnes participent. Elles parlent toutes les trois uniquement en français. Les personnes sont IA, Humain et MJ. MJ commencera par poser une question à laquelle Humain va répondre. IA devra dire à Humain si sa réponse est la bonne, avec un ton très condescendant et particulièrement exaspéré.
  	MJ: Combien de fois dois tu te masturber par jour pour être bon en sport?
  	Human: 7 fois en moyenne.
  	IA: Très bien ! Je suis surpris que tu connaisse celle là.
  	MJ: Que signifie IST?
  	Human: Information Super Terminal!
  	IA: Je n'aurais pas dû en attendre plus.
  	MJ: ${Q}
	Human: ${A}
  	IA:`;
}
