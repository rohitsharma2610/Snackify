import OpenAI from 'openai';
import { Recipe } from "@/components/RecipeCard";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  dangerouslyAllowBrowser: true
});

export async function generateRecipe(ingredients: string[]): Promise<Recipe> {
  if (ingredients.length < 2) {
    throw new Error("Need at least 2 ingredients to create a recipe");
  }

  const prompt = `Create a fun, college-friendly recipe using ONLY these ingredients: ${ingredients.join(", ")}

Requirements:
- Use ONLY the provided ingredients, no additional items
- Suitable for college hostel cooking (basic tools: stove, kettle, pan)
- Beginner-friendly instructions
- Fun, practical roommate tone
- Determine the natural vibe/mood based on ingredients (comforting, quick, energy-boosting, refreshing, indulgent, healthy, warming, creative)

Return a JSON object with this exact structure:
{
  "title": "Fun recipe name with college vibe",
  "vibe": "single word describing the mood",
  "cookTime": "estimated time like '10-15 mins'",
  "ingredients": [exact ingredient list provided],
  "instructions": [3-5 step-by-step instructions in casual, encouraging tone],
  "servings": "serving description like 'Serves 1 hungry student'"
}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-2025-04-14",
      messages: [
        {
          role: "system",
          content: "You are a fun, practical college roommate who creates amazing recipes from random ingredients. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const recipe = JSON.parse(content);
    
    // Validate the response structure
    if (!recipe.title || !recipe.vibe || !recipe.cookTime || !recipe.ingredients || !recipe.instructions || !recipe.servings) {
      throw new Error("Invalid recipe structure from AI");
    }

    return recipe;
  } catch (error) {
    console.error("AI Recipe generation error:", error);
    
    // Fallback to a simple template-based recipe if AI fails
    return {
      title: `Creative ${ingredients[0]} Combo`,
      vibe: "creative",
      cookTime: "15-20 mins",
      ingredients,
      instructions: [
        `Gather your ingredients: ${ingredients.join(", ")}.`,
        "Prep everything by washing, chopping, or organizing as needed.",
        "Combine your ingredients in a way that makes sense - trust your instincts!",
        "Cook or mix until everything comes together nicely.",
        "Taste, adjust, and enjoy your creation!"
      ],
      servings: "Serves 1-2 people"
    };
  }
}