import { useState } from "react";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeCard, Recipe } from "@/components/RecipeCard";
import { generateRecipe } from "@/utils/recipeGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRecipe = async (ingredients: string[]) => {
    if (ingredients.length < 2) {
      toast.error("Add at least 2 ingredients to create a recipe!");
      return;
    }

    setIsGenerating(true);
    
    try {
      const newRecipe = await generateRecipe(ingredients);
      setRecipe(newRecipe);
      toast.success("Recipe generated! Time to get cooking 🍳");
    } catch (error) {
      toast.error("Oops! Something went wrong. Try again with different ingredients.");
      console.error("Recipe generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartOver = () => {
    setRecipe(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-surface to-background opacity-50 pointer-events-none" />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="container mx-auto">
          {!recipe ? (
            <div className="flex items-center justify-center min-h-screen">
              <IngredientInput 
                onGenerateRecipe={handleGenerateRecipe}
                isGenerating={isGenerating}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center">
                <Button
                  onClick={handleStartOver}
                  variant="ghost"
                  className="text-text-secondary hover:text-text-primary hover:bg-surface"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Try Different Ingredients
                </Button>
              </div>
              
              <RecipeCard recipe={recipe} />
              
              <div className="flex justify-center pt-4">
                <Button
                  onClick={() => handleGenerateRecipe(recipe.ingredients)}
                  variant="outline"
                  className="bg-surface border-border hover:bg-surface-elevated text-text-secondary"
                >
                  Generate Another Version
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
