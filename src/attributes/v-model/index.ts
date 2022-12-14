import ts from "typescript"
import createComponentVModel from "./component"
import createInputVModel from "./input"
import createSelectVModel from "./select"

export default function transformVModel({ tag, expression, isComponent }: {
  tag: string
  expression: ts.Expression
  isComponent: boolean
}): ts.JsxAttribute[] {
  if (!isComponent) {
    if (tag === 'select') {
      return createSelectVModel(expression)
    } else {
      return createInputVModel(expression)
    }
  }
  return createComponentVModel(expression)
}