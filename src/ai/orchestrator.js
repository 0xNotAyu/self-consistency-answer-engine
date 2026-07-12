import { AskOpenAI } from "./providers/openai.js"
import { AskClaudeAI } from "./providers/claude.js"
import { AskGeminiAI } from "./providers/gemini.js"
import OpenAI from "openai"
import { JUDGE_PROMPT } from "./prompts/system.prompt.js"


export async function SelfConsistencyAnswerEngine(query){
    const [openai_response, claude_response, gemini_resposnse] = await Promise.all(
        [
            AskOpenAI(query),
            AskClaudeAI(query),
            AskGeminiAI(query)
        ]
    )
    console.log(`\n ${openai_response} \n -OpenAI \n`)
    console.log(`\n ${claude_response} \n -ClaudeAI \n`)
    console.log(`\n ${gemini_resposnse} \n -Gemini \n`)

    const evalauationInput = {
        question: query,
        responses: [
            {
                model: "OpenAI",
                answer: openai_response
            },
            {
                model: "ClaudeAI",
                answer: claude_response
            },
            {
                model: "GeminiAI",
                answer: gemini_resposnse
            },
        ]
    }

    const client = new OpenAI({
        baseURL: 'https://aicredits.in/v1',
        apiKey: process.env.LLM_API_KEY
    })

    const finalResponse = await client.responses.create({
        model: 'anthropic/claude-opus-4',
        max_output_tokens: 1024,
        input: [
            {
                role: 'system',
                content: JUDGE_PROMPT
            },
            {
                role: 'user',
                content: JSON.stringify(evalauationInput)
            }
        ]
    })

    console.log(`\n ${finalResponse.output_text} \n -Judge-Layer \n`)


}

