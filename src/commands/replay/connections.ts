import knex, { Knex } from "knex";
import config from "../../config";

function connect(): Knex[] {
  return config.connections.map( 
    connection => knex({
      client: 'mysql',
      connection
    })
  );
}

export default connect()