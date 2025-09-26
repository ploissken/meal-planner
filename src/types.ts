export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  category: string;
  estimatedCostPerUnit: number;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number;
}

export interface InstructionStep {
  label: string;
  timeInMinutes?: number;
}

export interface NutritionalInfo {
  protein: number;
  carbs: number;
  fat: number;
}

export type Difficulty = "Easy" | "Medium" | "Complex";

export interface Recipe {
  id: string;
  image: string;
  title: string;
  cookingTimeInMin: number;
  difficulty: Difficulty;
  dietaryTags: string[];
  cuisine: string;
  ingredients: RecipeIngredient[];
  instructions: InstructionStep[];
  nutritionalInfo: NutritionalInfo;
}
