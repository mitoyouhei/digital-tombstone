const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const tombstones = require("./routes/tombstones");
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api/tombstones", tombstones);

mongoose
  .connect(
    "mongodb+srv://mitoyouhei:WaVD8X7YrKzP0r4c@cluster0.j0sxit0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
