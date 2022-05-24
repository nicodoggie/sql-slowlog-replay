import { Knex } from "knex";
import { MySQLQuery, ParseResult } from "./types";


interface ReplayOptions {
  queries: Array<MySQLQuery>|ParseResult<MySQLQuery>
  connections: Array<Knex>
  concurrency: number
}

async function replay(options: ReplayOptions): Promise<void> {
  const { queries, connections, concurrency} = options;

  const cxCount = connections.length;

  for await (const query of queries) {
    for (const cx of connections) {
      cx.raw(query.sql)
    }
  }
}

export default replay;