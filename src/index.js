import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { SelfConsistencyAnswerEngine } from "./ai/orchestrator.js";

const rl = readline.createInterface({
    input,
    output,
});

console.clear();

console.log(`
    
███████╗ ██████╗ █████╗ ███████╗
██╔════╝██╔════╝██╔══██╗██╔════╝
███████╗██║     ███████║█████╗  
╚════██║██║     ██╔══██║██╔══╝  
███████║╚██████╗██║  ██║███████╗
╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝
                                
Self Consistency Answer Engine
`);

const query = await rl.question("Ask anything > ");

await SelfConsistencyAnswerEngine(query);

rl.close();