import ts, { factory } from "typescript"
import { createParameterDeclaration } from "../../../util"
import { createVModelDirective } from "../util"

export default function createInputVModel(expression: ts.Expression) {
  /**
   * <input vModel={expression}>
   * directives={[{ name: 'model', value: expression }]}
   * domPropsValue={expression}
   * onInput={$$event => {
   *   if($event.target.composing) return;
   *   expression=$event.target.value
   * }}
   * 
   * todo type="radio"|type="checkbox"
   */
  return [
    createVModelDirective(expression),
    factory.createJsxAttribute(
      factory.createIdentifier('domPropsValue'),
      factory.createJsxExpression(undefined, expression)
    ),
    factory.createJsxAttribute(
      factory.createIdentifier('onInput'),
      factory.createJsxExpression(
        undefined,
        factory.createArrowFunction(
          undefined,
          undefined,
          [createParameterDeclaration('$$event')],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [
              factory.createIfStatement(
                factory.createPropertyAccessExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("$$event"),
                    factory.createIdentifier("target")
                  ),
                  factory.createIdentifier("composing")
                ),
                factory.createBlock([factory.createReturnStatement()], true)
              ),
              factory.createExpressionStatement(
                factory.createBinaryExpression(
                  expression,
                  factory.createToken(ts.SyntaxKind.EqualsToken),
                  factory.createPropertyAccessExpression(
                    factory.createPropertyAccessExpression(
                      factory.createIdentifier("$$event"),
                      factory.createIdentifier("target")
                    ),
                    factory.createIdentifier("value")
                  )
                )
              )
            ]
          )
        )
      )
    )
  ]
}