import ts from "typescript";
export default function transformVModel({ tag, expression, isComponent }: {
    tag: string;
    expression: ts.Expression;
    isComponent: boolean;
}): ts.JsxAttribute[];
