import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { RecipeGalleryProvider } from "./recipe-gallery/context/RecipeGalleryContext";
import TopBar from "./components/TopBar";
import { MealPlannerProvider } from "./meal-planner/context/MealPlannerContext";

export const metadata: Metadata = {
  title: "Recipe & Meal Planning Dashboard",
  description:
    "a personal recipe management and meal planning application that helps home cooks organize their favorite recipes, plan weekly meals, and generate smart shopping lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <RecipeGalleryProvider>
              <MealPlannerProvider>
                <TopBar />
                {children}
              </MealPlannerProvider>
            </RecipeGalleryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
