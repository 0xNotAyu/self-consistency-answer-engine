import "dotenv/config";
import {OpenAI} from 'openai'
import { SYSTEM_PROMPT } from "../prompts/system.prompt.js";

const client = new OpenAI({
    baseURL: 'https://aicredits.in/v1',
    apiKey: process.env.LLM_API_KEY
})

export async function AskGeminiAI(query) {
    try{
        const response = await client.responses.create({
        model: 'google/gemini-2.0-flash',
        max_output_tokens: 1024,
        input: [
           {
               role: 'system',
               content: SYSTEM_PROMPT
           },
           {
               role: 'user',
               content: query
           }
        ]
   })
   return {
        success: true,
        output: response.output_text
    }
    }catch(err){
        return {
            success: false,
            output: `GeminiAI call failed! ❌: ${err}`
        }
    }
}