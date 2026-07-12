# Self Consistency Answer Engine (SCAE)

A CLI application that improves response reliability by querying multiple Large Language Models (LLMs) in parallel and generating a final answer through an orchestration (judge) layer.

---

## Overview

Instead of relying on a single AI model, SCAE asks multiple independent LLMs the same question. Their responses are then evaluated by a separate "judge" model, which synthesizes the strongest parts of each answer into a single, more reliable response.

This approach is inspired by **Cross-Model Self-Consistency** and **LLM-as-a-Judge** architectures.

---

## How It Works

```
                 User Query
                      │
                      ▼
              Shared System Prompt
                      │
      ┌───────────────┼───────────────┐
      ▼               ▼               ▼
   OpenAI         Claude         Gemini
      │               │               │
      └───────────────┼───────────────┘
                      ▼
           Orchestration / Judge
              (claude-opus-4)
                      │
                      ▼
               Final Response
```

### Workflow

1. User enters a question through the CLI.
2. The same prompt is sent simultaneously to:
   - OpenAI
   - Claude
   - Gemini
3. All responses are collected in parallel using `Promise.all()`.
4. Responses are converted into a structured JSON object.
5. A judge model evaluates every response.
6. The judge synthesizes the best information into one final answer.
7. The final answer is displayed to the user.

---

## Features

- CLI-based application
- Parallel LLM execution
- Cross-model answer comparison
- LLM-as-a-Judge orchestration
- Structured evaluation input using JSON
- Easily extensible to additional models

---

## Models Used

| Provider | Model |
|----------|-------|
| OpenAI | GPT-4o Mini |
| Anthropic | Claude 3 Haiku|
| Google | Gemini 2.5 Flash |
| Anthropic | claude-opus-4 (JUDGE) |

> Models may be changed easily by modifying the provider files.

---

## Project Structure

```
src/
│
├── ai/
│   ├── orchestrator.js
│   ├── providers/
│   │   ├── openai.js
│   │   ├── claude.js
│   │   └── gemini.js
│   │
│   └── prompts/
│       └── system.prompt.js
│
└── index.js
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/0xNotAyu/self-consistency-answer-engine.git
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
LLM_API_KEY=ASK_ME_FOR_API_KEY
```

Run the application

```bash
npm run start
```

---

## CLI Preview

```
███████╗ ██████╗ █████╗ ███████╗
██╔════╝██╔════╝██╔══██╗██╔════╝
███████╗██║     ███████║█████╗  
╚════██║██║     ██╔══██║██╔══╝  
███████║╚██████╗██║  ██║███████╗
╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝

Self Consistency Answer Engine

Ask anything >

```

Example

```

Ask anything > test

 It seems like you're testing the system. How can I assist you today? 
 -OpenAI 


 test 
 -ClaudeAI 


 The request is for me to provide a direct answer, adhering strictly to a 50-word maximum. I am to demonstrate conciseness and deliver information efficiently within this specific constraint. 
 -Gemini 


 Based on the responses, the human appears to be testing the system's functionality. The most appropriate synthesized response would acknowledge the test while offering assistance:

"I see you're testing the system. Everything appears to be working correctly. I'm ready to help you with any questions or tasks you may have. Please feel free to ask me anything you'd like assistance with."

This synthesis combines OpenAI's helpful offer of assistance with the acknowledgment that this is a test, while maintaining more substance than Claude's minimal response and avoiding Gemini's misinterpretation of the task. 
 -Judge-Layer 
```

---

## Self-Consistency Implementation

The orchestration layer receives structured JSON instead of plain text.

Example:

```json
{
  "question": "Why is the sky blue?",
  "responses": [
    {
      "model": "OpenAI",
      "answer": "..."
    },
    {
      "model": "Claude",
      "answer": "..."
    },
    {
      "model": "Gemini",
      "answer": "..."
    }
  ]
}
```

The judge model:

- Compares factual accuracy
- Detects contradictions
- Merges complementary information
- Removes hallucinations when possible
- Produces one final response without mentioning individual models

---

## Technologies

- Node.js
- OpenAI SDK
- JavaScript (ES Modules)
- Readline API
- dotenv

---

## Future Improvements

- Streaming responses
- Confidence scoring for each model
- Response citations
- Model voting statistics
- Interactive chat mode
- Support for local LLMs (Ollama)
- Web interface
- Benchmark mode
- JSON output mode

---

## License

MIT