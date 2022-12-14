"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __importDefault(require("./component"));
const input_1 = __importDefault(require("./input"));
const select_1 = __importDefault(require("./select"));
function transformVModel({ tag, expression, isComponent }) {
    if (!isComponent) {
        if (tag === 'select') {
            return (0, select_1.default)(expression);
        }
        else {
            return (0, input_1.default)(expression);
        }
    }
    return (0, component_1.default)(expression);
}
exports.default = transformVModel;
