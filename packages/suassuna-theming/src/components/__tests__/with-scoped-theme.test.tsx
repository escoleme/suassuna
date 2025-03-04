import * as React from "react";
import {render, screen} from "@testing-library/react";

import createThemeContext from "../../utils/create-theme-context";
import withScopedTheme, {WithThemeProps} from "../with-scoped-theme";
import {ThemedStylesFn} from "../../types";

describe("withScopedTheme", () => {
    it("should return the theme from the context", () => {
        // Arrange
        const theme = {
            default: {
                schemes: {
                    light: {
                        primary: "#0000ff",
                        secondary: "#ffffff",
                    },
                },
            },
        };

        type ThemeContract = typeof theme;

        function ThemedComponent(props: WithThemeProps) {
            const {suThemeStyles} = props;

            return <div style={suThemeStyles.wrapper}>This is themed!</div>;
        }

        const styles: ThemedStylesFn<ThemeContract> = (theme) => ({
            wrapper: {
                background: theme.default.schemes.light.primary,
                color: theme.default.schemes.light.secondary,
            },
        });

        const themeContext = createThemeContext(theme);

        // Act
        const TestComponent = withScopedTheme(
            styles,
            themeContext,
        )(ThemedComponent);

        render(<TestComponent />);

        // Assert
        // @ts-ignore
        expect(screen.getByText("This is themed!")).toHaveStyle(
            "background: #0000ff",
        );
    });
});
