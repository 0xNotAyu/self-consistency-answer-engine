import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
    baseURL:'https://aicredits.in/v1',
    apiKey: process.env.GEMINI_API_KEY
})

async function main(query) {
    const response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: query,
          },
        ],
    })
}