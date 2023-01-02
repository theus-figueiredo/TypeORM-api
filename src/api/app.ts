import express from 'express';
import { AppDataSource } from "../database/data-source";
import {
  RoleRoute,
  ContractTypeRoute,
  ContractRoute,
  CostCenterRoute,
  UserRoute
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
    this.express.use('/role', RoleRoute);
    this.express.use('/contract-type', ContractTypeRoute);
    this.express.use('/contract', ContractRoute);
    this.express.use('/cost-center', CostCenterRoute);
    this.express.use('/user', UserRoute);
  };

  private async database() {
    await AppDataSource.initialize()
    .then(async () => console.log('connected'))
    .catch((err) => console.error(err));
  };
};

export default new App().express;
