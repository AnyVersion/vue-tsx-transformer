import ts, { factory } from "typescript"

export default class AttributesData {
  private spreads: {
    expression: ts.Expression
    index: number
  }[] = []
  private directives: {
    name: string
    expression: ts.Expression
    index: number
  }[] = []
  private roots = new Map<string, {
    expression: ts.Expression
    index: number
  }>()
  private props = new Map<string, {
    name: string
    expression: ts.Expression
    index: number
  }[]>()
  private index = 0

  next() {
    this.index++
  }

  prop(prop: string, { name, expression }: {
    name: string
    expression: ts.Expression
  }) {
    if (!this.props.has(prop)) {
      this.props.set(prop, [])
    }
    this.props.get(prop)!.push({
      name,
      expression,
      index: this.index,
    })
  }

  root(name: string, expression: ts.Expression) {
    this.roots.set(name, {
      expression,
      index: this.index,
    })
  }

  directive({ name, expression }: {
    name: string
    expression: ts.Expression
  }) {
    this.directives.push({
      name,
      expression,
      index: this.index,
    })
  }

  spread(spread: ts.JsxSpreadAttribute) {
    this.spreads.push({
      expression: spread.expression,
      index: this.index,
    })
  }

  private mergeSpreads() {
    this.spreads.forEach(spread => {
      // merge spread&directives
      if (this.directives.length > 0) {
        this.directives.push({
          name: '',
          expression: factory.createBinaryExpression(
            factory.createPropertyAccessChain(
              spread.expression,
              factory.createToken(ts.SyntaxKind.QuestionDotToken),
              factory.createIdentifier("directives")
            ),
            factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
            factory.createArrayLiteralExpression([], false)
          ),
          index: spread.index,
        })
      }
      // merge spread&roots
      this.roots.forEach((root, name) => {
        if (root.index < spread.index) {
          this.roots.set(name, {
            expression: factory.createBinaryExpression(
              factory.createPropertyAccessChain(
                spread.expression,
                factory.createToken(ts.SyntaxKind.QuestionDotToken),
                factory.createIdentifier(name)
              ),
              factory.createToken(ts.SyntaxKind.QuestionQuestionToken),
              root.expression
            ),
            index: spread.index,
          })
        }
      })
      // merge spread&props
      this.props.forEach((props, name) => {
        props.push({
          name: '',
          expression: factory.createPropertyAccessChain(
            spread.expression,
            factory.createToken(ts.SyntaxKind.QuestionDotToken),
            factory.createIdentifier(name)
          ),
          index: spread.index,
        })
      })
    })
  }

  generate() {
    this.mergeSpreads()
    const objects: ts.ObjectLiteralElementLike[] = []

    this.spreads
      .sort((a, b) => a.index - b.index)
      .forEach(({ expression }) => {
        objects.push(factory.createSpreadAssignment(expression))
      })

    this.roots.forEach(({ expression }, name) => {
      objects.push(
        factory.createPropertyAssignment(name, expression)
      )
    })

    this.props.forEach((data, name) => {
      if (data.length === 1 && !data[0].name) {
        if (name === 'attrs') {
          // attrs will be modified
          objects.push(
            factory.createPropertyAssignment(
              factory.createStringLiteral(name),
              factory.createObjectLiteralExpression(
                [factory.createSpreadAssignment(data[0].expression)]
              )
            )
          )
        } else {
          objects.push(
            factory.createPropertyAssignment(
              factory.createStringLiteral(name),
              data[0].expression
            )
          )
        }
      } else {
        objects.push(
          factory.createPropertyAssignment(
            factory.createStringLiteral(name),
            factory.createObjectLiteralExpression(
              data.sort((a, b) => a.index - b.index).map(({ name, expression }) => {
                if (!name) {
                  return factory.createSpreadAssignment(expression)
                } else {
                  return factory.createPropertyAssignment(factory.createStringLiteral(name), expression)
                }
              }), true
            )
          )
        )
      }
    })

    if (this.directives.length > 0) {
      objects.push(
        factory.createPropertyAssignment(
          'directives',
          factory.createArrayLiteralExpression(
            this.directives
              .sort((a, b) => a.index - b.index)
              .reduce((total, { name, expression }) => {
                if (!name) {
                  if (ts.isArrayLiteralExpression(expression)) {
                    expression.elements.forEach(item => {
                      total.push(item)
                    })
                  } else {
                    total.push(
                      factory.createSpreadElement(expression)
                    )
                  }
                } else {
                  total.push(
                    factory.createObjectLiteralExpression([
                      factory.createPropertyAssignment('name', factory.createStringLiteral(name)),
                      factory.createPropertyAssignment('value', expression),
                    ])
                  )
                }
                return total
              }, [] as ts.Expression[]), true
          )
        )
      )
    }

    const result = objects.length > 0 ? factory.createObjectLiteralExpression(objects, true) : undefined

    this.destroy()
    return result
  }
  destroy() {
    this.spreads = []
    this.directives = []
    this.roots.clear()
    this.props.clear()
  }
}