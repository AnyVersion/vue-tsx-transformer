import ts from "typescript";
export default class AttributesData {
    private spreads;
    private directives;
    private roots;
    private props;
    private index;
    next(): void;
    attr({ name, expression }: {
        name: string;
        expression: ts.Expression;
    }): void;
    private addProp;
    directive({ name, expression }: {
        name: string;
        expression: ts.Expression;
    }): void;
    spread(spread: ts.JsxSpreadAttribute): void;
    private mergeSpreads;
    generate(): ts.ObjectLiteralExpression | undefined;
    destroy(): void;
}
