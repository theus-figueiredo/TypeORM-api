import express from 'express';
import { AppDataSource } from "../database/data-source";
import cors from 'cors';
import {
  RoleRoute,
  ContractTypeRoute,
  ContractRoute,
  CostCenterRoute,
  UserRoute,
  ServiceStatusRoute,
  ServiceCategoryRoute,
  ServiceOrderRoute,
  LoginRoute,
  CommentRoute,
} from '../routes';

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

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
    this.express.use(cors(options));
  };

  private routes() {
    this.express.use('/role', RoleRoute);
    this.express.use('/contract-type', ContractTypeRoute);
    this.express.use('/contract', ContractRoute);
    this.express.use('/cost-center', CostCenterRoute);
    this.express.use('/user', UserRoute);
    this.express.use('/service-category', ServiceCategoryRoute);
    this.express.use('/service-status', ServiceStatusRoute);
    this.express.use('/service-order', ServiceOrderRoute);
    this.express.use('/login', LoginRoute);
    this.express.use('/comments', CommentRoute);
  };

  private async database() {
    await AppDataSource.initialize()
    .then(async () => console.log('connected'))
    .catch((err) => console.error(err));
  };
};

export default new App().express;
