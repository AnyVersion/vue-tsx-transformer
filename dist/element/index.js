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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importStar(require("typescript"));
const attributes_1 = __importDefault(require("../attributes"));
const children_1 = __importDefault(require("../children"));
function transformElement(node, traverse) {
    const [tag, attrs, children] = splitJsx(node);
    const args = [createTag(tag)];
    const attributes = (0, attributes_1.default)(tag.getText(), traverse(attrs));
    if (attributes) {
        args.push(attributes);
    }
    if (children) {
        args.push((0, children_1.default)(children.map(item => traverse(item))));
    }
    return typescript_1.factory.createCallExpression(typescript_1.factory.createIdentifier('h'), [], args);
}
exports.default = transformElement;
function splitJsx(node) {
    if (typescript_1.default.isJsxElement(node)) {
        return [
            node.openingElement.tagName,
            node.openingElement.attributes,
            node.children
        ];
    }
    else {
        return [
            node.tagName,
            node.attributes
        ];
    }
}
function createTag(tag) {
    if (typescript_1.default.isIdentifier(tag)) {
        if (!/[A-Z]+/.test(tag.text)) {
            return typescript_1.factory.createStringLiteral(tag.text);
        }
    }
    return tag;
}
