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
  	MJ: Dans harry Potter, quel est le sort utilisé par hermionne pour réparer les lunettes d'arry Potter ?
  	Human: Wingardium Leviosa
  	IA: Quel terrible manque de culture...  au moins ils s'agit bien d'un sort provenant d'Harry Potter.
  	MJ: 1+1=?
  	Human: 3!
  	IA: Je me demmande si tu connais les maths.
  	MJ: ${Q}
	Human: ${A}
  	IA:`;
}
