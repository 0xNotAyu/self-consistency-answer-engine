import {OpenAI} from 'openai'

const client = new OpenAI({
    baseURL: 'https://aicredits.in/v1',
    apiKey: process.env.LLM_API_KEY
})

async function main(query) {
    const response = await client.
}