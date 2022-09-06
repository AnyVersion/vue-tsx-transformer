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
const root = ['staticClass', 'class', 'style', 'key', 'ref', 'refInFor', 'slot', 'scopedSlots', 'model'];
const prefixes = ['props', 'domProps', 'on', 'nativeOn', 'hook', 'attrs'];
class AttributesData {
    constructor() {
        this.spreads = [];
        this.directives = [];
        this.roots = new Map();
        this.props = new Map();
        this.index = 0;
    }
    next() {
        this.index++;
    }
    attr({ name, expression }) {
        if (name === 'directives') {
            this.directives.push({
                name: '',
                expression,
                index: this.index,
            });
        }
        else if (root.includes(name)) {
            this.roots.set(name, {
                expression,
                index: this.index,
            });
        }
        else {
            const prefix = prefixes.find(prefix => name.startsWith(prefix));
            if (prefix) {
                this.addProp(prefix, {
                    name: name.replace(prefix, '').replace(/^-/, "").replace(/^[A-Z]/, (s) => s.toLowerCase()),
                    expression,
                });
            }
            else {
                this.addProp('attrs', { name, expression });
            }
        }
    }
    addProp(prop, { name, expression }) {
        if (!this.props.has(prop)) {
            this.props.set(prop, []);
        }
        this.props.get(prop).push({
            name,
            expression,
            index: this.index,
        });
    }
    directive({ name, expression }) {
        this.directives.push({
            name,
            expression,
            index: this.index,
        });
    }
    spread(spread) {
        this.spreads.push({
            expression: spread.expression,
            index: this.index,
        });
    }
    mergeSpreads() {
        this.spreads.forEach(spread => {
            // merge spread&directives
            if (this.directives.length > 0) {
                this.directives.push({
                    name: '',
                    expression: typescript_1.factory.createBinaryExpression(typescript_1.factory.createPropertyAccessChain(spread.expression, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.factory.createIdentifier("directives")), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionToken), typescript_1.factory.createArrayLiteralExpression([], false)),
                    index: spread.index,
                });
            }
            // merge spread&roots
            this.roots.forEach((root, name) => {
                if (root.index < spread.index) {
                    this.roots.set(name, {
                        expression: typescript_1.factory.createBinaryExpression(typescript_1.factory.createPropertyAccessChain(spread.expression, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.factory.createIdentifier(name)), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionQuestionToken), root.expression),
                        index: spread.index,
                    });
                }
            });
            // merge spread&props
            this.props.forEach((props, name) => {
                props.push({
                    name: '',
                    expression: typescript_1.factory.createPropertyAccessChain(spread.expression, typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.factory.createIdentifier(name)),
                    index: spread.index,
                });
            });
        });
    }
    generate() {
        this.mergeSpreads();
        const objects = [];
        this.spreads
            .sort((a, b) => a.index - b.index)
            .forEach(({ expression }) => {
            objects.push(typescript_1.factory.createSpreadAssignment(expression));
        });
        this.roots.forEach(({ expression }, name) => {
            objects.push(typescript_1.factory.createPropertyAssignment(name, expression));
        });
        this.props.forEach((data, name) => {
            if (data.length === 1 && !data[0].name) {
                objects.push(typescript_1.factory.createPropertyAssignment(typescript_1.factory.createStringLiteral(name), data[0].expression));
            }
            else {
                objects.push(typescript_1.factory.createPropertyAssignment(typescript_1.factory.createStringLiteral(name), typescript_1.factory.createObjectLiteralExpression(data.sort((a, b) => a.index - b.index).map(({ name, expression }) => {
                    if (!name) {
                        return typescript_1.factory.createSpreadAssignment(expression);
                    }
                    else {
                        return typescript_1.factory.createPropertyAssignment(typescript_1.factory.createStringLiteral(name), expression);
                    }
                }), true)));
            }
        });
        if (this.directives.length > 0) {
            objects.push(typescript_1.factory.createPropertyAssignment('directives', typescript_1.factory.createArrayLiteralExpression(this.directives
                .sort((a, b) => a.index - b.index)
                .map(({ name, expression }) => {
                if (!name) {
                    return typescript_1.factory.createSpreadElement(expression);
                }
                else {
                    return typescript_1.factory.createObjectLiteralExpression([
                        typescript_1.factory.createPropertyAssignment('name', typescript_1.factory.createStringLiteral(name)),
                        typescript_1.factory.createPropertyAssignment('value', expression),
                    ]);
                }
            }), true)));
        }
        this.destroy();
        if (objects.length > 0) {
            return typescript_1.factory.createObjectLiteralExpression(objects, true);
        }
    }
    destroy() {
        this.spreads = [];
        this.directives = [];
        this.roots.clear();
        this.props.clear();
    }
}
exports.default = AttributesData;
