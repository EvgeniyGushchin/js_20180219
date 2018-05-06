/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(7).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = exports.View = function () {
    function View(el) {
        _classCallCheck(this, View);

        this.el = document.createElement('div');
        el.appendChild(this.el);
    }

    _createClass(View, [{
        key: 'toggle',
        value: function toggle(state) {
            this.el.hidden = !state;
        }
    }]);

    return View;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _authview = __webpack_require__(4);

var _chatview = __webpack_require__(9);

var _router = __webpack_require__(16);

__webpack_require__(17);

var _app = __webpack_require__(18);

var firebase = _interopRequireWildcard(_app);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// These imports load individual services into the firebase namespace.
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/messaging';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDF6wIln13Oss6t8vlazoVK_K2XWtG6D4E",
    authDomain: "simplechat-ed872.firebaseapp.com",
    databaseURL: "https://simplechat-ed872.firebaseio.com",
    projectId: "simplechat-ed872",
    storageBucket: "simplechat-ed872.appspot.com",
    messagingSenderId: "1059498701460"
};

// This import loads the firebase namespace along with all its type information.

firebase.initializeApp(config);

window.addEventListener('DOMContentLoaded', function () {

    var router = new _router.Router();

    router.register('chat', new _chatview.ChatView(document.body));
    router.register('auth', new _authview.AuthView(document.body));

    router.start();
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__view___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__view__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_auth_auth__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_auth_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__blocks_auth_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_User___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__models_User__);




class AuthView extends __WEBPACK_IMPORTED_MODULE_0__view__["View"] {

    constructor(el) {
        super(el);

        this.auth = new __WEBPACK_IMPORTED_MODULE_1__blocks_auth_auth__["Auth"](this.el, {});

        this.auth.onLogin = (email, pwd) => {

            if (email && pwd) {
                let model = new __WEBPACK_IMPORTED_MODULE_2__models_User__["User"](email, pwd);
                model.signIn().then(user => {
                    console.log(user);
                    location.hash = '#chat';
                }, error => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(`Error ${errorCode}: ${errorMessage}`);
                    alert(`Error ${errorCode}: ${errorMessage}`);
                });

            } else {
                console.log('Authorization failed');
            }

        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["AuthView"] = AuthView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultLogin = exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _auth = __webpack_require__(6);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = exports.Auth = function () {
    function Auth(el, data) {
        var _this = this;

        _classCallCheck(this, Auth);

        this.el = el;
        this.data = data;

        this.render();

        var form = this.el.querySelector('.auth');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var email = _this.el.querySelector('.auth__name').value.slice();
            var password = _this.el.querySelector('.auth__password').value.slice();

            _this.onLogin(email, password);
        });
    }

    _createClass(Auth, [{
        key: 'render',
        value: function render() {
            this.el.innerHTML = (0, _auth2.default)();
        }

        /**
         * @override
         */

    }, {
        key: 'onLogin',
        value: function onLogin() {}
    }]);

    return Auth;
}();

var defaultLogin = exports.defaultLogin = 'user';

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform class=\"auth pure-form\"\u003E\u003Cinput class=\"auth__name\" type=\"text\" placeholder=\"Login\"\u003E\u003Cinput class=\"auth__password\" type=\"password\" placeholder=\"Password\"\u003E\u003Cbutton class=\"auth__submit pure-button pure-button-primary\" type=\"submit\"\u003ESign in\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _authService = __webpack_require__(31);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = exports.User = function () {
    function User(email, password) {
        _classCallCheck(this, User);

        this.email = email;
        this.password = password;
        this.name = '';
        this.surname = '';
        this.role = '';
    }

    _createClass(User, [{
        key: 'signIn',
        value: function signIn() {
            return (0, _authService.signIn)(this.email, this.password);
        }
    }, {
        key: 'signUp',
        value: function signUp() {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        }
    }]);

    return User;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatView = undefined;

var _view = __webpack_require__(2);

var _message = __webpack_require__(10);

var _chat = __webpack_require__(12);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatView = exports.ChatView = function (_View) {
    _inherits(ChatView, _View);

    function ChatView(el) {
        _classCallCheck(this, ChatView);

        var _this = _possibleConstructorReturn(this, (ChatView.__proto__ || Object.getPrototypeOf(ChatView)).call(this, el));

        _this.chat = new _chat.Chat(document.createElement('div'), {});
        _this.message = new _message.Message(document.createElement('div'), {});

        _this.el.appendChild(_this.chat.el);
        _this.el.appendChild(_this.message.el);

        _this.message.insertMessage = function (text) {
            _this.chat.addMessage(text, true);
        };
        return _this;
    }

    return ChatView;
}(_view.View);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = __webpack_require__(11);

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = exports.Message = function () {
    function Message(el, data) {
        _classCallCheck(this, Message);

        this.el = el;
        this.data = data;
        this.render();
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            var _this = this;

            this.el.innerHTML = (0, _message2.default)();

            var form = this.el.querySelector('.message');

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                _this.sendMessage();
                console.log('send');
            });

            form.addEventListener('keydown', function (event) {
                if (event.ctrlKey && event.keyCode === 13) {
                    event.preventDefault();
                    _this.sendMessage();
                    console.log('send');
                } else if (!event.ctrlKey && event.keyCode === 13) {
                    event.preventDefault();
                }
            });
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage() {
            var input = this.el.querySelector('.message__input');
            this.insertMessage(input.value);
            input.value = '';
        }

        /**
         * Добавляение сообщения
         * @override
         * @param text
         */

    }, {
        key: 'insertMessage',
        value: function insertMessage(text) {}
    }]);

    return Message;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (localStorage) {const authenticated = localStorage.getItem('authenticated');
pug_html = pug_html + "\u003Cform" + (pug.attr("class", pug.classes(["message","pure-form",!authenticated ? 'message__message-hide' : ''], [false,false,true]), false, true)) + "\u003E\u003Ctextarea class=\"message__input pure-input-1-2\" placeholder=\"Add your message here...\"\u003E\u003C\u002Ftextarea\u003E\u003Cbutton class=\"message__button button-success pure-button\"\u003ESend\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";}.call(this,"localStorage" in locals_for_with?locals_for_with.localStorage:typeof localStorage!=="undefined"?localStorage:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chat = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagebubble = __webpack_require__(13);

var _chat = __webpack_require__(15);

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = exports.Chat = function () {
    function Chat(el) {
        _classCallCheck(this, Chat);

        this.el = el;
        this.render();
    }

    _createClass(Chat, [{
        key: 'render',
        value: function render() {
            this.el.innerHTML = (0, _chat2.default)();
        }

        /**
         *
         * @param message - text of message
         * @param isOwner - true if message created by user and false if came from network
         */

    }, {
        key: 'addMessage',
        value: function addMessage(message, isOwner) {
            var messageInfo = {
                message: message,
                userName: 'Ivan Ivanov',
                isOwner: isOwner,
                messageDate: Date.now()
            };
            var bubble = new _messagebubble.MessageBubble(messageInfo);
            bubble.render();
            this.el.querySelector('.chat').appendChild(bubble.el);
            bubble.el.scrollIntoView(true);
        }
    }]);

    return Chat;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageBubble = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagebubble = __webpack_require__(14);

var _messagebubble2 = _interopRequireDefault(_messagebubble);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageBubble = exports.MessageBubble = function () {
    function MessageBubble(messageInfo) {
        _classCallCheck(this, MessageBubble);

        this.el = document.createElement('div');

        this.message = messageInfo.message;
        this.isOwner = messageInfo.isOwner;
        this.title = this.titleFromInfo(messageInfo);

        this.render();
    }

    _createClass(MessageBubble, [{
        key: 'render',
        value: function render() {
            var arrowClass = this.isOwner ? "messagebubble__arrow--left" : "messagebubble__arrow--right";

            this.el.innerHTML = (0, _messagebubble2.default)({
                arrowclass: arrowClass,
                title: this.title,
                message: this.message
            });
        }
    }, {
        key: 'titleFromInfo',
        value: function titleFromInfo(info) {

            if (!info.messageDate) {
                return info.userName;
            }

            var options = {
                hour: '2-digit',
                minute: '2-digit'
            };

            var time = new Date(info.messageDate).toLocaleString('ru-ru', options);

            return info.userName + ' at ' + time;
        }
    }]);

    return MessageBubble;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (arrowclass, message, title) {pug_html = pug_html + "\u003Cdiv class=\"messagebubble\"\u003E\u003Cdiv" + (pug.attr("class", pug.classes([`${arrowclass}`], [true]), false, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"messagebubble__title\"\u003E" + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cbr\u003E\u003Cspan\u003E" + (pug.escape(null == (pug_interp = message) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";}.call(this,"arrowclass" in locals_for_with?locals_for_with.arrowclass:typeof arrowclass!=="undefined"?arrowclass:undefined,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"chat\"\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = exports.Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        this.routes = [];
        this.current = null;
    }

    _createClass(Router, [{
        key: 'register',
        value: function register(path, view) {
            this.routes[path] = view;
            view.toggle(false);
        }
    }, {
        key: 'go',
        value: function go(path) {
            if (this.current) {
                this.current.toggle(false);
            }

            this.routes[path].toggle(true);
            this.current = this.routes[path];
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            this.go(location.hash.replace(/^#/, ''));

            window / addEventListener('hashchange', function (event) {
                _this.go(location.hash.replace(/^#/, ''));
            });
        }
    }]);

    return Router;
}();

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

__webpack_require__(19);
module.exports = __webpack_require__(24).default;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(setImmediate, global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);


// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!globalNS.Promise) {
  globalNS.Promise = Promise;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $find = _arrayMethods(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
_export(_export.P + _export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY);

var find = _core.Array.find;

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $find$1 = _arrayMethods(6);
var KEY$1 = 'findIndex';
var forced$1 = true;
// Shouldn't skip holes
if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
_export(_export.P + _export.F * forced$1, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
_addToUnscopables(KEY$1);

var findIndex = _core.Array.findIndex;

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = _stringContext(this, searchString, STARTS_WITH);
    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

var startsWith = _core.String.startsWith;

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(20).setImmediate, __webpack_require__(1)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(21);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(22)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firebase", function() { return firebase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__firebase_util__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__firebase_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__firebase_util__);


/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
// An array to capture listeners before the true auth functions
// exist
var tokenListeners = [];
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
var FirebaseAppImpl = /** @class */ (function () {
    function FirebaseAppImpl(options, config, firebase_) {
        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.services_ = {};
        this.name_ = config.name;
        this._automaticDataCollectionEnabled =
            config.automaticDataCollectionEnabled || false;
        this.options_ = Object(__WEBPACK_IMPORTED_MODULE_0__firebase_util__["deepCopy"])(options);
        this.INTERNAL = {
            getUid: function () { return null; },
            getToken: function () { return Promise.resolve(null); },
            addAuthTokenListener: function (callback) {
                tokenListeners.push(callback);
                // Make sure callback is called, asynchronously, in the absence of the auth module
                setTimeout(function () { return callback(null); }, 0);
            },
            removeAuthTokenListener: function (callback) {
                tokenListeners = tokenListeners.filter(function (listener) { return listener !== callback; });
            }
        };
    }
    Object.defineProperty(FirebaseAppImpl.prototype, "automaticDataCollectionEnabled", {
        get: function () {
            this.checkDestroyed_();
            return this._automaticDataCollectionEnabled;
        },
        set: function (val) {
            this.checkDestroyed_();
            this._automaticDataCollectionEnabled = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "name", {
        get: function () {
            this.checkDestroyed_();
            return this.name_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "options", {
        get: function () {
            this.checkDestroyed_();
            return this.options_;
        },
        enumerable: true,
        configurable: true
    });
    FirebaseAppImpl.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkDestroyed_();
            resolve();
        })
            .then(function () {
            _this.firebase_.INTERNAL.removeApp(_this.name_);
            var services = [];
            Object.keys(_this.services_).forEach(function (serviceKey) {
                Object.keys(_this.services_[serviceKey]).forEach(function (instanceKey) {
                    services.push(_this.services_[serviceKey][instanceKey]);
                });
            });
            return Promise.all(services.map(function (service) {
                return service.INTERNAL.delete();
            }));
        })
            .then(function () {
            _this.isDeleted_ = true;
            _this.services_ = {};
        });
    };
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage is the only one that is leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    FirebaseAppImpl.prototype._getService = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        this.checkDestroyed_();
        if (!this.services_[name]) {
            this.services_[name] = {};
        }
        if (!this.services_[name][instanceIdentifier]) {
            /**
             * If a custom instance has been defined (i.e. not '[DEFAULT]')
             * then we will pass that instance on, otherwise we pass `null`
             */
            var instanceSpecifier = instanceIdentifier !== DEFAULT_ENTRY_NAME
                ? instanceIdentifier
                : undefined;
            var service = this.firebase_.INTERNAL.factories[name](this, this.extendApp.bind(this), instanceSpecifier);
            this.services_[name][instanceIdentifier] = service;
        }
        return this.services_[name][instanceIdentifier];
    };
    /**
     * Callback function used to extend an App instance at the time
     * of service instance creation.
     */
    FirebaseAppImpl.prototype.extendApp = function (props) {
        var _this = this;
        // Copy the object onto the FirebaseAppImpl prototype
        Object(__WEBPACK_IMPORTED_MODULE_0__firebase_util__["deepExtend"])(this, props);
        /**
         * If the app has overwritten the addAuthTokenListener stub, forward
         * the active token listeners on to the true fxn.
         *
         * TODO: This function is required due to our current module
         * structure. Once we are able to rely strictly upon a single module
         * implementation, this code should be refactored and Auth should
         * provide these stubs and the upgrade logic
         */
        if (props.INTERNAL && props.INTERNAL.addAuthTokenListener) {
            tokenListeners.forEach(function (listener) {
                _this.INTERNAL.addAuthTokenListener(listener);
            });
            tokenListeners = [];
        }
    };
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    FirebaseAppImpl.prototype.checkDestroyed_ = function () {
        if (this.isDeleted_) {
            error('app-deleted', { name: this.name_ });
        }
    };
    return FirebaseAppImpl;
}());
// Prevent dead-code elimination of these methods w/o invalid property
// copying.
(FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options) ||
    FirebaseAppImpl.prototype.delete ||
    console.log('dc');
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var apps_ = {};
    var factories = {};
    var appHooks = {};
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        __esModule: true,
        initializeApp: initializeApp,
        app: app,
        apps: null,
        Promise: Promise,
        SDK_VERSION: '4.13.0',
        INTERNAL: {
            registerService: registerService,
            createFirebaseNamespace: createFirebaseNamespace,
            extendNamespace: extendNamespace,
            createSubscribe: __WEBPACK_IMPORTED_MODULE_0__firebase_util__["createSubscribe"],
            ErrorFactory: __WEBPACK_IMPORTED_MODULE_0__firebase_util__["ErrorFactory"],
            removeApp: removeApp,
            factories: factories,
            useAsService: useAsService,
            Promise: Promise,
            deepExtend: __WEBPACK_IMPORTED_MODULE_0__firebase_util__["deepExtend"]
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    Object(__WEBPACK_IMPORTED_MODULE_0__firebase_util__["patchProperty"])(namespace, 'default', namespace);
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });
    /**
     * Called by App.delete() - but before any services associated with the App
     * are deleted.
     */
    function removeApp(name) {
        var app = apps_[name];
        callAppHooks(app, 'delete');
        delete apps_[name];
    }
    /**
     * Get the App object for a given name (or DEFAULT).
     */
    function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!contains(apps_, name)) {
            error('no-app', { name: name });
        }
        return apps_[name];
    }
    Object(__WEBPACK_IMPORTED_MODULE_0__firebase_util__["patchProperty"])(app, 'App', FirebaseAppImpl);
    function initializeApp(options, rawConfig) {
        if (rawConfig === void 0) { rawConfig = {}; }
        if (typeof rawConfig !== 'object' || rawConfig === null) {
            var name_1 = rawConfig;
            rawConfig = { name: name_1 };
        }
        var config = rawConfig;
        if (config.name === undefined) {
            config.name = DEFAULT_ENTRY_NAME;
        }
        var name = config.name;
        if (typeof name !== 'string' || !name) {
            error('bad-app-name', { name: name + '' });
        }
        if (contains(apps_, name)) {
            error('duplicate-app', { name: name });
        }
        var app = new FirebaseAppImpl(options, config, namespace);
        apps_[name] = app;
        callAppHooks(app, 'create');
        return app;
    }
    /*
     * Return an array of all the non-deleted FirebaseApps.
     */
    function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps_).map(function (name) { return apps_[name]; });
    }
    /*
     * Register a Firebase Service.
     *
     * firebase.INTERNAL.registerService()
     *
     * TODO: Implement serviceProperties.
     */
    function registerService(name, createService, serviceProperties, appHook, allowMultipleInstances) {
        // Cannot re-register a service that already exists
        if (factories[name]) {
            error('duplicate-service', { name: name });
        }
        // Capture the service factory for later service instantiation
        factories[name] = createService;
        // Capture the appHook, if passed
        if (appHook) {
            appHooks[name] = appHook;
            // Run the **new** app hook on all existing apps
            getApps().forEach(function (app) {
                appHook('create', app);
            });
        }
        // The Service namespace is an accessor function ...
        var serviceNamespace = function (appArg) {
            if (appArg === void 0) { appArg = app(); }
            if (typeof appArg[name] !== 'function') {
                // Invalid argument.
                // This happens in the following case: firebase.storage('gs:/')
                error('invalid-app-argument', { name: name });
            }
            // Forward service instance lookup to the FirebaseApp.
            return appArg[name]();
        };
        // ... and a container for service-level properties.
        if (serviceProperties !== undefined) {
            Object(__WEBPACK_IMPORTED_MODULE_0__firebase_util__["deepExtend"])(serviceNamespace, serviceProperties);
        }
        // Monkey-patch the serviceNamespace onto the firebase namespace
        namespace[name] = serviceNamespace;
        // Patch the FirebaseAppImpl prototype
        FirebaseAppImpl.prototype[name] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var serviceFxn = this._getService.bind(this, name);
            return serviceFxn.apply(this, allowMultipleInstances ? args : []);
        };
        return serviceNamespace;
    }
    /**
     * Patch the top-level firebase namespace with additional properties.
     *
     * firebase.INTERNAL.extendNamespace()
     */
    function extendNamespace(props) {
        Object(__WEBPACK_IMPORTED_MODULE_0__firebase_util__["deepExtend"])(namespace, props);
    }
    function callAppHooks(app, eventName) {
        Object.keys(factories).forEach(function (serviceName) {
            // Ignore virtual services
            var factoryName = useAsService(app, serviceName);
            if (factoryName === null) {
                return;
            }
            if (appHooks[factoryName]) {
                appHooks[factoryName](eventName, app);
            }
        });
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        var useService = name;
        var options = app.options;
        return useService;
    }
    return namespace;
}
function error(code, args) {
    throw appErrors.create(code, args);
}
// TypeScript does not support non-string indexes!
// let errors: {[code: AppError: string} = {
var errors = {
    'no-app': "No Firebase App '{$name}' has been created - " +
        'call Firebase App.initializeApp()',
    'bad-app-name': "Illegal App name: '{$name}",
    'duplicate-app': "Firebase App named '{$name}' already exists",
    'app-deleted': "Firebase App named '{$name}' already deleted",
    'duplicate-service': "Firebase service named '{$name}' already registered",
    'sa-not-supported': 'Initializing the Firebase SDK with a service ' +
        'account is only allowed in a Node.js environment. On client ' +
        'devices, you should instead initialize the SDK with an api key and ' +
        'auth domain',
    'invalid-app-argument': 'firebase.{$name}() takes either no argument or a ' +
        'Firebase App instance.'
};
var appErrors = new __WEBPACK_IMPORTED_MODULE_0__firebase_util__["ErrorFactory"]('app', 'Firebase', errors);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var firebase = createFirebaseNamespace();

/* harmony default export */ __webpack_exports__["default"] = (firebase);



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var tslib_1 = __webpack_require__(26);

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 * @param {*} assertion The assertion to be tested for falsiness
 * @param {!string} message The message to display if the check fails
 */
var assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 * @param {string} message
 * @return {!Error}
 */
var assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray = function (str) {
    // TODO(user): Use native implementations if/when available
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) == 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) == 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {Array<number>} bytes Array of numbers representing characters.
 * @return {string} Stringification of the array.
 */
var byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    var out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// Static lookup maps, lazily populated by init_()
var base64 = {
    /**
     * Maps bytes to characters.
     * @type {Object}
     * @private
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @type {Object}
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @type {Object}
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     * @type {string}
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     * @type {string}
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     * @type {string}
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     * @type {boolean}
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param {Array<number>|Uint8Array} input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param {boolean=} opt_webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encodeByteArray: function (input, opt_webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        var byteToCharMap = opt_webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        var output = [];
        for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;
            var outByte1 = byte1 >> 2;
            var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            var outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            var outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param {string} input A string to encode.
     * @param {boolean=} opt_webSafe If true, we should use the
     *     alternative alphabet.
     * @return {string} The base64 encoded string.
     */
    encodeString: function (input, opt_webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !opt_webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray(input), opt_webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param {string} input to decode.
     * @param {boolean=} opt_webSafe True if we should use the
     *     alternative alphabet.
     * @return {string} string representing the decoded value.
     */
    decodeString: function (input, opt_webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !opt_webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, opt_webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param {string} input Input to decode.
     * @param {boolean=} opt_webSafe True if we should use the web-safe alphabet.
     * @return {!Array<number>} bytes representing the decoded value.
     */
    decodeStringToByteArray: function (input, opt_webSafe) {
        this.init_();
        var charToByteMap = opt_webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        var output = [];
        for (var i = 0; i < input.length;) {
            var byte1 = charToByteMap[input.charAt(i++)];
            var haveByte2 = i < input.length;
            var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            var haveByte3 = i < input.length;
            var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            var haveByte4 = i < input.length;
            var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            var outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 != 64) {
                var outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 != 64) {
                    var outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_: function () {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (var i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * URL-safe base64 encoding
 * @param {!string} str
 * @return {!string}
 */
var base64Encode = function (str) {
    var utf8Bytes = stringToByteArray(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param {string} str To be decoded
 * @return {?string} Decoded result, if possible
 */
var base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}
// TODO: Really needed (for JSCompiler type checking)?
function patchProperty(obj, prop, value) {
    obj[prop] = value;
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     * @param {((?function(?(Error)): (?|undefined))| (?function(?(Error),?=): (?|undefined)))=} callback
     * @return {!function(?(Error), ?=)}
     */
    Deferred.prototype.wrapCallback = function (callback) {
        var _this = this;
        return function (error, value) {
            if (error) {
                _this.reject(error);
            }
            else {
                _this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                _this.promise.catch(function () { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    };
    return Deferred;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return {string} user agent string
 */
var getUA = function () {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
};
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap in the Ripple emulator) nor
 * Cordova `onDeviceReady`, which would normally wait for a callback.
 *
 * @return {boolean} isMobileCordova
 */
var isMobileCordova = function () {
    return (typeof window !== 'undefined' &&
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
};
/**
 * Detect React Native.
 *
 * @return {boolean} True if ReactNative environment is detected.
 */
var isReactNative = function () {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
};
/**
 * Detect Node.js.
 *
 * @return {boolean} True if Node.js environment is detected.
 */
var isNodeSdk = function () {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
};

var ERROR_NAME = 'FirebaseError';
var captureStackTrace = Error
    .captureStackTrace;
// Export for faking in tests
function patchCapture(captureFake) {
    var result = captureStackTrace;
    captureStackTrace = captureFake;
    return result;
}
var FirebaseError = /** @class */ (function () {
    function FirebaseError(code, message) {
        this.code = code;
        this.message = message;
        // We want the stack value, if implemented by Error
        if (captureStackTrace) {
            // Patches this.stack, omitted calls above ErrorFactory#create
            captureStackTrace(this, ErrorFactory.prototype.create);
        }
        else {
            var err_1 = Error.apply(this, arguments);
            this.name = ERROR_NAME;
            // Make non-enumerable getter for the property.
            Object.defineProperty(this, 'stack', {
                get: function () {
                    return err_1.stack;
                }
            });
        }
    }
    return FirebaseError;
}());
// Back-door inheritance
FirebaseError.prototype = Object.create(Error.prototype);
FirebaseError.prototype.constructor = FirebaseError;
FirebaseError.prototype.name = ERROR_NAME;
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
        // Matches {$name}, by default.
        this.pattern = /\{\$([^}]+)}/g;
        // empty
    }
    ErrorFactory.prototype.create = function (code, data) {
        if (data === undefined) {
            data = {};
        }
        var template = this.errors[code];
        var fullCode = this.service + '/' + code;
        var message;
        if (template === undefined) {
            message = 'Error';
        }
        else {
            message = template.replace(this.pattern, function (match, key) {
                var value = data[key];
                return value !== undefined ? value.toString() : '<' + key + '?>';
            });
        }
        // Service: Error message (service/code).
        message = this.serviceName + ': ' + message + ' (' + fullCode + ').';
        var err = new FirebaseError(fullCode, message);
        // Populate the Error object with message parts for programmatic
        // accesses (e.g., e.file).
        for (var prop in data) {
            if (!data.hasOwnProperty(prop) || prop.slice(-1) === '_') {
                continue;
            }
            err[prop] = data[prop];
        }
        return err;
    };
    return ErrorFactory;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {{header: *, claims: *, data: *, signature: string}}
 */
var decode = function (token) {
    var header = {}, claims = {}, data = {}, signature = '';
    try {
        var parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header: header,
        claims: claims,
        data: data,
        signature: signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isValidTimestamp = function (token) {
    var claims = decode(token).claims, now = Math.floor(new Date().getTime() / 1000), validSince, validUntil;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (now && validSince && validUntil && now >= validSince && now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {?number}
 */
var issuedAtTime = function (token) {
    var claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time and non-empty
 * signature.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isValidFormat = function (token) {
    var decoded = decode(token), claims = decoded.claims;
    return (!!decoded.signature &&
        !!claims &&
        typeof claims === 'object' &&
        claims.hasOwnProperty('iat'));
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 *
 * @param {?string} token
 * @return {boolean}
 */
var isAdmin = function (token) {
    var claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// See http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/
var contains = function (obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};
var safeGet = function (obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
        return obj[key];
    // else return undefined.
};
/**
 * Enumerates the keys/values in an object, excluding keys defined on the prototype.
 *
 * @param {?Object.<K,V>} obj Object to enumerate.
 * @param {!function(K, V)} fn Function to call for each key and value.
 * @template K,V
 */
var forEach = function (obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn(key, obj[key]);
        }
    }
};
/**
 * Copies all the (own) properties from one object to another.
 * @param {!Object} objTo
 * @param {!Object} objFrom
 * @return {!Object} objTo
 */
var extend = function (objTo, objFrom) {
    forEach(objFrom, function (key, value) {
        objTo[key] = value;
    });
    return objTo;
};
/**
 * Returns a clone of the specified object.
 * @param {!Object} obj
 * @return {!Object} cloned obj.
 */
var clone = function (obj) {
    return extend({}, obj);
};
/**
 * Returns true if obj has typeof "object" and is not null.  Unlike goog.isObject(), does not return true
 * for functions.
 *
 * @param obj {*} A potential object.
 * @returns {boolean} True if it's an object.
 */
var isNonNullObject = function (obj) {
    return typeof obj === 'object' && obj !== null;
};
var isEmpty = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};
var getCount = function (obj) {
    var rv = 0;
    for (var key in obj) {
        rv++;
    }
    return rv;
};
var map = function (obj, f, opt_obj) {
    var res = {};
    for (var key in obj) {
        res[key] = f.call(opt_obj, obj[key], key, obj);
    }
    return res;
};
var findKey = function (obj, fn, opt_this) {
    for (var key in obj) {
        if (fn.call(opt_this, obj[key], key, obj)) {
            return key;
        }
    }
    return undefined;
};
var findValue = function (obj, fn, opt_this) {
    var key = findKey(obj, fn, opt_this);
    return key && obj[key];
};
var getAnyKey = function (obj) {
    for (var key in obj) {
        return key;
    }
};
var getValues = function (obj) {
    var res = [];
    var i = 0;
    for (var key in obj) {
        res[i++] = obj[key];
    }
    return res;
};
/**
 * Tests whether every key/value pair in an object pass the test implemented
 * by the provided function
 *
 * @param {?Object.<K,V>} obj Object to test.
 * @param {!function(K, V)} fn Function to call for each key and value.
 * @template K,V
 */
var every = function (obj, fn) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (!fn(key, obj[key])) {
                return false;
            }
        }
    }
    return true;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a params
 * object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 *
 * @param {!Object} querystringParams
 * @return {string}
 */
var querystring = function (querystringParams) {
    var params = [];
    forEach(querystringParams, function (key, value) {
        if (Array.isArray(value)) {
            value.forEach(function (arrayVal) {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    });
    return params.length ? '&' + params.join('&') : '';
};
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object (e.g. {arg: 'val', arg2: 'val2'})
 *
 * @param {string} querystring
 * @return {!Object}
 */
var querystringDecode = function (querystring) {
    var obj = {};
    var tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(function (token) {
        if (token) {
            var key = token.split('=');
            obj[key[0]] = key[1];
        }
    });
    return obj;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Copyright 2011 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Abstract cryptographic hash interface.
 *
 * See Sha1 and Md5 for sample implementations.
 *
 */
/**
 * Create a cryptographic hash instance.
 *
 * @constructor
 * @struct
 */
var Hash = /** @class */ (function () {
    function Hash() {
        /**
         * The block size for the hasher.
         * @type {number}
         */
        this.blockSize = -1;
    }
    return Hash;
}());

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @extends {Hash}
 * @final
 * @struct
 */
var Sha1 = /** @class */ (function (_super) {
    tslib_1.__extends(Sha1, _super);
    function Sha1() {
        var _this = _super.call(this) || this;
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @type {!Array<number>}
         * @private
         */
        _this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @type {!Array<number>}
         * @private
         */
        _this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @type {!Array<number>}
         * @private
         */
        _this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @type {!Array<number>}
         * @private
         */
        _this.pad_ = [];
        /**
         * @private {number}
         */
        _this.inbuf_ = 0;
        /**
         * @private {number}
         */
        _this.total_ = 0;
        _this.blockSize = 512 / 8;
        _this.pad_[0] = 128;
        for (var i = 1; i < _this.blockSize; ++i) {
            _this.pad_[i] = 0;
        }
        _this.reset();
        return _this;
    }
    Sha1.prototype.reset = function () {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    };
    /**
     * Internal compress helper function.
     * @param {!Array<number>|!Uint8Array|string} buf Block to compress.
     * @param {number=} opt_offset Offset of the block in the buffer.
     * @private
     */
    Sha1.prototype.compress_ = function (buf, opt_offset) {
        if (!opt_offset) {
            opt_offset = 0;
        }
        var W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (var i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(opt_offset) << 24) |
                        (buf.charCodeAt(opt_offset + 1) << 16) |
                        (buf.charCodeAt(opt_offset + 2) << 8) |
                        buf.charCodeAt(opt_offset + 3);
                opt_offset += 4;
            }
        }
        else {
            for (var i = 0; i < 16; i++) {
                W[i] =
                    (buf[opt_offset] << 24) |
                        (buf[opt_offset + 1] << 16) |
                        (buf[opt_offset + 2] << 8) |
                        buf[opt_offset + 3];
                opt_offset += 4;
            }
        }
        // expand to 80 words
        for (var i = 16; i < 80; i++) {
            var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        var a = this.chain_[0];
        var b = this.chain_[1];
        var c = this.chain_[2];
        var d = this.chain_[3];
        var e = this.chain_[4];
        var f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (var i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    };
    Sha1.prototype.update = function (bytes, opt_length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (opt_length === undefined) {
            opt_length = bytes.length;
        }
        var lengthMinusBlock = opt_length - this.blockSize;
        var n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        var buf = this.buf_;
        var inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < opt_length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf == 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < opt_length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < opt_length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf == this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += opt_length;
    };
    /** @override */
    Sha1.prototype.digest = function () {
        var digest = [];
        var totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (var i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        var n = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    };
    return Sha1;
}(Hash));

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /** @class */ (function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(function () {
            executor(_this);
        })
            .catch(function (e) {
            _this.error(e);
        });
    }
    ObserverProxy.prototype.next = function (value) {
        this.forEachObserver(function (observer) {
            observer.next(value);
        });
    };
    ObserverProxy.prototype.error = function (error) {
        this.forEachObserver(function (observer) {
            observer.error(error);
        });
        this.close(error);
    };
    ObserverProxy.prototype.complete = function () {
        this.forEachObserver(function (observer) {
            observer.complete();
        });
        this.close();
    };
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
        var _this = this;
        var observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error: error,
                complete: complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        var unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            this.task.then(function () {
                try {
                    if (_this.finalError) {
                        observer.error(_this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    };
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    ObserverProxy.prototype.unsubscribeOne = function (i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    };
    ObserverProxy.prototype.forEachObserver = function (fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (var i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    };
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    ObserverProxy.prototype.sendOne = function (i, fn) {
        var _this = this;
        // Execute the callback asynchronously
        this.task.then(function () {
            if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                try {
                    fn(_this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    };
    ObserverProxy.prototype.close = function (err) {
        var _this = this;
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        this.task.then(function () {
            _this.observers = undefined;
            _this.onNoObservers = undefined;
        });
    };
    return ObserverProxy;
}());
/** Turn synchronous function into one called asynchronously. */
function async(fn, onError) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Promise.resolve(true)
            .then(function () {
            fn.apply(void 0, args);
        })
            .catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param {!string} fnName The function name
 * @param {!number} minCount The minimum number of arguments to allow for the function call
 * @param {!number} maxCount The maximum number of argument to allow for the function call
 * @param {!number} argCount The actual number of arguments provided.
 */
var validateArgCount = function (fnName, minCount, maxCount, argCount) {
    var argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        var error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param {!string} fnName The function name
 * @param {!number} argumentNumber The index of the argument
 * @param {boolean} optional Whether or not the argument is optional
 * @return {!string} The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argumentNumber, optional) {
    var argName = '';
    switch (argumentNumber) {
        case 1:
            argName = optional ? 'first' : 'First';
            break;
        case 2:
            argName = optional ? 'second' : 'Second';
            break;
        case 3:
            argName = optional ? 'third' : 'Third';
            break;
        case 4:
            argName = optional ? 'fourth' : 'Fourth';
            break;
        default:
            throw new Error('errorPrefix called with argumentNumber > 4.  Need to update it?');
    }
    var error = fnName + ' failed: ';
    error += argName + ' argument ';
    return error;
}
/**
 * @param {!string} fnName
 * @param {!number} argumentNumber
 * @param {!string} namespace
 * @param {boolean} optional
 */
function validateNamespace(fnName, argumentNumber, namespace, optional) {
    if (optional && !namespace)
        return;
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentNumber, callback, optional) {
    if (optional && !callback)
        return;
    if (typeof callback !== 'function')
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid function.');
}
function validateContextObject(fnName, argumentNumber, context, optional) {
    if (optional && !context)
        return;
    if (typeof context !== 'object' || context === null)
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid context object.');
}

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray$1 = function (str) {
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            var high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = function (str) {
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.assert = assert;
exports.assertionError = assertionError;
exports.base64 = base64;
exports.base64Decode = base64Decode;
exports.base64Encode = base64Encode;
exports.CONSTANTS = CONSTANTS;
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.patchProperty = patchProperty;
exports.Deferred = Deferred;
exports.getUA = getUA;
exports.isMobileCordova = isMobileCordova;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.ErrorFactory = ErrorFactory;
exports.FirebaseError = FirebaseError;
exports.patchCapture = patchCapture;
exports.jsonEval = jsonEval;
exports.stringify = stringify;
exports.decode = decode;
exports.isAdmin = isAdmin;
exports.issuedAtTime = issuedAtTime;
exports.isValidFormat = isValidFormat;
exports.isValidTimestamp = isValidTimestamp;
exports.clone = clone;
exports.contains = contains;
exports.every = every;
exports.extend = extend;
exports.findKey = findKey;
exports.findValue = findValue;
exports.forEach = forEach;
exports.getAnyKey = getAnyKey;
exports.getCount = getCount;
exports.getValues = getValues;
exports.isEmpty = isEmpty;
exports.isNonNullObject = isNonNullObject;
exports.map = map;
exports.safeGet = safeGet;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.Sha1 = Sha1;
exports.async = async;
exports.createSubscribe = createSubscribe;
exports.errorPrefix = errorPrefix;
exports.validateArgCount = validateArgCount;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateNamespace = validateNamespace;
exports.stringLength = stringLength;
exports.stringToByteArray = stringToByteArray$1;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
/* harmony export (immutable) */ __webpack_exports__["__importStar"] = __importStar;
/* harmony export (immutable) */ __webpack_exports__["__importDefault"] = __importDefault;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signIn = signIn;

var _app = __webpack_require__(18);

var firebase = _interopRequireWildcard(_app);

__webpack_require__(32);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function signIn(email, password) {

    return firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

__webpack_require__(33);


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  var firebase = __webpack_require__(24).default;
  var g,aa=aa||{},k=this;function l(a){return"string"==typeof a}function ba(a){return"boolean"==typeof a}function ca(){}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return null===a}function fa(a){return"array"==da(a)}function ha(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function n(a){return"function"==da(a)}function q(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}var ia="closure_uid_"+(1E9*Math.random()>>>0),ja=0;function ka(a,b,c){return a.call.apply(a.bind,arguments)}
function la(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?r=ka:r=la;return r.apply(null,arguments)}
function ma(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}}var na=Date.now||function(){return+new Date};function t(a,b){function c(){}c.prototype=b.prototype;a.lb=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ad=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};function oa(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0}function pa(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};function u(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}t(u,Error);u.prototype.name="CustomError";function qa(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");u.call(this,c+a[d])}t(qa,u);qa.prototype.name="AssertionError";function ra(a,b){throw new qa("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};function sa(a,b){this.c=a;this.f=b;this.b=0;this.a=null}sa.prototype.get=function(){if(0<this.b){this.b--;var a=this.a;this.a=a.next;a.next=null}else a=this.c();return a};function ta(a,b){a.f(b);100>a.b&&(a.b++,b.next=a.a,a.a=b)};function ua(){this.b=this.a=null}var wa=new sa(function(){return new va},function(a){a.reset()});ua.prototype.add=function(a,b){var c=wa.get();c.set(a,b);this.b?this.b.next=c:this.a=c;this.b=c};function xa(){var a=ya,b=null;a.a&&(b=a.a,a.a=a.a.next,a.a||(a.b=null),b.next=null);return b}function va(){this.next=this.b=this.a=null}va.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};va.prototype.reset=function(){this.next=this.b=this.a=null};var za=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(l(a))return l(b)&&1==b.length?a.indexOf(b,0):-1;for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},v=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=l(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
function Aa(a,b){var c=a.length,d=l(a)?a.split(""):a;for(--c;0<=c;--c)c in d&&b.call(void 0,d[c],c,a)}
var Ba=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e=l(a)?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));return d},Ca=Array.prototype.some?function(a,b){return Array.prototype.some.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=l(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a))return!0;return!1};
function Da(a){a:{var b=Ea;for(var c=a.length,d=l(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:l(a)?a.charAt(b):a[b]}function Fa(a,b){return 0<=za(a,b)}function Ga(a,b){b=za(a,b);var c;(c=0<=b)&&Array.prototype.splice.call(a,b,1);return c}function w(a,b){var c=0;Aa(a,function(d,e){b.call(void 0,d,e,a)&&1==Array.prototype.splice.call(a,e,1).length&&c++})}function Ha(a){return Array.prototype.concat.apply([],arguments)}
function Ia(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};function Ja(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")}var Ka=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function La(a){if(!Ma.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Na,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Oa,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Pa,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Qa,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Ra,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Sa,"&#0;"));return a}var Na=/&/g,Oa=/</g,Pa=/>/g,Qa=/"/g,Ra=/'/g,Sa=/\x00/g,Ma=/[\x00&<>"']/;function x(a,b){return-1!=a.indexOf(b)}function Ta(a,b){return a<b?-1:a>b?1:0};var Ua;a:{var Va=k.navigator;if(Va){var Wa=Va.userAgent;if(Wa){Ua=Wa;break a}}Ua=""}function y(a){return x(Ua,a)};function Xa(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function Ya(a){for(var b in a)return!1;return!0}function Za(a){var b={},c;for(c in a)b[c]=a[c];return b}var $a="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ab(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<$a.length;f++)c=$a[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};function bb(a){k.setTimeout(function(){throw a;},0)}var cb;
function db(){var a=k.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!y("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow;a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host;a=r(function(a){if(("*"==d||a.origin==d)&&a.data==
c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!y("Trident")&&!y("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.rb;c.rb=null;a()}};return function(a){d.next={rb:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");
b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){k.setTimeout(a,0)}};function eb(a,b){fb||gb();hb||(fb(),hb=!0);ya.add(a,b)}var fb;function gb(){if(k.Promise&&k.Promise.resolve){var a=k.Promise.resolve(void 0);fb=function(){a.then(ib)}}else fb=function(){var a=ib;!n(k.setImmediate)||k.Window&&k.Window.prototype&&!y("Edge")&&k.Window.prototype.setImmediate==k.setImmediate?(cb||(cb=db()),cb(a)):k.setImmediate(a)}}var hb=!1,ya=new ua;function ib(){for(var a;a=xa();){try{a.a.call(a.b)}catch(b){bb(b)}ta(wa,a)}hb=!1};function z(a,b){this.a=jb;this.j=void 0;this.f=this.b=this.c=null;this.g=this.h=!1;if(a!=ca)try{var c=this;a.call(b,function(a){kb(c,lb,a)},function(a){if(!(a instanceof mb))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}kb(c,nb,a)})}catch(d){kb(this,nb,d)}}var jb=0,lb=2,nb=3;function ob(){this.next=this.f=this.b=this.g=this.a=null;this.c=!1}ob.prototype.reset=function(){this.f=this.b=this.g=this.a=null;this.c=!1};var pb=new sa(function(){return new ob},function(a){a.reset()});
function qb(a,b,c){var d=pb.get();d.g=a;d.b=b;d.f=c;return d}function A(a){if(a instanceof z)return a;var b=new z(ca);kb(b,lb,a);return b}function B(a){return new z(function(b,c){c(a)})}function rb(a,b,c){sb(a,b,c,null)||eb(ma(b,a))}function tb(a){return new z(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},h=function(a){c(a)},m=0,p;m<a.length;m++)p=a[m],rb(p,ma(f,m),h);else b(e)})}
function ub(a){return new z(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{Zb:!0,value:f}:{Zb:!1,reason:f};0==c&&b(d)},f=0,h;f<a.length;f++)h=a[f],rb(h,ma(e,f,!0),ma(e,f,!1));else b(d)})}z.prototype.then=function(a,b,c){return vb(this,n(a)?a:null,n(b)?b:null,c)};oa(z);g=z.prototype;g.ha=function(a,b){a=qb(a,a,b);a.c=!0;wb(this,a);return this};g.m=function(a,b){return vb(this,null,a,b)};g.cancel=function(a){this.a==jb&&eb(function(){var b=new mb(a);xb(this,b)},this)};
function xb(a,b){if(a.a==jb)if(a.c){var c=a.c;if(c.b){for(var d=0,e=null,f=null,h=c.b;h&&(h.c||(d++,h.a==a&&(e=h),!(e&&1<d)));h=h.next)e||(f=h);e&&(c.a==jb&&1==d?xb(c,b):(f?(d=f,d.next==c.f&&(c.f=d),d.next=d.next.next):yb(c),zb(c,e,nb,b)))}a.c=null}else kb(a,nb,b)}function wb(a,b){a.b||a.a!=lb&&a.a!=nb||Ab(a);a.f?a.f.next=b:a.b=b;a.f=b}
function vb(a,b,c,d){var e=qb(null,null,null);e.a=new z(function(a,h){e.g=b?function(c){try{var e=b.call(d,c);a(e)}catch(E){h(E)}}:a;e.b=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof mb?h(b):a(e)}catch(E){h(E)}}:h});e.a.c=a;wb(a,e);return e.a}g.Kc=function(a){this.a=jb;kb(this,lb,a)};g.Lc=function(a){this.a=jb;kb(this,nb,a)};
function kb(a,b,c){a.a==jb&&(a===c&&(b=nb,c=new TypeError("Promise cannot resolve to itself")),a.a=1,sb(c,a.Kc,a.Lc,a)||(a.j=c,a.a=b,a.c=null,Ab(a),b!=nb||c instanceof mb||Bb(a,c)))}function sb(a,b,c,d){if(a instanceof z)return wb(a,qb(b||ca,c||null,d)),!0;if(pa(a))return a.then(b,c,d),!0;if(q(a))try{var e=a.then;if(n(e))return Cb(a,e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1}
function Cb(a,b,c,d,e){function f(a){m||(m=!0,d.call(e,a))}function h(a){m||(m=!0,c.call(e,a))}var m=!1;try{b.call(a,h,f)}catch(p){f(p)}}function Ab(a){a.h||(a.h=!0,eb(a.Ub,a))}function yb(a){var b=null;a.b&&(b=a.b,a.b=b.next,b.next=null);a.b||(a.f=null);return b}g.Ub=function(){for(var a;a=yb(this);)zb(this,a,this.a,this.j);this.h=!1};
function zb(a,b,c,d){if(c==nb&&b.b&&!b.c)for(;a&&a.g;a=a.c)a.g=!1;if(b.a)b.a.c=null,Db(b,c,d);else try{b.c?b.g.call(b.f):Db(b,c,d)}catch(e){Eb.call(null,e)}ta(pb,b)}function Db(a,b,c){b==lb?a.g.call(a.f,c):a.b&&a.b.call(a.f,c)}function Bb(a,b){a.g=!0;eb(function(){a.g&&Eb.call(null,b)})}var Eb=bb;function mb(a){u.call(this,a)}t(mb,u);mb.prototype.name="cancel";function Fb(){0!=Gb&&(Hb[this[ia]||(this[ia]=++ja)]=this);this.pa=this.pa;this.oa=this.oa}var Gb=0,Hb={};Fb.prototype.pa=!1;function Ib(a){if(!a.pa&&(a.pa=!0,a.ua(),0!=Gb)){var b=a[ia]||(a[ia]=++ja);if(0!=Gb&&a.oa&&0<a.oa.length)throw Error(a+" did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");delete Hb[b]}}Fb.prototype.ua=function(){if(this.oa)for(;this.oa.length;)this.oa.shift()()};function Jb(a){Jb[" "](a);return a}Jb[" "]=ca;function Kb(a,b){var c=Lb;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var Mb=y("Opera"),C=y("Trident")||y("MSIE"),Nb=y("Edge"),Ob=Nb||C,Pb=y("Gecko")&&!(x(Ua.toLowerCase(),"webkit")&&!y("Edge"))&&!(y("Trident")||y("MSIE"))&&!y("Edge"),Qb=x(Ua.toLowerCase(),"webkit")&&!y("Edge");function Rb(){var a=k.document;return a?a.documentMode:void 0}var Sb;
a:{var Tb="",Ub=function(){var a=Ua;if(Pb)return/rv:([^\);]+)(\)|;)/.exec(a);if(Nb)return/Edge\/([\d\.]+)/.exec(a);if(C)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Qb)return/WebKit\/(\S+)/.exec(a);if(Mb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Ub&&(Tb=Ub?Ub[1]:"");if(C){var Vb=Rb();if(null!=Vb&&Vb>parseFloat(Tb)){Sb=String(Vb);break a}}Sb=Tb}var Lb={};
function Wb(a){return Kb(a,function(){for(var b=0,c=Ka(String(Sb)).split("."),d=Ka(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var h=c[f]||"",m=d[f]||"";do{h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];m=/(\d*)(\D*)(.*)/.exec(m)||["","","",""];if(0==h[0].length&&0==m[0].length)break;b=Ta(0==h[1].length?0:parseInt(h[1],10),0==m[1].length?0:parseInt(m[1],10))||Ta(0==h[2].length,0==m[2].length)||Ta(h[2],m[2]);h=h[3];m=m[3]}while(0==b)}return 0<=b})}var Xb;var Yb=k.document;
Xb=Yb&&C?Rb()||("CSS1Compat"==Yb.compatMode?parseInt(Sb,10):5):void 0;var Zb=Object.freeze||function(a){return a};var $b=!C||9<=Number(Xb),ac=C&&!Wb("9"),bc=function(){if(!k.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});k.addEventListener("test",ca,b);k.removeEventListener("test",ca,b);return a}();function D(a,b){this.type=a;this.b=this.target=b;this.Eb=!0}D.prototype.preventDefault=function(){this.Eb=!1};function cc(a,b){D.call(this,a?a.type:"");this.relatedTarget=this.b=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.pointerId=0;this.pointerType="";this.a=null;if(a){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.b=b;if(b=a.relatedTarget){if(Pb){a:{try{Jb(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=
a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.pointerId=a.pointerId||0;this.pointerType=l(a.pointerType)?a.pointerType:dc[a.pointerType]||"";this.a=a;a.defaultPrevented&&this.preventDefault()}}t(cc,D);var dc=Zb({2:"touch",3:"pen",4:"mouse"});cc.prototype.preventDefault=function(){cc.lb.preventDefault.call(this);var a=this.a;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,ac)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};cc.prototype.f=function(){return this.a};var ec="closure_listenable_"+(1E6*Math.random()|0),fc=0;function gc(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.La=e;this.key=++fc;this.ma=this.Ha=!1}function hc(a){a.ma=!0;a.listener=null;a.proxy=null;a.src=null;a.La=null};function jc(a){this.src=a;this.a={};this.b=0}jc.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.a[f];a||(a=this.a[f]=[],this.b++);var h=kc(a,b,d,e);-1<h?(b=a[h],c||(b.Ha=!1)):(b=new gc(b,this.src,f,!!d,e),b.Ha=c,a.push(b));return b};function lc(a,b){var c=b.type;c in a.a&&Ga(a.a[c],b)&&(hc(b),0==a.a[c].length&&(delete a.a[c],a.b--))}function kc(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.ma&&f.listener==b&&f.capture==!!c&&f.La==d)return e}return-1};var mc="closure_lm_"+(1E6*Math.random()|0),nc={},oc=0;function pc(a,b,c,d,e){if(d&&d.once)qc(a,b,c,d,e);else if(fa(b))for(var f=0;f<b.length;f++)pc(a,b[f],c,d,e);else c=rc(c),a&&a[ec]?sc(a,b,c,q(d)?!!d.capture:!!d,e):tc(a,b,c,!1,d,e)}
function tc(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var h=q(e)?!!e.capture:!!e,m=uc(a);m||(a[mc]=m=new jc(a));c=m.add(b,c,d,h,f);if(!c.proxy){d=vc();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)bc||(e=h),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(wc(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");oc++}}
function vc(){var a=xc,b=$b?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b}function qc(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)qc(a,b[f],c,d,e);else c=rc(c),a&&a[ec]?yc(a,b,c,q(d)?!!d.capture:!!d,e):tc(a,b,c,!0,d,e)}
function F(a,b,c,d,e){if(fa(b))for(var f=0;f<b.length;f++)F(a,b[f],c,d,e);else(d=q(d)?!!d.capture:!!d,c=rc(c),a&&a[ec])?(a=a.u,b=String(b).toString(),b in a.a&&(f=a.a[b],c=kc(f,c,d,e),-1<c&&(hc(f[c]),Array.prototype.splice.call(f,c,1),0==f.length&&(delete a.a[b],a.b--)))):a&&(a=uc(a))&&(b=a.a[b.toString()],a=-1,b&&(a=kc(b,c,d,e)),(c=-1<a?b[a]:null)&&zc(c))}
function zc(a){if("number"!=typeof a&&a&&!a.ma){var b=a.src;if(b&&b[ec])lc(b.u,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(wc(c),d):b.addListener&&b.removeListener&&b.removeListener(d);oc--;(c=uc(b))?(lc(c,a),0==c.b&&(c.src=null,b[mc]=null)):hc(a)}}}function wc(a){return a in nc?nc[a]:nc[a]="on"+a}
function Ac(a,b,c,d){var e=!0;if(a=uc(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.ma&&(f=Bc(f,d),e=e&&!1!==f)}return e}function Bc(a,b){var c=a.listener,d=a.La||a.src;a.Ha&&zc(a);return c.call(d,b)}
function xc(a,b){if(a.ma)return!0;if(!$b){if(!b)a:{b=["window","event"];for(var c=k,d=0;d<b.length;d++)if(c=c[b[d]],null==c){b=null;break a}b=c}d=b;b=new cc(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(h){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.b;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;0<=e;e--){b.b=d[e];var f=Ac(d[e],a,!0,b);c=c&&f}for(e=0;e<d.length;e++)b.b=d[e],f=Ac(d[e],a,!1,b),c=c&&f}return c}return Bc(a,
new cc(b,this))}function uc(a){a=a[mc];return a instanceof jc?a:null}var Cc="__closure_events_fn_"+(1E9*Math.random()>>>0);function rc(a){if(n(a))return a;a[Cc]||(a[Cc]=function(b){return a.handleEvent(b)});return a[Cc]};function G(){Fb.call(this);this.u=new jc(this);this.Mb=this;this.Ta=null}t(G,Fb);G.prototype[ec]=!0;G.prototype.addEventListener=function(a,b,c,d){pc(this,a,b,c,d)};G.prototype.removeEventListener=function(a,b,c,d){F(this,a,b,c,d)};
G.prototype.dispatchEvent=function(a){var b,c=this.Ta;if(c)for(b=[];c;c=c.Ta)b.push(c);c=this.Mb;var d=a.type||a;if(l(a))a=new D(a,c);else if(a instanceof D)a.target=a.target||c;else{var e=a;a=new D(d,c);ab(a,e)}e=!0;if(b)for(var f=b.length-1;0<=f;f--){var h=a.b=b[f];e=Dc(h,d,!0,a)&&e}h=a.b=c;e=Dc(h,d,!0,a)&&e;e=Dc(h,d,!1,a)&&e;if(b)for(f=0;f<b.length;f++)h=a.b=b[f],e=Dc(h,d,!1,a)&&e;return e};
G.prototype.ua=function(){G.lb.ua.call(this);if(this.u){var a=this.u,b=0,c;for(c in a.a){for(var d=a.a[c],e=0;e<d.length;e++)++b,hc(d[e]);delete a.a[c];a.b--}}this.Ta=null};function sc(a,b,c,d,e){a.u.add(String(b),c,!1,d,e)}function yc(a,b,c,d,e){a.u.add(String(b),c,!0,d,e)}
function Dc(a,b,c,d){b=a.u.a[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var h=b[f];if(h&&!h.ma&&h.capture==c){var m=h.listener,p=h.La||h.src;h.Ha&&lc(a.u,h);e=!1!==m.call(p,d)&&e}}return e&&0!=d.Eb};function Ec(a,b,c){if(n(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:k.setTimeout(a,b||0)}function Fc(a){var b=null;return(new z(function(c,d){b=Ec(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).m(function(a){k.clearTimeout(b);throw a;})};function Gc(a){if(a.S&&"function"==typeof a.S)return a.S();if(l(a))return a.split("");if(ha(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}b=[];c=0;for(d in a)b[c++]=a[d];return b}function Hc(a){if(a.U&&"function"==typeof a.U)return a.U();if(!a.S||"function"!=typeof a.S){if(ha(a)||l(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}b=[];c=0;for(var d in a)b[c++]=d;return b}}
function Ic(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ha(a)||l(a))v(a,b,void 0);else for(var c=Hc(a),d=Gc(a),e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};function Kc(a,b){this.b={};this.a=[];this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Kc)for(c=a.U(),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}g=Kc.prototype;g.S=function(){Lc(this);for(var a=[],b=0;b<this.a.length;b++)a.push(this.b[this.a[b]]);return a};g.U=function(){Lc(this);return this.a.concat()};
g.clear=function(){this.b={};this.c=this.a.length=0};function Lc(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];Mc(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){var e={};for(c=b=0;b<a.a.length;)d=a.a[b],Mc(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}g.get=function(a,b){return Mc(this.b,a)?this.b[a]:b};g.set=function(a,b){Mc(this.b,a)||(this.c++,this.a.push(a));this.b[a]=b};
g.forEach=function(a,b){for(var c=this.U(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};function Mc(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Nc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Oc(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e=null;if(0<=d){var f=a[c].substring(0,d);e=a[c].substring(d+1)}else f=a[c];b(f,e?decodeURIComponent(e.replace(/\+/g," ")):"")}}};function Pc(a,b){this.b=this.l=this.c="";this.j=null;this.h=this.g="";this.f=!1;if(a instanceof Pc){this.f=void 0!==b?b:a.f;Qc(this,a.c);this.l=a.l;this.b=a.b;Rc(this,a.j);this.g=a.g;b=a.a;var c=new Sc;c.c=b.c;b.a&&(c.a=new Kc(b.a),c.b=b.b);Tc(this,c);this.h=a.h}else a&&(c=String(a).match(Nc))?(this.f=!!b,Qc(this,c[1]||"",!0),this.l=Uc(c[2]||""),this.b=Uc(c[3]||"",!0),Rc(this,c[4]),this.g=Uc(c[5]||"",!0),Tc(this,c[6]||"",!0),this.h=Uc(c[7]||"")):(this.f=!!b,this.a=new Sc(null,this.f))}
Pc.prototype.toString=function(){var a=[],b=this.c;b&&a.push(Vc(b,Wc,!0),":");var c=this.b;if(c||"file"==b)a.push("//"),(b=this.l)&&a.push(Vc(b,Wc,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.j,null!=c&&a.push(":",String(c));if(c=this.g)this.b&&"/"!=c.charAt(0)&&a.push("/"),a.push(Vc(c,"/"==c.charAt(0)?Xc:Yc,!0));(c=this.a.toString())&&a.push("?",c);(c=this.h)&&a.push("#",Vc(c,Zc));return a.join("")};
function Qc(a,b,c){a.c=c?Uc(b,!0):b;a.c&&(a.c=a.c.replace(/:$/,""))}function Rc(a,b){if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.j=b}else a.j=null}function Tc(a,b,c){b instanceof Sc?(a.a=b,$c(a.a,a.f)):(c||(b=Vc(b,ad)),a.a=new Sc(b,a.f))}function H(a,b,c){a.a.set(b,c)}function bd(a,b){return a.a.get(b)}function cd(a){return a instanceof Pc?new Pc(a):new Pc(a,void 0)}function dd(a,b){var c=new Pc(null,void 0);Qc(c,"https");a&&(c.b=a);b&&(c.g=b);return c}
function Uc(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Vc(a,b,c){return l(a)?(a=encodeURI(a).replace(b,ed),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function ed(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Wc=/[#\/\?@]/g,Yc=/[#\?:]/g,Xc=/[#\?]/g,ad=/[#\?@]/g,Zc=/#/g;function Sc(a,b){this.b=this.a=null;this.c=a||null;this.f=!!b}
function fd(a){a.a||(a.a=new Kc,a.b=0,a.c&&Oc(a.c,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))}function gd(a){var b=Hc(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new Sc(null,void 0);a=Gc(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];fa(f)?hd(c,e,f):c.add(e,f)}return c}g=Sc.prototype;g.add=function(a,b){fd(this);this.c=null;a=id(this,a);var c=this.a.get(a);c||this.a.set(a,c=[]);c.push(b);this.b+=1;return this};
function jd(a,b){fd(a);b=id(a,b);Mc(a.a.b,b)&&(a.c=null,a.b-=a.a.get(b).length,a=a.a,Mc(a.b,b)&&(delete a.b[b],a.c--,a.a.length>2*a.c&&Lc(a)))}g.clear=function(){this.a=this.c=null;this.b=0};function kd(a,b){fd(a);b=id(a,b);return Mc(a.a.b,b)}g.forEach=function(a,b){fd(this);this.a.forEach(function(c,d){v(c,function(c){a.call(b,c,d,this)},this)},this)};g.U=function(){fd(this);for(var a=this.a.S(),b=this.a.U(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
g.S=function(a){fd(this);var b=[];if(l(a))kd(this,a)&&(b=Ha(b,this.a.get(id(this,a))));else{a=this.a.S();for(var c=0;c<a.length;c++)b=Ha(b,a[c])}return b};g.set=function(a,b){fd(this);this.c=null;a=id(this,a);kd(this,a)&&(this.b-=this.a.get(a).length);this.a.set(a,[b]);this.b+=1;return this};g.get=function(a,b){a=a?this.S(a):[];return 0<a.length?String(a[0]):b};function hd(a,b,c){jd(a,b);0<c.length&&(a.c=null,a.a.set(id(a,b),Ia(c)),a.b+=c.length)}
g.toString=function(){if(this.c)return this.c;if(!this.a)return"";for(var a=[],b=this.a.U(),c=0;c<b.length;c++){var d=b[c],e=encodeURIComponent(String(d));d=this.S(d);for(var f=0;f<d.length;f++){var h=e;""!==d[f]&&(h+="="+encodeURIComponent(String(d[f])));a.push(h)}}return this.c=a.join("&")};function id(a,b){b=String(b);a.f&&(b=b.toLowerCase());return b}function $c(a,b){b&&!a.f&&(fd(a),a.c=null,a.a.forEach(function(a,b){var c=b.toLowerCase();b!=c&&(jd(this,b),hd(this,c,a))},a));a.f=b};var ld=!C||9<=Number(Xb);function md(){this.a="";this.b=nd}md.prototype.la=!0;md.prototype.ja=function(){return this.a};md.prototype.toString=function(){return"Const{"+this.a+"}"};function od(a){if(a instanceof md&&a.constructor===md&&a.b===nd)return a.a;ra("expected object of type Const, got '"+a+"'");return"type_error:Const"}var nd={};function pd(a){var b=new md;b.a=a;return b}pd("");function qd(){this.a="";this.b=rd}qd.prototype.la=!0;qd.prototype.ja=function(){return this.a};qd.prototype.toString=function(){return"TrustedResourceUrl{"+this.a+"}"};function sd(a){if(a instanceof qd&&a.constructor===qd&&a.b===rd)return a.a;ra("expected object of type TrustedResourceUrl, got '"+a+"' of type "+da(a));return"type_error:TrustedResourceUrl"}
function td(a,b){var c=od(a);if(!ud.test(c))throw Error("Invalid TrustedResourceUrl format: "+c);a=c.replace(vd,function(a,e){if(!Object.prototype.hasOwnProperty.call(b,e))throw Error('Found marker, "'+e+'", in format string, "'+c+'", but no valid label mapping found in args: '+JSON.stringify(b));a=b[e];return a instanceof md?od(a):encodeURIComponent(String(a))});return wd(a)}var vd=/%{(\w+)}/g,ud=/^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank#/i,rd={};
function wd(a){var b=new qd;b.a=a;return b};function xd(){this.a="";this.b=yd}xd.prototype.la=!0;xd.prototype.ja=function(){return this.a};xd.prototype.toString=function(){return"SafeUrl{"+this.a+"}"};function zd(a){if(a instanceof xd&&a.constructor===xd&&a.b===yd)return a.a;ra("expected object of type SafeUrl, got '"+a+"' of type "+da(a));return"type_error:SafeUrl"}var Ad=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
function Bd(a){if(a instanceof xd)return a;a=a.la?a.ja():String(a);Ad.test(a)||(a="about:invalid#zClosurez");return Cd(a)}var yd={};function Cd(a){var b=new xd;b.a=a;return b}Cd("about:blank");function Dd(){this.a="";this.b=Ed}Dd.prototype.la=!0;Dd.prototype.ja=function(){return this.a};Dd.prototype.toString=function(){return"SafeHtml{"+this.a+"}"};function Fd(a){if(a instanceof Dd&&a.constructor===Dd&&a.b===Ed)return a.a;ra("expected object of type SafeHtml, got '"+a+"' of type "+da(a));return"type_error:SafeHtml"}var Ed={};function Gd(a){var b=new Dd;b.a=a;return b}Gd("<!DOCTYPE html>");Gd("");Gd("<br>");function Hd(a){var b=document;return l(a)?b.getElementById(a):a}function Id(a,b){Xa(b,function(b,d){b&&b.la&&(b=b.ja());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Jd.hasOwnProperty(d)?a.setAttribute(Jd[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})}
var Jd={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function Kd(a,b,c){var d=arguments,e=document,f=String(d[0]),h=d[1];if(!ld&&h&&(h.name||h.type)){f=["<",f];h.name&&f.push(' name="',La(h.name),'"');if(h.type){f.push(' type="',La(h.type),'"');var m={};ab(m,h);delete m.type;h=m}f.push(">");f=f.join("")}f=e.createElement(f);h&&(l(h)?f.className=h:fa(h)?f.className=h.join(" "):Id(f,h));2<d.length&&Ld(e,f,d);return f}
function Ld(a,b,c){function d(c){c&&b.appendChild(l(c)?a.createTextNode(c):c)}for(var e=2;e<c.length;e++){var f=c[e];!ha(f)||q(f)&&0<f.nodeType?d(f):v(Md(f)?Ia(f):f,d)}}function Md(a){if(a&&"number"==typeof a.length){if(q(a))return"function"==typeof a.item||"string"==typeof a.item;if(n(a))return"function"==typeof a.item}return!1};function Nd(a){var b=[];Od(new Pd,a,b);return b.join("")}function Pd(){}
function Od(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(fa(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Od(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Qd(d,c),c.push(":"),Od(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Qd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}var Rd={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Sd=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;
function Qd(a,b){b.push('"',a.replace(Sd,function(a){var b=Rd[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),Rd[a]=b);return b}),'"')};function Td(){var a=I();return C&&!!Xb&&11==Xb||/Edge\/\d+/.test(a)}function Ud(){return k.window&&k.window.location.href||self&&self.location&&self.location.href||""}function Vd(a,b){b=b||k.window;var c="about:blank";a&&(c=zd(Bd(a)));b.location.href=c}
function Wd(a,b){var c=[],d;for(d in a)if(d in b)if(typeof a[d]!=typeof b[d])c.push(d);else if(fa(a[d])){a:{var e=void 0;var f=a[d],h=b[d];for(e in f)if(!(e in h)||f[e]!==h[e]){e=!1;break a}for(e in h)if(!(e in f)){e=!1;break a}e=!0}e||c.push(d)}else"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<Wd(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d);else c.push(d);for(d in b)d in a||c.push(d);return c}
function Xd(){var a=I();a=Yd(a)!=Zd?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],10):null;return a&&30>a?!1:!C||!Xb||9<Xb}function $d(a){a=(a||I()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1}function ae(a){a=a||k.window;try{a.close()}catch(b){}}
function be(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};c=I().toLowerCase();d&&(b.target=d,x(c,"crios/")&&(b.target="_blank"));Yd(I())==ce&&(a=a||"http://localhost",b.scrollbars=!0);c=a||"";(a=b)||(a={});d=window;b=c instanceof xd?c:Bd("undefined"!=typeof c.href?c.href:String(c));c=a.target||c.target;e=[];
for(h in a)switch(h){case "width":case "height":case "top":case "left":e.push(h+"="+a[h]);break;case "target":case "noopener":case "noreferrer":break;default:e.push(h+"="+(a[h]?1:0))}var h=e.join(",");(y("iPhone")&&!y("iPod")&&!y("iPad")||y("iPad")||y("iPod"))&&d.navigator&&d.navigator.standalone&&c&&"_self"!=c?(h=d.document.createElement("A"),b instanceof xd||b instanceof xd||(b=b.la?b.ja():String(b),Ad.test(b)||(b="about:invalid#zClosurez"),b=Cd(b)),h.href=zd(b),h.setAttribute("target",c),a.noreferrer&&
h.setAttribute("rel","noreferrer"),a=document.createEvent("MouseEvent"),a.initMouseEvent("click",!0,!0,d,1),h.dispatchEvent(a),h={}):a.noreferrer?(h=d.open("",c,h),a=zd(b),h&&(Ob&&x(a,";")&&(a="'"+a.replace(/'/g,"%27")+"'"),h.opener=null,pd("b/12014412, meta tag with sanitized URL"),a='<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url='+La(a)+'">',a=Gd(a),h.document.write(Fd(a)),h.document.close())):(h=d.open(zd(b),c,h))&&a.noopener&&(h.opener=null);if(h)try{h.focus()}catch(m){}return h}
function de(a){return new z(function(b){function c(){Fc(2E3).then(function(){if(!a||a.closed)b();else return c()})}return c()})}var ee=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;function fe(){var a=null;return(new z(function(b){"complete"==k.document.readyState?b():(a=function(){b()},qc(window,"load",a))})).m(function(b){F(window,"load",a);throw b;})}
function ge(){return he(void 0)?fe().then(function(){return new z(function(a,b){var c=k.document,d=setTimeout(function(){b(Error("Cordova framework is not ready."))},1E3);c.addEventListener("deviceready",function(){clearTimeout(d);a()},!1)})}):B(Error("Cordova must run in an Android or iOS file scheme."))}function he(a){a=a||I();return!("file:"!==ie()||!a.toLowerCase().match(/iphone|ipad|ipod|android/))}function je(){var a=k.window;try{return!(!a||a==a.top)}catch(b){return!1}}
function ke(){return"object"!==typeof k.window&&"function"===typeof k.importScripts}function le(){return firebase.INTERNAL.hasOwnProperty("reactNative")?"ReactNative":firebase.INTERNAL.hasOwnProperty("node")?"Node":ke()?"Worker":"Browser"}function me(){var a=le();return"ReactNative"===a||"Node"===a}var ce="Firefox",Zd="Chrome";
function Yd(a){var b=a.toLowerCase();if(x(b,"opera/")||x(b,"opr/")||x(b,"opios/"))return"Opera";if(x(b,"iemobile"))return"IEMobile";if(x(b,"msie")||x(b,"trident/"))return"IE";if(x(b,"edge/"))return"Edge";if(x(b,"firefox/"))return ce;if(x(b,"silk/"))return"Silk";if(x(b,"blackberry"))return"Blackberry";if(x(b,"webos"))return"Webos";if(!x(b,"safari/")||x(b,"chrome/")||x(b,"crios/")||x(b,"android"))if(!x(b,"chrome/")&&!x(b,"crios/")||x(b,"edge/")){if(x(b,"android"))return"Android";if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&
2==a.length)return a[1]}else return Zd;else return"Safari";return"Other"}var ne={Qc:"FirebaseCore-web",Sc:"FirebaseUI-web"};function oe(a,b){b=b||[];var c=[],d={},e;for(e in ne)d[ne[e]]=!0;for(e=0;e<b.length;e++)"undefined"!==typeof d[b[e]]&&(delete d[b[e]],c.push(b[e]));c.sort();b=c;b.length||(b=["FirebaseCore-web"]);c=le();"Browser"===c?(d=I(),c=Yd(d)):"Worker"===c&&(d=I(),c=Yd(d)+"-"+c);return c+"/JsCore/"+a+"/"+b.join(",")}function I(){return k.navigator&&k.navigator.userAgent||""}
function J(a,b){a=a.split(".");b=b||k;for(var c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);return b}function pe(){try{var a=k.localStorage,b=qe();if(a)return a.setItem(b,"1"),a.removeItem(b),Td()?!!k.indexedDB:!0}catch(c){return ke()&&!!k.indexedDB}return!1}function re(){return(se()||"chrome-extension:"===ie()||he())&&!me()&&pe()&&!ke()}function se(){return"http:"===ie()||"https:"===ie()}function ie(){return k.location&&k.location.protocol||null}
function te(a){a=a||I();return $d(a)||Yd(a)==ce?!1:!0}function ue(a){return"undefined"===typeof a?null:Nd(a)}function ve(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b}function we(a){if(null!==a)return JSON.parse(a)}function qe(a){return a?a:Math.floor(1E9*Math.random()).toString()}function xe(a){a=a||I();return"Safari"==Yd(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0}
function ye(){var a=k.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null}function ze(a,b){if(a>b)throw Error("Short delay should be less than long delay!");this.a=a;this.c=b;a=I();b=le();this.b=$d(a)||"ReactNative"===b}
ze.prototype.get=function(){var a=k.navigator;return(a&&"boolean"===typeof a.onLine&&(se()||"chrome-extension:"===ie()||"undefined"!==typeof a.connection)?a.onLine:1)?this.b?this.c:this.a:Math.min(5E3,this.a)};function Ae(){var a=k.document;return a&&"undefined"!==typeof a.visibilityState?"visible"==a.visibilityState:!0}
function Be(){var a=k.document,b=null;return Ae()||!a?A():(new z(function(c){b=function(){Ae()&&(a.removeEventListener("visibilitychange",b,!1),c())};a.addEventListener("visibilitychange",b,!1)})).m(function(c){a.removeEventListener("visibilitychange",b,!1);throw c;})}function Ce(a){try{var b=new Date(parseInt(a,10));if(!isNaN(b.getTime())&&!/[^0-9]/.test(a))return b.toUTCString()}catch(c){}return null}function De(){return!(!J("fireauth.oauthhelper",k)&&!J("fireauth.iframe",k))};var Ee={};var Fe;try{var Ge={};Object.defineProperty(Ge,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Ge,"abcd",{configurable:!0,enumerable:!0,value:2});Fe=2==Ge.abcd}catch(a){Fe=!1}function K(a,b,c){Fe?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c}function L(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&K(a,c,b[c])}function He(a){var b={};L(b,a);return b}function Ie(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}
function Je(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0}function Ke(a){var b=a;if("object"==typeof a&&null!=a){b="length"in a?[]:{};for(var c in a)K(b,c,Ke(a[c]))}return b};function Le(a){var b={},c=a[Me],d=a[Ne];a=a[Oe];if(!a||a!=Pe&&!c)throw Error("Invalid provider user info!");b[Qe]=d||null;b[Re]=c||null;K(this,Se,a);K(this,Te,Ke(b))}var Pe="EMAIL_SIGNIN",Me="email",Ne="newEmail",Oe="requestType",Re="email",Qe="fromEmail",Te="data",Se="operation";function M(a,b){this.code=Ue+a;this.message=b||Ve[a]||""}t(M,Error);M.prototype.C=function(){return{code:this.code,message:this.message}};M.prototype.toJSON=function(){return this.C()};function We(a){var b=a&&a.code;return b?new M(b.substring(Ue.length),a.message):null}
var Ue="auth/",Ve={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
"code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
"dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-already-in-use":"The email address is already in use by another account.","expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
"invalid-app-id":"The mobile app identifier is not registed for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal error has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
"invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.",
"invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
"invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
"invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.",
"auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal error has occurred.",
"missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
"network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.",
timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","user-cancelled":"User did not grant your application the permissions it requested.",
"user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled."};function Xe(a){var b=a[Ye];if("undefined"===typeof b)throw new M("missing-continue-uri");if("string"!==typeof b||"string"===typeof b&&!b.length)throw new M("invalid-continue-uri");this.h=b;this.b=this.a=null;this.g=!1;var c=a[Ze];if(c&&"object"===typeof c){b=c[$e];var d=c[af];c=c[bf];if("string"===typeof b&&b.length){this.a=b;if("undefined"!==typeof d&&"boolean"!==typeof d)throw new M("argument-error",af+" property must be a boolean when specified.");this.g=!!d;if("undefined"!==typeof c&&("string"!==
typeof c||"string"===typeof c&&!c.length))throw new M("argument-error",bf+" property must be a non empty string when specified.");this.b=c||null}else{if("undefined"!==typeof b)throw new M("argument-error",$e+" property must be a non empty string when specified.");if("undefined"!==typeof d||"undefined"!==typeof c)throw new M("missing-android-pkg-name");}}else if("undefined"!==typeof c)throw new M("argument-error",Ze+" property must be a non null object when specified.");this.f=null;if((b=a[cf])&&"object"===
typeof b)if(b=b[df],"string"===typeof b&&b.length)this.f=b;else{if("undefined"!==typeof b)throw new M("argument-error",df+" property must be a non empty string when specified.");}else if("undefined"!==typeof b)throw new M("argument-error",cf+" property must be a non null object when specified.");a=a[ef];if("undefined"!==typeof a&&"boolean"!==typeof a)throw new M("argument-error",ef+" property must be a boolean when specified.");this.c=!!a}
var Ze="android",ef="handleCodeInApp",cf="iOS",Ye="url",af="installApp",bf="minimumVersion",$e="packageName",df="bundleId";function ff(a){var b={};b.continueUrl=a.h;b.canHandleCodeInApp=a.c;if(b.androidPackageName=a.a)b.androidMinimumVersion=a.b,b.androidInstallApp=a.g;b.iOSBundleId=a.f;for(var c in b)null===b[c]&&delete b[c];return b};function gf(a){return Ba(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};var hf=null,jf=null;function kf(a){var b="";lf(a,function(a){b+=String.fromCharCode(a)});return b}function lf(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=jf[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}mf();for(var d=0;;){var e=c(-1),f=c(0),h=c(64),m=c(64);if(64===m&&-1===e)break;b(e<<2|f>>4);64!=h&&(b(f<<4&240|h>>2),64!=m&&b(h<<6&192|m))}}
function mf(){if(!hf){hf={};jf={};for(var a=0;65>a;a++)hf[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),jf[hf[a]]=a,62<=a&&(jf["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};function nf(a){this.c=a.sub;na();this.a=a.provider_id||a.firebase&&a.firebase.sign_in_provider||null;this.b=!!a.is_anonymous||"anonymous"==this.a}nf.prototype.f=function(){return this.b};function of(a){return(a=pf(a))&&a.sub&&a.iss&&a.aud&&a.exp?new nf(a):null}function pf(a){if(!a)return null;a=a.split(".");if(3!=a.length)return null;a=a[1];for(var b=(4-a.length%4)%4,c=0;c<b;c++)a+=".";try{return JSON.parse(kf(a))}catch(d){}return null};var qf="oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),rf=["client_id","response_type","scope","redirect_uri","state"],sf={Rc:{Ma:"locale",Aa:500,za:600,Na:"facebook.com",cb:rf},Tc:{Ma:null,Aa:500,za:620,Na:"github.com",cb:rf},Uc:{Ma:"hl",Aa:515,za:680,Na:"google.com",cb:rf},$c:{Ma:"lang",Aa:485,za:705,Na:"twitter.com",cb:qf}};function tf(a){for(var b in sf)if(sf[b].Na==a)return sf[b];return null};function uf(a){var b={};b["facebook.com"]=vf;b["google.com"]=wf;b["github.com"]=xf;b["twitter.com"]=yf;var c=a&&a[zf];try{if(c)return b[c]?new b[c](a):new Af(a);if("undefined"!==typeof a[Bf])return new Cf(a)}catch(d){}return null}var Bf="idToken",zf="providerId";
function Cf(a){var b=a[zf];if(!b&&a[Bf]){var c=of(a[Bf]);c&&c.a&&(b=c.a)}if(!b)throw Error("Invalid additional user info!");if("anonymous"==b||"custom"==b)b=null;c=!1;"undefined"!==typeof a.isNewUser?c=!!a.isNewUser:"identitytoolkit#SignupNewUserResponse"===a.kind&&(c=!0);K(this,"providerId",b);K(this,"isNewUser",c)}function Af(a){Cf.call(this,a);a=we(a.rawUserInfo||"{}");K(this,"profile",Ke(a||{}))}t(Af,Cf);
function vf(a){Af.call(this,a);if("facebook.com"!=this.providerId)throw Error("Invalid provider ID!");}t(vf,Af);function xf(a){Af.call(this,a);if("github.com"!=this.providerId)throw Error("Invalid provider ID!");K(this,"username",this.profile&&this.profile.login||null)}t(xf,Af);function wf(a){Af.call(this,a);if("google.com"!=this.providerId)throw Error("Invalid provider ID!");}t(wf,Af);
function yf(a){Af.call(this,a);if("twitter.com"!=this.providerId)throw Error("Invalid provider ID!");K(this,"username",a.screenName||null)}t(yf,Af);function Df(a){this.a=cd(a)};function Ef(a){var b=cd(a),c=bd(b,"link"),d=bd(cd(c),"link");b=bd(b,"deep_link_id");return bd(cd(b),"link")||b||d||c||a};function Ff(a,b){return a.then(function(a){if(a[Gf]){var c=of(a[Gf]);if(!c||b!=c.c)throw new M("user-mismatch");return a}throw new M("user-mismatch");}).m(function(a){throw a&&a.code&&a.code==Ue+"user-not-found"?new M("user-mismatch"):a;})}
function Hf(a,b,c){if(b.idToken||b.accessToken)b.idToken&&K(this,"idToken",b.idToken),b.accessToken&&K(this,"accessToken",b.accessToken);else if(b.oauthToken&&b.oauthTokenSecret)K(this,"accessToken",b.oauthToken),K(this,"secret",b.oauthTokenSecret);else throw new M("internal-error","failed to construct a credential");K(this,"providerId",a);K(this,"signInMethod",c)}Hf.prototype.xa=function(a){return If(a,Jf(this))};Hf.prototype.c=function(a,b){var c=Jf(this);c.idToken=b;return Kf(a,c)};
Hf.prototype.f=function(a,b){var c=Jf(this);return Ff(Lf(a,c),b)};function Jf(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.providerId;return{postBody:gd(b).toString(),requestUri:"http://localhost"}}
Hf.prototype.C=function(){var a={providerId:this.providerId,signInMethod:this.signInMethod};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};function Mf(a,b){this.Ac=b||[];L(this,{providerId:a,isOAuthProvider:!0});this.tb={};this.Za=(tf(a)||{}).Ma||null;this.Xa=null}Mf.prototype.Ca=function(a){this.tb=Za(a);return this};function N(a){Mf.call(this,a,rf);this.a=[]}t(N,Mf);
N.prototype.ta=function(a){Fa(this.a,a)||this.a.push(a);return this};N.prototype.yb=function(){return Ia(this.a)};N.prototype.credential=function(a,b){if(!a&&!b)throw new M("argument-error","credential failed: must provide the ID token and/or the access token.");return new Hf(this.providerId,{idToken:a||null,accessToken:b||null},this.providerId)};function Nf(){N.call(this,"facebook.com")}t(Nf,N);K(Nf,"PROVIDER_ID","facebook.com");K(Nf,"FACEBOOK_SIGN_IN_METHOD","facebook.com");
function Of(a){if(!a)throw new M("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;q(a)&&(b=a.accessToken);return(new Nf).credential(null,b)}function Pf(){N.call(this,"github.com")}t(Pf,N);K(Pf,"PROVIDER_ID","github.com");K(Pf,"GITHUB_SIGN_IN_METHOD","github.com");function Qf(a){if(!a)throw new M("argument-error","credential failed: expected 1 argument (the OAuth access token).");var b=a;q(a)&&(b=a.accessToken);return(new Pf).credential(null,b)}
function Rf(){N.call(this,"google.com");this.ta("profile")}t(Rf,N);K(Rf,"PROVIDER_ID","google.com");K(Rf,"GOOGLE_SIGN_IN_METHOD","google.com");function Sf(a,b){var c=a;q(a)&&(c=a.idToken,b=a.accessToken);return(new Rf).credential(c,b)}function Tf(){Mf.call(this,"twitter.com",qf)}t(Tf,Mf);K(Tf,"PROVIDER_ID","twitter.com");K(Tf,"TWITTER_SIGN_IN_METHOD","twitter.com");
function Uf(a,b){var c=a;q(c)||(c={oauthToken:a,oauthTokenSecret:b});if(!c.oauthToken||!c.oauthTokenSecret)throw new M("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");return new Hf("twitter.com",c,"twitter.com")}function Vf(a,b,c){this.a=a;this.b=b;K(this,"providerId","password");K(this,"signInMethod",c===O.EMAIL_LINK_SIGN_IN_METHOD?O.EMAIL_LINK_SIGN_IN_METHOD:O.EMAIL_PASSWORD_SIGN_IN_METHOD)}
Vf.prototype.xa=function(a){return this.signInMethod==O.EMAIL_LINK_SIGN_IN_METHOD?P(a,Wf,{email:this.a,oobCode:this.b}):P(a,Xf,{email:this.a,password:this.b})};Vf.prototype.c=function(a,b){return this.signInMethod==O.EMAIL_LINK_SIGN_IN_METHOD?P(a,Yf,{idToken:b,email:this.a,oobCode:this.b}):P(a,Zf,{idToken:b,email:this.a,password:this.b})};Vf.prototype.f=function(a,b){return Ff(this.xa(a),b)};Vf.prototype.C=function(){return{email:this.a,password:this.b,signInMethod:this.signInMethod}};
function O(){L(this,{providerId:"password",isOAuthProvider:!1})}function $f(a,b){b=ag(b);if(!b)throw new M("argument-error","Invalid email link!");return new Vf(a,b,O.EMAIL_LINK_SIGN_IN_METHOD)}function ag(a){a=Ef(a);a=new Df(a);var b=bd(a.a,"oobCode")||null;return"signIn"===(bd(a.a,"mode")||null)&&b?b:null}L(O,{PROVIDER_ID:"password"});L(O,{EMAIL_LINK_SIGN_IN_METHOD:"emailLink"});L(O,{EMAIL_PASSWORD_SIGN_IN_METHOD:"password"});
function bg(a){if(!(a.Ra&&a.Qa||a.Ea&&a.Z))throw new M("internal-error");this.a=a;K(this,"providerId","phone");K(this,"signInMethod","phone")}bg.prototype.xa=function(a){return a.Sa(cg(this))};bg.prototype.c=function(a,b){var c=cg(this);c.idToken=b;return P(a,dg,c)};bg.prototype.f=function(a,b){var c=cg(this);c.operation="REAUTH";a=P(a,eg,c);return Ff(a,b)};
bg.prototype.C=function(){var a={providerId:"phone"};this.a.Ra&&(a.verificationId=this.a.Ra);this.a.Qa&&(a.verificationCode=this.a.Qa);this.a.Ea&&(a.temporaryProof=this.a.Ea);this.a.Z&&(a.phoneNumber=this.a.Z);return a};function cg(a){return a.a.Ea&&a.a.Z?{temporaryProof:a.a.Ea,phoneNumber:a.a.Z}:{sessionInfo:a.a.Ra,code:a.a.Qa}}
function fg(a){try{this.a=a||firebase.auth()}catch(b){throw new M("argument-error","Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");}L(this,{providerId:"phone",isOAuthProvider:!1})}
fg.prototype.Sa=function(a,b){var c=this.a.b;return A(b.verify()).then(function(d){if(!l(d))throw new M("argument-error","An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");switch(b.type){case "recaptcha":return gg(c,{phoneNumber:a,recaptchaToken:d}).then(function(a){"function"===typeof b.reset&&b.reset();return a},function(a){"function"===typeof b.reset&&b.reset();throw a;});default:throw new M("argument-error",
'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');}})};function hg(a,b){if(!a)throw new M("missing-verification-id");if(!b)throw new M("missing-verification-code");return new bg({Ra:a,Qa:b})}L(fg,{PROVIDER_ID:"phone"});L(fg,{PHONE_SIGN_IN_METHOD:"phone"});
function ig(a){if(a.temporaryProof&&a.phoneNumber)return new bg({Ea:a.temporaryProof,Z:a.phoneNumber});var b=a&&a.providerId;if(!b||"password"===b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;try{switch(b){case "google.com":return Sf(a,c);case "facebook.com":return Of(c);case "github.com":return Qf(c);case "twitter.com":return Uf(c,d);default:return(new N(b)).credential(a,c)}}catch(e){return null}}
function jg(a){if(!a.isOAuthProvider)throw new M("invalid-oauth-provider");};function kg(a,b,c,d,e){this.b=a;this.c=b||null;this.f=c||null;this.g=d||null;this.a=e||null;if(this.f||this.a){if(this.f&&this.a)throw new M("invalid-auth-event");if(this.f&&!this.g)throw new M("invalid-auth-event");}else throw new M("invalid-auth-event");}kg.prototype.C=function(){return{type:this.b,eventId:this.c,urlResponse:this.f,sessionId:this.g,error:this.a&&this.a.C()}};function lg(a){a=a||{};return a.type?new kg(a.type,a.eventId,a.urlResponse,a.sessionId,a.error&&We(a.error)):null};function mg(){this.b=null;this.a=[]}var ng=null;mg.prototype.subscribe=function(a){var b=this;this.a.push(a);this.b||(this.b=function(a){for(var c=0;c<b.a.length;c++)b.a[c](a)},a=J("universalLinks.subscribe",k),"function"===typeof a&&a(null,this.b))};mg.prototype.unsubscribe=function(a){w(this.a,function(b){return b==a})};function og(a){var b="unauthorized-domain",c=void 0,d=cd(a);a=d.b;d=d.c;"chrome-extension"==d?c=Ja("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):"http"==d||"https"==d?c=Ja("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a):b="operation-not-supported-in-this-environment";
M.call(this,b,c)}t(og,M);function pg(a,b,c){M.call(this,a,c);a=b||{};a.ub&&K(this,"email",a.ub);a.Z&&K(this,"phoneNumber",a.Z);a.credential&&K(this,"credential",a.credential)}t(pg,M);pg.prototype.C=function(){var a={code:this.code,message:this.message};this.email&&(a.email=this.email);this.phoneNumber&&(a.phoneNumber=this.phoneNumber);var b=this.credential&&this.credential.C();b&&ab(a,b);return a};pg.prototype.toJSON=function(){return this.C()};
function qg(a){if(a.code){var b=a.code||"";0==b.indexOf(Ue)&&(b=b.substring(Ue.length));var c={credential:ig(a)};if(a.email)c.ub=a.email;else if(a.phoneNumber)c.Z=a.phoneNumber;else return new M(b,a.message||void 0);return new pg(b,c,a.message)}return null};var rg=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;function sg(){}sg.prototype.c=null;function tg(a){return a.c||(a.c=a.b())};var ug;function vg(){}t(vg,sg);vg.prototype.a=function(){var a=wg(this);return a?new ActiveXObject(a):new XMLHttpRequest};vg.prototype.b=function(){var a={};wg(this)&&(a[0]=!0,a[1]=!0);return a};
function wg(a){if(!a.f&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.f=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.f}ug=new vg;function xg(){}t(xg,sg);xg.prototype.a=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new yg;throw Error("Unsupported browser");};xg.prototype.b=function(){return{}};
function yg(){this.a=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText="";this.a.onload=r(this.bc,this);this.a.onerror=r(this.zb,this);this.a.onprogress=r(this.cc,this);this.a.ontimeout=r(this.fc,this)}g=yg.prototype;g.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.a.open(a,b)};
g.send=function(a){if(a)if("string"==typeof a)this.a.send(a);else throw Error("Only string data is supported");else this.a.send()};g.abort=function(){this.a.abort()};g.setRequestHeader=function(){};g.getResponseHeader=function(a){return"content-type"==a.toLowerCase()?this.a.contentType:""};g.bc=function(){this.status=200;this.responseText=this.a.responseText;zg(this,4)};g.zb=function(){this.status=500;this.responseText="";zg(this,4)};g.fc=function(){this.zb()};
g.cc=function(){this.status=200;zg(this,1)};function zg(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()}g.getAllResponseHeaders=function(){return"content-type: "+this.a.contentType};function Ag(a,b,c){this.reset(a,b,c,void 0,void 0)}Ag.prototype.a=null;var Bg=0;Ag.prototype.reset=function(a,b,c,d,e){"number"==typeof e||Bg++;d||na();delete this.a};function Cg(a){this.f=a;this.b=this.c=this.a=null}function Dg(a,b){this.name=a;this.value=b}Dg.prototype.toString=function(){return this.name};var Eg=new Dg("SEVERE",1E3),Fg=new Dg("WARNING",900),Gg=new Dg("CONFIG",700),Hg=new Dg("FINE",500);function Ig(a){if(a.c)return a.c;if(a.a)return Ig(a.a);ra("Root logger has no level set.");return null}Cg.prototype.log=function(a,b,c){if(a.value>=Ig(this).value)for(n(b)&&(b=b()),a=new Ag(a,String(b),this.f),c&&(a.a=c),c=this;c;)c=c.a};var Jg={},Kg=null;
function Lg(a){Kg||(Kg=new Cg(""),Jg[""]=Kg,Kg.c=Gg);var b;if(!(b=Jg[a])){b=new Cg(a);var c=a.lastIndexOf("."),d=a.substr(c+1);c=Lg(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;Jg[a]=b}return b};function Q(a,b){a&&a.log(Hg,b,void 0)};function Mg(a){this.f=a}t(Mg,sg);Mg.prototype.a=function(){return new Ng(this.f)};Mg.prototype.b=function(a){return function(){return a}}({});function Ng(a){G.call(this);this.j=a;this.readyState=Og;this.status=0;this.responseText=this.statusText="";this.onreadystatechange=null;this.g=new Headers;this.b=null;this.h="GET";this.c="";this.a=!1;this.f=Lg("goog.net.FetchXmlHttp")}t(Ng,G);var Og=0;g=Ng.prototype;
g.open=function(a,b){if(this.readyState!=Og)throw this.abort(),Error("Error reopening a connection");this.h=a;this.c=b;this.readyState=1;Pg(this)};g.send=function(a){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.a=!0;var b={headers:this.g,method:this.h,credentials:void 0,cache:void 0};a&&(b.body=a);this.j.fetch(new Request(this.c,b)).then(this.ec.bind(this),this.Ab.bind(this))};
g.abort=function(){this.responseText="";this.g=new Headers;this.status=0;1<=this.readyState&&this.a&&4!=this.readyState&&(this.readyState=4,this.a=!1,Pg(this));this.readyState=Og};g.ec=function(a){this.a&&(this.b||(this.b=a.headers,this.readyState=2,Pg(this)),this.a&&(this.readyState=3,Pg(this),this.a&&a.text().then(this.dc.bind(this,a),this.Ab.bind(this))))};g.dc=function(a,b){this.a&&(this.status=a.status,this.statusText=a.statusText,this.responseText=b,this.readyState=4,Pg(this))};
g.Ab=function(a){var b=this.f;b&&b.log(Fg,"Failed to fetch url "+this.c,a instanceof Error?a:Error(a));this.a&&(this.readyState=4,Pg(this))};g.setRequestHeader=function(a,b){this.g.append(a,b)};g.getResponseHeader=function(a){return this.b?this.b.get(a.toLowerCase())||"":((a=this.f)&&a.log(Fg,"Attempting to get response header but no headers have been received for url: "+this.c,void 0),"")};
g.getAllResponseHeaders=function(){if(!this.b){var a=this.f;a&&a.log(Fg,"Attempting to get all response headers but no headers have been received for url: "+this.c,void 0);return""}a=[];for(var b=this.b.entries(),c=b.next();!c.done;)c=c.value,a.push(c[0]+": "+c[1]),c=b.next();return a.join("\r\n")};function Pg(a){a.onreadystatechange&&a.onreadystatechange.call(a)};function Qg(a){G.call(this);this.headers=new Kc;this.D=a||null;this.c=!1;this.B=this.a=null;this.h=this.N=this.l="";this.f=this.I=this.j=this.G=!1;this.g=0;this.s=null;this.o=Rg;this.v=this.O=!1}t(Qg,G);var Rg="";Qg.prototype.b=Lg("goog.net.XhrIo");var Sg=/^https?$/i,Tg=["POST","PUT"];
function Ug(a,b,c,d,e){if(a.a)throw Error("[goog.net.XhrIo] Object is active with another request="+a.l+"; newUri="+b);c=c?c.toUpperCase():"GET";a.l=b;a.h="";a.N=c;a.G=!1;a.c=!0;a.a=a.D?a.D.a():ug.a();a.B=a.D?tg(a.D):tg(ug);a.a.onreadystatechange=r(a.Db,a);try{Q(a.b,Vg(a,"Opening Xhr")),a.I=!0,a.a.open(c,String(b),!0),a.I=!1}catch(h){Q(a.b,Vg(a,"Error opening Xhr: "+h.message));Wg(a,h);return}b=d||"";var f=new Kc(a.headers);e&&Ic(e,function(a,b){f.set(b,a)});e=Da(f.U());d=k.FormData&&b instanceof
k.FormData;!Fa(Tg,c)||e||d||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");f.forEach(function(a,b){this.a.setRequestHeader(b,a)},a);a.o&&(a.a.responseType=a.o);"withCredentials"in a.a&&a.a.withCredentials!==a.O&&(a.a.withCredentials=a.O);try{Xg(a),0<a.g&&(a.v=Yg(a.a),Q(a.b,Vg(a,"Will abort after "+a.g+"ms if incomplete, xhr2 "+a.v)),a.v?(a.a.timeout=a.g,a.a.ontimeout=r(a.Fa,a)):a.s=Ec(a.Fa,a.g,a)),Q(a.b,Vg(a,"Sending request")),a.j=!0,a.a.send(b),a.j=!1}catch(h){Q(a.b,Vg(a,
"Send error: "+h.message)),Wg(a,h)}}function Yg(a){return C&&Wb(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function Ea(a){return"content-type"==a.toLowerCase()}g=Qg.prototype;g.Fa=function(){"undefined"!=typeof aa&&this.a&&(this.h="Timed out after "+this.g+"ms, aborting",Q(this.b,Vg(this,this.h)),this.dispatchEvent("timeout"),this.abort(8))};function Wg(a,b){a.c=!1;a.a&&(a.f=!0,a.a.abort(),a.f=!1);a.h=b;Zg(a);$g(a)}
function Zg(a){a.G||(a.G=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))}g.abort=function(){this.a&&this.c&&(Q(this.b,Vg(this,"Aborting")),this.c=!1,this.f=!0,this.a.abort(),this.f=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),$g(this))};g.ua=function(){this.a&&(this.c&&(this.c=!1,this.f=!0,this.a.abort(),this.f=!1),$g(this,!0));Qg.lb.ua.call(this)};g.Db=function(){this.pa||(this.I||this.j||this.f?ah(this):this.tc())};g.tc=function(){ah(this)};
function ah(a){if(a.c&&"undefined"!=typeof aa)if(a.B[1]&&4==bh(a)&&2==ch(a))Q(a.b,Vg(a,"Local request error detected and ignored"));else if(a.j&&4==bh(a))Ec(a.Db,0,a);else if(a.dispatchEvent("readystatechange"),4==bh(a)){Q(a.b,Vg(a,"Request complete"));a.c=!1;try{var b=ch(a);a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.l).match(Nc)[1]||null;if(!f&&k.self&&k.self.location){var h=k.self.location.protocol;
f=h.substr(0,h.length-1)}e=!Sg.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{try{var m=2<bh(a)?a.a.statusText:""}catch(p){Q(a.b,"Can not get status: "+p.message),m=""}a.h=m+" ["+ch(a)+"]";Zg(a)}}finally{$g(a)}}}function $g(a,b){if(a.a){Xg(a);var c=a.a,d=a.B[0]?ca:null;a.a=null;a.B=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.b)&&a.log(Eg,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}}
function Xg(a){a.a&&a.v&&(a.a.ontimeout=null);a.s&&(k.clearTimeout(a.s),a.s=null)}function bh(a){return a.a?a.a.readyState:0}function ch(a){try{return 2<bh(a)?a.a.status:-1}catch(b){return-1}}function dh(a){try{return a.a?a.a.responseText:""}catch(b){return Q(a.b,"Can not get responseText: "+b.message),""}}
g.getResponse=function(){try{if(!this.a)return null;if("response"in this.a)return this.a.response;switch(this.o){case Rg:case "text":return this.a.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in this.a)return this.a.mozResponseArrayBuffer}var a=this.b;a&&a.log(Eg,"Response type "+this.o+" is not supported on this browser",void 0);return null}catch(b){return Q(this.b,"Can not get response: "+b.message),null}};function Vg(a,b){return b+" ["+a.N+" "+a.l+" "+ch(a)+"]"};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function eh(a,b){this.g=[];this.v=a;this.s=b||null;this.f=this.a=!1;this.c=void 0;this.u=this.B=this.j=!1;this.h=0;this.b=null;this.l=0}eh.prototype.cancel=function(a){if(this.a)this.c instanceof eh&&this.c.cancel();else{if(this.b){var b=this.b;delete this.b;a?b.cancel(a):(b.l--,0>=b.l&&b.cancel())}this.v?this.v.call(this.s,this):this.u=!0;this.a||(a=new fh(this),gh(this),hh(this,!1,a))}};eh.prototype.o=function(a,b){this.j=!1;hh(this,a,b)};function hh(a,b,c){a.a=!0;a.c=c;a.f=!b;ih(a)}
function gh(a){if(a.a){if(!a.u)throw new jh(a);a.u=!1}}eh.prototype.D=function(){gh(this);hh(this,!0,null)};function kh(a,b){lh(a,null,b,void 0)}function lh(a,b,c,d){a.g.push([b,c,d]);a.a&&ih(a)}eh.prototype.then=function(a,b,c){var d,e,f=new z(function(a,b){d=a;e=b});lh(this,d,function(a){a instanceof fh?f.cancel():e(a)});return f.then(a,b,c)};oa(eh);function mh(a){return Ca(a.g,function(a){return n(a[1])})}
function ih(a){if(a.h&&a.a&&mh(a)){var b=a.h,c=nh[b];c&&(k.clearTimeout(c.a),delete nh[b]);a.h=0}a.b&&(a.b.l--,delete a.b);b=a.c;for(var d=c=!1;a.g.length&&!a.j;){var e=a.g.shift(),f=e[0],h=e[1];e=e[2];if(f=a.f?h:f)try{var m=f.call(e||a.s,b);void 0!==m&&(a.f=a.f&&(m==b||m instanceof Error),a.c=b=m);if(pa(b)||"function"===typeof k.Promise&&b instanceof k.Promise)d=!0,a.j=!0}catch(p){b=p,a.f=!0,mh(a)||(c=!0)}}a.c=b;d&&(m=r(a.o,a,!0),d=r(a.o,a,!1),b instanceof eh?(lh(b,m,d),b.B=!0):b.then(m,d));c&&(b=
new oh(b),nh[b.a]=b,a.h=b.a)}function jh(){u.call(this)}t(jh,u);jh.prototype.message="Deferred has already fired";jh.prototype.name="AlreadyCalledError";function fh(){u.call(this)}t(fh,u);fh.prototype.message="Deferred was canceled";fh.prototype.name="CanceledError";function oh(a){this.a=k.setTimeout(r(this.c,this),0);this.b=a}oh.prototype.c=function(){delete nh[this.a];throw this.b;};var nh={};function ph(a){var b={},c=b.document||document,d=sd(a),e=document.createElement("SCRIPT"),f={Fb:e,Fa:void 0},h=new eh(qh,f),m=null,p=null!=b.timeout?b.timeout:5E3;0<p&&(m=window.setTimeout(function(){rh(e,!0);var a=new sh(th,"Timeout reached for loading script "+d);gh(h);hh(h,!1,a)},p),f.Fa=m);e.onload=e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(rh(e,b.bd||!1,m),h.D())};e.onerror=function(){rh(e,!0,m);var a=new sh(uh,"Error while loading script "+
d);gh(h);hh(h,!1,a)};f=b.attributes||{};ab(f,{type:"text/javascript",charset:"UTF-8"});Id(e,f);e.src=sd(a);vh(c).appendChild(e);return h}function vh(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement}function qh(){if(this&&this.Fb){var a=this.Fb;a&&"SCRIPT"==a.tagName&&rh(a,!0,this.Fa)}}
function rh(a,b,c){null!=c&&k.clearTimeout(c);a.onload=ca;a.onerror=ca;a.onreadystatechange=ca;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)}var uh=0,th=1;function sh(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a}t(sh,u);function wh(a){this.f=a}t(wh,sg);wh.prototype.a=function(){return new this.f};wh.prototype.b=function(){return{}};
function xh(a,b,c){this.b=a;a=b||{};this.j=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.l=a.secureTokenTimeout||yh;this.f=Za(a.secureTokenHeaders||zh);this.g=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.h=a.firebaseTimeout||Ah;this.a=Za(a.firebaseHeaders||Bh);c&&(this.a["X-Client-Version"]=c,this.f["X-Client-Version"]=c);c="Node"==le();c=k.XMLHttpRequest||c&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!c&&
!ke())throw new M("internal-error","The XMLHttpRequest compatibility library was not found.");this.c=void 0;ke()?this.c=new Mg(self):me()?this.c=new wh(c):this.c=new xg}var Ch,Gf="idToken",yh=new ze(3E4,6E4),zh={"Content-Type":"application/x-www-form-urlencoded"},Ah=new ze(3E4,6E4),Bh={"Content-Type":"application/json"};function Dh(a,b){b?a.a["X-Firebase-Locale"]=b:delete a.a["X-Firebase-Locale"]}
function Eh(a,b){b?(a.a["X-Client-Version"]=b,a.f["X-Client-Version"]=b):(delete a.a["X-Client-Version"],delete a.f["X-Client-Version"])}function Fh(a,b,c,d,e,f,h){Xd()||ke()?a=r(a.o,a):(Ch||(Ch=new z(function(a,b){Gh(a,b)})),a=r(a.u,a));a(b,c,d,e,f,h)}
xh.prototype.o=function(a,b,c,d,e,f){if(ke()&&("undefined"===typeof k.fetch||"undefined"===typeof k.Headers||"undefined"===typeof k.Request))throw new M("operation-not-supported-in-this-environment","fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.");var h=new Qg(this.c);if(f){h.g=Math.max(0,f);var m=setTimeout(function(){h.dispatchEvent("timeout")},f)}sc(h,"complete",function(){m&&clearTimeout(m);var a=null;try{a=
JSON.parse(dh(this))||null}catch(E){a=null}b&&b(a)});yc(h,"ready",function(){m&&clearTimeout(m);Ib(this)});yc(h,"timeout",function(){m&&clearTimeout(m);Ib(this);b&&b(null)});Ug(h,a,c,d,e)};var Hh=pd("https://apis.google.com/js/client.js?onload=%{onload}"),Ih="__fcb"+Math.floor(1E6*Math.random()).toString();
function Gh(a,b){if(((window.gapi||{}).client||{}).request)a();else{k[Ih]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))};var c=td(Hh,{onload:Ih});kh(ph(c),function(){b(Error("CORS_UNSUPPORTED"))})}}
xh.prototype.u=function(a,b,c,d,e){var f=this;Ch.then(function(){window.gapi.client.setApiKey(f.b);var h=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(h);b&&b(a)}})}).m(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
function Jh(a,b){return new z(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?Fh(a,a.j+"?key="+encodeURIComponent(a.b),function(a){a?a.error?d(Kh(a)):a.access_token&&a.refresh_token?c(a):d(new M("internal-error")):d(new M("network-request-failed"))},"POST",gd(b).toString(),a.f,a.l.get()):d(new M("internal-error"))})}
function Lh(a,b,c,d,e,f){var h=cd(a.g+b);H(h,"key",a.b);f&&H(h,"cb",na().toString());var m="GET"==c;if(m)for(var p in d)d.hasOwnProperty(p)&&H(h,p,d[p]);return new z(function(b,f){Fh(a,h.toString(),function(a){a?a.error?f(Kh(a,e||{})):b(a):f(new M("network-request-failed"))},c,m?void 0:Nd(ve(d)),a.a,a.h.get())})}function Mh(a){if(!rg.test(a.email))throw new M("invalid-email");}function Nh(a){"email"in a&&Mh(a)}
function Oh(a,b){return P(a,Ph,{identifier:b,continueUri:se()?Ud():"http://localhost"}).then(function(a){return a.allProviders||[]})}function Qh(a,b){return P(a,Ph,{identifier:b,continueUri:se()?Ud():"http://localhost"}).then(function(a){return a.signinMethods||[]})}function Rh(a){return P(a,Sh,{}).then(function(a){return a.authorizedDomains||[]})}function Th(a){if(!a[Gf])throw new M("internal-error");}
function Uh(a){if(a.phoneNumber||a.temporaryProof){if(!a.phoneNumber||!a.temporaryProof)throw new M("internal-error");}else{if(!a.sessionInfo)throw new M("missing-verification-id");if(!a.code)throw new M("missing-verification-code");}}xh.prototype.jb=function(){return P(this,Vh,{})};xh.prototype.mb=function(a,b){return P(this,Wh,{idToken:a,email:b})};xh.prototype.nb=function(a,b){return P(this,Zf,{idToken:a,password:b})};var Xh={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};g=xh.prototype;
g.ob=function(a,b){var c={idToken:a},d=[];Xa(Xh,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return P(this,Wh,c)};g.gb=function(a,b){a={requestType:"PASSWORD_RESET",email:a};ab(a,b);return P(this,Yh,a)};g.hb=function(a,b){a={requestType:"EMAIL_SIGNIN",email:a};ab(a,b);return P(this,Zh,a)};g.fb=function(a,b){a={requestType:"VERIFY_EMAIL",idToken:a};ab(a,b);return P(this,$h,a)};function gg(a,b){return P(a,ai,b)}g.Sa=function(a){return P(this,bi,a)};
function ci(a,b,c){return P(a,di,{idToken:b,deleteProvider:c})}function ei(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new M("internal-error");}
function fi(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=qg(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=qg(a)):"EMAIL_EXISTS"==a.errorMessage?(a.code="email-already-in-use",b=qg(a)):a.errorMessage&&(b=gi(a.errorMessage));if(b)throw b;if(!a[Gf])throw new M("internal-error");}function If(a,b){b.returnIdpCredential=!0;return P(a,hi,b)}function Kf(a,b){b.returnIdpCredential=!0;return P(a,ii,b)}
function Lf(a,b){b.returnIdpCredential=!0;b.autoCreate=!1;return P(a,ji,b)}function ki(a){if(!a.oobCode)throw new M("invalid-action-code");}g.Wa=function(a,b){return P(this,li,{oobCode:a,newPassword:b})};g.Ia=function(a){return P(this,mi,{oobCode:a})};g.Ua=function(a){return P(this,ni,{oobCode:a})};
var ni={endpoint:"setAccountInfo",A:ki,ba:"email"},mi={endpoint:"resetPassword",A:ki,J:function(a){var b=a.requestType;if(!b||!a.email&&"EMAIL_SIGNIN"!=b)throw new M("internal-error");}},oi={endpoint:"signupNewUser",A:function(a){Mh(a);if(!a.password)throw new M("weak-password");},J:Th,R:!0},Ph={endpoint:"createAuthUri"},pi={endpoint:"deleteAccount",T:["idToken"]},di={endpoint:"setAccountInfo",T:["idToken","deleteProvider"],A:function(a){if(!fa(a.deleteProvider))throw new M("internal-error");}},Wf=
{endpoint:"emailLinkSignin",T:["email","oobCode"],A:Mh,J:Th,R:!0},Yf={endpoint:"emailLinkSignin",T:["idToken","email","oobCode"],A:Mh,J:Th,R:!0},qi={endpoint:"getAccountInfo"},Zh={endpoint:"getOobConfirmationCode",T:["requestType"],A:function(a){if("EMAIL_SIGNIN"!=a.requestType)throw new M("internal-error");Mh(a)},ba:"email"},$h={endpoint:"getOobConfirmationCode",T:["idToken","requestType"],A:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new M("internal-error");},ba:"email"},Yh={endpoint:"getOobConfirmationCode",
T:["requestType"],A:function(a){if("PASSWORD_RESET"!=a.requestType)throw new M("internal-error");Mh(a)},ba:"email"},Sh={pb:!0,endpoint:"getProjectConfig",Cb:"GET"},ri={pb:!0,endpoint:"getRecaptchaParam",Cb:"GET",J:function(a){if(!a.recaptchaSiteKey)throw new M("internal-error");}},li={endpoint:"resetPassword",A:ki,ba:"email"},ai={endpoint:"sendVerificationCode",T:["phoneNumber","recaptchaToken"],ba:"sessionInfo"},Wh={endpoint:"setAccountInfo",T:["idToken"],A:Nh,R:!0},Zf={endpoint:"setAccountInfo",
T:["idToken"],A:function(a){Nh(a);if(!a.password)throw new M("weak-password");},J:Th,R:!0},Vh={endpoint:"signupNewUser",J:Th,R:!0},hi={endpoint:"verifyAssertion",A:ei,J:fi,R:!0},ji={endpoint:"verifyAssertion",A:ei,J:function(a){if(a.errorMessage&&"USER_NOT_FOUND"==a.errorMessage)throw new M("user-not-found");if(a.errorMessage)throw gi(a.errorMessage);if(!a[Gf])throw new M("internal-error");},R:!0},ii={endpoint:"verifyAssertion",A:function(a){ei(a);if(!a.idToken)throw new M("internal-error");},J:fi,
R:!0},si={endpoint:"verifyCustomToken",A:function(a){if(!a.token)throw new M("invalid-custom-token");},J:Th,R:!0},Xf={endpoint:"verifyPassword",A:function(a){Mh(a);if(!a.password)throw new M("wrong-password");},J:Th,R:!0},bi={endpoint:"verifyPhoneNumber",A:Uh,J:Th},dg={endpoint:"verifyPhoneNumber",A:function(a){if(!a.idToken)throw new M("internal-error");Uh(a)},J:function(a){if(a.temporaryProof)throw a.code="credential-already-in-use",qg(a);Th(a)}},eg={Tb:{USER_NOT_FOUND:"user-not-found"},endpoint:"verifyPhoneNumber",
A:Uh,J:Th};function P(a,b,c){if(!Je(c,b.T))return B(new M("internal-error"));var d=b.Cb||"POST",e;return A(c).then(b.A).then(function(){b.R&&(c.returnSecureToken=!0);return Lh(a,b.endpoint,d,c,b.Tb,b.pb||!1)}).then(function(a){return e=a}).then(b.J).then(function(){if(!b.ba)return e;if(!(b.ba in e))throw new M("internal-error");return e[b.ba]})}function gi(a){return Kh({error:{errors:[{message:a}],code:400,message:a}})}
function Kh(a,b){var c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?new M(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",
MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",INVALID_MESSAGE_PAYLOAD:"invalid-message-payload",INVALID_RECIPIENT_EMAIL:"invalid-recipient-email",INVALID_SENDER:"invalid-sender",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",
INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",CORS_UNSUPPORTED:"cors-unsupported",DYNAMIC_LINK_NOT_ACTIVATED:"dynamic-link-not-activated",INVALID_APP_ID:"invalid-app-id",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",USER_CANCELLED:"user-cancelled",CAPTCHA_CHECK_FAILED:"captcha-check-failed",INVALID_APP_CREDENTIAL:"invalid-app-credential",INVALID_CODE:"invalid-verification-code",
INVALID_PHONE_NUMBER:"invalid-phone-number",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_APP_CREDENTIAL:"missing-app-credential",MISSING_CODE:"missing-verification-code",MISSING_PHONE_NUMBER:"missing-phone-number",MISSING_SESSION_INFO:"missing-verification-id",QUOTA_EXCEEDED:"quota-exceeded",SESSION_EXPIRED:"code-expired",INVALID_CONTINUE_URI:"invalid-continue-uri",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",MISSING_IOS_BUNDLE_ID:"missing-ios-bundle-id",
UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",INVALID_CERT_HASH:"invalid-cert-hash"};ab(d,b||{});b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new M(d[e],b);!b&&a&&(b=ue(a));return new M("internal-error",b)};var ti={Wc:{Ya:"https://www.googleapis.com/identitytoolkit/v3/relyingparty/",eb:"https://securetoken.googleapis.com/v1/token",id:"p"},Yc:{Ya:"https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",eb:"https://staging-securetoken.sandbox.googleapis.com/v1/token",id:"s"},Zc:{Ya:"https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",eb:"https://test-securetoken.sandbox.googleapis.com/v1/token",id:"t"}};
function ui(a){for(var b in ti)if(ti[b].id===a)return a=ti[b],{firebaseEndpoint:a.Ya,secureTokenEndpoint:a.eb};return null}var vi;vi=ui("__EID__")?"__EID__":void 0;function wi(a){this.b=a;this.a=null;this.ab=xi(this)}
function xi(a){return yi().then(function(){return new z(function(b,c){J("gapi.iframes.getContext")().open({where:document.body,url:a.b,messageHandlersFilter:J("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"),attributes:{style:{position:"absolute",top:"-100px",width:"1px",height:"1px"}},dontclear:!0},function(d){function e(){clearTimeout(f);b()}a.a=d;a.a.restyle({setHideOnLeave:!1});var f=setTimeout(function(){c(Error("Network Error"))},zi.get());d.ping(e).then(e,function(){c(Error("Network Error"))})})})})}
function Ai(a,b){return a.ab.then(function(){return new z(function(c){a.a.send(b.type,b,c,J("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})})}function Bi(a,b){a.ab.then(function(){a.a.register("authEvent",b,J("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})}var Ci=pd("https://apis.google.com/js/api.js?onload=%{onload}"),Di=new ze(3E4,6E4),zi=new ze(5E3,15E3),Ei=null;
function yi(){return Ei?Ei:Ei=(new z(function(a,b){function c(){ye();J("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){ye();b(Error("Network Error"))},timeout:Di.get()})}if(J("gapi.iframes.Iframe"))a();else if(J("gapi.load"))c();else{var d="__iframefcb"+Math.floor(1E6*Math.random()).toString();k[d]=function(){J("gapi.load")?c():b(Error("Network Error"))};d=td(Ci,{onload:d});A(ph(d)).m(function(){b(Error("Network Error"))})}})).m(function(a){Ei=null;throw a;})};function Fi(a,b,c){this.j=a;this.g=b;this.h=c;this.f=null;this.a=dd(this.j,"/__/auth/iframe");H(this.a,"apiKey",this.g);H(this.a,"appName",this.h);this.b=null;this.c=[]}Fi.prototype.toString=function(){this.f?H(this.a,"v",this.f):jd(this.a.a,"v");this.b?H(this.a,"eid",this.b):jd(this.a.a,"eid");this.c.length?H(this.a,"fw",this.c.join(",")):jd(this.a.a,"fw");return this.a.toString()};function Gi(a,b,c,d,e){this.o=a;this.u=b;this.c=c;this.l=d;this.h=this.g=this.j=null;this.a=e;this.f=null}
Gi.prototype.toString=function(){var a=dd(this.o,"/__/auth/handler");H(a,"apiKey",this.u);H(a,"appName",this.c);H(a,"authType",this.l);if(this.a.isOAuthProvider){var b=this.a;try{var c=firebase.app(this.c).auth().ca()}catch(m){c=null}b.Xa=c;H(a,"providerId",this.a.providerId);b=this.a;c=ve(b.tb);for(var d in c)c[d]=c[d].toString();d=b.Ac;c=Za(c);for(var e=0;e<d.length;e++){var f=d[e];f in c&&delete c[f]}b.Za&&b.Xa&&!c[b.Za]&&(c[b.Za]=b.Xa);Ya(c)||H(a,"customParameters",ue(c))}"function"===typeof this.a.yb&&
(b=this.a.yb(),b.length&&H(a,"scopes",b.join(",")));this.j?H(a,"redirectUrl",this.j):jd(a.a,"redirectUrl");this.g?H(a,"eventId",this.g):jd(a.a,"eventId");this.h?H(a,"v",this.h):jd(a.a,"v");if(this.b)for(var h in this.b)this.b.hasOwnProperty(h)&&!bd(a,h)&&H(a,h,this.b[h]);this.f?H(a,"eid",this.f):jd(a.a,"eid");h=Hi(this.c);h.length&&H(a,"fw",h.join(","));return a.toString()};function Hi(a){try{return firebase.app(a).auth().Ka()}catch(b){return[]}}
function Ii(a,b,c,d,e){this.u=a;this.f=b;this.b=c;this.c=d||null;this.h=e||null;this.o=this.s=this.v=null;this.g=[];this.l=this.a=null}
function Ji(a){var b=Ud();return Rh(a).then(function(a){a:{var c=cd(b),e=c.c;c=c.b;for(var f=0;f<a.length;f++){var h=a[f];var m=c;var p=e;0==h.indexOf("chrome-extension://")?m=cd(h).b==m&&"chrome-extension"==p:"http"!=p&&"https"!=p?m=!1:ee.test(h)?m=m==h:(h=h.split(".").join("\\."),m=(new RegExp("^(.+\\."+h+"|"+h+")$","i")).test(m));if(m){a=!0;break a}}a=!1}if(!a)throw new og(Ud());})}
function Ki(a){if(a.l)return a.l;a.l=fe().then(function(){if(!a.s){var b=a.c,c=a.h,d=Hi(a.b),e=new Fi(a.u,a.f,a.b);e.f=b;e.b=c;e.c=Ia(d||[]);a.s=e.toString()}a.j=new wi(a.s);Li(a)});return a.l}g=Ii.prototype;g.Da=function(a,b,c){var d=new M("popup-closed-by-user"),e=new M("web-storage-unsupported"),f=this,h=!1;return this.ea().then(function(){Mi(f).then(function(c){c||(a&&ae(a),b(e),h=!0)})}).m(function(){}).then(function(){if(!h)return de(a)}).then(function(){if(!h)return Fc(c).then(function(){b(d)})})};
g.Gb=function(){var a=I();return!te(a)&&!xe(a)};g.Bb=function(){return!1};
g.xb=function(a,b,c,d,e,f,h){if(!a)return B(new M("popup-blocked"));if(h&&!te())return this.ea().m(function(b){ae(a);e(b)}),d(),A();this.a||(this.a=Ji(Ni(this)));var m=this;return this.a.then(function(){var b=m.ea().m(function(b){ae(a);e(b);throw b;});d();return b}).then(function(){jg(c);if(!h){var d=Oi(m.u,m.f,m.b,b,c,null,f,m.c,void 0,m.h);Vd(d,a)}}).m(function(a){"auth/network-request-failed"==a.code&&(m.a=null);throw a;})};
function Ni(a){a.o||(a.v=a.c?oe(a.c,Hi(a.b)):null,a.o=new xh(a.f,ui(a.h),a.v));return a.o}g.Ba=function(a,b,c){this.a||(this.a=Ji(Ni(this)));var d=this;return this.a.then(function(){jg(b);var e=Oi(d.u,d.f,d.b,a,b,Ud(),c,d.c,void 0,d.h);Vd(e)}).m(function(a){"auth/network-request-failed"==a.code&&(d.a=null);throw a;})};g.ea=function(){var a=this;return Ki(this).then(function(){return a.j.ab}).m(function(){a.a=null;throw new M("network-request-failed");})};g.Lb=function(){return!0};
function Oi(a,b,c,d,e,f,h,m,p,E){a=new Gi(a,b,c,d,e);a.j=f;a.g=h;a.h=m;a.b=Za(p||null);a.f=E;return a.toString()}function Li(a){if(!a.j)throw Error("IfcHandler must be initialized!");Bi(a.j,function(b){var c={};if(b&&b.authEvent){var d=!1;b=lg(b.authEvent);for(c=0;c<a.g.length;c++)d=a.g[c](b)||d;c={};c.status=d?"ACK":"ERROR";return A(c)}c.status="ERROR";return A(c)})}
function Mi(a){var b={type:"webStorageSupport"};return Ki(a).then(function(){return Ai(a.j,b)}).then(function(a){if(a&&a.length&&"undefined"!==typeof a[0].webStorageSupport)return a[0].webStorageSupport;throw Error();})}g.va=function(a){this.g.push(a)};g.Ja=function(a){w(this.g,function(b){return b==a})};function Pi(a){this.a=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.a)throw new M("internal-error","The React Native compatibility library was not found.");this.type="asyncStorage"}g=Pi.prototype;g.get=function(a){return A(this.a.getItem(a)).then(function(a){return a&&we(a)})};g.set=function(a,b){return A(this.a.setItem(a,ue(b)))};g.P=function(a){return A(this.a.removeItem(a))};g.Y=function(){};g.aa=function(){};function Qi(){if(!Ri())throw new M("web-storage-unsupported");this.f={};this.a=[];this.b=0;this.g=k.indexedDB;this.type="indexedDB"}var Si;function Ti(a){return new z(function(b,c){var d=a.g.deleteDatabase("firebaseLocalStorageDb");d.onsuccess=function(){b()};d.onerror=function(a){c(Error(a.target.error))}})}
function Ui(a){return new z(function(b,c){var d=a.g.open("firebaseLocalStorageDb",1);d.onerror=function(a){try{a.preventDefault()}catch(f){}c(Error(a.target.error))};d.onupgradeneeded=function(a){a=a.target.result;try{a.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(f){c(f)}};d.onsuccess=function(d){d=d.target.result;d.objectStoreNames.contains("firebaseLocalStorage")?b(d):Ti(a).then(function(){return Ui(a)}).then(function(a){b(a)}).m(function(a){c(a)})}})}
function Vi(a){a.h||(a.h=Ui(a));return a.h}function Ri(){try{return!!k.indexedDB}catch(a){return!1}}function Wi(a){return a.objectStore("firebaseLocalStorage")}function Xi(a,b){return a.transaction(["firebaseLocalStorage"],b?"readwrite":"readonly")}function Yi(a){return new z(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})}g=Qi.prototype;
g.set=function(a,b){var c=!1,d,e=this;return Vi(this).then(function(b){d=b;b=Wi(Xi(d,!0));return Yi(b.get(a))}).then(function(f){var h=Wi(Xi(d,!0));if(f)return f.value=b,Yi(h.put(f));e.b++;c=!0;f={};f.fbase_key=a;f.value=b;return Yi(h.add(f))}).then(function(){e.f[a]=b}).ha(function(){c&&e.b--})};g.get=function(a){return Vi(this).then(function(b){return Yi(Wi(Xi(b,!1)).get(a))}).then(function(a){return a&&a.value})};
g.P=function(a){var b=!1,c=this;return Vi(this).then(function(d){b=!0;c.b++;return Yi(Wi(Xi(d,!0))["delete"](a))}).then(function(){delete c.f[a]}).ha(function(){b&&c.b--})};
g.Jc=function(){var a=this;return Vi(this).then(function(a){var b=Wi(Xi(a,!1));return b.getAll?Yi(b.getAll()):new z(function(a,c){var d=[],e=b.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){c(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.b){for(d=0;d<b.length;d++)c[b[d].fbase_key]=b[d].value;d=Wd(a.f,c);a.f=c}return d})};g.Y=function(a){0==this.a.length&&Zi(this);this.a.push(a)};
g.aa=function(a){w(this.a,function(b){return b==a});0==this.a.length&&this.c&&this.c.cancel("STOP_EVENT")};function Zi(a){function b(){a.c=Fc(800).then(r(a.Jc,a)).then(function(b){0<b.length&&v(a.a,function(a){a(b)})}).then(b).m(function(a){"STOP_EVENT"!=a.message&&b()});return a.c}a.c&&a.c.cancel("STOP_EVENT");b()};function $i(a){var b=this,c=null;this.a=[];this.type="indexedDB";this.c=a;this.b=A().then(function(){return Ri()?(Si||(Si=new Qi),c=Si,c.set("__sak","!").then(function(){return c.get("__sak")}).then(function(a){if("!"!==a)throw Error("indexedDB not supported!");return c.P("__sak")}).then(function(){return c}).m(function(){return b.c})):b.c}).then(function(a){b.type=a.type;a.Y(function(a){v(b.a,function(b){b(a)})});return a})}g=$i.prototype;g.get=function(a){return this.b.then(function(b){return b.get(a)})};
g.set=function(a,b){return this.b.then(function(c){return c.set(a,b)})};g.P=function(a){return this.b.then(function(b){return b.P(a)})};g.Y=function(a){this.a.push(a)};g.aa=function(a){w(this.a,function(b){return b==a})};function aj(){this.a={};this.type="inMemory"}g=aj.prototype;g.get=function(a){return A(this.a[a])};g.set=function(a,b){this.a[a]=b;return A()};g.P=function(a){delete this.a[a];return A()};g.Y=function(){};g.aa=function(){};function bj(){if(!cj()){if("Node"==le())throw new M("internal-error","The LocalStorage compatibility library was not found.");throw new M("web-storage-unsupported");}this.a=dj()||firebase.INTERNAL.node.localStorage;this.type="localStorage"}function dj(){try{var a=k.localStorage,b=qe();a&&(a.setItem(b,"1"),a.removeItem(b));return a}catch(c){return null}}
function cj(){var a="Node"==le();a=dj()||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}}g=bj.prototype;g.get=function(a){var b=this;return A().then(function(){var c=b.a.getItem(a);return we(c)})};g.set=function(a,b){var c=this;return A().then(function(){var d=ue(b);null===d?c.P(a):c.a.setItem(a,d)})};g.P=function(a){var b=this;return A().then(function(){b.a.removeItem(a)})};
g.Y=function(a){k.window&&pc(k.window,"storage",a)};g.aa=function(a){k.window&&F(k.window,"storage",a)};function ej(){this.type="nullStorage"}g=ej.prototype;g.get=function(){return A(null)};g.set=function(){return A()};g.P=function(){return A()};g.Y=function(){};g.aa=function(){};function fj(){if(!gj()){if("Node"==le())throw new M("internal-error","The SessionStorage compatibility library was not found.");throw new M("web-storage-unsupported");}this.a=hj()||firebase.INTERNAL.node.sessionStorage;this.type="sessionStorage"}function hj(){try{var a=k.sessionStorage,b=qe();a&&(a.setItem(b,"1"),a.removeItem(b));return a}catch(c){return null}}
function gj(){var a="Node"==le();a=hj()||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}}g=fj.prototype;g.get=function(a){var b=this;return A().then(function(){var c=b.a.getItem(a);return we(c)})};g.set=function(a,b){var c=this;return A().then(function(){var d=ue(b);null===d?c.P(a):c.a.setItem(a,d)})};g.P=function(a){var b=this;return A().then(function(){b.a.removeItem(a)})};g.Y=function(){};
g.aa=function(){};function ij(){var a={};a.Browser=jj;a.Node=kj;a.ReactNative=lj;a.Worker=mj;this.a=a[le()]}var nj,jj={w:bj,Pa:fj},kj={w:bj,Pa:fj},lj={w:Pi,Pa:ej},mj={w:bj,Pa:ej};var oj={Vc:"local",NONE:"none",Xc:"session"};function pj(a){var b=new M("invalid-persistence-type"),c=new M("unsupported-persistence-type");a:{for(d in oj)if(oj[d]==a){var d=!0;break a}d=!1}if(!d||"string"!==typeof a)throw b;switch(le()){case "ReactNative":if("session"===a)throw c;break;case "Node":if("none"!==a)throw c;break;default:if(!pe()&&"none"!==a)throw c;}}
function qj(){var a=!xe(I())&&je()?!0:!1,b=te(),c=pe();this.o=a;this.h=b;this.l=c;this.a={};nj||(nj=new ij);a=nj;try{this.g=!Td()&&De()||!k.indexedDB?new a.a.w:new $i(ke()?new aj:new a.a.w)}catch(d){this.g=new aj,this.h=!0}try{this.j=new a.a.Pa}catch(d){this.j=new aj}this.u=new aj;this.f=r(this.Kb,this);this.b={}}var rj;function sj(){rj||(rj=new qj);return rj}function tj(a,b){switch(b){case "session":return a.j;case "none":return a.u;default:return a.g}}
function uj(a,b){return"firebase:"+a.name+(b?":"+b:"")}function vj(a,b,c){var d=uj(b,c),e=tj(a,b.w);return a.get(b,c).then(function(f){var h=null;try{h=we(k.localStorage.getItem(d))}catch(m){}if(h&&!f)return k.localStorage.removeItem(d),a.set(b,h,c);h&&f&&"localStorage"!=e.type&&k.localStorage.removeItem(d)})}g=qj.prototype;g.get=function(a,b){return tj(this,a.w).get(uj(a,b))};function wj(a,b,c){c=uj(b,c);"local"==b.w&&(a.b[c]=null);return tj(a,b.w).P(c)}
g.set=function(a,b,c){var d=uj(a,c),e=this,f=tj(this,a.w);return f.set(d,b).then(function(){return f.get(d)}).then(function(b){"local"==a.w&&(e.b[d]=b)})};g.addListener=function(a,b,c){a=uj(a,b);this.l&&(this.b[a]=k.localStorage.getItem(a));Ya(this.a)&&(tj(this,"local").Y(this.f),this.h||(Td()||!De())&&k.indexedDB||!this.l||xj(this));this.a[a]||(this.a[a]=[]);this.a[a].push(c)};
g.removeListener=function(a,b,c){a=uj(a,b);this.a[a]&&(w(this.a[a],function(a){return a==c}),0==this.a[a].length&&delete this.a[a]);Ya(this.a)&&(tj(this,"local").aa(this.f),yj(this))};function xj(a){yj(a);a.c=setInterval(function(){for(var b in a.a){var c=k.localStorage.getItem(b),d=a.b[b];c!=d&&(a.b[b]=c,c=new cc({type:"storage",key:b,target:window,oldValue:d,newValue:c,a:!0}),a.Kb(c))}},1E3)}function yj(a){a.c&&(clearInterval(a.c),a.c=null)}
g.Kb=function(a){if(a&&a.f){var b=a.a.key;if(null==b)for(var c in this.a){var d=this.b[c];"undefined"===typeof d&&(d=null);var e=k.localStorage.getItem(c);e!==d&&(this.b[c]=e,this.Va(c))}else if(0==b.indexOf("firebase:")&&this.a[b]){"undefined"!==typeof a.a.a?tj(this,"local").aa(this.f):yj(this);if(this.o)if(c=k.localStorage.getItem(b),d=a.a.newValue,d!==c)null!==d?k.localStorage.setItem(b,d):k.localStorage.removeItem(b);else if(this.b[b]===d&&"undefined"===typeof a.a.a)return;var f=this;c=function(){if("undefined"!==
typeof a.a.a||f.b[b]!==k.localStorage.getItem(b))f.b[b]=k.localStorage.getItem(b),f.Va(b)};C&&Xb&&10==Xb&&k.localStorage.getItem(b)!==a.a.newValue&&a.a.newValue!==a.a.oldValue?setTimeout(c,10):c()}}else v(a,r(this.Va,this))};g.Va=function(a){this.a[a]&&v(this.a[a],function(a){a()})};function zj(a){this.a=a;this.b=sj()}var Aj={name:"authEvent",w:"local"};function Bj(a){return a.b.get(Aj,a.a).then(function(a){return lg(a)})};function Cj(){this.a=sj()};function Dj(){this.b=-1};function Ej(a,b){this.b=-1;this.b=Fj;this.f=k.Uint8Array?new Uint8Array(this.b):Array(this.b);this.g=this.c=0;this.a=[];this.j=a;this.h=b;this.l=k.Int32Array?new Int32Array(64):Array(64);void 0!==Gj||(k.Int32Array?Gj=new Int32Array(Hj):Gj=Hj);this.reset()}var Gj;t(Ej,Dj);for(var Fj=64,Ij=Fj-1,Jj=[],Kj=0;Kj<Ij;Kj++)Jj[Kj]=0;var Lj=Ha(128,Jj);Ej.prototype.reset=function(){this.g=this.c=0;this.a=k.Int32Array?new Int32Array(this.h):Ia(this.h)};
function Mj(a){for(var b=a.f,c=a.l,d=0,e=0;e<b.length;)c[d++]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3],e=4*d;for(b=16;64>b;b++){e=c[b-15]|0;d=c[b-2]|0;var f=(c[b-16]|0)+((e>>>7|e<<25)^(e>>>18|e<<14)^e>>>3)|0,h=(c[b-7]|0)+((d>>>17|d<<15)^(d>>>19|d<<13)^d>>>10)|0;c[b]=f+h|0}d=a.a[0]|0;e=a.a[1]|0;var m=a.a[2]|0,p=a.a[3]|0,E=a.a[4]|0,ic=a.a[5]|0,Jc=a.a[6]|0;f=a.a[7]|0;for(b=0;64>b;b++){var El=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&e^d&m^e&m)|0;h=E&ic^~E&Jc;f=f+((E>>>6|E<<26)^(E>>>11|E<<21)^(E>>>
25|E<<7))|0;h=h+(Gj[b]|0)|0;h=f+(h+(c[b]|0)|0)|0;f=Jc;Jc=ic;ic=E;E=p+h|0;p=m;m=e;e=d;d=h+El|0}a.a[0]=a.a[0]+d|0;a.a[1]=a.a[1]+e|0;a.a[2]=a.a[2]+m|0;a.a[3]=a.a[3]+p|0;a.a[4]=a.a[4]+E|0;a.a[5]=a.a[5]+ic|0;a.a[6]=a.a[6]+Jc|0;a.a[7]=a.a[7]+f|0}
function Nj(a,b,c){void 0===c&&(c=b.length);var d=0,e=a.c;if(l(b))for(;d<c;)a.f[e++]=b.charCodeAt(d++),e==a.b&&(Mj(a),e=0);else if(ha(b))for(;d<c;){var f=b[d++];if(!("number"==typeof f&&0<=f&&255>=f&&f==(f|0)))throw Error("message must be a byte array");a.f[e++]=f;e==a.b&&(Mj(a),e=0)}else throw Error("message must be string or array");a.c=e;a.g+=c}
var Hj=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,
4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function Oj(){Ej.call(this,8,Pj)}t(Oj,Ej);var Pj=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];function Qj(a,b,c,d,e){this.u=a;this.j=b;this.l=c;this.o=d||null;this.s=e||null;this.h=b+":"+c;this.v=new Cj;this.g=new zj(this.h);this.f=null;this.b=[];this.a=this.c=null}function Rj(a){return new M("invalid-cordova-configuration",a)}g=Qj.prototype;
g.ea=function(){return this.ya?this.ya:this.ya=ge().then(function(){if("function"!==typeof J("universalLinks.subscribe",k))throw Rj("cordova-universal-links-plugin is not installed");if("undefined"===typeof J("BuildInfo.packageName",k))throw Rj("cordova-plugin-buildinfo is not installed");if("function"!==typeof J("cordova.plugins.browsertab.openUrl",k))throw Rj("cordova-plugin-browsertab is not installed");if("function"!==typeof J("cordova.InAppBrowser.open",k))throw Rj("cordova-plugin-inappbrowser is not installed");
},function(){throw new M("cordova-not-ready");})};function Sj(){for(var a=20,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")}function Tj(a){var b=new Oj;Nj(b,a);a=[];var c=8*b.g;56>b.c?Nj(b,Lj,56-b.c):Nj(b,Lj,b.b-(b.c-56));for(var d=63;56<=d;d--)b.f[d]=c&255,c/=256;Mj(b);for(d=c=0;d<b.j;d++)for(var e=24;0<=e;e-=8)a[c++]=b.a[d]>>e&255;return gf(a)}
g.Da=function(a,b){b(new M("operation-not-supported-in-this-environment"));return A()};g.xb=function(){return B(new M("operation-not-supported-in-this-environment"))};g.Lb=function(){return!1};g.Gb=function(){return!0};g.Bb=function(){return!0};
g.Ba=function(a,b,c){if(this.c)return B(new M("redirect-operation-pending"));var d=this,e=k.document,f=null,h=null,m=null,p=null;return this.c=A().then(function(){jg(b);return Uj(d)}).then(function(){return Vj(d,a,b,c)}).then(function(){return(new z(function(a,b){h=function(){var b=J("cordova.plugins.browsertab.close",k);a();"function"===typeof b&&b();d.a&&"function"===typeof d.a.close&&(d.a.close(),d.a=null);return!1};d.va(h);m=function(){f||(f=Fc(2E3).then(function(){b(new M("redirect-cancelled-by-user"))}))};
p=function(){Ae()&&m()};e.addEventListener("resume",m,!1);I().toLowerCase().match(/android/)||e.addEventListener("visibilitychange",p,!1)})).m(function(a){return Wj(d).then(function(){throw a;})})}).ha(function(){m&&e.removeEventListener("resume",m,!1);p&&e.removeEventListener("visibilitychange",p,!1);f&&f.cancel();h&&d.Ja(h);d.c=null})};
function Vj(a,b,c,d){var e=Sj(),f=new kg(b,d,null,e,new M("no-auth-event")),h=J("BuildInfo.packageName",k);if("string"!==typeof h)throw new M("invalid-cordova-configuration");var m=J("BuildInfo.displayName",k),p={};if(I().toLowerCase().match(/iphone|ipad|ipod/))p.ibi=h;else if(I().toLowerCase().match(/android/))p.apn=h;else return B(new M("operation-not-supported-in-this-environment"));m&&(p.appDisplayName=m);e=Tj(e);p.sessionId=e;var E=Oi(a.u,a.j,a.l,b,c,null,d,a.o,p,a.s);return a.ea().then(function(){var b=
a.h;return a.v.a.set(Aj,f.C(),b)}).then(function(){var b=J("cordova.plugins.browsertab.isAvailable",k);if("function"!==typeof b)throw new M("invalid-cordova-configuration");var c=null;b(function(b){if(b){c=J("cordova.plugins.browsertab.openUrl",k);if("function"!==typeof c)throw new M("invalid-cordova-configuration");c(E)}else{c=J("cordova.InAppBrowser.open",k);if("function"!==typeof c)throw new M("invalid-cordova-configuration");b=I();b=!(!b.match(/(iPad|iPhone|iPod).*OS 7_\d/i)&&!b.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
a.a=c(E,b?"_blank":"_system","location=yes")}})})}function Xj(a,b){for(var c=0;c<a.b.length;c++)try{a.b[c](b)}catch(d){}}function Uj(a){a.f||(a.f=a.ea().then(function(){return new z(function(b){function c(d){b(d);a.Ja(c);return!1}a.va(c);Yj(a)})}));return a.f}function Wj(a){var b=null;return Bj(a.g).then(function(c){b=c;c=a.g;return wj(c.b,Aj,c.a)}).then(function(){return b})}
function Yj(a){function b(b){d=!0;e&&e.cancel();Wj(a).then(function(d){var e=c;if(d&&b&&b.url){var f=null;e=Ef(b.url);-1!=e.indexOf("/__/auth/callback")&&(f=cd(e),f=we(bd(f,"firebaseError")||null),f=(f="object"===typeof f?We(f):null)?new kg(d.b,d.c,null,null,f):new kg(d.b,d.c,e,d.g));e=f||c}Xj(a,e)})}var c=new kg("unknown",null,null,null,new M("no-auth-event")),d=!1,e=Fc(500).then(function(){return Wj(a).then(function(){d||Xj(a,c)})}),f=k.handleOpenURL;k.handleOpenURL=function(a){0==a.toLowerCase().indexOf(J("BuildInfo.packageName",
k).toLowerCase()+"://")&&b({url:a});if("function"===typeof f)try{f(a)}catch(m){console.error(m)}};ng||(ng=new mg);ng.subscribe(b)}g.va=function(a){this.b.push(a);Uj(this).m(function(b){"auth/invalid-cordova-configuration"===b.code&&(b=new kg("unknown",null,null,null,new M("no-auth-event")),a(b))})};g.Ja=function(a){w(this.b,function(b){return b==a})};function Zj(a){this.a=a;this.b=sj()}var ak={name:"pendingRedirect",w:"session"};function bk(a){return a.b.set(ak,"pending",a.a)}function ck(a){return wj(a.b,ak,a.a)}function dk(a){return a.b.get(ak,a.a).then(function(a){return"pending"==a})};function ek(a,b,c){this.v=a;this.l=b;this.u=c;this.h=[];this.f=!1;this.j=r(this.o,this);this.c=new fk;this.s=new gk;this.g=new Zj(this.l+":"+this.u);this.b={};this.b.unknown=this.c;this.b.signInViaRedirect=this.c;this.b.linkViaRedirect=this.c;this.b.reauthViaRedirect=this.c;this.b.signInViaPopup=this.s;this.b.linkViaPopup=this.s;this.b.reauthViaPopup=this.s;this.a=hk(this.v,this.l,this.u,vi)}function hk(a,b,c,d){var e=firebase.SDK_VERSION||null;return he()?new Qj(a,b,c,e,d):new Ii(a,b,c,e,d)}
ek.prototype.reset=function(){this.f=!1;this.a.Ja(this.j);this.a=hk(this.v,this.l,this.u)};function ik(a){a.f||(a.f=!0,a.a.va(a.j));var b=a.a;return a.a.ea().m(function(c){a.a==b&&a.reset();throw c;})}function jk(a){a.a.Gb()&&ik(a).m(function(b){var c=new kg("unknown",null,null,null,new M("operation-not-supported-in-this-environment"));kk(b)&&a.o(c)});a.a.Bb()||lk(a.c)}
ek.prototype.subscribe=function(a){Fa(this.h,a)||this.h.push(a);if(!this.f){var b=this;dk(this.g).then(function(a){a?ck(b.g).then(function(){ik(b).m(function(a){var c=new kg("unknown",null,null,null,new M("operation-not-supported-in-this-environment"));kk(a)&&b.o(c)})}):jk(b)}).m(function(){jk(b)})}};ek.prototype.unsubscribe=function(a){w(this.h,function(b){return b==a})};
ek.prototype.o=function(a){if(!a)throw new M("invalid-auth-event");for(var b=!1,c=0;c<this.h.length;c++){var d=this.h[c];if(d.qb(a.b,a.c)){(b=this.b[a.b])&&b.h(a,d);b=!0;break}}lk(this.c);return b};var mk=new ze(2E3,1E4),nk=new ze(3E4,6E4);ek.prototype.da=function(){return this.c.da()};function ok(a,b,c,d,e,f){return a.a.xb(b,c,d,function(){a.f||(a.f=!0,a.a.va(a.j))},function(){a.reset()},e,f)}function kk(a){return a&&"auth/cordova-not-ready"==a.code?!0:!1}
ek.prototype.Ba=function(a,b,c){var d=this,e;return bk(this.g).then(function(){return d.a.Ba(a,b,c).m(function(a){if(kk(a))throw new M("operation-not-supported-in-this-environment");e=a;return ck(d.g).then(function(){throw e;})}).then(function(){return d.a.Lb()?new z(function(){}):ck(d.g).then(function(){return d.da()}).then(function(){}).m(function(){})})})};ek.prototype.Da=function(a,b,c,d){return this.a.Da(c,function(c){a.ga(b,null,c,d)},mk.get())};var pk={};
function qk(a,b,c){var d=b+":"+c;pk[d]||(pk[d]=new ek(a,b,c));return pk[d]}function fk(){this.b=null;this.f=[];this.c=[];this.a=null;this.g=!1}fk.prototype.reset=function(){this.b=null;this.a&&(this.a.cancel(),this.a=null)};
fk.prototype.h=function(a,b){if(a){this.reset();this.g=!0;var c=a.b,d=a.c,e=a.a&&"auth/web-storage-unsupported"==a.a.code,f=a.a&&"auth/operation-not-supported-in-this-environment"==a.a.code;"unknown"!=c||e||f?a.a?(rk(this,!0,null,a.a),A()):b.wa(c,d)?sk(this,a,b):B(new M("invalid-auth-event")):(rk(this,!1,null,null),A())}else B(new M("invalid-auth-event"))};function lk(a){a.g||(a.g=!0,rk(a,!1,null,null))}
function sk(a,b,c){c=c.wa(b.b,b.c);var d=b.f,e=b.g,f=!!b.b.match(/Redirect$/);c(d,e).then(function(b){rk(a,f,b,null)}).m(function(b){rk(a,f,null,b)})}function tk(a,b){a.b=function(){return B(b)};if(a.c.length)for(var c=0;c<a.c.length;c++)a.c[c](b)}function uk(a,b){a.b=function(){return A(b)};if(a.f.length)for(var c=0;c<a.f.length;c++)a.f[c](b)}function rk(a,b,c,d){b?d?tk(a,d):uk(a,c):uk(a,{user:null});a.f=[];a.c=[]}
fk.prototype.da=function(){var a=this;return new z(function(b,c){a.b?a.b().then(b,c):(a.f.push(b),a.c.push(c),vk(a))})};function vk(a){var b=new M("timeout");a.a&&a.a.cancel();a.a=Fc(nk.get()).then(function(){a.b||rk(a,!0,null,b)})}function gk(){}gk.prototype.h=function(a,b){if(a){var c=a.b,d=a.c;a.a?(b.ga(a.b,null,a.a,a.c),A()):b.wa(c,d)?wk(a,b):B(new M("invalid-auth-event"))}else B(new M("invalid-auth-event"))};
function wk(a,b){var c=a.c,d=a.b;b.wa(d,c)(a.f,a.g).then(function(a){b.ga(d,a,null,c)}).m(function(a){b.ga(d,null,a,c)})};function xk(a,b){this.a=b;K(this,"verificationId",a)}xk.prototype.confirm=function(a){a=hg(this.verificationId,a);return this.a(a)};function yk(a,b,c,d){return(new fg(a)).Sa(b,c).then(function(a){return new xk(a,d)})};function zk(a){var b=pf(a);if(!(b&&b.exp&&b.auth_time&&b.iat))throw new M("internal-error","An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.");L(this,{token:a,expirationTime:Ce(1E3*b.exp),authTime:Ce(1E3*b.auth_time),issuedAtTime:Ce(1E3*b.iat),signInProvider:b.firebase&&b.firebase.sign_in_provider?b.firebase.sign_in_provider:null,claims:b})};function Ak(a,b,c){this.h=a;this.j=b;this.g=c;this.c=3E4;this.f=96E4;this.b=null;this.a=this.c;if(this.f<this.c)throw Error("Proactive refresh lower bound greater than upper bound!");}Ak.prototype.start=function(){this.a=this.c;Bk(this,!0)};function Ck(a,b){if(b)return a.a=a.c,a.g();b=a.a;a.a*=2;a.a>a.f&&(a.a=a.f);return b}function Bk(a,b){a.stop();a.b=Fc(Ck(a,b)).then(function(){return Be()}).then(function(){return a.h()}).then(function(){Bk(a,!0)}).m(function(b){a.j(b)&&Bk(a,!1)})}
Ak.prototype.stop=function(){this.b&&(this.b.cancel(),this.b=null)};function Dk(a){this.f=a;this.b=this.a=null;this.c=0}Dk.prototype.C=function(){return{apiKey:this.f.b,refreshToken:this.a,accessToken:this.b,expirationTime:this.c}};function Ek(a,b){var c=b[Gf],d=b.refreshToken;b=Fk(b.expiresIn);a.b=c;a.c=b;a.a=d}function Fk(a){return na()+1E3*parseInt(a,10)}
function Gk(a,b){return Jh(a.f,b).then(function(b){a.b=b.access_token;a.c=Fk(b.expires_in);a.a=b.refresh_token;return{accessToken:a.b,expirationTime:a.c,refreshToken:a.a}}).m(function(b){"auth/user-token-expired"==b.code&&(a.a=null);throw b;})}Dk.prototype.getToken=function(a){a=!!a;return this.b&&!this.a?B(new M("user-token-expired")):a||!this.b||na()>this.c-3E4?this.a?Gk(this,{grant_type:"refresh_token",refresh_token:this.a}):A(null):A({accessToken:this.b,expirationTime:this.c,refreshToken:this.a})};function Hk(a,b){this.a=a||null;this.b=b||null;L(this,{lastSignInTime:Ce(b||null),creationTime:Ce(a||null)})}function Ik(a){return new Hk(a.a,a.b)}Hk.prototype.C=function(){return{lastLoginAt:this.b,createdAt:this.a}};function Jk(a,b,c,d,e,f){L(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,phoneNumber:f||null,providerId:b})}function Kk(a,b){D.call(this,a);for(var c in b)this[c]=b[c]}t(Kk,D);
function Lk(a,b,c){this.D=[];this.G=a.apiKey;this.s=a.appName;this.B=a.authDomain||null;a=firebase.SDK_VERSION?oe(firebase.SDK_VERSION):null;this.b=new xh(this.G,ui(vi),a);this.h=new Dk(this.b);Mk(this,b[Gf]);Ek(this.h,b);K(this,"refreshToken",this.h.a);Nk(this,c||{});G.call(this);this.I=!1;this.B&&re()&&(this.a=qk(this.B,this.G,this.s));this.N=[];this.j=null;this.l=Ok(this);this.V=r(this.Ga,this);var d=this;this.ia=null;this.sa=function(a){d.na(a.g)};this.X=null;this.O=[];this.ra=function(a){Pk(d,
a.c)};this.W=null}t(Lk,G);Lk.prototype.na=function(a){this.ia=a;Dh(this.b,a)};Lk.prototype.ca=function(){return this.ia};function Qk(a,b){a.X&&F(a.X,"languageCodeChanged",a.sa);(a.X=b)&&pc(b,"languageCodeChanged",a.sa)}function Pk(a,b){a.O=b;Eh(a.b,firebase.SDK_VERSION?oe(firebase.SDK_VERSION,a.O):null)}Lk.prototype.Ka=function(){return Ia(this.O)};function Rk(a,b){a.W&&F(a.W,"frameworkChanged",a.ra);(a.W=b)&&pc(b,"frameworkChanged",a.ra)}Lk.prototype.Ga=function(){this.l.b&&(this.l.stop(),this.l.start())};
function Sk(a){try{return firebase.app(a.s).auth()}catch(b){throw new M("internal-error","No firebase.auth.Auth instance is available for the Firebase App '"+a.s+"'!");}}function Ok(a){return new Ak(function(){return a.F(!0)},function(a){return a&&"auth/network-request-failed"==a.code?!0:!1},function(){var b=a.h.c-na()-3E5;return 0<b?b:0})}function Tk(a){a.o||a.l.b||(a.l.start(),F(a,"tokenChanged",a.V),pc(a,"tokenChanged",a.V))}function Uk(a){F(a,"tokenChanged",a.V);a.l.stop()}
function Mk(a,b){a.qa=b;K(a,"_lat",b)}function Vk(a,b){w(a.N,function(a){return a==b})}function Wk(a){for(var b=[],c=0;c<a.N.length;c++)b.push(a.N[c](a));return ub(b).then(function(){return a})}function Xk(a){a.a&&!a.I&&(a.I=!0,a.a.subscribe(a))}
function Nk(a,b){L(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,phoneNumber:b.phoneNumber||null,isAnonymous:b.isAnonymous||!1,metadata:new Hk(b.createdAt,b.lastLoginAt),providerData:[]})}K(Lk.prototype,"providerId","firebase");function Yk(){}function Zk(a){return A().then(function(){if(a.o)throw new M("app-deleted");})}function $k(a){return Ba(a.providerData,function(a){return a.providerId})}
function al(a,b){b&&(bl(a,b.providerId),a.providerData.push(b))}function bl(a,b){w(a.providerData,function(a){return a.providerId==b})}function cl(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&K(a,b,c)}
function dl(a,b){a!=b&&(L(a,{uid:b.uid,displayName:b.displayName,photoURL:b.photoURL,email:b.email,emailVerified:b.emailVerified,phoneNumber:b.phoneNumber,isAnonymous:b.isAnonymous,providerData:[]}),b.metadata?K(a,"metadata",Ik(b.metadata)):K(a,"metadata",new Hk),v(b.providerData,function(b){al(a,b)}),a.h=b.h,K(a,"refreshToken",a.h.a))}g=Lk.prototype;g.reload=function(){var a=this;return R(this,Zk(this).then(function(){return el(a).then(function(){return Wk(a)}).then(Yk)}))};
function el(a){return a.F().then(function(b){var c=a.isAnonymous;return fl(a,b).then(function(){c||cl(a,"isAnonymous",!1);return b})})}g.ac=function(a){return this.F(a).then(function(a){return new zk(a)})};g.F=function(a){var b=this;return R(this,Zk(this).then(function(){return b.h.getToken(a)}).then(function(a){if(!a)throw new M("internal-error");a.accessToken!=b.qa&&(Mk(b,a.accessToken),b.dispatchEvent(new Kk("tokenChanged")));cl(b,"refreshToken",a.refreshToken);return a.accessToken}))};
g.getToken=function(a){Ee["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."]||(Ee["firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."]=!0,"undefined"!==typeof console&&"function"===typeof console.warn&&console.warn("firebase.User.prototype.getToken is deprecated. Please use firebase.User.prototype.getIdToken instead."));return this.F(a)};
function gl(a,b){b[Gf]&&a.qa!=b[Gf]&&(Ek(a.h,b),a.dispatchEvent(new Kk("tokenChanged")),Mk(a,b[Gf]),cl(a,"refreshToken",a.h.a))}function fl(a,b){return P(a.b,qi,{idToken:b}).then(r(a.uc,a))}
g.uc=function(a){a=a.users;if(!a||!a.length)throw new M("internal-error");a=a[0];Nk(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified,phoneNumber:a.phoneNumber,lastLoginAt:a.lastLoginAt,createdAt:a.createdAt});for(var b=hl(a),c=0;c<b.length;c++)al(this,b[c]);cl(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
function hl(a){return(a=a.providerUserInfo)&&a.length?Ba(a,function(a){return new Jk(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl,a.phoneNumber)}):[]}g.bb=function(a){var b=this,c=null;return R(this,a.f(this.b,this.uid).then(function(a){gl(b,a);c=il(b,a,"reauthenticate");b.j=null;return b.reload()}).then(function(){return c}),!0)};g.vc=function(a){return this.bb(a).then(function(){})};
function jl(a,b){return el(a).then(function(){if(Fa($k(a),b))return Wk(a).then(function(){throw new M("provider-already-linked");})})}g.$a=function(a){var b=this,c=null;return R(this,jl(this,a.providerId).then(function(){return b.F()}).then(function(c){return a.c(b.b,c)}).then(function(a){c=il(b,a,"link");return kl(b,a)}).then(function(){return c}))};g.mc=function(a){return this.$a(a).then(function(a){return a.user})};
g.nc=function(a,b){var c=this;return R(this,jl(this,"phone").then(function(){return yk(Sk(c),a,b,r(c.$a,c))}))};g.wc=function(a,b){var c=this;return R(this,A().then(function(){return yk(Sk(c),a,b,r(c.bb,c))}),!0)};function il(a,b,c){var d=ig(b);b=uf(b);return He({user:a,credential:d,additionalUserInfo:b,operationType:c})}function kl(a,b){gl(a,b);return a.reload().then(function(){return a})}
g.mb=function(a){var b=this;return R(this,this.F().then(function(c){return b.b.mb(c,a)}).then(function(a){gl(b,a);return b.reload()}))};g.Nc=function(a){var b=this;return R(this,this.F().then(function(c){return a.c(b.b,c)}).then(function(a){gl(b,a);return b.reload()}))};g.nb=function(a){var b=this;return R(this,this.F().then(function(c){return b.b.nb(c,a)}).then(function(a){gl(b,a);return b.reload()}))};
g.ob=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Zk(this);var b=this;return R(this,this.F().then(function(c){return b.b.ob(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){gl(b,a);cl(b,"displayName",a.displayName||null);cl(b,"photoURL",a.photoUrl||null);v(b.providerData,function(a){"password"===a.providerId&&(K(a,"displayName",b.displayName),K(a,"photoURL",b.photoURL))});return Wk(b)}).then(Yk))};
g.Mc=function(a){var b=this;return R(this,el(this).then(function(c){return Fa($k(b),a)?ci(b.b,c,[a]).then(function(a){var c={};v(a.providerUserInfo||[],function(a){c[a.providerId]=!0});v($k(b),function(a){c[a]||bl(b,a)});c[fg.PROVIDER_ID]||K(b,"phoneNumber",null);return Wk(b)}):Wk(b).then(function(){throw new M("no-such-provider");})}))};
g.delete=function(){var a=this;return R(this,this.F().then(function(b){return P(a.b,pi,{idToken:b})}).then(function(){a.dispatchEvent(new Kk("userDeleted"))})).then(function(){for(var b=0;b<a.D.length;b++)a.D[b].cancel("app-deleted");Qk(a,null);Rk(a,null);a.D=[];a.o=!0;Uk(a);K(a,"refreshToken",null);a.a&&a.a.unsubscribe(a)})};
g.qb=function(a,b){return"linkViaPopup"==a&&(this.g||null)==b&&this.f||"reauthViaPopup"==a&&(this.g||null)==b&&this.f||"linkViaRedirect"==a&&(this.$||null)==b||"reauthViaRedirect"==a&&(this.$||null)==b?!0:!1};g.ga=function(a,b,c,d){"linkViaPopup"!=a&&"reauthViaPopup"!=a||d!=(this.g||null)||(c&&this.v?this.v(c):b&&!c&&this.f&&this.f(b),this.c&&(this.c.cancel(),this.c=null),delete this.f,delete this.v)};
g.wa=function(a,b){return"linkViaPopup"==a&&b==(this.g||null)?r(this.vb,this):"reauthViaPopup"==a&&b==(this.g||null)?r(this.wb,this):"linkViaRedirect"==a&&(this.$||null)==b?r(this.vb,this):"reauthViaRedirect"==a&&(this.$||null)==b?r(this.wb,this):null};g.oc=function(a){var b=this;return ll(this,"linkViaPopup",a,function(){return jl(b,a.providerId).then(function(){return Wk(b)})},!1)};g.xc=function(a){return ll(this,"reauthViaPopup",a,function(){return A()},!0)};
function ll(a,b,c,d,e){if(!re())return B(new M("operation-not-supported-in-this-environment"));if(a.j&&!e)return B(a.j);var f=tf(c.providerId),h=qe(a.uid+":::"),m=null;(!te()||je())&&a.B&&c.isOAuthProvider&&(m=Oi(a.B,a.G,a.s,b,c,null,h,firebase.SDK_VERSION||null));var p=be(m,f&&f.Aa,f&&f.za);d=d().then(function(){ml(a);if(!e)return a.F().then(function(){})}).then(function(){return ok(a.a,p,b,c,h,!!m)}).then(function(){return new z(function(c,d){a.ga(b,null,new M("cancelled-popup-request"),a.g||null);
a.f=c;a.v=d;a.g=h;a.c=a.a.Da(a,b,p,h)})}).then(function(a){p&&ae(p);return a?He(a):null}).m(function(a){p&&ae(p);throw a;});return R(a,d,e)}g.pc=function(a){var b=this;return nl(this,"linkViaRedirect",a,function(){return jl(b,a.providerId)},!1)};g.yc=function(a){return nl(this,"reauthViaRedirect",a,function(){return A()},!0)};
function nl(a,b,c,d,e){if(!re())return B(new M("operation-not-supported-in-this-environment"));if(a.j&&!e)return B(a.j);var f=null,h=qe(a.uid+":::");d=d().then(function(){ml(a);if(!e)return a.F().then(function(){})}).then(function(){a.$=h;return Wk(a)}).then(function(b){a.fa&&(b=a.fa,b=b.b.set(ol,a.C(),b.a));return b}).then(function(){return a.a.Ba(b,c,h)}).m(function(b){f=b;if(a.fa)return pl(a.fa);throw f;}).then(function(){if(f)throw f;});return R(a,d,e)}
function ml(a){if(!a.a||!a.I){if(a.a&&!a.I)throw new M("internal-error");throw new M("auth-domain-config-required");}}g.vb=function(a,b){var c=this;this.c&&(this.c.cancel(),this.c=null);var d=null,e=this.F().then(function(d){return Kf(c.b,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=il(c,a,"link");return kl(c,a)}).then(function(){return d});return R(this,e)};
g.wb=function(a,b){var c=this;this.c&&(this.c.cancel(),this.c=null);var d=null,e=A().then(function(){return Ff(Lf(c.b,{requestUri:a,sessionId:b}),c.uid)}).then(function(a){d=il(c,a,"reauthenticate");gl(c,a);c.j=null;return c.reload()}).then(function(){return d});return R(this,e,!0)};g.fb=function(a){var b=this,c=null;return R(this,this.F().then(function(b){c=b;return"undefined"===typeof a||Ya(a)?{}:ff(new Xe(a))}).then(function(a){return b.b.fb(c,a)}).then(function(a){if(b.email!=a)return b.reload()}).then(function(){}))};
function R(a,b,c){var d=ql(a,b,c);a.D.push(d);d.ha(function(){Ga(a.D,d)});return d}function ql(a,b,c){return a.j&&!c?(b.cancel(),B(a.j)):b.m(function(b){!b||"auth/user-disabled"!=b.code&&"auth/user-token-expired"!=b.code||(a.j||a.dispatchEvent(new Kk("userInvalidated")),a.j=b);throw b;})}g.toJSON=function(){return this.C()};
g.C=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,phoneNumber:this.phoneNumber,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.G,appName:this.s,authDomain:this.B,stsTokenManager:this.h.C(),redirectEventId:this.$||null};this.metadata&&ab(a,this.metadata.C());v(this.providerData,function(b){a.providerData.push(Ie(b))});return a};
function rl(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c[Gf]=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-na())/1E3;else return null;var d=new Lk(b,c,a);a.providerData&&v(a.providerData,function(a){a&&al(d,He(a))});a.redirectEventId&&(d.$=a.redirectEventId);return d}
function sl(a,b,c,d){var e=new Lk(a,b);c&&(e.fa=c);d&&Pk(e,d);return e.reload().then(function(){return e})};function tl(a){this.a=a;this.b=sj()}var ol={name:"redirectUser",w:"session"};function pl(a){return wj(a.b,ol,a.a)}function ul(a,b){return a.b.get(ol,a.a).then(function(a){a&&b&&(a.authDomain=b);return rl(a||{})})};function vl(a){this.a=a;this.b=sj();this.c=null;this.f=wl(this);this.b.addListener(xl("local"),this.a,r(this.g,this))}vl.prototype.g=function(){var a=this,b=xl("local");yl(this,function(){return A().then(function(){return a.c&&"local"!=a.c.w?a.b.get(b,a.a):null}).then(function(c){if(c)return zl(a,"local").then(function(){a.c=b})})})};function zl(a,b){var c=[],d;for(d in oj)oj[d]!==b&&c.push(wj(a.b,xl(oj[d]),a.a));c.push(wj(a.b,Al,a.a));return tb(c)}
function wl(a){var b=xl("local"),c=xl("session"),d=xl("none");return vj(a.b,b,a.a).then(function(){return a.b.get(c,a.a)}).then(function(e){return e?c:a.b.get(d,a.a).then(function(c){return c?d:a.b.get(b,a.a).then(function(c){return c?b:a.b.get(Al,a.a).then(function(a){return a?xl(a):b})})})}).then(function(b){a.c=b;return zl(a,b.w)}).m(function(){a.c||(a.c=b)})}var Al={name:"persistence",w:"session"};function xl(a){return{name:"authUser",w:a}}
vl.prototype.ib=function(a){var b=null,c=this;pj(a);return yl(this,function(){return a!=c.c.w?c.b.get(c.c,c.a).then(function(d){b=d;return zl(c,a)}).then(function(){c.c=xl(a);if(b)return c.b.set(c.c,b,c.a)}):A()})};function Bl(a){return yl(a,function(){return a.b.set(Al,a.c.w,a.a)})}function Cl(a,b){return yl(a,function(){return a.b.set(a.c,b.C(),a.a)})}function Dl(a){return yl(a,function(){return wj(a.b,a.c,a.a)})}
function Fl(a,b){return yl(a,function(){return a.b.get(a.c,a.a).then(function(a){a&&b&&(a.authDomain=b);return rl(a||{})})})}function yl(a,b){a.f=a.f.then(b,b);return a.f};function Gl(a){this.l=!1;K(this,"app",a);if(S(this).options&&S(this).options.apiKey)a=firebase.SDK_VERSION?oe(firebase.SDK_VERSION):null,this.b=new xh(S(this).options&&S(this).options.apiKey,ui(vi),a);else throw new M("invalid-api-key");this.N=[];this.o=[];this.I=[];this.Ob=firebase.INTERNAL.createSubscribe(r(this.ic,this));this.O=void 0;this.Pb=firebase.INTERNAL.createSubscribe(r(this.jc,this));Hl(this,null);this.h=new vl(S(this).options.apiKey+":"+S(this).name);this.G=new tl(S(this).options.apiKey+
":"+S(this).name);this.V=T(this,Il(this));this.j=T(this,Jl(this));this.X=!1;this.ia=r(this.Ic,this);this.Ga=r(this.ka,this);this.qa=r(this.Yb,this);this.ra=r(this.gc,this);this.sa=r(this.hc,this);Kl(this);this.INTERNAL={};this.INTERNAL["delete"]=r(this.delete,this);this.INTERNAL.logFramework=r(this.qc,this);this.s=0;G.call(this);Ll(this);this.D=[]}t(Gl,G);function Ml(a){D.call(this,"languageCodeChanged");this.g=a}t(Ml,D);function Nl(a){D.call(this,"frameworkChanged");this.c=a}t(Nl,D);g=Gl.prototype;
g.ib=function(a){a=this.h.ib(a);return T(this,a)};g.na=function(a){this.W===a||this.l||(this.W=a,Dh(this.b,this.W),this.dispatchEvent(new Ml(this.ca())))};g.ca=function(){return this.W};g.Oc=function(){var a=k.navigator;this.na(a?a.languages&&a.languages[0]||a.language||a.userLanguage||null:null)};g.qc=function(a){this.D.push(a);Eh(this.b,firebase.SDK_VERSION?oe(firebase.SDK_VERSION,this.D):null);this.dispatchEvent(new Nl(this.D))};g.Ka=function(){return Ia(this.D)};
function Ll(a){Object.defineProperty(a,"lc",{get:function(){return this.ca()},set:function(a){this.na(a)},enumerable:!1});a.W=null}g.toJSON=function(){return{apiKey:S(this).options.apiKey,authDomain:S(this).options.authDomain,appName:S(this).name,currentUser:U(this)&&U(this).C()}};function Ol(a){return a.Nb||B(new M("auth-domain-config-required"))}
function Kl(a){var b=S(a).options.authDomain,c=S(a).options.apiKey;b&&re()&&(a.Nb=a.V.then(function(){if(!a.l){a.a=qk(b,c,S(a).name);a.a.subscribe(a);U(a)&&Xk(U(a));if(a.B){Xk(a.B);var d=a.B;d.na(a.ca());Qk(d,a);d=a.B;Pk(d,a.D);Rk(d,a);a.B=null}return a.a}}))}g.qb=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.g==b&&!!this.f;default:return!1}};
g.ga=function(a,b,c,d){"signInViaPopup"==a&&this.g==d&&(c&&this.v?this.v(c):b&&!c&&this.f&&this.f(b),this.c&&(this.c.cancel(),this.c=null),delete this.f,delete this.v)};g.wa=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.g==b&&this.f?r(this.Xb,this):null};
g.Xb=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.c&&(this.c.cancel(),this.c=null);var d=null,e=null,f=If(c.b,a).then(function(a){d=ig(a);e=uf(a);return a});a=c.V.then(function(){return f}).then(function(a){return Pl(c,a)}).then(function(){return He({user:U(c),credential:d,additionalUserInfo:e,operationType:"signIn"})});return T(this,a)};
g.Gc=function(a){if(!re())return B(new M("operation-not-supported-in-this-environment"));var b=this,c=tf(a.providerId),d=qe(),e=null;(!te()||je())&&S(this).options.authDomain&&a.isOAuthProvider&&(e=Oi(S(this).options.authDomain,S(this).options.apiKey,S(this).name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=be(e,c&&c.Aa,c&&c.za);c=Ol(this).then(function(b){return ok(b,f,"signInViaPopup",a,d,!!e)}).then(function(){return new z(function(a,c){b.ga("signInViaPopup",null,new M("cancelled-popup-request"),
b.g);b.f=a;b.v=c;b.g=d;b.c=b.a.Da(b,"signInViaPopup",f,d)})}).then(function(a){f&&ae(f);return a?He(a):null}).m(function(a){f&&ae(f);throw a;});return T(this,c)};g.Hc=function(a){if(!re())return B(new M("operation-not-supported-in-this-environment"));var b=this,c=Ol(this).then(function(){return Bl(b.h)}).then(function(){return b.a.Ba("signInViaRedirect",a)});return T(this,c)};
g.da=function(){if(!re())return B(new M("operation-not-supported-in-this-environment"));var a=this,b=Ol(this).then(function(){return a.a.da()}).then(function(a){return a?He(a):null});return T(this,b)};function Pl(a,b){var c={};c.apiKey=S(a).options.apiKey;c.authDomain=S(a).options.authDomain;c.appName=S(a).name;return a.V.then(function(){return sl(c,b,a.G,a.Ka())}).then(function(b){if(U(a)&&b.uid==U(a).uid)return dl(U(a),b),a.ka(b);Hl(a,b);Xk(b);return a.ka(b)}).then(function(){Ql(a)})}
function Hl(a,b){U(a)&&(Vk(U(a),a.Ga),F(U(a),"tokenChanged",a.qa),F(U(a),"userDeleted",a.ra),F(U(a),"userInvalidated",a.sa),Uk(U(a)));b&&(b.N.push(a.Ga),pc(b,"tokenChanged",a.qa),pc(b,"userDeleted",a.ra),pc(b,"userInvalidated",a.sa),0<a.s&&Tk(b));K(a,"currentUser",b);b&&(b.na(a.ca()),Qk(b,a),Pk(b,a.D),Rk(b,a))}g.kb=function(){var a=this,b=this.j.then(function(){if(!U(a))return A();Hl(a,null);return Dl(a.h).then(function(){Ql(a)})});return T(this,b)};
function Rl(a){var b=ul(a.G,S(a).options.authDomain).then(function(b){if(a.B=b)b.fa=a.G;return pl(a.G)});return T(a,b)}function Il(a){var b=S(a).options.authDomain,c=Rl(a).then(function(){return Fl(a.h,b)}).then(function(b){return b?(b.fa=a.G,a.B&&(a.B.$||null)==(b.$||null)?b:b.reload().then(function(){return Cl(a.h,b).then(function(){return b})}).m(function(c){return"auth/network-request-failed"==c.code?b:Dl(a.h)})):null}).then(function(b){Hl(a,b||null)});return T(a,c)}
function Jl(a){return a.V.then(function(){return a.da()}).m(function(){}).then(function(){if(!a.l)return a.ia()}).m(function(){}).then(function(){if(!a.l){a.X=!0;var b=a.h;b.b.addListener(xl("local"),b.a,a.ia)}})}
g.Ic=function(){var a=this;return Fl(this.h,S(this).options.authDomain).then(function(b){if(!a.l){var c;if(c=U(a)&&b){c=U(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return dl(U(a),b),U(a).F();if(U(a)||b)Hl(a,b),b&&(Xk(b),b.fa=a.G),a.a&&a.a.subscribe(a),Ql(a)}})};g.ka=function(a){return Cl(this.h,a)};g.Yb=function(){Ql(this);this.ka(U(this))};g.gc=function(){this.kb()};g.hc=function(){this.kb()};
function Sl(a,b){var c=null,d=null;return T(a,b.then(function(b){c=ig(b);d=uf(b);return Pl(a,b)}).then(function(){return He({user:U(a),credential:c,additionalUserInfo:d,operationType:"signIn"})}))}g.ic=function(a){var b=this;this.addAuthTokenListener(function(){a.next(U(b))})};g.jc=function(a){var b=this;Tl(this,function(){a.next(U(b))})};g.sc=function(a,b,c){var d=this;this.X&&firebase.Promise.resolve().then(function(){n(a)?a(U(d)):n(a.next)&&a.next(U(d))});return this.Ob(a,b,c)};
g.rc=function(a,b,c){var d=this;this.X&&firebase.Promise.resolve().then(function(){d.O=d.getUid();n(a)?a(U(d)):n(a.next)&&a.next(U(d))});return this.Pb(a,b,c)};g.$b=function(a){var b=this,c=this.j.then(function(){return U(b)?U(b).F(a).then(function(a){return{accessToken:a}}):null});return T(this,c)};g.Cc=function(a){return this.Hb(a).then(function(a){return a.user})};
g.Hb=function(a){var b=this;return this.j.then(function(){return Sl(b,P(b.b,si,{token:a}))}).then(function(a){var c=a.user;cl(c,"isAnonymous",!1);b.ka(c);return a})};g.Ib=function(a,b){var c=this;return this.j.then(function(){return Sl(c,P(c.b,Xf,{email:a,password:b}))})};g.Dc=function(a,b){return this.Ib(a,b).then(function(a){return a.user})};g.Sb=function(a,b){return this.sb(a,b).then(function(a){return a.user})};
g.sb=function(a,b){var c=this;return this.j.then(function(){return Sl(c,P(c.b,oi,{email:a,password:b}))})};g.Bc=function(a){return this.Oa(a).then(function(a){return a.user})};g.Oa=function(a){var b=this;return this.j.then(function(){return Sl(b,a.xa(b.b))})};g.jb=function(){return this.Jb().then(function(a){return a.user})};
g.Jb=function(){var a=this;return this.j.then(function(){var b=U(a);if(b&&b.isAnonymous){var c=He({providerId:null,isNewUser:!1});return He({user:b,credential:null,additionalUserInfo:c,operationType:"signIn"})}return Sl(a,a.b.jb()).then(function(b){var c=b.user;cl(c,"isAnonymous",!0);a.ka(c);return b})})};function S(a){return a.app}function U(a){return a.currentUser}g.getUid=function(){return U(this)&&U(this).uid||null};function Ul(a){return U(a)&&U(a)._lat||null}
function Ql(a){if(a.X){for(var b=0;b<a.o.length;b++)if(a.o[b])a.o[b](Ul(a));if(a.O!==a.getUid()&&a.I.length)for(a.O=a.getUid(),b=0;b<a.I.length;b++)if(a.I[b])a.I[b](Ul(a))}}g.Qb=function(a){this.addAuthTokenListener(a);this.s++;0<this.s&&U(this)&&Tk(U(this))};g.zc=function(a){var b=this;v(this.o,function(c){c==a&&b.s--});0>this.s&&(this.s=0);0==this.s&&U(this)&&Uk(U(this));this.removeAuthTokenListener(a)};
g.addAuthTokenListener=function(a){var b=this;this.o.push(a);T(this,this.j.then(function(){b.l||Fa(b.o,a)&&a(Ul(b))}))};g.removeAuthTokenListener=function(a){w(this.o,function(b){return b==a})};function Tl(a,b){a.I.push(b);T(a,a.j.then(function(){!a.l&&Fa(a.I,b)&&a.O!==a.getUid()&&(a.O=a.getUid(),b(Ul(a)))}))}
g.delete=function(){this.l=!0;for(var a=0;a<this.N.length;a++)this.N[a].cancel("app-deleted");this.N=[];this.h&&(a=this.h,a.b.removeListener(xl("local"),a.a,this.ia));this.a&&this.a.unsubscribe(this);return firebase.Promise.resolve()};function T(a,b){a.N.push(b);b.ha(function(){Ga(a.N,b)});return b}g.Vb=function(a){return T(this,Oh(this.b,a))};g.Wb=function(a){return T(this,Qh(this.b,a))};g.kc=function(a){return!!ag(a)};
g.hb=function(a,b){var c=this;return T(this,A().then(function(){var a=new Xe(b);if(!a.c)throw new M("argument-error",ef+" must be true when sending sign in link to email");return ff(a)}).then(function(b){return c.b.hb(a,b)}).then(function(){}))};g.Pc=function(a){return this.Ia(a).then(function(a){return a.data.email})};g.Wa=function(a,b){return T(this,this.b.Wa(a,b).then(function(){}))};g.Ia=function(a){return T(this,this.b.Ia(a).then(function(a){return new Le(a)}))};
g.Ua=function(a){return T(this,this.b.Ua(a).then(function(){}))};g.gb=function(a,b){var c=this;return T(this,A().then(function(){return"undefined"===typeof b||Ya(b)?{}:ff(new Xe(b))}).then(function(b){return c.b.gb(a,b)}).then(function(){}))};g.Fc=function(a,b){return T(this,yk(this,a,b,r(this.Oa,this)))};g.Ec=function(a,b){var c=this;return T(this,A().then(function(){var d=$f(a,b||Ud());return c.Oa(d)}))};function Vl(a,b,c,d,e,f){K(this,"type","recaptcha");this.b=this.c=null;this.o=!1;this.l=b;this.a=c||{theme:"light",type:"image"};this.g=[];if(this.a[Wl])throw new M("argument-error","sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");this.h="invisible"===this.a[Xl];if(!k.document)throw new M("operation-not-supported-in-this-environment","RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.");if(!Hd(b)||!this.h&&
Hd(b).hasChildNodes())throw new M("argument-error","reCAPTCHA container is either not found or already contains inner elements!");this.u=new xh(a,f||null,e||null);this.s=d||function(){return null};var h=this;this.j=[];var m=this.a[Yl];this.a[Yl]=function(a){Zl(h,a);if("function"===typeof m)m(a);else if("string"===typeof m){var b=J(m,k);"function"===typeof b&&b(a)}};var p=this.a[$l];this.a[$l]=function(){Zl(h,null);if("function"===typeof p)p();else if("string"===typeof p){var a=J(p,k);"function"===
typeof a&&a()}}}var Yl="callback",$l="expired-callback",Wl="sitekey",Xl="size";function Zl(a,b){for(var c=0;c<a.j.length;c++)try{a.j[c](b)}catch(d){}}function am(a,b){w(a.j,function(a){return a==b})}function bm(a,b){a.g.push(b);b.ha(function(){Ga(a.g,b)});return b}g=Vl.prototype;
g.ya=function(){var a=this;return this.c?this.c:this.c=bm(this,A().then(function(){if(se()&&!ke())return fe();throw new M("operation-not-supported-in-this-environment","RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");}).then(function(){return cm(dm(),a.s())}).then(function(){return P(a.u,ri,{})}).then(function(b){a.a[Wl]=b.recaptchaSiteKey}).m(function(b){a.c=null;throw b;}))};
g.render=function(){em(this);var a=this;return bm(this,this.ya().then(function(){if(null===a.b){var b=a.l;if(!a.h){var c=Hd(b);b=Kd("DIV");c.appendChild(b)}a.b=grecaptcha.render(b,a.a)}return a.b}))};g.verify=function(){em(this);var a=this;return bm(this,this.render().then(function(b){return new z(function(c){var d=grecaptcha.getResponse(b);if(d)c(d);else{var e=function(b){b&&(am(a,e),c(b))};a.j.push(e);a.h&&grecaptcha.execute(a.b)}})}))};g.reset=function(){em(this);null!==this.b&&grecaptcha.reset(this.b)};
function em(a){if(a.o)throw new M("internal-error","RecaptchaVerifier instance has been destroyed.");}g.clear=function(){em(this);this.o=!0;dm().b--;for(var a=0;a<this.g.length;a++)this.g[a].cancel("RecaptchaVerifier instance has been destroyed.");if(!this.h){a=Hd(this.l);for(var b;b=a.firstChild;)a.removeChild(b)}};var fm=pd("https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit&hl=%{hl}");
function gm(){this.b=k.grecaptcha?Infinity:0;this.c=null;this.a="__rcb"+Math.floor(1E6*Math.random()).toString()}var hm=new ze(3E4,6E4);
function cm(a,b){return new z(function(c,d){var e=setTimeout(function(){d(new M("network-request-failed"))},hm.get());if(!k.grecaptcha||b!==a.c&&!a.b){k[a.a]=function(){if(k.grecaptcha){a.c=b;var f=k.grecaptcha.render;k.grecaptcha.render=function(b,c){b=f(b,c);a.b++;return b};clearTimeout(e);c()}else clearTimeout(e),d(new M("internal-error"));delete k[a.a]};var f=td(fm,{onload:a.a,hl:b||""});A(ph(f)).m(function(){clearTimeout(e);d(new M("internal-error","Unable to load external reCAPTCHA dependencies!"))})}else clearTimeout(e),
c()})}var im=null;function dm(){im||(im=new gm);return im}
function jm(a,b,c){try{this.f=c||firebase.app()}catch(f){throw new M("argument-error","No firebase.app.App instance is currently initialized.");}if(this.f.options&&this.f.options.apiKey)c=this.f.options.apiKey;else throw new M("invalid-api-key");var d=this,e=null;try{e=this.f.auth().Ka()}catch(f){}e=firebase.SDK_VERSION?oe(firebase.SDK_VERSION,e):null;Vl.call(this,c,a,b,function(){try{var a=d.f.auth().ca()}catch(h){a=null}return a},e,ui(vi))}t(jm,Vl);function km(a,b,c,d){a:{c=Array.prototype.slice.call(c);var e=0;for(var f=!1,h=0;h<b.length;h++)if(b[h].optional)f=!0;else{if(f)throw new M("internal-error","Argument validator encountered a required argument after an optional argument.");e++}f=b.length;if(c.length<e||f<c.length)d="Expected "+(e==f?1==e?"1 argument":e+" arguments":e+"-"+f+" arguments")+" but got "+c.length+".";else{for(e=0;e<c.length;e++)if(f=b[e].optional&&void 0===c[e],!b[e].M(c[e])&&!f){b=b[e];if(0>e||e>=lm.length)throw new M("internal-error",
"Argument validator received an unsupported number of arguments.");c=lm[e];d=(d?"":c+" argument ")+(b.name?'"'+b.name+'" ':"")+"must be "+b.K+".";break a}d=null}}if(d)throw new M("argument-error",a+" failed: "+d);}var lm="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" ");function V(a,b){return{name:a||"",K:"a valid string",optional:!!b,M:l}}function mm(){return{name:"opt_forceRefresh",K:"a boolean",optional:!0,M:ba}}
function W(a,b){return{name:a||"",K:"a valid object",optional:!!b,M:q}}function nm(a,b){return{name:a||"",K:"a function",optional:!!b,M:n}}function om(a,b){return{name:a||"",K:"null",optional:!!b,M:ea}}function pm(){return{name:"",K:"an HTML element",optional:!1,M:function(a){return!!(a&&a instanceof Element)}}}function qm(){return{name:"auth",K:"an instance of Firebase Auth",optional:!0,M:function(a){return!!(a&&a instanceof Gl)}}}
function rm(){return{name:"app",K:"an instance of Firebase App",optional:!0,M:function(a){return!!(a&&a instanceof firebase.app.App)}}}function sm(a){return{name:a?a+"Credential":"credential",K:a?"a valid "+a+" credential":"a valid credential",optional:!1,M:function(b){if(!b)return!1;var c=!a||b.providerId===a;return!(!b.xa||!c)}}}
function tm(){return{name:"authProvider",K:"a valid Auth provider",optional:!1,M:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}}function um(){return{name:"applicationVerifier",K:"an implementation of firebase.auth.ApplicationVerifier",optional:!1,M:function(a){return!!(a&&l(a.type)&&n(a.verify))}}}function X(a,b,c,d){return{name:c||"",K:a.K+" or "+b.K,optional:!!d,M:function(c){return a.M(c)||b.M(c)}}};function Y(a,b){for(var c in b){var d=b[c].name;a[d]=vm(d,a[c],b[c].i)}}function Z(a,b,c,d){a[b]=vm(b,c,d)}function vm(a,b,c){function d(){var a=Array.prototype.slice.call(arguments);km(e,c,a);return b.apply(this,a)}if(!c)return b;var e=wm(a),f;for(f in b)d[f]=b[f];for(f in b.prototype)d.prototype[f]=b.prototype[f];return d}function wm(a){a=a.split(".");return a[a.length-1]};Y(Gl.prototype,{Ua:{name:"applyActionCode",i:[V("code")]},Ia:{name:"checkActionCode",i:[V("code")]},Wa:{name:"confirmPasswordReset",i:[V("code"),V("newPassword")]},Sb:{name:"createUserWithEmailAndPassword",i:[V("email"),V("password")]},sb:{name:"createUserAndRetrieveDataWithEmailAndPassword",i:[V("email"),V("password")]},Vb:{name:"fetchProvidersForEmail",i:[V("email")]},Wb:{name:"fetchSignInMethodsForEmail",i:[V("email")]},da:{name:"getRedirectResult",i:[]},kc:{name:"isSignInWithEmailLink",i:[V("emailLink")]},
rc:{name:"onAuthStateChanged",i:[X(W(),nm(),"nextOrObserver"),nm("opt_error",!0),nm("opt_completed",!0)]},sc:{name:"onIdTokenChanged",i:[X(W(),nm(),"nextOrObserver"),nm("opt_error",!0),nm("opt_completed",!0)]},gb:{name:"sendPasswordResetEmail",i:[V("email"),X(W("opt_actionCodeSettings",!0),om(null,!0),"opt_actionCodeSettings",!0)]},hb:{name:"sendSignInLinkToEmail",i:[V("email"),W("actionCodeSettings")]},ib:{name:"setPersistence",i:[V("persistence")]},Oa:{name:"signInAndRetrieveDataWithCredential",
i:[sm()]},jb:{name:"signInAnonymously",i:[]},Jb:{name:"signInAnonymouslyAndRetrieveData",i:[]},Bc:{name:"signInWithCredential",i:[sm()]},Cc:{name:"signInWithCustomToken",i:[V("token")]},Hb:{name:"signInAndRetrieveDataWithCustomToken",i:[V("token")]},Dc:{name:"signInWithEmailAndPassword",i:[V("email"),V("password")]},Ec:{name:"signInWithEmailLink",i:[V("email"),V("emailLink",!0)]},Ib:{name:"signInAndRetrieveDataWithEmailAndPassword",i:[V("email"),V("password")]},Fc:{name:"signInWithPhoneNumber",i:[V("phoneNumber"),
um()]},Gc:{name:"signInWithPopup",i:[tm()]},Hc:{name:"signInWithRedirect",i:[tm()]},kb:{name:"signOut",i:[]},toJSON:{name:"toJSON",i:[V(null,!0)]},Oc:{name:"useDeviceLanguage",i:[]},Pc:{name:"verifyPasswordResetCode",i:[V("code")]}});(function(a,b){for(var c in b){var d=b[c].name;if(d!==c){var e=b[c].Rb;Object.defineProperty(a,d,{get:function(){return this[c]},set:function(a){km(d,[e],[a],!0);this[c]=a},enumerable:!0})}}})(Gl.prototype,{lc:{name:"languageCode",Rb:X(V(),om(),"languageCode")}});
Gl.Persistence=oj;Gl.Persistence.LOCAL="local";Gl.Persistence.SESSION="session";Gl.Persistence.NONE="none";
Y(Lk.prototype,{"delete":{name:"delete",i:[]},ac:{name:"getIdTokenResult",i:[mm()]},F:{name:"getIdToken",i:[mm()]},getToken:{name:"getToken",i:[mm()]},$a:{name:"linkAndRetrieveDataWithCredential",i:[sm()]},mc:{name:"linkWithCredential",i:[sm()]},nc:{name:"linkWithPhoneNumber",i:[V("phoneNumber"),um()]},oc:{name:"linkWithPopup",i:[tm()]},pc:{name:"linkWithRedirect",i:[tm()]},bb:{name:"reauthenticateAndRetrieveDataWithCredential",i:[sm()]},vc:{name:"reauthenticateWithCredential",i:[sm()]},wc:{name:"reauthenticateWithPhoneNumber",
i:[V("phoneNumber"),um()]},xc:{name:"reauthenticateWithPopup",i:[tm()]},yc:{name:"reauthenticateWithRedirect",i:[tm()]},reload:{name:"reload",i:[]},fb:{name:"sendEmailVerification",i:[X(W("opt_actionCodeSettings",!0),om(null,!0),"opt_actionCodeSettings",!0)]},toJSON:{name:"toJSON",i:[V(null,!0)]},Mc:{name:"unlink",i:[V("provider")]},mb:{name:"updateEmail",i:[V("email")]},nb:{name:"updatePassword",i:[V("password")]},Nc:{name:"updatePhoneNumber",i:[sm("phone")]},ob:{name:"updateProfile",i:[W("profile")]}});
Y(z.prototype,{ha:{name:"finally"},m:{name:"catch"},then:{name:"then"}});Y(xk.prototype,{confirm:{name:"confirm",i:[V("verificationCode")]}});Z(O,"credential",function(a,b){return new Vf(a,b)},[V("email"),V("password")]);Y(Nf.prototype,{ta:{name:"addScope",i:[V("scope")]},Ca:{name:"setCustomParameters",i:[W("customOAuthParameters")]}});Z(Nf,"credential",Of,[X(V(),W(),"token")]);Z(O,"credentialWithLink",$f,[V("email"),V("emailLink")]);
Y(Pf.prototype,{ta:{name:"addScope",i:[V("scope")]},Ca:{name:"setCustomParameters",i:[W("customOAuthParameters")]}});Z(Pf,"credential",Qf,[X(V(),W(),"token")]);Y(Rf.prototype,{ta:{name:"addScope",i:[V("scope")]},Ca:{name:"setCustomParameters",i:[W("customOAuthParameters")]}});Z(Rf,"credential",Sf,[X(V(),X(W(),om()),"idToken"),X(V(),om(),"accessToken",!0)]);Y(Tf.prototype,{Ca:{name:"setCustomParameters",i:[W("customOAuthParameters")]}});Z(Tf,"credential",Uf,[X(V(),W(),"token"),V("secret",!0)]);
Y(N.prototype,{ta:{name:"addScope",i:[V("scope")]},credential:{name:"credential",i:[X(V(),om(),"idToken",!0),X(V(),om(),"accessToken",!0)]},Ca:{name:"setCustomParameters",i:[W("customOAuthParameters")]}});Z(fg,"credential",hg,[V("verificationId"),V("verificationCode")]);Y(fg.prototype,{Sa:{name:"verifyPhoneNumber",i:[V("phoneNumber"),um()]}});Y(M.prototype,{toJSON:{name:"toJSON",i:[V(null,!0)]}});Y(pg.prototype,{toJSON:{name:"toJSON",i:[V(null,!0)]}});
Y(og.prototype,{toJSON:{name:"toJSON",i:[V(null,!0)]}});Y(jm.prototype,{clear:{name:"clear",i:[]},render:{name:"render",i:[]},verify:{name:"verify",i:[]}});
(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:Gl,Error:M};Z(a,"EmailAuthProvider",O,[]);Z(a,"FacebookAuthProvider",Nf,[]);Z(a,"GithubAuthProvider",Pf,[]);Z(a,"GoogleAuthProvider",Rf,[]);Z(a,"TwitterAuthProvider",Tf,[]);Z(a,"OAuthProvider",N,[V("providerId")]);Z(a,"PhoneAuthProvider",fg,[qm()]);Z(a,"RecaptchaVerifier",jm,[X(V(),pm(),"recaptchaContainer"),W("recaptchaParameters",!0),rm()]);firebase.INTERNAL.registerService("auth",function(a,
c){a=new Gl(a);c({INTERNAL:{getUid:r(a.getUid,a),getToken:r(a.$b,a),addAuthTokenListener:r(a.Qb,a),removeAuthTokenListener:r(a.zc,a)}});return a},a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:Lk})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();
}).call(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map