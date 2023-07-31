/**
 * A map of snippets, where the keys are the snippet names and the values
 * are the snippet content.
 */
export interface SnippetsMap {
  [name: string]: string
}

/**
 * Available languages for snippets groups.
 */
export type Languages =
  | 'html'
  | 'jade'
  | 'slim'
  | 'haml'
  | 'xml'
  | 'xsl'
  | 'css'
  | 'scss'
  | 'sass'
  | 'less'
  | 'stylus'
  | 'javascript'
  | 'typescript'

/**
 * A group of snippets for different languages. The keys are the language
 * names, and the values are the corresponding snippet maps.
 */
export type SnippetsGroup = {
  [key in Languages]?: SnippetsMap
}

/**
 * Represents a range of text in a text model.
 */
export interface Range {
  readonly startLineNumber: number
  readonly endLineNumber: number
  readonly startColumn: number
  readonly endColumn: number
}
