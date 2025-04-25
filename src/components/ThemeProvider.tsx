"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<Record<string, unknown>>) {
  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}