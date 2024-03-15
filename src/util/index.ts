import ts, { factory } from "typescript"

export function createParameterDeclaration(name: string) {
  ts.versionMajorMinor
  if (typeof ts.getDecorators === "function") {
    // TS 4.8 and later
    return factory.createParameterDeclaration(
      undefined,
      undefined,
      factory.createIdentifier(name),
    )
  }
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    factory.createIdentifier(name)
  )
}

export function tryGetDecorators(node: ts.Node) {
  if (typeof ts.getDecorators === "function") {
    // TS 4.8 and later
    return ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined
  }

  // TS 4.7 and earlier
  return node.decorators
}

export function tryGetModifiers(node: ts.Node) {
  if (typeof ts.getModifiers === "function") {
    // TS 4.8 and later
    return ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  }

  // TS 4.7 and earlier
  // NOTE: Returns original array if every node was a `Modifier`, since the `update` methods on `NodeFactory`
  // use reference equality.
  return ts.visitNodes(node.modifiers, node => ts.isModifier(node) ? node : undefined, ts.isModifier) as readonly ts.Modifier[] | undefined
}


export function tryUpdateMethodDeclaration(node: ts.MethodDeclaration, params?: ts.ParameterDeclaration[], body?: ts.Block) {
  if (ts.versionMajorMinor >= "4.8") {
    return factory.createMethodDeclaration(
      tryGetModifiers(node),
      node.asteriskToken,
      node.name,
      node.questionToken,
      node.typeParameters,
      params || node.parameters,
      node.type,
      body || node.body
    )
  } else {
    return factory.createMethodDeclaration(
      tryGetDecorators(node),
      tryGetModifiers(node),
      node.asteriskToken,
      node.name,
      node.questionToken,
      node.typeParameters,
      params || node.parameters,
      node.type,
      body || node.body
    )
  }
}