import dotenv from "dotenv";

dotenv.config({ encoding: 'utf8'});

interface ReplayConfig {
  connections: [{ 
    user: string
    password: string
    host: string 
    port?: number
    database: string
  }]
}

const config: Readonly<ReplayConfig> = Object.freeze({
  connections: [
    {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DB,
    },
  ]
} as ReplayConfig);

export default config;