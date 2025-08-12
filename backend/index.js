
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
   return res.send("Hello chatbot from the backend!");
})

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent('gemini-2.5-flash')}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        }),
      }
    );

    const data = await response.json();
    //console.log("Gemini API Response:", data);

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.json({ reply });
  } catch (err) {
    console.error("Error calling Gemini:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

//app.listen(5000, () => console.log("Server listening on port 5000"));

// Route for chatbot
// app.post("/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent('gemini-2.5-flash')}:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: userMessage }] }]
//         }),
//       }
//     );

//     const data = await response.json();
//     //console.log("Gemini API Response:", data);

//     const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//     res.json({ reply });
//   } catch (err) {
//     console.error("Error calling Gemini:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () => console.log("Server listening on port 5000"));