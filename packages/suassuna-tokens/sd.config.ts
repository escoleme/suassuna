import StyleDictionary from "style-dictionary";
import {formats, transformGroups} from "style-dictionary/enums";

const {scssVariables, json} = formats;
const {web, js} = transformGroups;

const PREFIX = "me";
type BRAND = "brand-foo";
type PLATFORM = "web" | "js";

const createStyleDictionaryConfig = (brand: BRAND, platform: PLATFORM) => {
    return {
        source: [
            `tokens/brands/${brand}/*.json`,
            "tokens/globals/**/*.json",
            `tokens/platforms/${platform}/*.json`,
        ],
        platforms: {
            web: {
                transformGroup: web,
                buildPath: `dist/web/${brand}/`,
                prefix: PREFIX,
                files: [
                    {
                        destination: "tokens.scss",
                        format: scssVariables,
                    },
                ],
            },

            js: {
                transformGroup: "js",
                buildPath: `dist/web/${brand}/`,
                files: [
                    {
                        destination: "variables.js",
                        format: "javascript/es6",
                    },
                    {
                        format: "typescript/module-declarations",
                        destination: "variables.d.ts",
                    },
                ],
            },
        },
    };
};

const buildThemes: Promise<void> = (async () => {
    const brands: BRAND[] = ["brand-foo"];
    const platforms: PLATFORM[] = ["web", "js"];

    console.log("Build iniciado...");
    console.log("\n==============================================");

    brands.forEach((brand: BRAND) => {
        platforms.forEach((platform: PLATFORM) => {
            const sd = new StyleDictionary(
                createStyleDictionaryConfig(brand, platform),
            );
            sd.buildPlatform(platform);
        });
    });

    console.log("\n==============================================");
    console.log("\nBuild completo!");
})();

export default buildThemes;
