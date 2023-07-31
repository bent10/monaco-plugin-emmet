# Monaco Plugin Emmet

Provides Emmet abbreviation expansion and completion support for Monaco Editor, for faster and more efficient HTML, CSS, and other code generation.

## Install

```bash
npm i monaco-plugin-emmet
```

Or

```bash
yarn add monaco-plugin-emmet
```

## Usage

```js
import { registerEmmet } from 'monaco-plugin-emmet'

// Register Emmet completion provider for 'html' language with predefined snippets
registerEmmet(monaco, ['html'], {
  html: { card: '.card>.card-body{${0}}' }
})

// Your Monaco Editor implementation here...
```

For a more comprehensive understanding of the Browser implementation, please refer to the file `index.html`, which contains the necessary code and configurations.

## API

### `registerEmmet(monaco, langs, snippetsGroup)`

Registers the Emmet completion provider for the specified languages and snippet groups.

- `monaco`: The Monaco Editor instance.
- `langs`: An array of language identifiers for which to register the completion provider.
- `snippetsGroup`: An optional object representing a group of snippets for different languages.

### `createSnippets(model, position, snippetsMap)`

Creates snippets for the specified model, position, and snippet map.

- `model`: The Monaco Editor text model.
- `position`: The position in the text model where snippets are created.
- `snippetsMap`: A map of snippets where the keys are the snippet names and the values are the snippet content.

```ts
// Register custom snippets for the 'html' language
import { createSnippets, SnippetsMap } from 'monaco-plugin-emmet'

const htmlSnippets: SnippetsMap = {
  card: '.card>.card-body{${1}}',
  'btn:primary': 'button[class="${1:btn btn-primary}"]{${2}}'
}

monaco.languages.registerCompletionItemProvider('html', {
  provideCompletionItems(model, position) {
    return {
      suggestions: createSnippets(model, position, htmlSnippets)
    }
  }
})
```

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/monaco-plugin-emmet)

A project by [Stilearning](https://stilearning.com) &copy; 2021-2023.
