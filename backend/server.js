const express = require('express');
const OpenAI = require('openai'); //i hate the 4v version
require('dotenv').config();

const app = express();
const PORT = 5000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });



// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running');
});


//testing 
function handleTestRequest(request, res) {
  res.send("whats up gang");
}
app.get('/hello', handleTestRequest);

//openai api
app.post('/generateBook', async (req, res) => {
    console.log("Request received. Bitch. ");
  try {
    const message = req.body.message;
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{"role": "user", "content": `${process.env.APP_PROMPT} ${message}`}],
      });
      console.log(completion.choices[0].message);
    res.json({ response: completion.choices[0].message});

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: error });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
