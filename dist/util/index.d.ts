import ts from "typescript";
export declare function createParameterDeclaration(name: string): ts.ParameterDeclaration;
export declare function tryGetDecorators(node: ts.Node): readonly ts.Decorator[] | undefined;
export declare function tryGetModifiers(node: ts.Node): readonly ts.Modifier[] | undefined;
export declare function tryUpdateMethodDeclaration(node: ts.MethodDeclaration, params?: ts.ParameterDeclaration[], body?: ts.Block): ts.MethodDeclaration;
