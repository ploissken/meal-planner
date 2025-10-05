"use client";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { RecipeGalleryProvider } from "./recipe-gallery/context/RecipeGalleryContext";
import { LocalStorageProvider } from "./context/LocalStorageContext";
import { theme } from "@/theme";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <RecipeGalleryProvider>
          <LocalStorageProvider>{children}</LocalStorageProvider>
        </RecipeGalleryProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
