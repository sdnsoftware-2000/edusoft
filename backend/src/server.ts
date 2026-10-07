import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import studentRoutes from "./routes/studentRoutes";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EduSoft backend is running",
  });
});

app.use("/api/books", bookRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`EduSoft backend running on http://localhost:${PORT}`);
});