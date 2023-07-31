/**
 * Mapping between languages that support Emmet and completion trigger
 * characters.
 *
 * @see [Emmet extension for VS Code](https://github.com/microsoft/vscode/blob/main/extensions/emmet/src/util.ts#L86)
 */
// prettier-ignore
export const LANGUAGE_MODES = {
	'html': ['!', '.', '}', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'jade': ['!', '.', '}', ':', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'slim': ['!', '.', '}', ':', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'haml': ['!', '.', '}', ':', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'xml': ['.', '}', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'xsl': ['!', '.', '}', '*', '$', '/', ']', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'css': [':', '!', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'scss': [':', '!', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'sass': [':', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'less': [':', '!', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'stylus': [':', '!', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'javascript': ['!', '.', '}', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	'typescript': ['!', '.', '}', '*', '$', ']', '/', '>', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
}

/**
 * Explicitly map languages that have built-in grammar in Monaco Editor to
 * their parent language, to get emmet completion support.
 *
 * @see [Emmet extension for VS Code](https://github.com/microsoft/vscode/blob/main/extensions/emmet/src/util.ts#L124)
 */
export const MAPPED_MODES: Record<string, string> = {
  handlebars: 'html',
  php: 'html',
  twig: 'html'
}
