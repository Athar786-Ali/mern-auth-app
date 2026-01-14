import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.set("trust proxy", 1);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://fronted-mern-auth.vercel.app"
  ],
  credentials: true
}));

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("API is working fine...🙂");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Server running on port ${port}`));
