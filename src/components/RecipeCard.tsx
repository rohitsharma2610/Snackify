import { Clock, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Recipe {
  title: string;
  vibe: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
  servings: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const vibeColors = {
    "comforting": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "quick": "bg-green-500/20 text-green-300 border-green-500/30",
    "energy-boosting": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "refreshing": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "indulgent": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "healthy": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "creative": "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "warming": "bg-red-500/20 text-red-300 border-red-500/30"
  };

  const vibeClass = vibeColors[recipe.vibe.toLowerCase() as keyof typeof vibeColors] || vibeColors.creative;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl p-8 shadow-xl border border-border backdrop-blur-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <Badge className={`${vibeClass} px-3 py-1 text-sm font-medium`}>
              <Sparkles className="w-3 h-3 mr-1" />
              {recipe.vibe}
            </Badge>
            <h2 className="text-3xl font-bold text-text-primary leading-tight">
              {recipe.title}
            </h2>
            <div className="flex items-center justify-center gap-4 text-text-secondary">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{recipe.servings}</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
              What You're Using
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-text-secondary text-sm">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-text-primary border-b border-border pb-2">
              Let's Make This Happen
            </h3>
            <div className="space-y-3">
              {recipe.instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-surface rounded-lg border border-border hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-border">
            <p className="text-text-muted text-sm text-center italic">
              "Your random ingredients just became legendary. Enjoy your creation! 🍽️"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}