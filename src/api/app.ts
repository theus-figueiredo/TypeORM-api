import express from 'express';
import { AppDataSource } from "../database/data-source";
import {
  RoleRoute,
  ContractTypeRoute,
  ContractRoute,
  CostCenterRoute
} from '../routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.database();
  };

  private middlewares() {
    this.express.use(express.json());
  };

  private routes() {
    this.express.use('/api-test', (_req, res) => res.send('Hello world'));
    this.express.use('/role', RoleRoute);
    this.express.use('/contractType', ContractTypeRoute);
    this.express.use('/contract', ContractRoute);
    this.express.use('/costCenter', CostCenterRoute);
  };

  private async database() {
    await AppDataSource.initialize()
    .then(async () => console.log('connected'))
    .catch((err) => console.error(err));
  };
};

export default new App().express;
