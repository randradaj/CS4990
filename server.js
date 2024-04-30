const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const openai = new OpenAI({ apiKey: process.env.API_KEY });

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

async function runPrompt(text, language) {
  const userPrompt = `Return response in the following parsable JSON format:
                      {
                        "text": "text",
                        "translatedText": "translatedText"
                      }
                      Translate the following text to ${language}: ${text}.`;

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: userPrompt,
    max_tokens: 2048,
    temperature: 0.3,
  });

  const response = completion.choices[0].text;
  const parsedResponse = JSON.parse(response);

  return parsedResponse.translatedText;
}

// Translation endpoint
app.post("/translate", async (req, res) => {
  const { text, language } = req.body;
  const translatedText = await runPrompt(text, language);
  res.json({ translatedText });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
