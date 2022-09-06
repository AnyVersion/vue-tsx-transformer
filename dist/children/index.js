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
function transformChild(children) {
    const result = children === null || children === void 0 ? void 0 : children.map(item => {
        if (typescript_1.default.isJsxText(item)) {
            const text = item.text.trim();
            if (text) {
                return typescript_1.factory.createStringLiteral(text.split(/\r\n|\n|\r/).map(line => line.trim()).filter(line => line).join('\n'));
            }
        }
        else if (typescript_1.default.isJsxExpression(item)) {
            return item.expression;
        }
        else {
            return item;
        }
    }).filter(item => item);
    if (result && result.length > 0) {
        return typescript_1.factory.createArrayLiteralExpression(result, true);
    }
    else {
        return typescript_1.factory.createIdentifier("undefined");
    }
}
exports.default = transformChild;
