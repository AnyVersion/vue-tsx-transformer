import ts, { factory } from "typescript"
import { createParameterDeclaration } from "../../../util"

export default function createComponentVModel(expression: ts.Expression) {
  /*
    vModel={expression}
    ->
    model={{
      value: expression,
      callback: ($$v) => expression = $$v
    }}
  */
  return [factory.createJsxAttribute(
    factory.createIdentifier('model'),
    factory.createJsxExpression(
      undefined,
      factory.createObjectLiteralExpression([
        factory.createPropertyAssignment("value", expression),
        factory.createPropertyAssignment("callback", factory.createArrowFunction(
          undefined,
          undefined,
          [createParameterDeclaration('$$v')],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [factory.createExpressionStatement(factory.createBinaryExpression(
              expression,
              factory.createToken(ts.SyntaxKind.EqualsToken),
              factory.createIdentifier("$$v")
            ))],
            true
          )
        )),
      ], undefined),
    )
  )]
}