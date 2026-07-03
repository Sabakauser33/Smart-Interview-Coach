const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use((req, res, next) => {
  const allowedFromEnv = process.env.ALLOWED_ORIGINS; // comma separated list
  const requestOrigin = req.headers.origin;

  let allowed = [];
  if (allowedFromEnv) {
    allowed = allowedFromEnv.split(",").map(o => o.trim());
  } else {
    // sensible defaults for production and local development
    allowed = [
      'https://smart-interview-coach-pilj.vercel.app',
      'http://localhost:5173',
      'http://127.0.0.1:5173'
    ];
  }

  if (requestOrigin && allowed.includes(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Cookie');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json())
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./routes/auth.route")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});



module.exports = app