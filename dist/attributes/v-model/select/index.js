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
function createSelectVModel(expression) {
    /**
     * <select vModel={expression}>
     * directives={[{ name: 'model', value: expression, rawName: 'v-model' }]}
     * onChange={$$event => {
     *  const $$selectedVal = $$event.target.options.filter(o => o.selected).map(o => "_value" in o ? o._value : o.value)
     *  expression = $$event.target.multiple ? $$selectedVal : $$selectedVal[0]
     * }}
     */
    return [
        (0, util_2.createVModelDirective)(expression),
        typescript_1.factory.createJsxAttribute(typescript_1.factory.createIdentifier('onChange'), typescript_1.factory.createJsxExpression(undefined, typescript_1.factory.createArrowFunction(undefined, undefined, [(0, util_1.createParameterDeclaration)("$$event")], undefined, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.factory.createBlock([
            typescript_1.factory.createVariableStatement(undefined, typescript_1.factory.createVariableDeclarationList([typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier("$$selectedVal"), undefined, undefined, typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("$$event"), typescript_1.factory.createIdentifier("target")), typescript_1.factory.createIdentifier("options")), typescript_1.factory.createIdentifier("filter")), undefined, [typescript_1.factory.createArrowFunction(undefined, undefined, [(0, util_1.createParameterDeclaration)("o")], undefined, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("o"), typescript_1.factory.createIdentifier("selected")))]), typescript_1.factory.createIdentifier("map")), undefined, [typescript_1.factory.createArrowFunction(undefined, undefined, [(0, util_1.createParameterDeclaration)("o")], undefined, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsGreaterThanToken), typescript_1.factory.createConditionalExpression(typescript_1.factory.createBinaryExpression(typescript_1.factory.createStringLiteral("_value"), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.InKeyword), typescript_1.factory.createIdentifier("o")), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionToken), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("o"), typescript_1.factory.createIdentifier("_value")), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.ColonToken), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("o"), typescript_1.factory.createIdentifier("value"))))]))], typescript_1.default.NodeFlags.Const)),
            typescript_1.factory.createExpressionStatement(typescript_1.factory.createBinaryExpression(typescript_1.factory.createIdentifier("expression"), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.factory.createConditionalExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("$$event"), typescript_1.factory.createIdentifier("target")), typescript_1.factory.createIdentifier("multiple")), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionToken), typescript_1.factory.createIdentifier("$$selectedVal"), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.ColonToken), typescript_1.factory.createElementAccessExpression(typescript_1.factory.createIdentifier("$$selectedVal"), typescript_1.factory.createNumericLiteral("0")))))
        ], true))))
    ];
}
exports.default = createSelectVModel;
