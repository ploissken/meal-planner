import type { Metadata } from "next";
import TopBar from "./components/TopBar";
import Providers from "./providers";

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
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
