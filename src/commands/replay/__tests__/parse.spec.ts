import { resolve } from "path";
import { MySQLQueryType } from "ts-mysql-parser";
import { isAsyncFunction, isGeneratorFunction } from "util/types";
import parse from "../parse";
import { MySQLQuery } from "../types";

const filename = resolve(__dirname, 'test-slowlog.json');

describe('parse', () => {
  it('should be an async generator function',async () => {
    expect(isAsyncFunction(parse) && isGeneratorFunction(parse))
      .toBe(true);
  });
  it('should return DML and DQL queries as MySQLQuery objects.',async () => {
    for await (const query of parse(filename)) {
      expect(query)
        .toBeInstanceOf(MySQLQuery);

      switch(query.type){
      case MySQLQueryType.QtSelect:
        expect(query.sql)
          .toMatch(/^SELECT/);
        break;
      case MySQLQueryType.QtUpdate:
        expect(query.sql)
          .toMatch(/^UPDATE/);
        break;
      case MySQLQueryType.QtInsert:
        expect(query.sql)
          .toMatch(/^INSERT/);
        break;
      case MySQLQueryType.QtDelete:
        expect(query.sql)
          .toMatch(/^DELETE/);
        break;
      default:
        fail(`Query type not SELECT, UPDATE, DELETE, INSERT: ${query.type} ${query.sql}`);
      }
      
    }
  });
});