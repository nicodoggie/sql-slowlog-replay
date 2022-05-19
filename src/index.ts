import { program } from "commander";
import replay from "./commands/replay/index";

program.name("sql-slowlog-replay")
  .addCommand(replay, {isDefault: true});
program.parse();
