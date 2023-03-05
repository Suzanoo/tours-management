// CONFIGURATION
// https://github.com/openai/openai-node
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// GENERATE TOUR GUIDES
// https://platform.openai.com/docs/api-reference/completions/create
const textCompletion = async (req, res) => {
  console.log(req.body);

  // const ln = req.body.language === 'en' ? 'English' : 'Thai';

  const prompt = `Give me the travel plan, which I start journey from ${req.body.start} \n
  to ${req.body.destination} in ${req.body.duration} days.\n
  The plan comes with budget approximate, agency contact(mobile phone number or email address if possible),\n
   accommodation and include this options ${req.body.options} too.`;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 2500,
      temperature: 0,
    });

    const data = {
      choices: response.data.choices[0].text,
      usage: response.data.usage,
    };

    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(500).json({
      status: 'fail',
      error: 'Server error',
    });
  }
};

module.exports = { textCompletion };
