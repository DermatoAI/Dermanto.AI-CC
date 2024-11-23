const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
