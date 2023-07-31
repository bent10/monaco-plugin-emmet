import expand, { resolveConfig } from 'emmet'
import * as monaco from 'monaco-editor'
import { LANGUAGE_MODES } from './constants.js'
import { autoComplete } from './utils.js'
import type { Languages, SnippetsGroup, SnippetsMap } from './types.js'

export type * from './types.js'

/**
 * Registers the Emmet completion provider for the specified languages
 * and snippet groups.
 *
 * @param monaco - The Monaco Editor instance.
 * @param langs - An array of language identifiers for which to register the completion provider.
 * @param snippetsGroup - An optional object representing a group of snippets for different languages.
 *
 * @example
 *
 * ```js
 * import { registerEmmet } from 'monaco-plugin-emmet'
 *
 * registerEmmet(monaco, ['html'], {
 *   html: { card: ".card>.card-body{${0}}" }
 * })
 *
 * // your monaco editor implementation here...
 * ```
 */
export function registerEmmet(
  api: typeof monaco,
  langs: Languages[],
  snippetsGroup: SnippetsGroup = {}
) {
  langs.forEach(lang => {
    const { snippets } = resolveConfig({ syntax: lang })

    api.languages.registerCompletionItemProvider(lang, {
      triggerCharacters: LANGUAGE_MODES[lang],
      provideCompletionItems(model, position) {
        // predefined snippets map
        const suggestions = createSnippets(model, position, snippets)
        // user defined snippets
        suggestions.push(
          ...createSnippets(model, position, snippetsGroup[lang] || {})
        )
        // expand abbreviation
        const completion = autoComplete(model, position)
        completion && suggestions.push(completion)

        return {
          suggestions
        }
      }
    })
  })
}

/**
 * Creates snippets for the specified model, position, and snippet map.
 *
 * @param model - The Monaco Editor text model.
 * @param position - The position in the text model where snippets are created.
 * @param snippetsMap - A map of snippets where the keys are the snippet names and the values are the snippet content.
 * @returns An array of completion items representing the snippets.
 *
 * @example
 *
 * ```ts
 * import { createSnippets, type SnippetsMap } from 'monaco-plugin-emmet'
 *
 * const htmlSnippets: SnippetsMap = {
 *   card: ".card>.card-body{${1}}",
 *   'btn:primary': 'button[class="${1:btn btn-primary}"]{${2}}'
 * }
 *
 * monaco.languages.registerCompletionItemProvider('html', {
 *   provideCompletionItems(model, position) {
 *     return {
 *       suggestions: createSnippets(model, position, htmlSnippets)
 *     }
 *   }
 * })
 * ```
 */
export function createSnippets(
  model: monaco.editor.ITextModel,
  position: monaco.Position,
  snippetsMap: SnippetsMap
) {
  const syntax = model.getLanguageId()
  const word = model.getWordUntilPosition(position)
  const range = {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: word.startColumn,
    endColumn: word.endColumn
  }

  const snippets: monaco.languages.CompletionItem[] = []

  for (const [label, abbr] of Object.entries(snippetsMap)) {
    const insertText = expand(abbr, {
      syntax,
      options: {
        'output.field': (index: string, placeholder: string) =>
          placeholder ? `\${${index}:${placeholder}}` : `\${${index}}`
      }
    })

    snippets.push({
      label,
      range,
      insertText,
      sortText: label,
      kind: monaco.languages.CompletionItemKind.Field,
      documentation: `Emmet snippet for ${label}`,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
    })
  }

  return snippets
}
