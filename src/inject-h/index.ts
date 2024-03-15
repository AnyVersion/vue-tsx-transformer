import ts, { factory } from 'typescript'
import { createParameterDeclaration, tryUpdateMethodDeclaration } from '../util'

export default function injectH(node: ts.MethodDeclaration) {
  if (node.parameters.some(param => param.name.getText() === 'h')) {
    return node
  }
  if (node.name.getText() === 'render' && node.parameters.length === 0) {
    return tryUpdateMethodDeclaration(
      node,
      [createParameterDeclaration('h')]
    )
  }
  return tryUpdateMethodDeclaration(node, undefined,
    factory.createBlock(
      ([
        factory.createVariableStatement(
          undefined,
          factory.createVariableDeclarationList(
            [factory.createVariableDeclaration(
              factory.createIdentifier("h"),
              undefined,
              undefined,
              factory.createPropertyAccessExpression(
                factory.createThis(),
                factory.createIdentifier("$createElement")
              )
            )],
            ts.NodeFlags.None
          )
        )
      ] as ts.Statement[]).concat(node.body?.statements || []),
    ),
  )
}
