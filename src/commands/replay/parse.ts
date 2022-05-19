import { createReadStream } from "fs";
import * as ndjson from 'ndjson';
import { pipeline } from 'stream/promises';
import MySQLParser, { MySQLQueryType } from "ts-mysql-parser";

function filter(sql: string): string|null {
  const parser = new MySQLParser({
    version: '5.7'
  });
  try{
    const result = parser.parse(sql);
    const type = parser.getQueryType(result);
    
    // console.log('result :>> ', result)
    if([
      MySQLQueryType.QtSelect,
      MySQLQueryType.QtInsert,
      MySQLQueryType.QtUpdate,
      MySQLQueryType.QtDelete
    ].includes(type)) {
      
      return sql;
    }
    return null;
  } catch (e) {
    return null;
  }  
}

async function* parse(filename: string) {
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