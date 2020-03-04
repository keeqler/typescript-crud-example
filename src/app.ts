import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private database(): void {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  private routes(): void {
    this.app.use(routes);
  }
}

export default new App().app;
