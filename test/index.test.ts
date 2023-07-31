import { registerEmmet, createSnippets } from '../src/index.js'
import { autoComplete } from '../src/utils.js'

type Api = Parameters<typeof registerEmmet>[0]
type Model = Parameters<typeof createSnippets>[0]
type Position = Parameters<typeof createSnippets>[1]

const mockMonaco = {
  languages: {
    registerCompletionItemProvider: vi.fn()
  }
} as unknown as Api

it('registers completion provider for each language', () => {
  registerEmmet(mockMonaco, ['html', 'css'], {
    html: {
      card: '.card>.card-body{${0}}'
    },
    css: {
      flex: 'display: flex;'
    }
  })

  expect(
    mockMonaco.languages.registerCompletionItemProvider
  ).toHaveBeenCalledTimes(2)

  expect(
    mockMonaco.languages.registerCompletionItemProvider
  ).toHaveBeenCalledWith('html', expect.any(Object))
  expect(
    mockMonaco.languages.registerCompletionItemProvider
  ).toHaveBeenCalledWith('css', expect.any(Object))
})

it('creates snippets for a given model, position, and snippets map', () => {
  const model = {
    getLanguageId: () => 'html',
    getWordUntilPosition: () => ({ startColumn: 1, endColumn: 4 })
  } as unknown as Model
  const position = { lineNumber: 1, column: 3 } as Position
  const snippetsMap = {
    card: '.card>.card-body{${1}}',
    'btn:primary': 'button[class="${1:btn btn-primary}"]{${2}}'
  }

  const snippets = createSnippets(model, position, snippetsMap)

  expect(snippets).toHaveLength(2)
  expect(snippets[0].label).toBe('card')
  expect(snippets[1].label).toBe('btn:primary')
  expect(snippets[0].insertText).toMatchSnapshot()
  expect(snippets[1].insertText).toMatchSnapshot()
})

it('returns null for autoComplete if no abbreviation is found', () => {
  const model = {
    getValueInRange: () => '',
    getLanguageId: () => 'html'
  } as unknown as Model
  const position = { lineNumber: 1, column: 5 } as Position
  const result = autoComplete(model, position)
  expect(result).toBeNull()
})

it('returns autoComplete suggestion for the given model and position', () => {
  const model = {
    getValueInRange: () => '<div',
    getLanguageId: () => 'html'
  } as unknown as Model
  const position = { lineNumber: 1, column: 3 } as Position
  const result = autoComplete(model, position)
  expect(result).toBeDefined()
  expect(result!.label).toBe('div')
  expect(result!.insertText).toBe('<div>${1}</div>')
  expect(result!.range).toEqual({
    startLineNumber: 1,
    endLineNumber: 1,
    startColumn: 1,
    endColumn: 3
  })
})

it('expands user-defined snippets with placeholders', () => {
  const model = {
    getLanguageId: () => 'html',
    getWordUntilPosition: () => ({ startColumn: 1, endColumn: 4 })
  } as unknown as Model
  const position = { lineNumber: 1, column: 3 } as Position
  const snippetsMap = {
    card: '.card>.card-body{${1:lorem}}'
  }
  const snippets = createSnippets(model, position, snippetsMap)
  expect(snippets[0].insertText).toMatchSnapshot()
})

// Edge case: Test expansion with no placeholders
it('expands user-defined snippets with no placeholders', () => {
  const model = {
    getLanguageId: () => 'html',
    getWordUntilPosition: () => ({ startColumn: 1, endColumn: 4 })
  } as unknown as Model
  const position = { lineNumber: 1, column: 3 } as Position
  const snippetsMap = {
    card: '.card>.card-body'
  }
  const snippets = createSnippets(model, position, snippetsMap)
  expect(snippets[0].insertText).toMatchSnapshot()
})

// Edge case: Test expansion with complex placeholders
it('expands user-defined snippets with complex placeholders', () => {
  const model = {
    getLanguageId: () => 'html',
    getWordUntilPosition: () => ({ startColumn: 1, endColumn: 4 })
  } as unknown as Model
  const position = { lineNumber: 1, column: 3 } as Position
  const snippetsMap = {
    card: '.card>.card-body{${1:btn} ${2}}'
  }
  const snippets = createSnippets(model, position, snippetsMap)
  expect(snippets[0].insertText).toMatchSnapshot()
})

// Edge case: Test empty snippets map
it('does not create snippets for an empty snippets map', () => {
  const model = {
    getLanguageId: () => 'html',
    getWordUntilPosition: () => ({ startColumn: 1, endColumn: 4 })
  } as unknown as Model
  const position = { lineNumber: 1, column: 3 } as Position
  const snippetsMap = {}
  const snippets = createSnippets(model, position, snippetsMap)
  expect(snippets).toHaveLength(0)
})
