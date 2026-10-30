const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");

const todos = new Map();
const terminal = readline.createInterface({ input, output });
let nextId = 1;

async function main() {
	let running = true;

	while (running) {
		console.log("\nTo-do List");
		console.log("1. Add a task");
		console.log("2. Show tasks");
		console.log("3. Complete a task");
		console.log("4. Delete a task");
		console.log("5. Quit");

		const choice = (await terminal.question("Choose an option: ")).trim();

		switch (choice) {
			case "1": {
				const text = (await terminal.question("Task: ")).trim();
				if (!text) {
					console.log("Task cannot be empty.");
					break;
				}

				todos.set(nextId, { text, completed: false });
				console.log(`Added task #${nextId}.`);
				nextId += 1;
				break;
			}
			case "2":
				if (todos.size === 0) {
					console.log("No tasks yet.");
					break;
				}

				for (const [id, task] of todos) {
					const status = task.completed ? "x" : " ";
					console.log(`${id}. [${status}] ${task.text}`);
				}
				break;
			case "3": {
				const id = Number((await terminal.question("Task ID to complete: ")).trim());
				const task = todos.get(id);
				if (!task) {
					console.log("Task not found.");
					break;
				}

				task.completed = true;
				console.log(`Completed task #${id}.`);
				break;
			}
			case "4": {
				const id = Number((await terminal.question("Task ID to delete: ")).trim());
				if (!todos.delete(id)) {
					console.log("Task not found.");
					break;
				}

				console.log(`Deleted task #${id}.`);
				break;
			}
			case "5":
				running = false;
				break;
			default:
				console.log("Choose a number from 1 to 5.");
		}
	}

	terminal.close();
}

main();

