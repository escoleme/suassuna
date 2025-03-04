import * as React from "react";

import type {StyleDeclaration, ThemedStylesFn} from "../types";
import useScopedTheme from "../hooks/use-scoped-theme";

export type WithThemeProps = {
    suThemeStyles: StyleDeclaration;
};

export type WithoutTheme<T> = Omit<T, keyof WithThemeProps>;

/**
 * Um HOC (higher order component) que inclui os estilos temáticos nos props
 * do componente encapsulado como 'suThemeStyles'
 */
export default function withScopedTheme<T extends object>(
    styleSheet: ThemedStylesFn<T>,
    themeContext: React.Context<T>,
) {
    return <Props extends WithThemeProps>(
            WrappedComponent: React.ComponentType<Props>,
        ) =>
        (props: WithoutTheme<Props>) => {
            const {theme} = useScopedTheme(themeContext);
            // Apply the current theme to the stylesheet.
            const suThemeStyles = styleSheet(theme);

            return (
                <WrappedComponent
                    {...(props as Props)}
                    suThemeStyles={suThemeStyles}
                />
            );
        };
}
