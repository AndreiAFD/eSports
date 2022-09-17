import express from "express";
const app = express();

app.get("/ads", (request, response) => {
  return response.json({
    message: "Acessou ads",
    status: "success salve",
  });
});

app.listen(3333);
