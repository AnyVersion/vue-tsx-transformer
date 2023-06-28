# Vue2 Tsx Transformer

## Installation

```
$ npm install vue-tsx-transformer --save-dev
```

or

```
$ npm install git+https://github.com/gityoog/vue-tsx-transformer --save-dev
```

## Usage

```ts
import VueTsxTransformer from "vue-tsx-transformer";

export default {
  // ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  VueTsxTransformer({
                    // options
                  }),
                ],
              }),
            },
          },
        ],
      },
    ],
  },
};
```

## Changelog
- 2023-06-28 add JsxFragment transform
- 2022-12-14 fix select v-model, optimize directives merge
- 2022-09-19 fix native component v-model

## Syntax

### Content

- Automatic `h` injection syntactic sugar
- `vModel` syntactic sugar

```tsx
render() {
  return <p>hello</p>
}
```

with dynamic content:

```tsx
render() {
  return <p>hello { this.message }</p>
}
```

when self-closing:

```tsx
render() {
  return <input />
}
```

with a component:

```tsx
import MyComponent from "./my-component";

export default {
  render() {
    return <MyComponent>hello</MyComponent>;
  },
};
```

### Attributes/Props

```tsx
render() {
  return <input type="email" />
}
```

with a dynamic binding:

```tsx
render() {
  return <input
    type="email"
    placeholder={this.placeholderText}
  />
}
```

with the spread operator (object needs to be compatible with [Vue Data Object](https://v2.vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth)):

```tsx
render() {
  const inputAttrs = {
    type: 'email',
    placeholder: 'Enter your email'
  }

  return <input {...{ attrs: inputAttrs }} />
}
```

### Slots

named slots:

```tsx
render() {
  return (
    <MyComponent>
      <header slot="header">header</header>
      <footer slot="footer">footer</footer>
    </MyComponent>
  )
}
```

scoped slots:

```tsx
render() {
  const scopedSlots = {
    header: () => <header>header</header>,
    footer: () => <footer>footer</footer>
  }

  return <MyComponent scopedSlots={scopedSlots} />
}
```

### Directives

```tsx
<input vModel={this.newTodoText} />
```

with a modifier: Not Supported, Follow the type validation of TSX

v-html:

```tsx
<p domPropsInnerHTML={html} />
```
