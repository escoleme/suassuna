import * as React from "react";
import {renderHook} from "@testing-library/react";

import useScopedTheme from "../use-scoped-theme";
import {ThemeSwitcherContext} from "../../utils/theme-switcher-context";
import createThemeContext from "../../utils/create-theme-context";

describe("useScopedTheme", () => {
    it("should return the theme from the context", () => {
        // Arrange
        const theme = {
            color: {
                blue: "#0000f0",
                green: "#00ff00",
            },
            spacing: {
                medium: 8,
                large: 16,
            },
        };

        const themeContext = createThemeContext(theme);

        // Act
        const {result} = renderHook(() => useScopedTheme(themeContext));

        // Assert
        expect(result.current.theme).toEqual(theme);
    });

    it("should return the default theme name", () => {
        // Arrange
        const theme = {
            color: {
                blue: "#0000f0",
            },
        };

        const themeContext = createThemeContext(theme);

        // Act
        const {result} = renderHook(() => useScopedTheme(themeContext));

        // Assert
        expect(result.current.themeName).toEqual("default");
    });

    it("should return the theme name", () => {
        // Arrange
        const theme = {
            color: {
                blue: "#0000f0",
            },
        };

        const themeContext = createThemeContext(theme);
        const themeName = "cordel";
        // Get the theme name from ThemeSwitcherContext.
        const wrapper = ({children}: {children: React.ReactNode}) => (
            <ThemeSwitcherContext.Provider value={themeName}>
                {children}
            </ThemeSwitcherContext.Provider>
        );

        // Act
        const {result} = renderHook(() => useScopedTheme(themeContext), {
            wrapper,
        });

        // Assert
        expect(result.current.themeName).toEqual("cordel");
    });
});
