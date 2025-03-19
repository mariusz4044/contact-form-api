import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const app = express();
const port: string = process.env.PORT || "3000";

const corsConfig = cors({
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
});

const sessionConfig = session({
  secret: process.env.EXPRESS_SESSION_SECRET || "X-4595394368",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  saveUninitialized: false,
  resave: false,
});

app.use(express.json({ limit: "1mb" }));
app.use(corsConfig);
app.use(sessionConfig);

//Import routes
import UserTracking from "./middleware/userTracking";
import CaptchaRouter from "./components/captchaRouter";

//Routes middleware
app.use("/", UserTracking);
app.use("/captcha", CaptchaRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
