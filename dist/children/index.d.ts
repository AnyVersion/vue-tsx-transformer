import ts from "typescript";
declare function transformChild(children: ts.Node[]): ts.ArrayLiteralExpression | undefined;
declare function transformChild(children: ts.Node[], keepEmpty: true): ts.ArrayLiteralExpression;
export default transformChild;
