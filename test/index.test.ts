import ts from 'typescript'
import VueTsxTransformer from '../src'

test('jsxText', () => {
  const input = `
  class  {
    test(){
      return <div></div>
    }
    render() {
      return <div>
        <select directives={[{name:'test', value: "333"}, b]} v-model={a}></select>
        <input v-model={a}></input>
        <Component v-model={a}></Component>

        <div key="123" c="1233" b="b" props={a} propsProp={b} propsProps={c} onXx={() => {

        }}></div>
      </div>
    }
  }
`
  const result = ts.transpileModule(input, {
    transformers: {
      before: [VueTsxTransformer()]
    },
    compilerOptions: {
      target: ts.ScriptTarget.ES2017
    },
    fileName: 'test.tsx'
  }).outputText
  console.log(result)
})