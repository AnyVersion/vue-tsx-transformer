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
const typescript_1 = __importStar(require("typescript"));
const util_1 = require("../util");
function injectH(node) {
    var _a;
    if (node.parameters.some(param => param.name.getText() === 'h')) {
        return node;
    }
    if (node.name.getText() === 'render' && node.parameters.length === 0) {
        return typescript_1.factory.updateMethodDeclaration(node, node.decorators, node.modifiers, node.asteriskToken, node.name, node.questionToken, node.typeParameters, [(0, util_1.createParameterDeclaration)('h')], node.type, node.body);
    }
    return typescript_1.factory.updateMethodDeclaration(node, node.decorators, node.modifiers, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, typescript_1.factory.createBlock([
        typescript_1.factory.createVariableStatement(undefined, typescript_1.factory.createVariableDeclarationList([typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier("h"), undefined, undefined, typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier("$createElement")))], typescript_1.default.NodeFlags.None))
    ].concat(((_a = node.body) === null || _a === void 0 ? void 0 : _a.statements) || [])));
}
exports.default = injectH;
