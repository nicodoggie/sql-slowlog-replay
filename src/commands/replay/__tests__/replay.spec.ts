import { resolve } from "path";
import knex from "knex";
import connections from "../connections";
import parse from "../parse";
import replay from "../replay";

jest.mock('knex')

describe('replay', () => {
  it('should concurrently execute the queries to the connection', async () => {
    const queries = await parse(resolve(__dirname, './test-slowlog.json'));
  
    await replay({ concurrency: 1, connections, queries});
  })


  it('should return execution information', async () => {
    
  })
});