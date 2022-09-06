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
        <TerminalComponent service={this.service} props={a} attrsTest={1} test={{
          default: () => <div>&nbsp;abc©</div>
        }} />
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
  console.log(result)
})