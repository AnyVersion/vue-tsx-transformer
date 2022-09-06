import ts, { factory } from 'typescript'
import { createParameterDeclaration } from '../util'

export default function injectH(node: ts.MethodDeclaration) {
  if (node.parameters.some(param => param.name.getText() === 'h')) {
    return node
  }
  if (node.name.getText() === 'render' && node.parameters.length === 0) {
    return factory.updateMethodDeclaration(
      node,
      node.decorators,
      node.modifiers,
      node.asteriskToken,
      node.name,
      node.questionToken,
      node.typeParameters,
      [createParameterDeclaration('h')],
      node.type,
      node.body
    )
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
