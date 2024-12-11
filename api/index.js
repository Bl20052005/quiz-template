require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL;

const mongoose = require("mongoose");
mongoose
  .connect(`${mongodb_url}/33-data`)
  .then(() => {
    console.log("FINE");
  })
  .catch(() => {
    console.log("BAD");
  });

console.log(mongodb_url);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.text());

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const questionSchema = new mongoose.Schema({
  name: String,
  attempts: Array,
  correct: Array,
});

const Question = mongoose.model("questions", questionSchema);

async function find_question_data() {
  let res = await Question.find({ name: "data" });

  if (res.length == 0) {
    let new_data = [];
    for (let i = 0; i < 233; i++) {
      new_data.push(0);
    }
    const question = new Question({
      name: "data",
      attempts: new_data,
      correct: new_data,
    });
    await question.save();
    res.push(question);
  }
  return res[0];
}

const scoreSchema = new mongoose.Schema({
  name: String,
  numOfScores: Number,
  scores: Array,
});

const Score = mongoose.model("scores", scoreSchema);

async function find_score_data() {
  let res = await Score.find({ name: "score" });

  if (res.length == 0) {
    const score = new Score({ name: "score", numOfScores: 0, scores: [] });
    await score.save();
    res.push(score);
  }
  return res[0];
}

// save_and_log();

app.post("/questions", async (req, resp) => {
  const body = JSON.parse(Object.keys(req.body)[0]);
  const data = await find_question_data();
  const score = await find_score_data();

  let cur_correct = data.correct;
  let cur_attempts = data.attempts;

  for (const [key, value] of Object.entries(body.questions)) {
    const key_int = parseInt(key);

    cur_attempts[key_int]++;
    console.log(key, key_int, cur_attempts[key_int]);
    if (!value) {
      cur_correct[key_int]++;
    }
  }

  data.set("correct", cur_correct);
  data.set("attempts", cur_attempts);

  await data.save();

  score.numOfScores += 1;
  score.scores.push(body.score);

  await score.save();
});

app.get("/data", async (req, res) => {
  const data = await find_question_data();
  let score = await find_score_data();

  let stats = {};
  stats["num_attempts"] = score.numOfScores;
  score.scores.sort();
  stats["median_score"] =
    (score.scores[Math.floor(score.scores.length / 2)] +
      score.scores[Math.ceil(score.scores.length / 2)]) /
    2;
  stats["average_score"] =
    score.scores.reduce((acc, cur) => acc + cur, 0) / score.scores.length;

  let minimum = 1;
  let maximum = 0;
  let min_index = 0;
  let max_index = 0;

  for (let i = 0; i < data.attempts.length; i++) {
    if (data.attempts[i] != 0) {
      if (minimum > data.correct[i] / data.attempts[i]) {
        minimum = data.correct[i] / data.attempts[i];
        min_index = i;
      }
      if (maximum < data.correct[i] / data.attempts[i]) {
        maximum = data.correct[i] / data.attempts[i];
        max_index = i;
      }
    }
  }

  stats["max_index"] = max_index;
  stats["max_score"] = data.correct[max_index] / data.attempts[max_index];
  stats["min_index"] = min_index;
  stats["min_score"] = data.correct[min_index] / data.attempts[min_index];

  res.send(JSON.stringify(stats));
});
