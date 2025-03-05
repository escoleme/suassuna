/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import {nodeExternals} from "rollup-plugin-node-externals";
import {babel} from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
// eslint-disable-next-line import/extensions
import makeBabelConfig from "./babel.config.js";
import commonjs from '@rollup/plugin-commonjs';
import { execSync } from "child_process";


const {presets, plugins} = makeBabelConfig({env: () => false});

const createConfig = (pkgName) => {
    const packageJsonPath = path.join("packages", pkgName, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
        return null;
    }

    const extensions = [".js", ".jsx", ".ts", ".tsx"];

    // O package de design token utiliza o script build para executar o sd.config.ts
    if(pkgName === "suassuna-tokens") {
        execSync("pnpm run build", {
            cwd: path.join("packages", "suassuna-tokens"),
            stdio: "inherit",
        })
        return null
    }

    return {
        output: [
            {
                file: `packages/${pkgName}/dist/es/index.js`,
                format: "esm",
            },
        ],
        input: `packages/${pkgName}/src/index.ts`,
        external: [/core-js/],
        plugins: [
            babel({
                presets,
                plugins,
                exclude: "node_modules/**",
                babelHelpers: "runtime",
                comments: false,
                extensions,
            }),
            resolve({
                browser: true,
                extensions,
            }),
            nodeExternals({
                packagePath: `packages/${pkgName}/package.json`,
            }),
            commonjs(),
        ],
    };
};

export default fs.readdirSync("packages").map(createConfig).filter(Boolean);
