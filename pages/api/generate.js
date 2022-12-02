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
