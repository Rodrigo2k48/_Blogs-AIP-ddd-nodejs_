import express from 'express';
import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.initRoutes();
  }
  private config(): void {
    const acessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.app.use(express.json());
    this.app.use(acessControl);
  }

  private initRoutes(): void {
    // Test Route
    this.app.get('/', (req, res) => res.send('Ok'));
  }

  public start(PORT: number | string): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// this second export is to help with testing
export const { app } = new App();
