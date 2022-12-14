import ts, { factory } from "typescript"

export function createVModelDirective(expression: ts.Expression) {
  return factory.createJsxAttribute(
    factory.createIdentifier('directives'),
    factory.createJsxExpression(
      undefined,
      factory.createArrayLiteralExpression([
        factory.createObjectLiteralExpression([
          factory.createPropertyAssignment(
            factory.createIdentifier('name'), factory.createStringLiteral('model')
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier('value'), expression
          ),
          factory.createPropertyAssignment(
            factory.createIdentifier('rawName'), factory.createStringLiteral('v-model')
          )
        ])
      ])
    )
  )
}