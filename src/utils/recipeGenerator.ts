import { Recipe } from "@/components/RecipeCard";

interface RecipeTemplate {
  titlePrefixes: string[];
  titleSuffixes: string[];
  vibes: { name: string; keywords: string[] }[];
  cookingMethods: string[];
  servingDescriptions: string[];
}

const recipeTemplates: RecipeTemplate = {
  titlePrefixes: [
    "Dorm Room", "Midnight", "Study Break", "Quick & Dirty", "Random Fridge", 
    "Broke Student", "3AM", "Lazy Sunday", "Emergency", "Creative Chaos",
    "Mystery Box", "Whatever's Left", "Fusion Fantasy", "Improvised", "Kitchen Sink"
  ],
  titleSuffixes: [
    "Magic", "Masterpiece", "Madness", "Mix-Up", "Marvel", "Miracle", 
    "Mash-Up", "Creation", "Combo", "Concoction", "Surprise", "Special",
    "Experiment", "Adventure", "Discovery", "Delight", "Wonder"
  ],
  vibes: [
    { name: "comforting", keywords: ["pasta", "bread", "potato", "rice", "cheese", "milk", "butter"] },
    { name: "quick", keywords: ["instant", "noodles", "bread", "banana", "crackers"] },
    { name: "energy-boosting", keywords: ["banana", "oats", "nuts", "honey", "coffee", "chocolate"] },
    { name: "refreshing", keywords: ["lemon", "lime", "cucumber", "mint", "yogurt", "fruit"] },
    { name: "indulgent", keywords: ["chocolate", "sugar", "butter", "cream", "cookies", "ice cream"] },
    { name: "healthy", keywords: ["vegetables", "fruits", "oats", "nuts", "yogurt", "seeds"] },
    { name: "warming", keywords: ["ginger", "garlic", "onion", "spices", "hot sauce", "chili"] },
    { name: "creative", keywords: [] } // default fallback
  ],
  cookingMethods: [
    "toss everything in a pan and let it work its magic",
    "mix it all up in a bowl like you're conducting an orchestra",
    "layer it in a pot and watch the magic happen",
    "throw it together and pray to the cooking gods",
    "combine everything with the confidence of a master chef",
    "blend it all like you're creating a potion",
    "arrange it artfully because presentation matters",
    "stir it together with reckless abandon"
  ],
  servingDescriptions: [
    "Serves 1 hungry student", "Perfect for 2 broke roommates", "Enough for you + your study buddy",
    "1-2 servings depending on your appetite", "Serves 1 very hungry person", "2 small portions or 1 big one"
  ]
};

function determineVibe(ingredients: string[]): string {
  const ingredientString = ingredients.join(" ").toLowerCase();
  
  for (const vibe of recipeTemplates.vibes) {
    if (vibe.keywords.some(keyword => ingredientString.includes(keyword))) {
      return vibe.name;
    }
  }
  
  return "creative";
}

function generateTitle(ingredients: string[], vibe: string): string {
  const prefix = recipeTemplates.titlePrefixes[Math.floor(Math.random() * recipeTemplates.titlePrefixes.length)];
  const suffix = recipeTemplates.titleSuffixes[Math.floor(Math.random() * recipeTemplates.titleSuffixes.length)];
  
  // Sometimes include a main ingredient in the title
  if (Math.random() > 0.5 && ingredients.length > 0) {
    const mainIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    return `${prefix} ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} ${suffix}`;
  }
  
  return `${prefix} ${suffix}`;
}

function generateCookTime(ingredients: string[]): string {
  const hasInstantItems = ingredients.some(ing => 
    ing.includes("instant") || ing.includes("microwave") || ing.includes("pre")
  );
  
  if (hasInstantItems) {
    return "5-10 mins";
  }
  
  const hasCookingRequired = ingredients.some(ing =>
    ["rice", "pasta", "potato", "onion", "garlic", "meat", "chicken", "egg"].some(cookItem => ing.includes(cookItem))
  );
  
  return hasCookingRequired ? "15-25 mins" : "10-15 mins";
}

function generateInstructions(ingredients: string[], vibe: string): string[] {
  const shuffledIngredients = [...ingredients].sort(() => Math.random() - 0.5);
  const instructions: string[] = [];
  
  // Prep step
  const prepIngredients = shuffledIngredients.filter(ing => 
    ["onion", "garlic", "potato", "tomato", "carrot", "bell pepper"].some(prep => ing.includes(prep))
  );
  
  if (prepIngredients.length > 0) {
    instructions.push(`Start by prepping your ${prepIngredients.join(", ")} - chop 'em up however you want. We're not Gordon Ramsay here.`);
  }
  
  // Cooking method based on ingredients
  const needsCooking = ingredients.some(ing => 
    ["rice", "pasta", "potato", "egg", "meat", "chicken", "onion"].some(cook => ing.includes(cook))
  );
  
  if (needsCooking) {
    const method = recipeTemplates.cookingMethods[Math.floor(Math.random() * recipeTemplates.cookingMethods.length)];
    instructions.push(`Heat up your pan or pot - medium heat works fine. Then ${method}.`);
  }
  
  // Combining ingredients
  const mainIngredients = shuffledIngredients.slice(0, Math.max(2, Math.ceil(ingredients.length * 0.6)));
  const remainingIngredients = shuffledIngredients.slice(mainIngredients.length);
  
  instructions.push(`Add your ${mainIngredients.join(", ")} first. Let them get to know each other for a few minutes.`);
  
  if (remainingIngredients.length > 0) {
    instructions.push(`Now throw in the ${remainingIngredients.join(", ")}. Stir it around like you mean it.`);
  }
  
  // Seasoning/finishing
  const seasonings = ingredients.filter(ing => 
    ["salt", "pepper", "spice", "sauce", "oil", "butter", "lemon", "lime"].some(season => ing.includes(season))
  );
  
  if (seasonings.length > 0) {
    instructions.push(`Season with your ${seasonings.join(", ")} - taste as you go because you're the chef here.`);
  }
  
  // Final step based on vibe
  const finishingTouches = {
    comforting: "Let it all come together until it smells like home. Serve it hot and enjoy the cozy vibes.",
    quick: "Once everything looks ready (trust your gut), plate it up and dive in!",
    "energy-boosting": "Cook until everything's perfectly combined. Fuel up and conquer your day!",
    refreshing: "Mix until everything's well combined and serve immediately for maximum freshness.",
    indulgent: "Let it get all melty and delicious. Serve yourself a generous portion - you deserve it.",
    healthy: "Cook until everything's tender but still has some texture. Your body will thank you!",
    warming: "Let all those flavors meld together until your kitchen smells amazing. Serve hot and cozy up.",
    creative: "Trust the process and cook until it looks and smells right to you. Art has no rules!"
  };
  
  instructions.push(finishingTouches[vibe as keyof typeof finishingTouches] || finishingTouches.creative);
  
  return instructions;
}

export function generateRecipe(ingredients: string[]): Recipe {
  if (ingredients.length < 2) {
    throw new Error("Need at least 2 ingredients to create a recipe");
  }
  
  const vibe = determineVibe(ingredients);
  const title = generateTitle(ingredients, vibe);
  const cookTime = generateCookTime(ingredients);
  const servings = recipeTemplates.servingDescriptions[Math.floor(Math.random() * recipeTemplates.servingDescriptions.length)];
  const instructions = generateInstructions(ingredients, vibe);
  
  return {
    title,
    vibe,
    cookTime,
    ingredients,
    instructions,
    servings
  };
}