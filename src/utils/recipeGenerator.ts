import { Recipe } from "@/components/RecipeCard";

export async function generateRecipe(ingredients: string[]): Promise<Recipe> {
  const res = await fetch("http://localhost:3001/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  });

  if (!res.ok) throw new Error("API failed");

  const recipe = await res.json();
  return recipe;
}
