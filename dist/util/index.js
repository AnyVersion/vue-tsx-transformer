"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParameterDeclaration = void 0;
const typescript_1 = require("typescript");
function createParameterDeclaration(name) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, undefined, typescript_1.factory.createIdentifier(name), undefined, undefined, undefined);
}
exports.createParameterDeclaration = createParameterDeclaration;
