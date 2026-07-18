"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="lock360-theme"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}