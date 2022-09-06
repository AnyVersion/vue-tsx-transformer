import ts, { factory } from "typescript"
import entities from "./html-entities"
export default function transformChild(children?: ts.Node[]) {
  const result = children?.map(item => {
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
  }).filter(item => item) as ts.Expression[] | undefined
  if (result && result.length > 0) {
    return factory.createArrayLiteralExpression(result, true)
  }
}