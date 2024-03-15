import ts from 'typescript'
import VueTsxTransformer from '../src'

test('jsxText', () => {

  const input = `
  const a = <DetailContext.Provider a={true} {...a} value={{ picker }}></DetailContext.Provider>
  class  {
    test(){
      return <>
      <div>123</div>
      <div>1234</div>
      {123123}
      </>
    }
    render() {
      return <div>
        <select directives={[{name:'test', value: "333"}, b]} v-model={a}></select>
        <input v-model={a}></input>
        <Component v-model={a}></Component>

        <div key="123" c="1233" b="b" props={a} propsProp={b} propsProps={c} onXx={() => {

        }}></div>
        <DetailContext.Provider value={{ picker }}></DetailContext.Provider>
      </div>
    }
  }
`

  const result = ts.transpileModule(input, {
    transformers: {
      before: [VueTsxTransformer()]
    },
    compilerOptions: {
      target: ts.ScriptTarget.ES2016
    },
    fileName: 'test.tsx'
  }).outputText


  const printer = ts.createPrinter({
    omitTrailingSemicolon: true
  })
  const sourceFile = ts.createSourceFile('test.tsx', input, ts.ScriptTarget.ES2016)
  const result2 = printer.printFile(sourceFile)
  console.log(result)


})