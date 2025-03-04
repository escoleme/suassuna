import * as React from "react";
import {render, screen} from "@testing-library/react";

import {ThemeSwitcherContext} from "../theme-switcher-context";

describe("ThemeSwitcherContext", () => {
    it("should create a context with the 'default' theme", () => {
        // Arrange

        // Act
        render(
            <ThemeSwitcherContext.Consumer>
                {(value) => <>O tema atual é: {value}</>}
            </ThemeSwitcherContext.Consumer>,
        );

        // Assert
        expect(screen.getByText(/O tema atual é: default/)).toBeTruthy();
    });

    it("should update its value", () => {
        // Arrange

        // Act
        render(
            <ThemeSwitcherContext.Provider value="cordel">
                <ThemeSwitcherContext.Consumer>
                    {(value) => <>O tema atual é: {value}</>}
                </ThemeSwitcherContext.Consumer>
                ,
            </ThemeSwitcherContext.Provider>,
        );

        // Assert
        expect(screen.getByText(/O tema atual é: cordel/)).toBeTruthy();
    });
});
