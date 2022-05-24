import { createReadStream } from "fs";
import * as ndjson from 'ndjson';
import { pipeline } from 'stream/promises';
import MySQLParser, { MySQLQueryType } from "ts-mysql-parser";
import { MySQLQuery, ParseResult } from "./types";

function filter(sql: string): MySQLQuery|null {
  const parser = new MySQLParser({
    version: '5.7'
  });
  try{
    const ast = parser.parse(sql);
    const type = parser.getQueryType(ast);
    
    if([
      MySQLQueryType.QtSelect,
      MySQLQueryType.QtInsert,
      MySQLQueryType.QtUpdate,
      MySQLQueryType.QtDelete
    ].includes(type)) {
      return new MySQLQuery({ sql, ast, type});
    }

    return null;
  } catch (e) {
    return null;
  }  
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function* parse(filename: string): ParseResult<MySQLQuery> {
  try {
    const fileStream = createReadStream(filename);
    const jsonParse = ndjson.parse();

    await pipeline(fileStream, jsonParse);
    for await (const chunk of jsonParse) {
      const allowed = filter(chunk.textPayload);
      if(allowed) yield allowed;
    }
    
  } catch (e) {
    console.error(e);
  }
}


export default parse;