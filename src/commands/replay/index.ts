import { Command } from "commander";

const replay = new Command("replay");

replay
  .option('-c, --concurrency <count>', 'Number of concurrent connections.')
  .option('--format <type>', 'Output format of test results')
  .argument('<slowlog-file>', 'MySQL slow log output or exported Cloud Logging slowlog JSON output.');

export default replay;
