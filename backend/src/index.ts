import express, { Express, Request, Response } from "express";
import { ALLOWED_DOMAIN, MONGODB_URI, PORT } from "./utils/secrets";
import mongoConnect from "./utils/mongoConnect";
import router from "./routes";
import cors from "cors";
import { rateLimit } from 'express-rate-limit'

(async () => {
  const app: Express = express();

  await mongoConnect(MONGODB_URI);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({
    origin: ALLOWED_DOMAIN,
    credentials: true,
  }));
  app.use("/api", router);


  app.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
      status: false,
      message: "Endpoint not found",
      code: 404,
    });
  });

  app.listen(PORT, () => {
    console.log(`⚡ [server] is listening to port ${PORT}`);
  });
})();
