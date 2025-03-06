'use strict';

var obsidian = require('obsidian');

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol */

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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Underline = /** @class */ (function (_super) {
    __extends(Underline, _super);
    function Underline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Underline.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.addCommand({
                    id: "toggle-underline-tag",
                    name: "Toggle underline tag",
                    editorCallback: function (editor, view) {
                        return _this.wrapper(editor, view);
                    },
                    hotkeys: [
                        {
                            modifiers: ["Mod"],
                            key: "u",
                        },
                    ],
                });
                this.addCommand({
                    id: "toggle-center-tag",
                    name: "Toggle center tag",
                    editorCallback: function (editor, view) {
                        return _this.wrapper(editor, view, "<center>", "</center>");
                    },
                    // hotkeys: [
                    //   {
                    //     modifiers: ["Mod", "Shift"],
                    //     key: "c",
                    //   },
                    // ],
                });
                this.addCommand({
                    id: "toggle-link-heading",
                    name: "Toggle a link to heading in the same file",
                    editorCallback: function (editor, view) {
                        return _this.wrapper(editor, view, "[[#", "]]");
                    },
                    // hotkeys: [
                    //   {
                    //     modifiers: ["Mod"],
                    //     key: "3",
                    //   },
                    // ],
                });
                this.addCommand({
                    id: "toggle-link-block",
                    name: "Toggle a link to block in the same file",
                    editorCallback: function (editor, view) {
                        return _this.wrapper(editor, view, "[[#^", "]]");
                    },
                    // hotkeys: [
                    //   {
                    //     modifiers: ["Mod"],
                    //     key: "6",
                    //   },
                    // ],
                });
                return [2 /*return*/];
            });
        });
    };
    Underline.prototype.wrapper = function (editor, view, prefix, suffix) {
        if (prefix === void 0) { prefix = "<u>"; }
        if (suffix === void 0) { suffix = "</u>"; }
        var PL = prefix.length; // Prefix Length
        var SL = suffix.length; // Suffix Length
        // let markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        // if (!markdownView) {
        //   return;
        // }
        // let editor = markdownView.editor;
        var selectedText = editor.somethingSelected() ? editor.getSelection() : "";
        var last_cursor = editor.getCursor(); // the cursor that at the last position of doc
        last_cursor.line = editor.lastLine();
        last_cursor.ch = editor.getLine(last_cursor.line).length;
        var last_offset = editor.posToOffset(last_cursor);
        function Cursor(offset) {
            if (offset > last_offset) {
                return last_cursor;
            }
            offset = offset < 0 ? 0 : offset;
            return editor.offsetToPos(offset);
        }
        /* Detect whether the selected text is packed by <u></u>.
           If true, unpack it, else pack with <u></u>. */
        var fos = editor.posToOffset(editor.getCursor("from")); // from offset
        var tos = editor.posToOffset(editor.getCursor("to")); // to offset
        var len = selectedText.length;
        var beforeText = editor.getRange(Cursor(fos - PL), Cursor(tos - len));
        var afterText = editor.getRange(Cursor(fos + len), Cursor(tos + SL));
        var startText = editor.getRange(Cursor(fos), Cursor(fos + PL));
        var endText = editor.getRange(Cursor(tos - SL), Cursor(tos));
        if (beforeText === prefix && afterText === suffix) {
            //=> undo underline (inside selection)
            editor.setSelection(Cursor(fos - PL), Cursor(tos + SL));
            editor.replaceSelection("".concat(selectedText));
            // re-select
            editor.setSelection(Cursor(fos - PL), Cursor(tos - PL));
        }
        else if (startText === prefix && endText === suffix) {
            //=> undo underline (outside selection)
            editor.replaceSelection(editor.getRange(Cursor(fos + PL), Cursor(tos - SL)));
            // re-select
            editor.setSelection(Cursor(fos), Cursor(tos - PL - SL));
        }
        else {
            //=> do underline
            if (selectedText) {
                // console.log("selected");
                editor.replaceSelection("".concat(prefix).concat(selectedText).concat(suffix));
                // re-select
                editor.setSelection(editor.offsetToPos(fos + PL), editor.offsetToPos(tos + PL));
            }
            else {
                // console.log("not selected");
                editor.replaceSelection("".concat(prefix).concat(suffix));
                var cursor = editor.getCursor();
                cursor.ch -= SL;
                editor.setCursor(cursor);
            }
        }
    };
    return Underline;
}(obsidian.Plugin));

module.exports = Underline;


/* nosourcemap */