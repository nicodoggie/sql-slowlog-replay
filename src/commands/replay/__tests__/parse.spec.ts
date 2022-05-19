import { resolve } from "path";
import { stringify } from "querystring";
import { isAsyncFunction, isGeneratorFunction } from "util/types";
import parse from "../parse";

const filename = resolve(__dirname, 'test-slowlog.json');

describe('parse', () => {
  it('should be an async function',async () => {
    expect(isAsyncFunction(parse))
      .toBe(true);
  });
  it('should only return DML and DQL queries.',async () => {
    console.log('filename :>> ', filename);
    for await (const line of parse(filename)) {
      expect(line)
        .toMatch(/^(SELECT|UPDATE|INSERT|DELETE)/);
    }
  });
});