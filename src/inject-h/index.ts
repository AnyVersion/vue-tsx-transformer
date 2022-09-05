import ts, { factory } from 'typescript'

export default function injectH(node: ts.MethodDeclaration) {
  if (node.parameters.some(param => param.name.getText() === 'h')) {
    return node
  }
  return factory.updateMethodDeclaration(
    node,
    node.decorators,
    node.modifiers,
    node.asteriskToken,
    node.name,
    node.questionToken,
    node.typeParameters,
    node.parameters,
    node.type,
    factory.createBlock(
      ([
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("h"),
              undefined,
              undefined,
              factory.createCallExpression(
                factory.createPropertyAccessExpression(
                  factory.createThis(),
                  factory.createIdentifier("$createElement")
                ),
                undefined,
                []
              )
            )],
            ts.NodeFlags.None
          )
        )
      ] as ts.Statement[]).concat(node.body?.statements || []),
    ),
  )
}
