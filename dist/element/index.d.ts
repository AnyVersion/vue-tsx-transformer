import ts from "typescript";
export default function transformElement(node: ts.JsxElement | ts.JsxSelfClosingElement, traverse: (node: ts.Node) => ts.Node): ts.CallExpression;
