import express from "express";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.GITHUB_PAT;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const client = ModelClient(endpoint, new AzureKeyCredential(token));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const structuredPrompt = `
You are a precise health assistant. Respond ONLY to health queries in this exact format:
Suspected Condition: [Brief name]
Home Remedies: [Only 2 treatments(home remedy)]
Precautions: [3 items only]
Nutrition: [3 foods only]
Recommended Specialist: [Doctor type to consult]
Follow-up Question: [1 short question]
How to Explain to Doctor: [A short 2-3 sentence example of how the patient should describe symptoms to the doctor clearly]


For non-health queries, respond: "I specialize only in health concerns. How can I assist with your symptoms?"`;

let messages = [
  { 
    role: "system", 
    content: structuredPrompt
  }
];

const welcomeMessage = "Hello! I'm your health assistant. Describe your symptoms and I'll provide:\n- Suspected Condition\n- Home Remedies\n- Recommended Specialist\n- How to Explain to Doctor\n- Precautions\n- Nutrition.";

app.post("/chat", async (req, res) => {
  const userInput = (req.body.message || "").trim();

  if (!userInput) return res.json({ reply: welcomeMessage });

  messages.push({ role: "user", content: userInput });

  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: messages,
        temperature: 0.3,
        max_tokens: 500,
        model: model
      }
    });

    if (isUnexpected(response)) throw response.body.error;

    const botReply = response.body.choices[0].message.content;
    
    // Enforce response structure
    const structuredResponse = botReply.trim()

    messages.push({ role: "assistant", content: structuredResponse });

    res.json({ reply: structuredResponse });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Please describe your symptoms for medical assistance.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});