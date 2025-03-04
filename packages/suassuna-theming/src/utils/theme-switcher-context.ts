import * as React from "react";
import {SupportedThemes} from "../types";

/**
 * O ThemeSwitcherContext é um React Context que contém uma referência ao tema selecionado.
 * O valor inicial dele é o 'default', pois é esperado que qualquer componente com tema defina
 * o seu tema inicial como 'default'.
 * -
 * @param theme deve ser um dos temas definidos no objeto themes. O padrão é 'default'
 */
export const ThemeSwitcherContext =
    React.createContext<SupportedThemes>("default");
