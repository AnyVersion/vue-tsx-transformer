import ts, { factory } from "typescript"
import entities from "./html-entities"

function transformChild(children: ts.Node[]): ts.ArrayLiteralExpression | undefined
function transformChild(children: ts.Node[], keepEmpty: true): ts.ArrayLiteralExpression
function transformChild(children: ts.Node[], keepEmpty: boolean = false) {
  const result = children.map(item => {
    if (ts.isJsxText(item)) {
      const text = item.text.trim()
      if (text) {
        return factory.createStringLiteral(
          text.split(/\r\n|\n|\r/).map(line => line.trim()).filter(line => line).join('\n').replace(/&([a-zA-Z]*?);/g, (str, $1) => {
            return entities[$1] || str
          })
        )
      }
    } else if (ts.isJsxExpression(item)) {
      return item.expression
    } else {
      return item
    }
  }).filter(item => item) as ts.Expression[]
  if (keepEmpty || (result && result.length > 0)) {
    return factory.createArrayLiteralExpression(result, true)
  }
}

export default transformChild