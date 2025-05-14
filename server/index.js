const express = require("express"); //Importing libraries for backend just like you would do for frontend
const cors = require("cors"); // Importing libraries for backend just like you would do for frontend

const app = express();
app.use(cors());
app.use(express.json());

const ratings = []; // It’s a temporary in-memory array to store submitted ratings. This could be replaced eventually by a database

// Root route to handle GET requests to '/'
app.get("/", (req, res) => {
  res.send("Welcome to the Mood Tracker API");
});


app.post("/api/rating", (req, res) => {
  const { label } = req.body; //req.body contains the data the frontend sends in the POST request — like:{ label: "Happy" }. So this line is destructuring the label from that request. It doesn’t return the body — it reads from it.
  if (!label) {
    return res.status(400).json({ message: "Missing rating label" });
  }

  ratings.push({ label, timestamp: new Date() }); //Right now, you’re not using it — but it’s common to add timestamp in any logging or analytics.
  console.log("Received rating:", label);
  res.status(200).json({ message: "Rating received!" });
});

app.get("/api/ratings", (req, res) => { //this lets you fetch all stored ratings. The frontend can use this to display a list of past submissions, analytics, etc.
  res.json(ratings); //“Hey Express — if you ever receive a GET request at /api/ratings, respond by sending the ratings array as JSON.”
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
