import {Anthropic} from '@anthropic-ai/sdk'

const client = new Anthropic({
    baseURL:'https://aicredits.in/v1',
    apiKey: process.env.LLM_API_KEY
})