import ts, { factory } from "typescript"
import { createParameterDeclaration } from "../../../util"
import { createVModelDirective } from "../util"

export default function createSelectVModel(expression: ts.Expression) {
  /**
   * <select vModel={expression}>
   * directives={[{ name: 'model', value: expression, rawName: 'v-model' }]}
   * onChange={$$event => {
   *  const $$selectedVal = $$event.target.options.filter(o => o.selected).map(o => "_value" in o ? o._value : o.value)
   *  expression = $$event.target.multiple ? $$selectedVal : $$selectedVal[0]
   * }}
   */
  return [
    createVModelDirective(expression),
    factory.createJsxAttribute(
      factory.createIdentifier('onChange'),
      factory.createJsxExpression(undefined, factory.createArrowFunction(
        undefined,
        undefined,
        [createParameterDeclaration("$$event")],
        undefined,
        factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
        factory.createBlock(
          [
            factory.createVariableStatement(
              undefined,
              factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                  factory.createIdentifier("$$selectedVal"),
                  undefined,
                  undefined,
                  factory.createCallExpression(
                    factory.createPropertyAccessExpression(
                      factory.createCallExpression(
                        factory.createPropertyAccessExpression(
                          factory.createPropertyAccessExpression(
                            factory.createPropertyAccessExpression(
                              factory.createIdentifier("$$event"),
                              factory.createIdentifier("target")
                            ),
                            factory.createIdentifier("options")
                          ),
                          factory.createIdentifier("filter")
                        ),
                        undefined,
                        [factory.createArrowFunction(
                          undefined,
                          undefined,
                          [createParameterDeclaration("o")],
                          undefined,
                          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                          factory.createPropertyAccessExpression(
                            factory.createIdentifier("o"),
                            factory.createIdentifier("selected")
                          )
                        )]
                      ),
                      factory.createIdentifier("map")
                    ),
                    undefined,
                    [factory.createArrowFunction(
                      undefined,
                      undefined,
                      [createParameterDeclaration("o")],
                      undefined,
                      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                      factory.createConditionalExpression(
                        factory.createBinaryExpression(
                          factory.createStringLiteral("_value"),
                          factory.createToken(ts.SyntaxKind.InKeyword),
                          factory.createIdentifier("o")
                        ),
                        factory.createToken(ts.SyntaxKind.QuestionToken),
                        factory.createPropertyAccessExpression(
                          factory.createIdentifier("o"),
                          factory.createIdentifier("_value")
                        ),
                        factory.createToken(ts.SyntaxKind.ColonToken),
                        factory.createPropertyAccessExpression(
                          factory.createIdentifier("o"),
                          factory.createIdentifier("value")
                        )
                      )
                    )]
                  )
                )],
                ts.NodeFlags.Const
              )
            ),
            factory.createExpressionStatement(factory.createBinaryExpression(
              factory.createIdentifier("expression"),
              factory.createToken(ts.SyntaxKind.EqualsToken),
              factory.createConditionalExpression(
                factory.createPropertyAccessExpression(
                  factory.createPropertyAccessExpression(
                    factory.createIdentifier("$$event"),
                    factory.createIdentifier("target")
                  ),
                  factory.createIdentifier("multiple")
                ),
                factory.createToken(ts.SyntaxKind.QuestionToken),
                factory.createIdentifier("$$selectedVal"),
                factory.createToken(ts.SyntaxKind.ColonToken),
                factory.createElementAccessExpression(
                  factory.createIdentifier("$$selectedVal"),
                  factory.createNumericLiteral("0")
                )
              )
            ))
          ],
          true
        )
      ))
    )
  ]
}