import { MySQLQueryType, ParseResult as MySQLParseResult } from "ts-mysql-parser";

interface IMySQLQuery {
  sql: string,
  ast: MySQLParseResult,
  type: MySQLQueryType
}

class MySQLQuery implements IMySQLQuery {
  public sql: string;
  public ast: MySQLParseResult;
  public type: MySQLQueryType;
  
  constructor({sql, ast, type}: IMySQLQuery) {
    this.sql = sql;
    this.ast = ast;
    this.type = type;
  }
}

type ParseResult<T> = AsyncGenerator<T, any, undefined>;

export { MySQLQuery, ParseResult };