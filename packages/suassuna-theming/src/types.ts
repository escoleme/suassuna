import * as React from "react";

export type SupportedThemes = "default" | "cordel" | "dark";
export type Themes<T extends object> = Partial<Record<SupportedThemes, T>>;

export type ThemedStylesFn<T extends object> = (
    theme: T,
) => Record<string, React.CSSProperties>;
export type StyleDeclaration = Record<string, React.CSSProperties>;
