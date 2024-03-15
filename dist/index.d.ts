import ts from 'typescript';
type options = {
    injectH?: boolean;
};
declare const VueTsxTransformer: (options?: options) => ts.TransformerFactory<ts.SourceFile>;
export default VueTsxTransformer;
