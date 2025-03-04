#!/usr/bin/env -S node -r @swc-node/register
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check type definition files for anything that doesn't look right.
 *
 * If our packages don't export all the types that other packages reference,
 * even indirectly, then their type definitions will import them from the source
 * files instead. Since we don't want to ship source code in every package,
 * we want to guard against this.
 *
 * This script should be run after `pnpm build:types`. It will scan the type
 * definitions of each package for any types that are being incorrectly
 * imported from other the source code of other packages, and flag them,
 * exiting with a non-zero status code if any are found.
 */
var fs = require("fs");
var path = require("path");
var fglob = require("fast-glob");
var rootDir = path.join(__dirname, "..");
var packagesDir = path.join(rootDir, "packages");
// Find all the type definition files in the packages dist directories.
var typeDefinitionFiles = fglob.sync("**/*.d.ts", {
    cwd: packagesDir,
    onlyFiles: true,
});
var foundErrors = false;
// Scan each one for any imports of types from source.
for (var _i = 0, typeDefinitionFiles_1 = typeDefinitionFiles; _i < typeDefinitionFiles_1.length; _i++) {
    var typeDefinitionFile = typeDefinitionFiles_1[_i];
    var regexpImportSrc = /import\(".+\/(wonder-blocks-.+)\/src\/.+"\)\.([a-zA-Z]+)/g;
    var content = fs.readFileSync(path.join(packagesDir, typeDefinitionFile), "utf-8");
    var lines = content.split("\n");
    var match = void 0;
    for (var line = 0; line < lines.length; line++) {
        while ((match = regexpImportSrc.exec(lines[line]))) {
            foundErrors = true;
            var position = match.index;
            var lineNo = line + 1;
            var refPath = path.join("packages", typeDefinitionFile);
            console.error("".concat(refPath, ":").concat(lineNo, ":").concat(position));
            console.error("    Incorrectly imported type ".concat(match[2], " from ").concat(match[1], " source"));
            console.error("    Update the package ".concat(match[1], " to export the type ").concat(match[2], "\n"));
        }
    }
}
if (foundErrors) {
    process.exit(1);
}
