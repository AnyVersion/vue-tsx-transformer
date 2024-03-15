"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryUpdateMethodDeclaration = exports.tryGetModifiers = exports.tryGetDecorators = exports.createParameterDeclaration = void 0;
const typescript_1 = __importStar(require("typescript"));
function createParameterDeclaration(name) {
    typescript_1.default.versionMajorMinor;
    if (typeof typescript_1.default.getDecorators === "function") {
        // TS 4.8 and later
        return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(name));
    }
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, undefined, typescript_1.factory.createIdentifier(name));
}
exports.createParameterDeclaration = createParameterDeclaration;
function tryGetDecorators(node) {
    if (typeof typescript_1.default.getDecorators === "function") {
        // TS 4.8 and later
        return typescript_1.default.canHaveDecorators(node) ? typescript_1.default.getDecorators(node) : undefined;
    }
    // TS 4.7 and earlier
    return node.decorators;
}
exports.tryGetDecorators = tryGetDecorators;
function tryGetModifiers(node) {
    if (typeof typescript_1.default.getModifiers === "function") {
        // TS 4.8 and later
        return typescript_1.default.canHaveModifiers(node) ? typescript_1.default.getModifiers(node) : undefined;
    }
    // TS 4.7 and earlier
    // NOTE: Returns original array if every node was a `Modifier`, since the `update` methods on `NodeFactory`
    // use reference equality.
    return typescript_1.default.visitNodes(node.modifiers, node => typescript_1.default.isModifier(node) ? node : undefined, typescript_1.default.isModifier);
}
exports.tryGetModifiers = tryGetModifiers;
function tryUpdateMethodDeclaration(node, params, body) {
    if (typescript_1.default.versionMajorMinor >= "4.8") {
        return typescript_1.factory.createMethodDeclaration(tryGetModifiers(node), node.asteriskToken, node.name, node.questionToken, node.typeParameters, params || node.parameters, node.type, body || node.body);
    }
    else {
        return typescript_1.factory.createMethodDeclaration(tryGetDecorators(node), tryGetModifiers(node), node.asteriskToken, node.name, node.questionToken, node.typeParameters, params || node.parameters, node.type, body || node.body);
    }
}
exports.tryUpdateMethodDeclaration = tryUpdateMethodDeclaration;
