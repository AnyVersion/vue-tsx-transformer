"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVModelDirective = void 0;
const typescript_1 = require("typescript");
function createVModelDirective(expression) {
    return typescript_1.factory.createJsxAttribute(typescript_1.factory.createIdentifier('directives'), typescript_1.factory.createJsxExpression(undefined, typescript_1.factory.createArrayLiteralExpression([
        typescript_1.factory.createObjectLiteralExpression([
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier('name'), typescript_1.factory.createStringLiteral('model')),
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier('value'), expression),
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier('rawName'), typescript_1.factory.createStringLiteral('v-model'))
        ])
    ])));
}
exports.createVModelDirective = createVModelDirective;
