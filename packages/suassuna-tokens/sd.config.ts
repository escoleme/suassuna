import StyleDictionary from "style-dictionary";
import { formats, transforms, transformGroups, transformTypes } from 'style-dictionary/enums';


const PREFIX = "me";
type BRAND = "brand-foo";
type PLATFORM = "web" | "js"| "json";

const { cssVariables, scssVariables, javascriptEs6, json } = formats;
const { css, js, web } = transformGroups;
const { attributeCti, colorHex, colorRgb } = transforms;
const { value: transformTypeValue, name } = transformTypes;
const buildPath = 'dist/';

const createStyleDictionaryConfig = (brand: BRAND, platform: PLATFORM) => {
    StyleDictionary.registerFormat({
        name: 'myCustomFormat',
        format: function ({ dictionary, platform, options, file }) {

            return dictionary.tokens;
        },
    });

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
                buildPath: `dist/js/${brand}/`,
                files: [
                    {
                        "destination": "variables.js",
                        "format": "myCustomFormat",
                        "options": {
                            "showFileHeader": false
                        }
                    }
                ],
            },

            // You can still use built-in transformGroups and formats like before
            json: {
                transformGroup: "js",
                buildPath: `dist/json/${brand}/`,
                files: [
                    {
                        destination: 'variables.json',
                        format: json,
                    },
                ],
            },
        },
    };
};

const buildThemes: Promise<void> = (async () => {
    const brands: BRAND[] = ["brand-foo"];
    const platforms: PLATFORM[] = ["web", "js", "json"];

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

    StyleDictionary.registerFormat({
        name: 'myRegisteredFormat',
        format: ({ dictionary }) => {
            return dictionary.allTokens.map((token) => token.value).join('\n');
        },
    });

    console.log("\n==============================================");
    console.log("\nBuild completo!");
})();

export default buildThemes;