// server/routes/recipe.ts

import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch"; // ✅ Required for fetch in Node.js

dotenv.config();
const router = express.Router();

router.post("/api/recipe", async (req, res) => {
  const ingredients: string[] = req.body.ingredients;

  // Validate ingredients
  if (!ingredients || ingredients.length < 2) {
    return res.status(400).json({ error: "Need at least 2 ingredients" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY not found in .env file" });
  }

  const prompt = `Create a fun, college-friendly recipe using ONLY these ingredients: ${ingredients.join(", ")}. Return the result strictly as valid JSON with fields like title, vibe, cookTime, ingredients, instructions (array), and servings.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a fun, practical college roommate who creates amazing recipes from random ingredients. Always respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    console.log("Groq raw response:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.choices?.[0]?.message?.content) {
      return res.status(500).json({ error: "No content received from Groq model" });
    }

    let recipe;
    try {
      recipe = JSON.parse(data.choices[0].message.content);
    } catch (err) {
      return res.status(500).json({ error: "Failed to parse JSON from model response" });
    }

    return res.status(200).json(recipe);
  } catch (err) {
    console.error("Groq API call failed:", err);
    return res.status(500).json({
      title: `Creative ${ingredients[0]} Combo`,
      vibe: "creative fallback",
      cookTime: "15 mins",
      ingredients,
      instructions: [
        `Gather: ${ingredients.join(", ")}`,
        "Mix & match with creativity!",
        "Enjoy your surprise meal.",
      ],
      servings: "1-2 people",
    });
  }
});

export default router;
