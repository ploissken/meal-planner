/**
 * Sketched by chatGPT
 * prompt:
 * give me a react context that keeps its state synced with localStorage
 */
"use client";
import {
  DailyPlan,
  FullRecipeIngredient,
  Ingredient,
  MealType,
  Recipe,
  RecipeNote,
} from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import mockIngredients from "../../mock-data/ingredients.json";
import { useRecipeGalleryContext } from "@/app/recipe-gallery/context/RecipeGalleryContext";
import {
  MEAL_PLANNER_KEY,
  SHOPPING_LIST_KEY,
  RECIPE_NOTES_KEY,
} from "@/consts";

type LocalStorageContextType = {
  mealPlan: DailyPlan[];
  weekdays: string[];
  shoplist: FullRecipeIngredient[];
  ingredients: Ingredient[];
  notes: RecipeNote[];
  updateMealPlan: (data: UpdateMealData) => void;
  getIngredientCategories: () => string[];
  updateShopList: (data: FullRecipeIngredient[]) => void;
  updateNotes: (note: RecipeNote) => void;
};

type UpdateMealData = {
  selectedDayIndex: number;
  selectedMealIndex: MealType;
  recipeId: string | null;
};

const defaultValue: DailyPlan[] = [...Array(7)].map(() => ({
  breakfast: null,
  lunch: null,
  dinner: null,
}));

export const LocalStorageContext = createContext<
  LocalStorageContextType | undefined
>(undefined);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [mealPlan, setMealPlan] = useState<DailyPlan[]>(defaultValue);
  const [shoplist, setShoplist] = useState<FullRecipeIngredient[]>([]);
  const [notes, setNotes] = useState<RecipeNote[]>([]);

  const { recipes } = useRecipeGalleryContext();

  const weekdays = [...Array(7).keys()].map((day) =>
    new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(Date.UTC(2021, 0, day + 4)) // ensures Sunday = 0
    )
  );

  const getRequiredIngredientsForPlan = (
    newDailyPlan?: DailyPlan[]
  ): FullRecipeIngredient[] => {
    const weekMeals: Recipe[] = [];
    const plan = newDailyPlan || mealPlan;
    plan.forEach((weekDay) => {
      const breakfast = recipes.find((r) => r.id === weekDay.breakfast);
      const lunch = recipes.find((r) => r.id === weekDay.lunch);
      const dinner = recipes.find((r) => r.id === weekDay.dinner);
      if (breakfast) {
        weekMeals.push(breakfast);
      }
      if (lunch) {
        weekMeals.push(lunch);
      }
      if (dinner) {
        weekMeals.push(dinner);
      }
    });

    return weekMeals.flatMap((meal) => {
      return meal.ingredients.map((recipeIngredient) => {
        const ingredient = mockIngredients.find(
          (ing) => ing.id === recipeIngredient.id
        );
        if (!ingredient) {
          throw new Error("ingredient not found" + recipeIngredient.id);
        }
        return { ...recipeIngredient, ...ingredient, recipeName: meal.title };
      });
    });
  };

  const getIngredientCategories = () => {
    return [
      ...new Set(mockIngredients.map((ingredient) => ingredient.category)),
    ];
  };

  const updateMealPlan = ({
    selectedDayIndex,
    selectedMealIndex,
    recipeId,
  }: UpdateMealData) => {
    const newPlan = mealPlan.map((dayPlan, index) =>
      index === selectedDayIndex
        ? { ...dayPlan, [selectedMealIndex]: recipeId }
        : dayPlan
    );
    setMealPlan(newPlan);
    localStorage.setItem(MEAL_PLANNER_KEY, JSON.stringify(newPlan));

    const newShoppingList = getRequiredIngredientsForPlan(newPlan);
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newShoppingList));
    setShoplist(newShoppingList);
  };

  const updateShopList = (newList: FullRecipeIngredient[]) => {
    setShoplist(newList);
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(newList));
  };

  const updateNotes = (newNote: RecipeNote) => {
    const newNotes = notes.filter((note) => note.recipeId !== newNote.recipeId);
    newNotes.push(newNote);
    setNotes(newNotes);
    localStorage.setItem(RECIPE_NOTES_KEY, JSON.stringify(newNotes));
  };

  useEffect(() => {
    const savedWeekPlan = localStorage.getItem(MEAL_PLANNER_KEY);
    const savedShoppingList = localStorage.getItem(SHOPPING_LIST_KEY);
    const savedNotes = localStorage.getItem(RECIPE_NOTES_KEY);

    // load existing data from local storage if existing, or set default otherwise
    if (savedWeekPlan) {
      setMealPlan(JSON.parse(savedWeekPlan));
    } else {
      localStorage.setItem(MEAL_PLANNER_KEY, JSON.stringify(mealPlan));
    }

    if (savedShoppingList) {
      setShoplist(JSON.parse(savedShoppingList));
    } else {
      localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify({}));
    }

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      localStorage.setItem(RECIPE_NOTES_KEY, JSON.stringify([]));
    }
  }, []);

  return (
    <LocalStorageContext.Provider
      value={{
        mealPlan,
        updateMealPlan,
        weekdays,
        getIngredientCategories,
        shoplist,
        updateShopList,
        ingredients: mockIngredients as Ingredient[],
        updateNotes,
        notes,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = (): LocalStorageContextType => {
  const ctx = useContext(LocalStorageContext);
  if (!ctx) {
    throw new Error(
      "useLocalStorageContext must be used within a LocalStorageProvider"
    );
  }
  return ctx;
};
