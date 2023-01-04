import { DataSource, DataSourceOptions } from "typeorm"
import * as dotenv from 'dotenv';
import { SeederOptions } from "typeorm-extension";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/**/entity/*.{ts,js}`],
  migrations: [`${__dirname}/**/migration/*.{ts,js}`],
  seeds: []
}

export const AppDataSource = new DataSource(options);
