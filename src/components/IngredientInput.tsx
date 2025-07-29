import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ChefHat } from "lucide-react";

interface IngredientInputProps {
  onGenerateRecipe: (ingredients: string[]) => void;
  isGenerating: boolean;
}

export function IngredientInput({ onGenerateRecipe, isGenerating }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const addIngredient = () => {
    const trimmed = currentInput.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setCurrentInput("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 mb-4">
          <ChefHat className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
          College Kitchen Magic
        </h1>
        <p className="text-lg text-text-secondary">
          Drop your random ingredients and watch me turn them into something amazing
        </p>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add an ingredient..."
              className="flex-1 bg-surface border-border focus:ring-primary"
            />
            <Button 
              onClick={addIngredient}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {ingredients.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-text-secondary">Your Ingredients:</h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-surface-elevated text-text-primary border-border hover:bg-accent group cursor-pointer"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(index)}
                      className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={() => onGenerateRecipe(ingredients)}
            disabled={ingredients.length < 2 || isGenerating}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                Cooking up something magical...
              </>
            ) : (
              <>
                <ChefHat className="w-4 h-4 mr-2" />
                Generate Recipe ({ingredients.length} ingredients)
              </>
            )}
          </Button>

          {ingredients.length < 2 && (
            <p className="text-sm text-text-muted text-center">
              Add at least 2 ingredients to start cooking!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}