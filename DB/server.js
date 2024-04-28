const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";

app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors()); // Enable preflight requests for all routes
app.get("/proxy", async (req, res) => {
  try {
    const url = req.query.url;
    const fetch = await import("node-fetch"); //handles http requests (? ke baad wala link mai)
    const response = await fetch.default(CORS_PROXY_URL + url, {
      headers: {
        Origin: "", // Replace with your actual origin
      },
    });
    const pdfBuffer = await response.buffer();

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).send("Proxy Error");
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy Server running on port ${PORT}`);
});
