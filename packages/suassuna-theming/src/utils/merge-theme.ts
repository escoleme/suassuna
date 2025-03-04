type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]> | string | number | boolean;
};

/**
 * Permite criar uma nova cópia do tema de destino substituido alguns dos
 * seus tokens por um novo tema.
 *
 * Isso é útil um tema especifico para um determinado componente.
 *
 * @param target O objeto de tema original (theme).
 * @param source O objeto de tema para fazer merge com o original.
 * @returns Um novo objeto de tema com os tokens de destino (target) substituindo os de origem (source).
 */
export function mergeTheme<T>(
    source: T | RecursivePartial<T>,
    target: RecursivePartial<T>,
) {
    const result = {...source, ...target};
    const objectKeys = Object.keys(result);
    type Keys = keyof typeof result;

    for (const key of objectKeys) {
        const sourceValue = source[key as Keys];
        const targetValue = target[key as Keys];
        result[key as Keys] =
            typeof targetValue === "object" && typeof sourceValue === "object"
                ? mergeTheme(sourceValue, targetValue)
                : result[key as Keys];
    }

    return result as T;
}
