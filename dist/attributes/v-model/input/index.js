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
const util_2 = require("../util");
function createInputVModel(expression) {
    /**
     * <input vModel={expression}>
     * directives={[{ name: 'model', value: expression }]}
     * domPropsValue={expression}
     * onInput={$$event => {
     *   if($event.target.composing) return;
     *   expression=$event.target.value
     * }}
     *
     * todo type="radio"|type="checkbox"
     */
    return [
        (0, util_2.createVModelDirective)(expression),
        typescript_1.factory.createJsxAttribute(typescript_1.factory.createIdentifier('domPropsValue'), typescript_1.factory.createJsxExpression(undefined, expression)),
        typescript_1.factory.createJsxAttribute(typescript_1.factory.createIdentifier('onInput'), typescript_1.factory.createJsxExpression(undefined, typescript_1.factory.createArrowFunction(undefined, undefined, [(0, util_1.createParameterDeclaration)('$$event')], undefined, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.factory.createBlock([
            typescript_1.factory.createIfStatement(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("$$event"), typescript_1.factory.createIdentifier("target")), typescript_1.factory.createIdentifier("composing")), typescript_1.factory.createBlock([typescript_1.factory.createReturnStatement()], true)),
            typescript_1.factory.createExpressionStatement(typescript_1.factory.createBinaryExpression(expression, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("$$event"), typescript_1.factory.createIdentifier("target")), typescript_1.factory.createIdentifier("value"))))
        ]))))
    ];
}
exports.default = createInputVModel;
