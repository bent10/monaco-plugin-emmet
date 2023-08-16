import expand, { extract } from 'emmet'
import * as monaco from 'monaco-editor'
import type { Range } from './types.js'

/**
 * Provides auto-completion suggestions for the given text model and
 * position using Emmet.
 *
 * @param model - The Monaco Editor text model.
 * @param position - The position in the text model where auto-completion is requested.
 * @returns The completion item or null if there are no suggestions.
 */
export function autoComplete(
  model: monaco.editor.ITextModel,
  position: monaco.Position
): monaco.languages.CompletionItem | void {
  const { lineNumber, column } = position
  const syntax = model.getLanguageId()

  const inlineText = model.getValueInRange({
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: lineNumber,
    endColumn: column
  })

  const { abbreviation = '', start = 1 } = extract(inlineText) || {}

  if (!abbreviation) return

  const range: Range = {
    startLineNumber: lineNumber,
    endLineNumber: lineNumber,
    startColumn: start,
    endColumn: column
  }

  const insertText = expand(abbreviation, {
    syntax,
    options: {
      'output.field': (index: string, placeholder: string) =>
        placeholder ? `\${${index}:${placeholder}}` : `\${${index}}`
    }
  })

  return {
    label: abbreviation,
    range,
    insertText,
    kind: monaco.languages.CompletionItemKind.Property,
    documentation: `Emmet ${abbreviation}`,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
  }
}
