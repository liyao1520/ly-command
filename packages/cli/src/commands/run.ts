import { Command } from "commander";
import rootStore from "../store";
import { Log, } from "../utils";

import { execFileSync } from 'child_process';

export const runJs = async (commandName: string, args: string[]) => {
  const command = await rootStore.UserCommands.getCommandByName(commandName);
  if (!command) {
    return Log.error(`not found command "${commandName}"`);
  }
  const { execJsFilePath } = command;

  execFileSync('node', [execJsFilePath, ...args], { stdio: 'inherit' })

};

const run = (program: Command) => {
  program
    .command("run")
    .description("run command")
    .argument("<commandName>", "command name")
    .allowUnknownOption()
    .action(async (commandName) => {
      const args = process.argv.slice(4);
      runJs(commandName, args);
    });
};

export default run;
