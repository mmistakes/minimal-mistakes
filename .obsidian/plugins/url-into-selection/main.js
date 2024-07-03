'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var assertNever_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper function for exhaustive checks of discriminated unions.
 * https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html
 *
 * @example
 *
 *    type A = {type: 'a'};
 *    type B = {type: 'b'};
 *    type Union = A | B;
 *
 *    function doSomething(arg: Union) {
 *      if (arg.type === 'a') {
 *        return something;
 *      }
 *
 *      if (arg.type === 'b') {
 *        return somethingElse;
 *      }
 *
 *      // TS will error if there are other types in the union
 *      // Will throw an Error when called at runtime.
 *      // Use `assertNever(arg, true)` instead to fail silently.
 *      return assertNever(arg);
 *    }
 */
function assertNever(value, noThrow) {
    if (noThrow) {
        return value;
    }
    throw new Error("Unhandled discriminated union member: " + JSON.stringify(value));
}
exports.assertNever = assertNever;
exports.default = assertNever;
});

var assertNever = /*@__PURE__*/getDefaultExportFromCjs(assertNever_1);

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
function resolve() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : '/';

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
}
// path.normalize(path)
// posix version
function normalize(path) {
  var isPathAbsolute = isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isPathAbsolute).join('/');

  if (!path && !isPathAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isPathAbsolute ? '/' : '') + path;
}
// posix version
function isAbsolute(path) {
  return path.charAt(0) === '/';
}

// posix version
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
}


// path.relative(from, to)
// posix version
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
}

var sep = '/';
var delimiter = ':';

function dirname(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
}

function basename(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}


function extname(path) {
  return splitPath(path)[3];
}
var path = {
  extname: extname,
  basename: basename,
  dirname: dirname,
  sep: sep,
  delimiter: delimiter,
  relative: relative,
  join: join,
  isAbsolute: isAbsolute,
  normalize: normalize,
  resolve: resolve
};
function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ?
    function (str, start, len) { return str.substr(start, len) } :
    function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

function fileUrl(filePath, options = {}) {
	if (typeof filePath !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof filePath}`);
	}

	const {resolve = true} = options;

	let pathName = filePath;
	if (resolve) {
		pathName = path.resolve(filePath);
	}

	pathName = pathName.replace(/\\/g, '/');

	// Windows drive letter must be prefixed with a slash.
	if (pathName[0] !== '/') {
		pathName = `/${pathName}`;
	}

	// Escape required characters for path components.
	// See: https://tools.ietf.org/html/rfc3986#section-3.3
	return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
}

// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s18.html
var win32Path = /^[a-z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$/i;
var unixPath = /^(?:\/[^/]+)+\/?$/i;
var testFilePath = function (url) { return win32Path.test(url) || unixPath.test(url); };
function UrlIntoSelection(editor, cb, settings) {
    // skip all if nothing should be done
    if (!editor.somethingSelected() && settings.nothingSelected === 0 /* doNothing */)
        return;
    if (typeof cb !== "string" && cb.clipboardData === null) {
        console.error("empty clipboardData in ClipboardEvent");
        return;
    }
    var clipboardText = getCbText(cb);
    if (clipboardText === null)
        return;
    var _a = getSelnRange(editor, settings), selectedText = _a.selectedText, replaceRange = _a.replaceRange;
    var replaceText = getReplaceText(clipboardText, selectedText, settings);
    if (replaceText === null)
        return;
    // apply changes
    if (typeof cb !== "string")
        cb.preventDefault(); // prevent default paste behavior
    replace(editor, replaceText, replaceRange);
    // if nothing is selected and the nothing selected behavior is to insert [](url) place the cursor between the square brackets
    if ((selectedText === "") && settings.nothingSelected === 2 /* insertInline */) {
        editor.setCursor({ ch: replaceRange.from.ch + 1, line: replaceRange.from.line });
    }
}
function getSelnRange(editor, settings) {
    var selectedText;
    var replaceRange;
    if (editor.somethingSelected()) {
        selectedText = editor.getSelection().trim();
        replaceRange = null;
    }
    else {
        switch (settings.nothingSelected) {
            case 1 /* autoSelect */:
                replaceRange = getWordBoundaries(editor, settings);
                selectedText = editor.getRange(replaceRange.from, replaceRange.to);
                break;
            case 2 /* insertInline */:
            case 3 /* insertBare */:
                replaceRange = getCursor(editor);
                selectedText = "";
                break;
            case 0 /* doNothing */:
                throw new Error("should be skipped");
            default:
                assertNever(settings.nothingSelected);
        }
    }
    return { selectedText: selectedText, replaceRange: replaceRange };
}
function isUrl(text, settings) {
    if (text === "")
        return false;
    try {
        // throw TypeError: Invalid URL if not valid
        new URL(text);
        return true;
    }
    catch (error) {
        // settings.regex: fallback test allows url without protocol (http,file...)
        return testFilePath(text) || new RegExp(settings.regex).test(text);
    }
}
function isImgEmbed(text, settings) {
    var rules = settings.listForImgEmbed
        .split("\n")
        .filter(function (v) { return v.length > 0; })
        .map(function (v) { return new RegExp(v); });
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var reg = rules_1[_i];
        if (reg.test(text))
            return true;
    }
    return false;
}
/**
 * Validate that either the text on the clipboard or the selected text is a link, and if so return the link as
 * a markdown link with the selected text as the link's text, or, if the value on the clipboard is not a link
 * but the selected text is, the value of the clipboard as the link's text.
 * If the link matches one of the image url regular expressions return a markdown image link.
 * @param clipboardText text on the clipboard.
 * @param selectedText highlighted text
 * @param settings plugin settings
 * @returns a mardown link or image link if the clipboard or selction value is a valid link, else null.
 */
function getReplaceText(clipboardText, selectedText, settings) {
    var linktext;
    var url;
    if (isUrl(clipboardText, settings)) {
        linktext = selectedText;
        url = clipboardText;
    }
    else if (isUrl(selectedText, settings)) {
        linktext = clipboardText;
        url = selectedText;
    }
    else
        return null; // if neither of two is an URL, the following code would be skipped.
    var imgEmbedMark = isImgEmbed(clipboardText, settings) ? "!" : "";
    url = processUrl(url);
    if (selectedText === "" && settings.nothingSelected === 3 /* insertBare */) {
        return "<".concat(url, ">");
    }
    else {
        return imgEmbedMark + "[".concat(linktext, "](").concat(url, ")");
    }
}
/** Process file url, special characters, etc */
function processUrl(src) {
    var output;
    if (testFilePath(src)) {
        output = fileUrl(src, { resolve: false });
    }
    else {
        output = src;
    }
    if (/[<>]/.test(output))
        output = output.replace("<", "%3C").replace(">", "%3E");
    return /[\(\) ]/.test(output) ? "<".concat(output, ">") : output;
}
function getCbText(cb) {
    var clipboardText;
    if (typeof cb === "string") {
        clipboardText = cb;
    }
    else {
        if (cb.clipboardData === null) {
            console.error("empty clipboardData in ClipboardEvent");
            return null;
        }
        else {
            clipboardText = cb.clipboardData.getData("text");
        }
    }
    return clipboardText.trim();
}
function getWordBoundaries(editor, settings) {
    var cursor = editor.getCursor();
    var line = editor.getLine(cursor.line);
    var wordBoundaries = findWordAt(line, cursor);
    // If the token the cursor is on is a url, grab the whole thing instead of just parsing it like a word
    var start = wordBoundaries.from.ch;
    var end = wordBoundaries.to.ch;
    while (start > 0 && !/\s/.test(line.charAt(start - 1)))
        --start;
    while (end < line.length && !/\s/.test(line.charAt(end)))
        ++end;
    if (isUrl(line.slice(start, end), settings)) {
        wordBoundaries.from.ch = start;
        wordBoundaries.to.ch = end;
    }
    return wordBoundaries;
}
var findWordAt = (function () {
    var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function isWordChar(char) {
        return /\w/.test(char) || char > "\x80" &&
            (char.toUpperCase() != char.toLowerCase() || nonASCIISingleCaseWordChar.test(char));
    }
    return function (line, pos) {
        var check;
        var start = pos.ch;
        var end = pos.ch;
        (end === line.length) ? --start : ++end;
        var startChar = line.charAt(pos.ch);
        if (isWordChar(startChar)) {
            check = function (ch) { return isWordChar(ch); };
        }
        else if (/\s/.test(startChar)) {
            check = function (ch) { return /\s/.test(ch); };
        }
        else {
            check = function (ch) { return (!/\s/.test(ch) && !isWordChar(ch)); };
        }
        while (start > 0 && check(line.charAt(start - 1)))
            --start;
        while (end < line.length && check(line.charAt(end)))
            ++end;
        return { from: { line: pos.line, ch: start }, to: { line: pos.line, ch: end } };
    };
})();
function getCursor(editor) {
    return { from: editor.getCursor(), to: editor.getCursor() };
}
function replace(editor, replaceText, replaceRange) {
    if (replaceRange === void 0) { replaceRange = null; }
    // replaceRange is only not null when there isn't anything selected.
    if (replaceRange && replaceRange.from && replaceRange.to) {
        editor.replaceRange(replaceText, replaceRange.from, replaceRange.to);
    }
    // if word is null or undefined
    else
        editor.replaceSelection(replaceText);
}

var DEFAULT_SETTINGS = {
    regex: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
        .source,
    nothingSelected: 0 /* doNothing */,
    listForImgEmbed: "",
};
var UrlIntoSelectionSettingsTab = /** @class */ (function (_super) {
    __extends(UrlIntoSelectionSettingsTab, _super);
    function UrlIntoSelectionSettingsTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlIntoSelectionSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var plugin = this.plugin;
        containerEl.empty();
        containerEl.createEl("h2", { text: "URL-into-selection Settings" });
        new obsidian.Setting(containerEl)
            .setName("Fallback Regular expression")
            .setDesc("Regular expression used to match URLs when default match fails.")
            .addText(function (text) {
            return text
                .setPlaceholder("Enter regular expression here..")
                .setValue(plugin.settings.regex)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(value.length > 0)) return [3 /*break*/, 2];
                            plugin.settings.regex = value;
                            return [4 /*yield*/, plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Behavior on pasting URL when nothing is selected")
            .setDesc("Auto Select: Automatically select word surrounding the cursor.")
            .addDropdown(function (dropdown) {
            var options = {
                0: "Do nothing",
                1: "Auto Select",
                2: "Insert [](url)",
                3: "Insert <url>",
            };
            dropdown
                .addOptions(options)
                .setValue(plugin.settings.nothingSelected.toString())
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            plugin.settings.nothingSelected = +value;
                            return [4 /*yield*/, plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            this.display();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName("Whitelist for image embed syntax")
            .setDesc(createFragment(function (el) {
            el.appendText("![selection](url) will be used for URL that matches the following list.");
            el.createEl("br");
            el.appendText("Rules are regex-based, split by line break.");
        }))
            .addTextArea(function (text) {
            text
                .setPlaceholder("Example:\nyoutu.?be|vimeo")
                .setValue(plugin.settings.listForImgEmbed)
                .onChange(function (value) {
                plugin.settings.listForImgEmbed = value;
                plugin.saveData(plugin.settings);
                return text;
            });
            text.inputEl.rows = 6;
            text.inputEl.cols = 25;
        });
    };
    return UrlIntoSelectionSettingsTab;
}(obsidian.PluginSettingTab));

var UrlIntoSel_Plugin = /** @class */ (function (_super) {
    __extends(UrlIntoSel_Plugin, _super);
    function UrlIntoSel_Plugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // pasteHandler = (cm: CodeMirror.Editor, e: ClipboardEvent) => UrlIntoSelection(cm, e, this.settings);
        _this.pasteHandler = function (evt, editor) { return UrlIntoSelection(editor, evt, _this.settings); };
        return _this;
    }
    UrlIntoSel_Plugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("loading url-into-selection");
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new UrlIntoSelectionSettingsTab(this.app, this));
                        this.addCommand({
                            id: "paste-url-into-selection",
                            name: "",
                            editorCallback: function (editor) { return __awaiter(_this, void 0, void 0, function () {
                                var clipboardText;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, navigator.clipboard.readText()];
                                        case 1:
                                            clipboardText = _a.sent();
                                            UrlIntoSelection(editor, clipboardText, this.settings);
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                        });
                        this.app.workspace.on("editor-paste", this.pasteHandler);
                        return [2 /*return*/];
                }
            });
        });
    };
    UrlIntoSel_Plugin.prototype.onunload = function () {
        console.log("unloading url-into-selection");
        this.app.workspace.off("editor-paste", this.pasteHandler);
    };
    UrlIntoSel_Plugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    UrlIntoSel_Plugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UrlIntoSel_Plugin;
}(obsidian.Plugin));

module.exports = UrlIntoSel_Plugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9hc3NlcnQtbmV2ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcm9sbHVwLXBsdWdpbi1ub2RlLXBvbHlmaWxscy9wb2x5ZmlsbHMvcGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9maWxlLXVybC9pbmRleC5qcyIsInNyYy9jb3JlLnRzIiwic3JjL3NldHRpbmcudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGV4aGF1c3RpdmUgY2hlY2tzIG9mIGRpc2NyaW1pbmF0ZWQgdW5pb25zLlxuICogaHR0cHM6Ly9iYXNhcmF0LmdpdGJvb2tzLmlvL3R5cGVzY3JpcHQvZG9jcy90eXBlcy9kaXNjcmltaW5hdGVkLXVuaW9ucy5odG1sXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICB0eXBlIEEgPSB7dHlwZTogJ2EnfTtcbiAqICAgIHR5cGUgQiA9IHt0eXBlOiAnYid9O1xuICogICAgdHlwZSBVbmlvbiA9IEEgfCBCO1xuICpcbiAqICAgIGZ1bmN0aW9uIGRvU29tZXRoaW5nKGFyZzogVW5pb24pIHtcbiAqICAgICAgaWYgKGFyZy50eXBlID09PSAnYScpIHtcbiAqICAgICAgICByZXR1cm4gc29tZXRoaW5nO1xuICogICAgICB9XG4gKlxuICogICAgICBpZiAoYXJnLnR5cGUgPT09ICdiJykge1xuICogICAgICAgIHJldHVybiBzb21ldGhpbmdFbHNlO1xuICogICAgICB9XG4gKlxuICogICAgICAvLyBUUyB3aWxsIGVycm9yIGlmIHRoZXJlIGFyZSBvdGhlciB0eXBlcyBpbiB0aGUgdW5pb25cbiAqICAgICAgLy8gV2lsbCB0aHJvdyBhbiBFcnJvciB3aGVuIGNhbGxlZCBhdCBydW50aW1lLlxuICogICAgICAvLyBVc2UgYGFzc2VydE5ldmVyKGFyZywgdHJ1ZSlgIGluc3RlYWQgdG8gZmFpbCBzaWxlbnRseS5cbiAqICAgICAgcmV0dXJuIGFzc2VydE5ldmVyKGFyZyk7XG4gKiAgICB9XG4gKi9cbmZ1bmN0aW9uIGFzc2VydE5ldmVyKHZhbHVlLCBub1Rocm93KSB7XG4gICAgaWYgKG5vVGhyb3cpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmhhbmRsZWQgZGlzY3JpbWluYXRlZCB1bmlvbiBtZW1iZXI6IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbn1cbmV4cG9ydHMuYXNzZXJ0TmV2ZXIgPSBhc3NlcnROZXZlcjtcbmV4cG9ydHMuZGVmYXVsdCA9IGFzc2VydE5ldmVyO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbi8vIHJlc29sdmVzIC4gYW5kIC4uIGVsZW1lbnRzIGluIGEgcGF0aCBhcnJheSB3aXRoIGRpcmVjdG9yeSBuYW1lcyB0aGVyZVxuLy8gbXVzdCBiZSBubyBzbGFzaGVzLCBlbXB0eSBlbGVtZW50cywgb3IgZGV2aWNlIG5hbWVzIChjOlxcKSBpbiB0aGUgYXJyYXlcbi8vIChzbyBhbHNvIG5vIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXMgLSBpdCBkb2VzIG5vdCBkaXN0aW5ndWlzaFxuLy8gcmVsYXRpdmUgYW5kIGFic29sdXRlIHBhdGhzKVxuZnVuY3Rpb24gbm9ybWFsaXplQXJyYXkocGFydHMsIGFsbG93QWJvdmVSb290KSB7XG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXJ0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciBsYXN0ID0gcGFydHNbaV07XG4gICAgaWYgKGxhc3QgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKGFsbG93QWJvdmVSb290KSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBwYXJ0cy51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuLy8gU3BsaXQgYSBmaWxlbmFtZSBpbnRvIFtyb290LCBkaXIsIGJhc2VuYW1lLCBleHRdLCB1bml4IHZlcnNpb25cbi8vICdyb290JyBpcyBqdXN0IGEgc2xhc2gsIG9yIG5vdGhpbmcuXG52YXIgc3BsaXRQYXRoUmUgPVxuICAgIC9eKFxcLz98KShbXFxzXFxTXSo/KSgoPzpcXC57MSwyfXxbXlxcL10rP3wpKFxcLlteLlxcL10qfCkpKD86W1xcL10qKSQvO1xudmFyIHNwbGl0UGF0aCA9IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gIHJldHVybiBzcGxpdFBhdGhSZS5leGVjKGZpbGVuYW1lKS5zbGljZSgxKTtcbn07XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogJy8nO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUocGF0aCkge1xuICB2YXIgaXNQYXRoQWJzb2x1dGUgPSBpc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzUGF0aEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc1BhdGhBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc1BhdGhBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnQgZnVuY3Rpb24gaXNBYnNvbHV0ZShwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufVxuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnQgZnVuY3Rpb24gam9pbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIG5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZShmcm9tLCB0bykge1xuICBmcm9tID0gcmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gcmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufVxuXG5leHBvcnQgdmFyIHNlcCA9ICcvJztcbmV4cG9ydCB2YXIgZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlybmFtZShwYXRoKSB7XG4gIHZhciByZXN1bHQgPSBzcGxpdFBhdGgocGF0aCksXG4gICAgICByb290ID0gcmVzdWx0WzBdLFxuICAgICAgZGlyID0gcmVzdWx0WzFdO1xuXG4gIGlmICghcm9vdCAmJiAhZGlyKSB7XG4gICAgLy8gTm8gZGlybmFtZSB3aGF0c29ldmVyXG4gICAgcmV0dXJuICcuJztcbiAgfVxuXG4gIGlmIChkaXIpIHtcbiAgICAvLyBJdCBoYXMgYSBkaXJuYW1lLCBzdHJpcCB0cmFpbGluZyBzbGFzaFxuICAgIGRpciA9IGRpci5zdWJzdHIoMCwgZGlyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgcmV0dXJuIHJvb3QgKyBkaXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXNlbmFtZShwYXRoLCBleHQpIHtcbiAgdmFyIGYgPSBzcGxpdFBhdGgocGF0aClbMl07XG4gIC8vIFRPRE86IG1ha2UgdGhpcyBjb21wYXJpc29uIGNhc2UtaW5zZW5zaXRpdmUgb24gd2luZG93cz9cbiAgaWYgKGV4dCAmJiBmLnN1YnN0cigtMSAqIGV4dC5sZW5ndGgpID09PSBleHQpIHtcbiAgICBmID0gZi5zdWJzdHIoMCwgZi5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gZjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXh0bmFtZShwYXRoKSB7XG4gIHJldHVybiBzcGxpdFBhdGgocGF0aClbM107XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIGV4dG5hbWU6IGV4dG5hbWUsXG4gIGJhc2VuYW1lOiBiYXNlbmFtZSxcbiAgZGlybmFtZTogZGlybmFtZSxcbiAgc2VwOiBzZXAsXG4gIGRlbGltaXRlcjogZGVsaW1pdGVyLFxuICByZWxhdGl2ZTogcmVsYXRpdmUsXG4gIGpvaW46IGpvaW4sXG4gIGlzQWJzb2x1dGU6IGlzQWJzb2x1dGUsXG4gIG5vcm1hbGl6ZTogbm9ybWFsaXplLFxuICByZXNvbHZlOiByZXNvbHZlXG59O1xuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYicgP1xuICAgIGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfSA6XG4gICAgZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbGVVcmwoZmlsZVBhdGgsIG9wdGlvbnMgPSB7fSkge1xuXHRpZiAodHlwZW9mIGZpbGVQYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIGEgc3RyaW5nLCBnb3QgJHt0eXBlb2YgZmlsZVBhdGh9YCk7XG5cdH1cblxuXHRjb25zdCB7cmVzb2x2ZSA9IHRydWV9ID0gb3B0aW9ucztcblxuXHRsZXQgcGF0aE5hbWUgPSBmaWxlUGF0aDtcblx0aWYgKHJlc29sdmUpIHtcblx0XHRwYXRoTmFtZSA9IHBhdGgucmVzb2x2ZShmaWxlUGF0aCk7XG5cdH1cblxuXHRwYXRoTmFtZSA9IHBhdGhOYW1lLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcblxuXHQvLyBXaW5kb3dzIGRyaXZlIGxldHRlciBtdXN0IGJlIHByZWZpeGVkIHdpdGggYSBzbGFzaC5cblx0aWYgKHBhdGhOYW1lWzBdICE9PSAnLycpIHtcblx0XHRwYXRoTmFtZSA9IGAvJHtwYXRoTmFtZX1gO1xuXHR9XG5cblx0Ly8gRXNjYXBlIHJlcXVpcmVkIGNoYXJhY3RlcnMgZm9yIHBhdGggY29tcG9uZW50cy5cblx0Ly8gU2VlOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4NiNzZWN0aW9uLTMuM1xuXHRyZXR1cm4gZW5jb2RlVVJJKGBmaWxlOi8vJHtwYXRoTmFtZX1gKS5yZXBsYWNlKC9bPyNdL2csIGVuY29kZVVSSUNvbXBvbmVudCk7XG59XG4iLCJpbXBvcnQgYXNzZXJ0TmV2ZXIgZnJvbSBcImFzc2VydC1uZXZlclwiO1xuaW1wb3J0IHsgTm90aGluZ1NlbGVjdGVkLCBQbHVnaW5TZXR0aW5ncyB9IGZyb20gXCJzZXR0aW5nXCI7XG5pbXBvcnQgZmlsZVVybCBmcm9tIFwiZmlsZS11cmxcIjtcbmltcG9ydCB7IEVkaXRvciwgRWRpdG9yUG9zaXRpb24sIEVkaXRvclJhbmdlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbi8vIGh0dHBzOi8vd3d3Lm9yZWlsbHkuY29tL2xpYnJhcnkvdmlldy9yZWd1bGFyLWV4cHJlc3Npb25zLWNvb2tib29rLzk3ODE0NDkzMjc0NTMvY2gwOHMxOC5odG1sXG5jb25zdCB3aW4zMlBhdGggPSAvXlthLXpdOlxcXFwoPzpbXlxcXFwvOio/XCI8PnxcXHJcXG5dK1xcXFwpKlteXFxcXC86Kj9cIjw+fFxcclxcbl0qJC9pO1xuY29uc3QgdW5peFBhdGggPSAvXig/OlxcL1teL10rKStcXC8/JC9pO1xuY29uc3QgdGVzdEZpbGVQYXRoID0gKHVybDogc3RyaW5nKSA9PiB3aW4zMlBhdGgudGVzdCh1cmwpIHx8IHVuaXhQYXRoLnRlc3QodXJsKTtcblxuLyoqXG4gKiBAcGFyYW0gZWRpdG9yIE9ic2lkaWFuIEVkaXRvciBJbnN0YW5jZVxuICogQHBhcmFtIGNiU3RyaW5nIHRleHQgb24gY2xpcGJvYXJkXG4gKiBAcGFyYW0gc2V0dGluZ3MgcGx1Z2luIHNldHRpbmdzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVybEludG9TZWxlY3Rpb24oZWRpdG9yOiBFZGl0b3IsIGNiU3RyaW5nOiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHZvaWQ7XG4vKipcbiAqIEBwYXJhbSBlZGl0b3IgT2JzaWRpYW4gRWRpdG9yIEluc3RhbmNlXG4gKiBAcGFyYW0gY2JFdmVudCBjbGlwYm9hcmQgZXZlbnRcbiAqIEBwYXJhbSBzZXR0aW5ncyBwbHVnaW4gc2V0dGluZ3NcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVXJsSW50b1NlbGVjdGlvbihlZGl0b3I6IEVkaXRvciwgY2JFdmVudDogQ2xpcGJvYXJkRXZlbnQsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHZvaWQ7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVcmxJbnRvU2VsZWN0aW9uKGVkaXRvcjogRWRpdG9yLCBjYjogc3RyaW5nIHwgQ2xpcGJvYXJkRXZlbnQsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IHZvaWQge1xuICAvLyBza2lwIGFsbCBpZiBub3RoaW5nIHNob3VsZCBiZSBkb25lXG4gIGlmICghZWRpdG9yLnNvbWV0aGluZ1NlbGVjdGVkKCkgJiYgc2V0dGluZ3Mubm90aGluZ1NlbGVjdGVkID09PSBOb3RoaW5nU2VsZWN0ZWQuZG9Ob3RoaW5nKVxuICAgIHJldHVybjtcblxuICBpZiAodHlwZW9mIGNiICE9PSBcInN0cmluZ1wiICYmIGNiLmNsaXBib2FyZERhdGEgPT09IG51bGwpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiZW1wdHkgY2xpcGJvYXJkRGF0YSBpbiBDbGlwYm9hcmRFdmVudFwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjbGlwYm9hcmRUZXh0ID0gZ2V0Q2JUZXh0KGNiKTtcbiAgaWYgKGNsaXBib2FyZFRleHQgPT09IG51bGwpIHJldHVybjtcblxuICBjb25zdCB7IHNlbGVjdGVkVGV4dCwgcmVwbGFjZVJhbmdlIH0gPSBnZXRTZWxuUmFuZ2UoZWRpdG9yLCBzZXR0aW5ncyk7XG4gIGNvbnN0IHJlcGxhY2VUZXh0ID0gZ2V0UmVwbGFjZVRleHQoY2xpcGJvYXJkVGV4dCwgc2VsZWN0ZWRUZXh0LCBzZXR0aW5ncyk7XG4gIGlmIChyZXBsYWNlVGV4dCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gIC8vIGFwcGx5IGNoYW5nZXNcbiAgaWYgKHR5cGVvZiBjYiAhPT0gXCJzdHJpbmdcIikgY2IucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBkZWZhdWx0IHBhc3RlIGJlaGF2aW9yXG4gIHJlcGxhY2UoZWRpdG9yLCByZXBsYWNlVGV4dCwgcmVwbGFjZVJhbmdlKTtcblxuICAvLyBpZiBub3RoaW5nIGlzIHNlbGVjdGVkIGFuZCB0aGUgbm90aGluZyBzZWxlY3RlZCBiZWhhdmlvciBpcyB0byBpbnNlcnQgW10odXJsKSBwbGFjZSB0aGUgY3Vyc29yIGJldHdlZW4gdGhlIHNxdWFyZSBicmFja2V0c1xuICBpZiAoKHNlbGVjdGVkVGV4dCA9PT0gXCJcIikgJiYgc2V0dGluZ3Mubm90aGluZ1NlbGVjdGVkID09PSBOb3RoaW5nU2VsZWN0ZWQuaW5zZXJ0SW5saW5lKSB7XG4gICAgZWRpdG9yLnNldEN1cnNvcih7IGNoOiByZXBsYWNlUmFuZ2UuZnJvbS5jaCArIDEsIGxpbmU6IHJlcGxhY2VSYW5nZS5mcm9tLmxpbmUgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2VsblJhbmdlKGVkaXRvcjogRWRpdG9yLCBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MpIHtcbiAgbGV0IHNlbGVjdGVkVGV4dDogc3RyaW5nO1xuICBsZXQgcmVwbGFjZVJhbmdlOiBFZGl0b3JSYW5nZSB8IG51bGw7XG5cbiAgaWYgKGVkaXRvci5zb21ldGhpbmdTZWxlY3RlZCgpKSB7XG4gICAgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLmdldFNlbGVjdGlvbigpLnRyaW0oKTtcbiAgICByZXBsYWNlUmFuZ2UgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAoc2V0dGluZ3Mubm90aGluZ1NlbGVjdGVkKSB7XG4gICAgICBjYXNlIE5vdGhpbmdTZWxlY3RlZC5hdXRvU2VsZWN0OlxuICAgICAgICByZXBsYWNlUmFuZ2UgPSBnZXRXb3JkQm91bmRhcmllcyhlZGl0b3IsIHNldHRpbmdzKTtcbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLmdldFJhbmdlKHJlcGxhY2VSYW5nZS5mcm9tLCByZXBsYWNlUmFuZ2UudG8pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTm90aGluZ1NlbGVjdGVkLmluc2VydElubGluZTpcbiAgICAgIGNhc2UgTm90aGluZ1NlbGVjdGVkLmluc2VydEJhcmU6XG4gICAgICAgIHJlcGxhY2VSYW5nZSA9IGdldEN1cnNvcihlZGl0b3IpO1xuICAgICAgICBzZWxlY3RlZFRleHQgPSBcIlwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgTm90aGluZ1NlbGVjdGVkLmRvTm90aGluZzpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic2hvdWxkIGJlIHNraXBwZWRcIik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhc3NlcnROZXZlcihzZXR0aW5ncy5ub3RoaW5nU2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4geyBzZWxlY3RlZFRleHQsIHJlcGxhY2VSYW5nZSB9O1xufVxuXG5mdW5jdGlvbiBpc1VybCh0ZXh0OiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IGJvb2xlYW4ge1xuICBpZiAodGV4dCA9PT0gXCJcIikgcmV0dXJuIGZhbHNlO1xuICB0cnkge1xuICAgIC8vIHRocm93IFR5cGVFcnJvcjogSW52YWxpZCBVUkwgaWYgbm90IHZhbGlkXG4gICAgbmV3IFVSTCh0ZXh0KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBzZXR0aW5ncy5yZWdleDogZmFsbGJhY2sgdGVzdCBhbGxvd3MgdXJsIHdpdGhvdXQgcHJvdG9jb2wgKGh0dHAsZmlsZS4uLilcbiAgICByZXR1cm4gdGVzdEZpbGVQYXRoKHRleHQpIHx8IG5ldyBSZWdFeHAoc2V0dGluZ3MucmVnZXgpLnRlc3QodGV4dCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNJbWdFbWJlZCh0ZXh0OiBzdHJpbmcsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IGJvb2xlYW4ge1xuICBjb25zdCBydWxlcyA9IHNldHRpbmdzLmxpc3RGb3JJbWdFbWJlZFxuICAgIC5zcGxpdChcIlxcblwiKVxuICAgIC5maWx0ZXIoKHYpID0+IHYubGVuZ3RoID4gMClcbiAgICAubWFwKCh2KSA9PiBuZXcgUmVnRXhwKHYpKTtcbiAgZm9yIChjb25zdCByZWcgb2YgcnVsZXMpIHtcbiAgICBpZiAocmVnLnRlc3QodGV4dCkpIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IGVpdGhlciB0aGUgdGV4dCBvbiB0aGUgY2xpcGJvYXJkIG9yIHRoZSBzZWxlY3RlZCB0ZXh0IGlzIGEgbGluaywgYW5kIGlmIHNvIHJldHVybiB0aGUgbGluayBhc1xuICogYSBtYXJrZG93biBsaW5rIHdpdGggdGhlIHNlbGVjdGVkIHRleHQgYXMgdGhlIGxpbmsncyB0ZXh0LCBvciwgaWYgdGhlIHZhbHVlIG9uIHRoZSBjbGlwYm9hcmQgaXMgbm90IGEgbGlua1xuICogYnV0IHRoZSBzZWxlY3RlZCB0ZXh0IGlzLCB0aGUgdmFsdWUgb2YgdGhlIGNsaXBib2FyZCBhcyB0aGUgbGluaydzIHRleHQuXG4gKiBJZiB0aGUgbGluayBtYXRjaGVzIG9uZSBvZiB0aGUgaW1hZ2UgdXJsIHJlZ3VsYXIgZXhwcmVzc2lvbnMgcmV0dXJuIGEgbWFya2Rvd24gaW1hZ2UgbGluay5cbiAqIEBwYXJhbSBjbGlwYm9hcmRUZXh0IHRleHQgb24gdGhlIGNsaXBib2FyZC5cbiAqIEBwYXJhbSBzZWxlY3RlZFRleHQgaGlnaGxpZ2h0ZWQgdGV4dFxuICogQHBhcmFtIHNldHRpbmdzIHBsdWdpbiBzZXR0aW5nc1xuICogQHJldHVybnMgYSBtYXJkb3duIGxpbmsgb3IgaW1hZ2UgbGluayBpZiB0aGUgY2xpcGJvYXJkIG9yIHNlbGN0aW9uIHZhbHVlIGlzIGEgdmFsaWQgbGluaywgZWxzZSBudWxsLlxuICovXG5mdW5jdGlvbiBnZXRSZXBsYWNlVGV4dChjbGlwYm9hcmRUZXh0OiBzdHJpbmcsIHNlbGVjdGVkVGV4dDogc3RyaW5nLCBzZXR0aW5nczogUGx1Z2luU2V0dGluZ3MpOiBzdHJpbmcgfCBudWxsIHtcblxuICBsZXQgbGlua3RleHQ6IHN0cmluZztcbiAgbGV0IHVybDogc3RyaW5nO1xuXG4gIGlmIChpc1VybChjbGlwYm9hcmRUZXh0LCBzZXR0aW5ncykpIHtcbiAgICBsaW5rdGV4dCA9IHNlbGVjdGVkVGV4dDtcbiAgICB1cmwgPSBjbGlwYm9hcmRUZXh0O1xuICB9IGVsc2UgaWYgKGlzVXJsKHNlbGVjdGVkVGV4dCwgc2V0dGluZ3MpKSB7XG4gICAgbGlua3RleHQgPSBjbGlwYm9hcmRUZXh0O1xuICAgIHVybCA9IHNlbGVjdGVkVGV4dDtcbiAgfSBlbHNlIHJldHVybiBudWxsOyAvLyBpZiBuZWl0aGVyIG9mIHR3byBpcyBhbiBVUkwsIHRoZSBmb2xsb3dpbmcgY29kZSB3b3VsZCBiZSBza2lwcGVkLlxuXG4gIGNvbnN0IGltZ0VtYmVkTWFyayA9IGlzSW1nRW1iZWQoY2xpcGJvYXJkVGV4dCwgc2V0dGluZ3MpID8gXCIhXCIgOiBcIlwiO1xuXG4gIHVybCA9IHByb2Nlc3NVcmwodXJsKTtcblxuICBpZiAoc2VsZWN0ZWRUZXh0ID09PSBcIlwiICYmIHNldHRpbmdzLm5vdGhpbmdTZWxlY3RlZCA9PT0gTm90aGluZ1NlbGVjdGVkLmluc2VydEJhcmUpIHtcbiAgICByZXR1cm4gYDwke3VybH0+YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW1nRW1iZWRNYXJrICsgYFske2xpbmt0ZXh0fV0oJHt1cmx9KWA7XG4gIH1cbn1cblxuLyoqIFByb2Nlc3MgZmlsZSB1cmwsIHNwZWNpYWwgY2hhcmFjdGVycywgZXRjICovXG5mdW5jdGlvbiBwcm9jZXNzVXJsKHNyYzogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IG91dHB1dDtcbiAgaWYgKHRlc3RGaWxlUGF0aChzcmMpKSB7XG4gICAgb3V0cHV0ID0gZmlsZVVybChzcmMsIHsgcmVzb2x2ZTogZmFsc2UgfSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0gc3JjO1xuICB9XG5cbiAgaWYgKC9bPD5dLy50ZXN0KG91dHB1dCkpXG4gICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoXCI8XCIsIFwiJTNDXCIpLnJlcGxhY2UoXCI+XCIsIFwiJTNFXCIpO1xuXG4gIHJldHVybiAvW1xcKFxcKSBdLy50ZXN0KG91dHB1dCkgPyBgPCR7b3V0cHV0fT5gIDogb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBnZXRDYlRleHQoY2I6IHN0cmluZyB8IENsaXBib2FyZEV2ZW50KTogc3RyaW5nIHwgbnVsbCB7XG4gIGxldCBjbGlwYm9hcmRUZXh0OiBzdHJpbmc7XG5cbiAgaWYgKHR5cGVvZiBjYiA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNsaXBib2FyZFRleHQgPSBjYjtcbiAgfSBlbHNlIHtcbiAgICBpZiAoY2IuY2xpcGJvYXJkRGF0YSA9PT0gbnVsbCkge1xuICAgICAgY29uc29sZS5lcnJvcihcImVtcHR5IGNsaXBib2FyZERhdGEgaW4gQ2xpcGJvYXJkRXZlbnRcIik7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xpcGJvYXJkVGV4dCA9IGNiLmNsaXBib2FyZERhdGEuZ2V0RGF0YShcInRleHRcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGlwYm9hcmRUZXh0LnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gZ2V0V29yZEJvdW5kYXJpZXMoZWRpdG9yOiBFZGl0b3IsIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncyk6IEVkaXRvclJhbmdlIHtcbiAgY29uc3QgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xuICBjb25zdCBsaW5lID0gZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpO1xuICBsZXQgd29yZEJvdW5kYXJpZXMgPSBmaW5kV29yZEF0KGxpbmUsIGN1cnNvcik7O1xuXG4gIC8vIElmIHRoZSB0b2tlbiB0aGUgY3Vyc29yIGlzIG9uIGlzIGEgdXJsLCBncmFiIHRoZSB3aG9sZSB0aGluZyBpbnN0ZWFkIG9mIGp1c3QgcGFyc2luZyBpdCBsaWtlIGEgd29yZFxuICBsZXQgc3RhcnQgPSB3b3JkQm91bmRhcmllcy5mcm9tLmNoO1xuICBsZXQgZW5kID0gd29yZEJvdW5kYXJpZXMudG8uY2g7XG4gIHdoaWxlIChzdGFydCA+IDAgJiYgIS9cXHMvLnRlc3QobGluZS5jaGFyQXQoc3RhcnQgLSAxKSkpIC0tc3RhcnQ7XG4gIHdoaWxlIChlbmQgPCBsaW5lLmxlbmd0aCAmJiAhL1xccy8udGVzdChsaW5lLmNoYXJBdChlbmQpKSkgKytlbmQ7XG4gIGlmIChpc1VybChsaW5lLnNsaWNlKHN0YXJ0LCBlbmQpLCBzZXR0aW5ncykpIHtcbiAgICB3b3JkQm91bmRhcmllcy5mcm9tLmNoID0gc3RhcnQ7XG4gICAgd29yZEJvdW5kYXJpZXMudG8uY2ggPSBlbmQ7XG4gIH1cbiAgcmV0dXJuIHdvcmRCb3VuZGFyaWVzO1xufVxuXG5jb25zdCBmaW5kV29yZEF0ID0gKCgpID0+IHtcbiAgY29uc3Qgbm9uQVNDSUlTaW5nbGVDYXNlV29yZENoYXIgPSAvW1xcdTAwZGZcXHUwNTg3XFx1MDU5MC1cXHUwNWY0XFx1MDYwMC1cXHUwNmZmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1MzQwMC1cXHU0ZGI1XFx1NGUwMC1cXHU5ZmNjXFx1YWMwMC1cXHVkN2FmXS87XG5cbiAgZnVuY3Rpb24gaXNXb3JkQ2hhcihjaGFyOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gL1xcdy8udGVzdChjaGFyKSB8fCBjaGFyID4gXCJcXHg4MFwiICYmXG4gICAgICAoY2hhci50b1VwcGVyQ2FzZSgpICE9IGNoYXIudG9Mb3dlckNhc2UoKSB8fCBub25BU0NJSVNpbmdsZUNhc2VXb3JkQ2hhci50ZXN0KGNoYXIpKTtcbiAgfVxuXG4gIHJldHVybiAobGluZTogc3RyaW5nLCBwb3M6IEVkaXRvclBvc2l0aW9uKTogRWRpdG9yUmFuZ2UgPT4ge1xuICAgIGxldCBjaGVjaztcbiAgICBsZXQgc3RhcnQgPSBwb3MuY2g7XG4gICAgbGV0IGVuZCA9IHBvcy5jaDtcbiAgICAoZW5kID09PSBsaW5lLmxlbmd0aCkgPyAtLXN0YXJ0IDogKytlbmQ7XG4gICAgY29uc3Qgc3RhcnRDaGFyID0gbGluZS5jaGFyQXQocG9zLmNoKTtcbiAgICBpZiAoaXNXb3JkQ2hhcihzdGFydENoYXIpKSB7XG4gICAgICBjaGVjayA9IChjaDogc3RyaW5nKSA9PiBpc1dvcmRDaGFyKGNoKTtcbiAgICB9IGVsc2UgaWYgKC9cXHMvLnRlc3Qoc3RhcnRDaGFyKSkge1xuICAgICAgY2hlY2sgPSAoY2g6IHN0cmluZykgPT4gL1xccy8udGVzdChjaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrID0gKGNoOiBzdHJpbmcpID0+ICghL1xccy8udGVzdChjaCkgJiYgIWlzV29yZENoYXIoY2gpKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoc3RhcnQgPiAwICYmIGNoZWNrKGxpbmUuY2hhckF0KHN0YXJ0IC0gMSkpKSAtLXN0YXJ0O1xuICAgIHdoaWxlIChlbmQgPCBsaW5lLmxlbmd0aCAmJiBjaGVjayhsaW5lLmNoYXJBdChlbmQpKSkgKytlbmQ7XG4gICAgcmV0dXJuIHsgZnJvbTogeyBsaW5lOiBwb3MubGluZSwgY2g6IHN0YXJ0IH0sIHRvOiB7IGxpbmU6IHBvcy5saW5lLCBjaDogZW5kIH0gfTtcbiAgfTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGdldEN1cnNvcihlZGl0b3I6IEVkaXRvcik6IEVkaXRvclJhbmdlIHtcbiAgcmV0dXJuIHsgZnJvbTogZWRpdG9yLmdldEN1cnNvcigpLCB0bzogZWRpdG9yLmdldEN1cnNvcigpIH07XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UoZWRpdG9yOiBFZGl0b3IsIHJlcGxhY2VUZXh0OiBzdHJpbmcsIHJlcGxhY2VSYW5nZTogRWRpdG9yUmFuZ2UgfCBudWxsID0gbnVsbCk6IHZvaWQge1xuICAvLyByZXBsYWNlUmFuZ2UgaXMgb25seSBub3QgbnVsbCB3aGVuIHRoZXJlIGlzbid0IGFueXRoaW5nIHNlbGVjdGVkLlxuICBpZiAocmVwbGFjZVJhbmdlICYmIHJlcGxhY2VSYW5nZS5mcm9tICYmIHJlcGxhY2VSYW5nZS50bykge1xuICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UocmVwbGFjZVRleHQsIHJlcGxhY2VSYW5nZS5mcm9tLCByZXBsYWNlUmFuZ2UudG8pO1xuICB9XG4gIC8vIGlmIHdvcmQgaXMgbnVsbCBvciB1bmRlZmluZWRcbiAgZWxzZSBlZGl0b3IucmVwbGFjZVNlbGVjdGlvbihyZXBsYWNlVGV4dCk7XG59XG4iLCJpbXBvcnQgVXJsSW50b1NlbF9QbHVnaW4gZnJvbSBcIm1haW5cIjtcbmltcG9ydCB7IFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGNvbnN0IGVudW0gTm90aGluZ1NlbGVjdGVkIHtcbiAgLyoqIERlZmF1bHQgcGFzdGUgYmVoYXZpb3VyICovXG4gIGRvTm90aGluZyxcbiAgLyoqIEF1dG9tYXRpY2FsbHkgc2VsZWN0IHdvcmQgc3Vycm91bmRpbmcgdGhlIGN1cnNvciAqL1xuICBhdXRvU2VsZWN0LFxuICAvKiogSW5zZXJ0IGBbXSh1cmwpYCAqL1xuICBpbnNlcnRJbmxpbmUsXG4gIC8qKiBJbnNlcnQgYDx1cmw+YCAqL1xuICBpbnNlcnRCYXJlLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBsdWdpblNldHRpbmdzIHtcbiAgcmVnZXg6IHN0cmluZztcbiAgbm90aGluZ1NlbGVjdGVkOiBOb3RoaW5nU2VsZWN0ZWQ7XG4gIGxpc3RGb3JJbWdFbWJlZDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogUGx1Z2luU2V0dGluZ3MgPSB7XG4gIHJlZ2V4OiAvWy1hLXpBLVowLTlAOiUuX1xcK34jPV17MSwyNTZ9XFwuW2EtekEtWjAtOSgpXXsxLDZ9XFxiKFstYS16QS1aMC05KClAOiVfXFwrLn4jPyYvLz1dKikvXG4gICAgLnNvdXJjZSxcbiAgbm90aGluZ1NlbGVjdGVkOiBOb3RoaW5nU2VsZWN0ZWQuZG9Ob3RoaW5nLFxuICBsaXN0Rm9ySW1nRW1iZWQ6IFwiXCIsXG59O1xuXG5leHBvcnQgY2xhc3MgVXJsSW50b1NlbGVjdGlvblNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIGRpc3BsYXkoKSB7XG4gICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29uc3QgcGx1Z2luOiBVcmxJbnRvU2VsX1BsdWdpbiA9ICh0aGlzIGFzIGFueSkucGx1Z2luO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJVUkwtaW50by1zZWxlY3Rpb24gU2V0dGluZ3NcIiB9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJGYWxsYmFjayBSZWd1bGFyIGV4cHJlc3Npb25cIilcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICBcIlJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIHRvIG1hdGNoIFVSTHMgd2hlbiBkZWZhdWx0IG1hdGNoIGZhaWxzLlwiXG4gICAgICApXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkVudGVyIHJlZ3VsYXIgZXhwcmVzc2lvbiBoZXJlLi5cIilcbiAgICAgICAgICAuc2V0VmFsdWUocGx1Z2luLnNldHRpbmdzLnJlZ2V4KVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHBsdWdpbi5zZXR0aW5ncy5yZWdleCA9IHZhbHVlO1xuICAgICAgICAgICAgICBhd2FpdCBwbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkJlaGF2aW9yIG9uIHBhc3RpbmcgVVJMIHdoZW4gbm90aGluZyBpcyBzZWxlY3RlZFwiKVxuICAgICAgLnNldERlc2MoXCJBdXRvIFNlbGVjdDogQXV0b21hdGljYWxseSBzZWxlY3Qgd29yZCBzdXJyb3VuZGluZyB0aGUgY3Vyc29yLlwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBSZWNvcmQ8Tm90aGluZ1NlbGVjdGVkLCBzdHJpbmc+ID0ge1xuICAgICAgICAgIDA6IFwiRG8gbm90aGluZ1wiLFxuICAgICAgICAgIDE6IFwiQXV0byBTZWxlY3RcIixcbiAgICAgICAgICAyOiBcIkluc2VydCBbXSh1cmwpXCIsXG4gICAgICAgICAgMzogXCJJbnNlcnQgPHVybD5cIixcbiAgICAgICAgfTtcblxuICAgICAgICBkcm9wZG93blxuICAgICAgICAgIC5hZGRPcHRpb25zKG9wdGlvbnMpXG4gICAgICAgICAgLnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy5ub3RoaW5nU2VsZWN0ZWQudG9TdHJpbmcoKSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW4uc2V0dGluZ3Mubm90aGluZ1NlbGVjdGVkID0gK3ZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgcGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiV2hpdGVsaXN0IGZvciBpbWFnZSBlbWJlZCBzeW50YXhcIilcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICBjcmVhdGVGcmFnbWVudCgoZWwpID0+IHtcbiAgICAgICAgICBlbC5hcHBlbmRUZXh0KFxuICAgICAgICAgICAgXCIhW3NlbGVjdGlvbl0odXJsKSB3aWxsIGJlIHVzZWQgZm9yIFVSTCB0aGF0IG1hdGNoZXMgdGhlIGZvbGxvd2luZyBsaXN0LlwiXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlbC5jcmVhdGVFbChcImJyXCIpO1xuICAgICAgICAgIGVsLmFwcGVuZFRleHQoXCJSdWxlcyBhcmUgcmVnZXgtYmFzZWQsIHNwbGl0IGJ5IGxpbmUgYnJlYWsuXCIpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLmFkZFRleHRBcmVhKCh0ZXh0KSA9PiB7XG4gICAgICAgIHRleHRcbiAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJFeGFtcGxlOlxcbnlvdXR1Lj9iZXx2aW1lb1wiKVxuICAgICAgICAgIC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3MubGlzdEZvckltZ0VtYmVkKVxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHBsdWdpbi5zZXR0aW5ncy5saXN0Rm9ySW1nRW1iZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHRleHQuaW5wdXRFbC5yb3dzID0gNjtcbiAgICAgICAgdGV4dC5pbnB1dEVsLmNvbHMgPSAyNTtcbiAgICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBFZGl0b3IsIE1hcmtkb3duVmlldywgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgVXJsSW50b1NlbGVjdGlvbiBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQge1xuICBQbHVnaW5TZXR0aW5ncyxcbiAgVXJsSW50b1NlbGVjdGlvblNldHRpbmdzVGFiLFxuICBERUZBVUxUX1NFVFRJTkdTLFxufSBmcm9tIFwic2V0dGluZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcmxJbnRvU2VsX1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBQbHVnaW5TZXR0aW5ncztcblxuICAvLyBwYXN0ZUhhbmRsZXIgPSAoY206IENvZGVNaXJyb3IuRWRpdG9yLCBlOiBDbGlwYm9hcmRFdmVudCkgPT4gVXJsSW50b1NlbGVjdGlvbihjbSwgZSwgdGhpcy5zZXR0aW5ncyk7XG4gIHBhc3RlSGFuZGxlciA9IChldnQ6IENsaXBib2FyZEV2ZW50LCBlZGl0b3I6IEVkaXRvcikgPT4gVXJsSW50b1NlbGVjdGlvbihlZGl0b3IsIGV2dCwgdGhpcy5zZXR0aW5ncyk7XG5cblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJsb2FkaW5nIHVybC1pbnRvLXNlbGVjdGlvblwiKTtcbiAgICBhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBVcmxJbnRvU2VsZWN0aW9uU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwicGFzdGUtdXJsLWludG8tc2VsZWN0aW9uXCIsXG4gICAgICBuYW1lOiBcIlwiLFxuICAgICAgZWRpdG9yQ2FsbGJhY2s6IGFzeW5jIChlZGl0b3I6IEVkaXRvcikgPT4ge1xuICAgICAgICBjb25zdCBjbGlwYm9hcmRUZXh0ID0gYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpO1xuICAgICAgICBVcmxJbnRvU2VsZWN0aW9uKGVkaXRvciwgY2xpcGJvYXJkVGV4dCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZWRpdG9yLXBhc3RlXCIsIHRoaXMucGFzdGVIYW5kbGVyKTtcbiAgfVxuXG4gIG9udW5sb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKFwidW5sb2FkaW5nIHVybC1pbnRvLXNlbGVjdGlvblwiKTtcblxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vZmYoXCJlZGl0b3ItcGFzdGVcIiwgdGhpcy5wYXN0ZUhhbmRsZXIpO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICB9XG5cbiAgYXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFF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
