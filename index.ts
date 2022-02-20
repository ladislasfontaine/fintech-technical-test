import express from "express";
import helmet from "helmet";
import initRoutes from "./src/routes/index";

const startServer = () => {
  try {
    const app = express();
    const port = 3000;

    app.use(express.json());
    app.use(helmet());
    initRoutes(app);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error(`Server initialization error: ${error}`);
  }
};

startServer();
