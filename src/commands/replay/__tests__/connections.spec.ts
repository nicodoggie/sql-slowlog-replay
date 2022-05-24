import { any } from "bluebird";
import { Knex } from "knex";
import config from "../../../config"
import connections from "../connections";

describe('connections', () => {
  it('should return a list of knex connections', async () => {
    expect(connections).toHaveLength(config.connections.length)
    for(const cx of connections) {
      expect(cx).toHaveProperty('select');
    }
  })
})