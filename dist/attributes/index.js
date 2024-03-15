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
const data_1 = __importDefault(require("./data"));
const v_model_1 = __importDefault(require("./v-model"));
const html_tags_1 = __importDefault(require("html-tags"));
const svg_tags_1 = __importDefault(require("svg-tags"));
const root = ['staticClass', 'class', 'style', 'key', 'ref', 'refInFor', 'slot', 'scopedSlots', 'model'];
const prefixes = ['domProps', 'on', 'nativeOn', 'hook'];
function transformAttributes(tag, attributes) {
    const isComponent = !html_tags_1.default.includes(tag) && !svg_tags_1.default.includes(tag);
    const data = new data_1.default;
    const attrs = attributes.properties.map(attr => attr);
    while (attrs.length > 0) {
        const node = attrs.shift();
        data.next();
        if (typescript_1.default.isJsxAttribute(node)) {
            const name = node.name.text;
            const expression = node.initializer && typescript_1.default.isJsxExpression(node.initializer) ? node.initializer.expression : (node.initializer || typescript_1.factory.createTrue());
            if (!expression) {
                throw new Error('Invalid attribute');
            }
            if (name === 'vModel' || name === 'v-model') {
                attrs.unshift(...(0, v_model_1.default)({
                    tag,
                    expression,
                    isComponent
                }));
            }
            else if (/^v(-|[A-Z])/.test(name)) {
                // <([^>]|\n)*?\sv(-|[A-Z])
                data.directive({
                    name: name.replace(/^v-?/, '').replace(/^[A-Z]/, (s) => s.toLowerCase()),
                    expression,
                });
            }
            else if (name === 'directives') {
                data.directive({
                    name: '',
                    expression
                });
            }
            else if (root.includes(name)) {
                data.root(name, expression);
            }
            else {
                const prefix = prefixes.find(prefix => name.startsWith(prefix));
                if (prefix) {
                    data.prop(prefix, {
                        name: name.replace(prefix, '').replace(/^-/, "").replace(/^[A-Z]/, (s) => s.toLowerCase()),
                        expression,
                    });
                }
                else {
                    data.prop('attrs', { name, expression });
                }
            }
        }
        else if (typescript_1.default.isJsxSpreadAttribute(node)) {
            //data.spread(node)
            data.prop('attrs', { name: '', expression: node.expression });
        }
    }
    return data.generate();
}
exports.default = transformAttributes;
