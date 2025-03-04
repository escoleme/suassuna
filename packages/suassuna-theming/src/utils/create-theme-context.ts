import * as React from "react";

/**
 * Um utilitário que nos permite criar um determinado tema que
 * contém os tokens de componentes associados a ele.
 *
 * @param theme O objeto de tema para criar o context
 * @returns
 */
export default function createThemeContext<T>(theme: T) {
    return React.createContext(theme);
}
