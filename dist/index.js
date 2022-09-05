"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const element_1 = __importDefault(require("./element"));
const inject_h_1 = __importDefault(require("./inject-h"));
const VueTsxTransformer = (options = {}) => context => sourceFile => {
    if (sourceFile.languageVariant !== typescript_1.default.LanguageVariant.JSX || sourceFile.isDeclarationFile) {
        return sourceFile;
    }
    return typescript_1.default.visitEachChild(sourceFile, node => {
        return traverse(node, context, { options });
    }, context);
};
function traverse(node, context, state) {
    if (!state.inRender && typescript_1.default.isMethodDeclaration(node)) {
        state.hasJsx = false;
        state.inRender = true;
        const method = traverse(node, context, state);
        state.inRender = false;
        if (state.hasJsx && state.options.injectH !== false) {
            return (0, inject_h_1.default)(method);
        }
    }
    if (typescript_1.default.isJsxElement(node) || typescript_1.default.isJsxSelfClosingElement(node)) {
        state.hasJsx = true;
        return (0, element_1.default)(node, node => traverse(node, context, state));
    }
    return typescript_1.default.visitEachChild(node, node => traverse(node, context, state), context);
}
exports.default = VueTsxTransformer;
