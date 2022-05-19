import { Command } from "commander";
import command from "../index";

describe("MainCommand", () => {
  it("should be a Command object", async () => {
    expect(command)
.toBeInstanceOf(Command);
  });
});
