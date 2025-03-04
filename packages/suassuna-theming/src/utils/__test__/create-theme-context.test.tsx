import * as React from "react";
import {render, screen} from "@testing-library/react";

import createThemeContext from "../create-theme-context";

describe("createThemeContext", () => {
    it("should create a context with the given theme", () => {
        // Arrange
        const theme = {
            color: {
                bg: {
                    default: "#ffffff",
                },
            },
        };
        // Create the context with the default theme.
        const ThemeContext = createThemeContext(theme);

        // Act
        render(
            <ThemeContext.Consumer>
                {(value) => <>A cor default é: {value.color.bg.default}</>}
            </ThemeContext.Consumer>,
        );

        // Assert
        expect(screen.getByText("A cor default é: #ffffff")).toBeTruthy();
    });
});
