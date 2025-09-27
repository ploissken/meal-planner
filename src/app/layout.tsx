import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { RecipeGalleryProvider } from "./recipe-gallery/context/RecipeGalleryContext";
import TopBar from "./components/TopBar";
import { MealPlannerProvider } from "./meal-planner/context/MealPlannerContext";

export const metadata: Metadata = {
  title: "Recipe Collection & Meal Planner",
  description: "Take-home assignment for Terret",
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
