import express from "express";
import { join } from "path";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(join(__dirname, "../public")));

app.set("view-engine", "ejs");

const results: Record<string, string> = {
  burger: "beef",
  astronomy: "alpha-centuri",
  test: "yay, you found the test",
};

app.get("/:id", (req, res) => {
  const key = req.params.id;
  const answer = results[key];
  if (answer === undefined) {
    return res.render("wrong-answer.ejs", { key });
  }
  res.render("success.ejs", { answer, key });
});

app.get("/", (_, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
});
