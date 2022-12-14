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
const util_1 = require("../../../util");
function createComponentVModel(expression) {
    /*
      vModel={expression}
      ->
      model={{
        value: expression,
        callback: ($$v) => expression = $$v
      }}
    */
    return [typescript_1.factory.createJsxAttribute(typescript_1.factory.createIdentifier('model'), typescript_1.factory.createJsxExpression(undefined, typescript_1.factory.createObjectLiteralExpression([
            typescript_1.factory.createPropertyAssignment("value", expression),
            typescript_1.factory.createPropertyAssignment("callback", typescript_1.factory.createArrowFunction(undefined, undefined, [(0, util_1.createParameterDeclaration)('$$v')], undefined, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.factory.createBlock([typescript_1.factory.createExpressionStatement(typescript_1.factory.createBinaryExpression(expression, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.factory.createIdentifier("$$v")))], true))),
        ], undefined)))];
}
exports.default = createComponentVModel;
