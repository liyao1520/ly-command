import { Command } from "commander";
import { build } from "../common/build";
import { resolve } from "path";
import { execFileSync } from 'child_process';
const start = (program: Command) => {
  program
    .command("start")
    .description("dev start command")
    .allowUnknownOption()
    .action(async () => {
      const { distDir } = await build({ log: false });
      const args = process.argv.slice(3);
      const jsPath = resolve(distDir, "./index.js");
      execFileSync('node', [jsPath, ...args], { stdio: 'inherit' })
    });
};

export default start;
