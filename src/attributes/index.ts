import ts, { factory } from "typescript"
import AttributesData from "./data"
import transformVModel from "./v-model"
import HtmlTags, { htmlTags } from 'html-tags'
import SvgTags from 'svg-tags'

const root = ['staticClass', 'class', 'style', 'key', 'ref', 'refInFor', 'slot', 'scopedSlots', 'model']
const prefixes = ['domProps', 'on', 'nativeOn', 'hook']

export default function transformAttributes(tag: string, attributes: ts.JsxAttributes): ts.ObjectLiteralExpression | undefined {
  const isComponent = !HtmlTags.includes(tag as htmlTags) && !SvgTags.includes(tag)
  const data = new AttributesData
  const attrs = attributes.properties.map(attr => attr)
  while (attrs.length > 0) {
    const node = attrs.shift()!
    data.next()
    if (ts.isJsxAttribute(node)) {
      const name = node.name.text
      const expression = node.initializer && ts.isJsxExpression(node.initializer) ? node.initializer.expression : (node.initializer || factory.createTrue())
      if (!expression) {
        throw new Error('Invalid attribute')
      }
      if (name === 'vModel' || name === 'v-model') {
        attrs.unshift(...transformVModel({
          tag,
          expression,
          isComponent
        }))
      } else if (/^v(-|[A-Z])/.test(name)) {
        // <([^>]|\n)*?\sv(-|[A-Z])
        data.directive({
          name: name.replace(/^v-?/, '').replace(/^[A-Z]/, (s) => s.toLowerCase()),
          expression,
        })
      } else if (name === 'directives') {
        data.directive({
          name: '',
          expression
        })
      } else if (root.includes(name)) {
        data.root(name, expression)
      } else {
        const prefix = prefixes.find(prefix => name.startsWith(prefix))
        if (prefix) {
          data.prop(prefix, {
            name: name.replace(prefix, '').replace(/^-/, "").replace(/^[A-Z]/, (s) => s.toLowerCase()),
            expression,
          })
        } else {
          data.prop('attrs', { name, expression })
        }
      }
    } else if (ts.isJsxSpreadAttribute(node)) {
      //data.spread(node)
      data.prop('attrs', { name: '', expression: node.expression })
    }
  }
  return data.generate()
}