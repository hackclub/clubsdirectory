/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/@swc/helpers/lib/_async_to_generator.js":
/*!**************************************************************!*\
  !*** ./node_modules/@swc/helpers/lib/_async_to_generator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nObject.defineProperty(exports, \"default\", ({\n    enumerable: true,\n    get: function() {\n        return _asyncToGenerator;\n    }\n}));\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL2xpYi9fYXN5bmNfdG9fZ2VuZXJhdG9yLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDO0FBQzdDO0FBQ0EsQ0FBQyxFQUFDO0FBQ0YsMkNBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BoYWNrY2x1Yi90aGVtZS1zdGFydGVyLy4vbm9kZV9tb2R1bGVzL0Bzd2MvaGVscGVycy9saWIvX2FzeW5jX3RvX2dlbmVyYXRvci5qcz8wZTMwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVmYXVsdFwiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX2FzeW5jVG9HZW5lcmF0b3I7XG4gICAgfVxufSk7XG5mdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgICAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@swc/helpers/lib/_async_to_generator.js\n");

/***/ }),

/***/ "./node_modules/@swc/helpers/lib/_interop_require_default.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@swc/helpers/lib/_interop_require_default.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nObject.defineProperty(exports, \"default\", ({\n    enumerable: true,\n    get: function() {\n        return _interopRequireDefault;\n    }\n}));\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL2xpYi9faW50ZXJvcF9yZXF1aXJlX2RlZmF1bHQuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLEVBQUM7QUFDRiwyQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEVBQUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGhhY2tjbHViL3RoZW1lLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvQHN3Yy9oZWxwZXJzL2xpYi9faW50ZXJvcF9yZXF1aXJlX2RlZmF1bHQuanM/OWI3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlZmF1bHRcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7XG4gICAgfVxufSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/@swc/helpers/lib/_interop_require_default.js\n");

/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./dist/pages/_app */ \"./node_modules/next/dist/pages/_app.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsdUdBQTZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGhhY2tjbHViL3RoZW1lLXN0YXJ0ZXIvLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanM/NjZlYyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fYXBwJylcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/next/app.js\n");

/***/ }),

/***/ "./components/color-switcher.js":
/*!**************************************!*\
  !*** ./components/color-switcher.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! theme-ui */ \"theme-ui\");\n/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(theme_ui__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ColorSwitcher = (props)=>{\n    const [mode, setMode] = (0,theme_ui__WEBPACK_IMPORTED_MODULE_1__.useColorMode)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(theme_ui__WEBPACK_IMPORTED_MODULE_1__.IconButton, {\n        onClick: ()=>setMode(mode === \"dark\" ? \"light\" : \"dark\"),\n        title: `Switch to ${mode === \"dark\" ? \"light\" : \"dark\"} mode`,\n        sx: {\n            position: \"absolute\",\n            top: [\n                2,\n                3\n            ],\n            right: [\n                2,\n                3\n            ],\n            color: \"primary\",\n            cursor: \"pointer\",\n            borderRadius: \"circle\",\n            transition: \"box-shadow .125s ease-in-out\",\n            \":hover,:focus\": {\n                boxShadow: \"0 0 0 3px\",\n                outline: \"none\"\n            }\n        },\n        ...props,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n            viewBox: \"0 0 32 32\",\n            width: 24,\n            height: 24,\n            fill: \"currentcolor\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"circle\", {\n                    cx: 16,\n                    cy: 16,\n                    r: 14,\n                    fill: \"none\",\n                    stroke: \"currentcolor\",\n                    strokeWidth: 4\n                }, void 0, false, {\n                    fileName: \"/Users/thomasstubblefield/Developer/clubsdirectory/site/components/color-switcher.js\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                    d: \"M 16 0 A 16 16 0 0 0 16 32 z\"\n                }, void 0, false, {\n                    fileName: \"/Users/thomasstubblefield/Developer/clubsdirectory/site/components/color-switcher.js\",\n                    lineNumber: 33,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/thomasstubblefield/Developer/clubsdirectory/site/components/color-switcher.js\",\n            lineNumber: 24,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/thomasstubblefield/Developer/clubsdirectory/site/components/color-switcher.js\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorSwitcher);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NvbG9yLXN3aXRjaGVyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFBbUQ7QUFFbkQsTUFBTUUsZ0JBQWdCLENBQUNDLFFBQVU7SUFDL0IsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdKLHNEQUFZQTtJQUNwQyxxQkFDRSw4REFBQ0QsZ0RBQVVBO1FBQ1RNLFNBQVMsSUFBTUQsUUFBUUQsU0FBUyxTQUFTLFVBQVUsTUFBTTtRQUN6REcsT0FBTyxDQUFDLFVBQVUsRUFBRUgsU0FBUyxTQUFTLFVBQVUsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM3REksSUFBSTtZQUNGQyxVQUFVO1lBQ1ZDLEtBQUs7Z0JBQUM7Z0JBQUc7YUFBRTtZQUNYQyxPQUFPO2dCQUFDO2dCQUFHO2FBQUU7WUFDYkMsT0FBTztZQUNQQyxRQUFRO1lBQ1JDLGNBQWM7WUFDZEMsWUFBWTtZQUNaLGlCQUFpQjtnQkFDZkMsV0FBVztnQkFDWEMsU0FBUztZQUNYO1FBQ0Y7UUFDQyxHQUFHZCxLQUFLO2tCQUVULDRFQUFDZTtZQUFJQyxTQUFRO1lBQVlDLE9BQU87WUFBSUMsUUFBUTtZQUFJQyxNQUFLOzs4QkFDbkQsOERBQUNDO29CQUNDQyxJQUFJO29CQUNKQyxJQUFJO29CQUNKQyxHQUFHO29CQUNISixNQUFLO29CQUNMSyxRQUFPO29CQUNQQyxhQUFhOzs7Ozs7OEJBRWYsOERBQUNDO29CQUFLQyxHQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztBQUloQjtBQUVBLGlFQUFlNUIsYUFBYUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BoYWNrY2x1Yi90aGVtZS1zdGFydGVyLy4vY29tcG9uZW50cy9jb2xvci1zd2l0Y2hlci5qcz9kNDFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEljb25CdXR0b24sIHVzZUNvbG9yTW9kZSB9IGZyb20gJ3RoZW1lLXVpJ1xuXG5jb25zdCBDb2xvclN3aXRjaGVyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IFttb2RlLCBzZXRNb2RlXSA9IHVzZUNvbG9yTW9kZSgpXG4gIHJldHVybiAoXG4gICAgPEljb25CdXR0b25cbiAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vZGUobW9kZSA9PT0gJ2RhcmsnID8gJ2xpZ2h0JyA6ICdkYXJrJyl9XG4gICAgICB0aXRsZT17YFN3aXRjaCB0byAke21vZGUgPT09ICdkYXJrJyA/ICdsaWdodCcgOiAnZGFyayd9IG1vZGVgfVxuICAgICAgc3g9e3tcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHRvcDogWzIsIDNdLFxuICAgICAgICByaWdodDogWzIsIDNdLFxuICAgICAgICBjb2xvcjogJ3ByaW1hcnknLFxuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnY2lyY2xlJyxcbiAgICAgICAgdHJhbnNpdGlvbjogJ2JveC1zaGFkb3cgLjEyNXMgZWFzZS1pbi1vdXQnLFxuICAgICAgICAnOmhvdmVyLDpmb2N1cyc6IHtcbiAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgMCAzcHgnLFxuICAgICAgICAgIG91dGxpbmU6ICdub25lJ1xuICAgICAgICB9XG4gICAgICB9fVxuICAgICAgey4uLnByb3BzfVxuICAgID5cbiAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAzMiAzMlwiIHdpZHRoPXsyNH0gaGVpZ2h0PXsyNH0gZmlsbD1cImN1cnJlbnRjb2xvclwiPlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgY3g9ezE2fVxuICAgICAgICAgIGN5PXsxNn1cbiAgICAgICAgICByPXsxNH1cbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPVwiY3VycmVudGNvbG9yXCJcbiAgICAgICAgICBzdHJva2VXaWR0aD17NH1cbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGggZD1cIk0gMTYgMCBBIDE2IDE2IDAgMCAwIDE2IDMyIHpcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgPC9JY29uQnV0dG9uPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbG9yU3dpdGNoZXJcbiJdLCJuYW1lcyI6WyJJY29uQnV0dG9uIiwidXNlQ29sb3JNb2RlIiwiQ29sb3JTd2l0Y2hlciIsInByb3BzIiwibW9kZSIsInNldE1vZGUiLCJvbkNsaWNrIiwidGl0bGUiLCJzeCIsInBvc2l0aW9uIiwidG9wIiwicmlnaHQiLCJjb2xvciIsImN1cnNvciIsImJvcmRlclJhZGl1cyIsInRyYW5zaXRpb24iLCJib3hTaGFkb3ciLCJvdXRsaW5lIiwic3ZnIiwidmlld0JveCIsIndpZHRoIiwiaGVpZ2h0IiwiZmlsbCIsImNpcmNsZSIsImN4IiwiY3kiLCJyIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJwYXRoIiwiZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/color-switcher.js\n");

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports[\"default\"] = void 0;\nvar _async_to_generator = (__webpack_require__(/*! @swc/helpers/lib/_async_to_generator.js */ \"./node_modules/@swc/helpers/lib/_async_to_generator.js\")[\"default\"]);\nvar _interop_require_default = (__webpack_require__(/*! @swc/helpers/lib/_interop_require_default.js */ \"./node_modules/@swc/helpers/lib/_interop_require_default.js\")[\"default\"]);\nvar _react = _interop_require_default(__webpack_require__(/*! react */ \"react\"));\nvar _utils = __webpack_require__(/*! ../shared/lib/utils */ \"../shared/lib/utils\");\nfunction appGetInitialProps(_) {\n    return _appGetInitialProps.apply(this, arguments);\n}\nfunction _appGetInitialProps() {\n    _appGetInitialProps = /**\n * `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.\n * This allows for keeping state between navigation, custom error handling, injecting additional data.\n */ _async_to_generator(function*({ Component , ctx  }) {\n        const pageProps = yield (0, _utils).loadGetInitialProps(Component, ctx);\n        return {\n            pageProps\n        };\n    });\n    return _appGetInitialProps.apply(this, arguments);\n}\nvar _Component;\nclass App extends (_Component = _react.default.Component) {\n    render() {\n        const { Component , pageProps  } = this.props;\n        return /*#__PURE__*/ _react.default.createElement(Component, Object.assign({}, pageProps));\n    }\n}\nApp.origGetInitialProps = appGetInitialProps;\nApp.getInitialProps = appGetInitialProps;\nexports[\"default\"] = App;\nif ((typeof exports.default === \"function\" || typeof exports.default === \"object\" && exports.default !== null) && typeof exports.default.__esModule === \"undefined\") {\n    Object.defineProperty(exports.default, \"__esModule\", {\n        value: true\n    });\n    Object.assign(exports.default, exports);\n    module.exports = exports.default;\n} //# sourceMappingURL=_app.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19hcHAuanMuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYkEsOENBQTZDO0lBQ3pDRyxPQUFPLElBQUk7QUFDZixDQUFDLEVBQUM7QUFDRkQsa0JBQWUsR0FBRyxLQUFLO0FBQ3ZCLElBQUlHLHNCQUFzQkMseUlBQTBEO0FBQ3BGLElBQUlDLDJCQUEyQkQsbUpBQStEO0FBQzlGLElBQUlFLFNBQVNELHlCQUF5QkQsbUJBQU9BLENBQUMsb0JBQU87QUFDckQsSUFBSUcsU0FBU0gsbUJBQU9BLENBQUMsZ0RBQXFCO0FBQzFDLFNBQVNJLG1CQUFtQkMsQ0FBQyxFQUFFO0lBQzNCLE9BQU9DLG9CQUFvQkMsS0FBSyxDQUFDLElBQUksRUFBRUM7QUFDM0M7QUFDQSxTQUFTRixzQkFBc0I7SUFDM0JBLHNCQUFzQjs7O0NBR3pCLEdBQUdQLG9CQUFvQixVQUFVLEVBQUVVLFVBQVMsRUFBR0MsSUFBRyxFQUFHLEVBQUU7UUFDaEQsTUFBTUMsWUFBWSxNQUFNLENBQUMsR0FBR1IsTUFBTSxFQUFFUyxtQkFBbUIsQ0FBQ0gsV0FBV0M7UUFDbkUsT0FBTztZQUNIQztRQUNKO0lBQ0o7SUFDQSxPQUFPTCxvQkFBb0JDLEtBQUssQ0FBQyxJQUFJLEVBQUVDO0FBQzNDO0FBQ0EsSUFBSUs7QUFDSixNQUFNQyxZQUFhRCxDQUFBQSxhQUFhWCxPQUFPSixPQUFPLENBQUNXLFNBQVM7SUFDcERNLFNBQVM7UUFDTCxNQUFNLEVBQUVOLFVBQVMsRUFBR0UsVUFBUyxFQUFHLEdBQUcsSUFBSSxDQUFDSyxLQUFLO1FBQzdDLE9BQU8sV0FBVyxHQUFHZCxPQUFPSixPQUFPLENBQUNtQixhQUFhLENBQUNSLFdBQVdmLE9BQU93QixNQUFNLENBQUMsQ0FBQyxHQUFHUDtJQUNuRjtBQUNKO0FBQ0FHLElBQUlLLG1CQUFtQixHQUFHZjtBQUMxQlUsSUFBSU0sZUFBZSxHQUFHaEI7QUFDdEJSLGtCQUFlLEdBQUdrQjtBQUVsQixJQUFJLENBQUMsT0FBT2xCLFFBQVFFLE9BQU8sS0FBSyxjQUFlLE9BQU9GLFFBQVFFLE9BQU8sS0FBSyxZQUFZRixRQUFRRSxPQUFPLEtBQUssSUFBSSxLQUFNLE9BQU9GLFFBQVFFLE9BQU8sQ0FBQ3VCLFVBQVUsS0FBSyxhQUFhO0lBQ3JLM0IsT0FBT0MsY0FBYyxDQUFDQyxRQUFRRSxPQUFPLEVBQUUsY0FBYztRQUFFRCxPQUFPLElBQUk7SUFBQztJQUNuRUgsT0FBT3dCLE1BQU0sQ0FBQ3RCLFFBQVFFLE9BQU8sRUFBRUY7SUFDL0IwQixPQUFPMUIsT0FBTyxHQUFHQSxRQUFRRSxPQUFPO0FBQ2xDLENBQUMsQ0FFRCxnQ0FBZ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AaGFja2NsdWIvdGhlbWUtc3RhcnRlci8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvcGFnZXMvX2FwcC5qcz85NjFkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9hc3luY190b19nZW5lcmF0b3IgPSByZXF1aXJlKFwiQHN3Yy9oZWxwZXJzL2xpYi9fYXN5bmNfdG9fZ2VuZXJhdG9yLmpzXCIpLmRlZmF1bHQ7XG52YXIgX2ludGVyb3BfcmVxdWlyZV9kZWZhdWx0ID0gcmVxdWlyZShcIkBzd2MvaGVscGVycy9saWIvX2ludGVyb3BfcmVxdWlyZV9kZWZhdWx0LmpzXCIpLmRlZmF1bHQ7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BfcmVxdWlyZV9kZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvdXRpbHNcIik7XG5mdW5jdGlvbiBhcHBHZXRJbml0aWFsUHJvcHMoXykge1xuICAgIHJldHVybiBfYXBwR2V0SW5pdGlhbFByb3BzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5mdW5jdGlvbiBfYXBwR2V0SW5pdGlhbFByb3BzKCkge1xuICAgIF9hcHBHZXRJbml0aWFsUHJvcHMgPSAvKipcbiAqIGBBcHBgIGNvbXBvbmVudCBpcyB1c2VkIGZvciBpbml0aWFsaXplIG9mIHBhZ2VzLiBJdCBhbGxvd3MgZm9yIG92ZXJ3cml0aW5nIGFuZCBmdWxsIGNvbnRyb2wgb2YgdGhlIGBwYWdlYCBpbml0aWFsaXphdGlvbi5cbiAqIFRoaXMgYWxsb3dzIGZvciBrZWVwaW5nIHN0YXRlIGJldHdlZW4gbmF2aWdhdGlvbiwgY3VzdG9tIGVycm9yIGhhbmRsaW5nLCBpbmplY3RpbmcgYWRkaXRpb25hbCBkYXRhLlxuICovIF9hc3luY190b19nZW5lcmF0b3IoZnVuY3Rpb24qKHsgQ29tcG9uZW50ICwgY3R4ICB9KSB7XG4gICAgICAgIGNvbnN0IHBhZ2VQcm9wcyA9IHlpZWxkICgwLCBfdXRpbHMpLmxvYWRHZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCBjdHgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFnZVByb3BzXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIF9hcHBHZXRJbml0aWFsUHJvcHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbnZhciBfQ29tcG9uZW50O1xuY2xhc3MgQXBwIGV4dGVuZHMgKF9Db21wb25lbnQgPSBfcmVhY3QuZGVmYXVsdC5Db21wb25lbnQpIHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgQ29tcG9uZW50ICwgcGFnZVByb3BzICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIHBhZ2VQcm9wcykpO1xuICAgIH1cbn1cbkFwcC5vcmlnR2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzO1xuQXBwLmdldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wcztcbmV4cG9ydHMuZGVmYXVsdCA9IEFwcDtcblxuaWYgKCh0eXBlb2YgZXhwb3J0cy5kZWZhdWx0ID09PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgZXhwb3J0cy5kZWZhdWx0ID09PSAnb2JqZWN0JyAmJiBleHBvcnRzLmRlZmF1bHQgIT09IG51bGwpKSAmJiB0eXBlb2YgZXhwb3J0cy5kZWZhdWx0Ll9fZXNNb2R1bGUgPT09ICd1bmRlZmluZWQnKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLmRlZmF1bHQsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgT2JqZWN0LmFzc2lnbihleHBvcnRzLmRlZmF1bHQsIGV4cG9ydHMpO1xuICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9X2FwcC5qcy5tYXAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiX2FzeW5jX3RvX2dlbmVyYXRvciIsInJlcXVpcmUiLCJfaW50ZXJvcF9yZXF1aXJlX2RlZmF1bHQiLCJfcmVhY3QiLCJfdXRpbHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJfIiwiX2FwcEdldEluaXRpYWxQcm9wcyIsImFwcGx5IiwiYXJndW1lbnRzIiwiQ29tcG9uZW50IiwiY3R4IiwicGFnZVByb3BzIiwibG9hZEdldEluaXRpYWxQcm9wcyIsIl9Db21wb25lbnQiLCJBcHAiLCJyZW5kZXIiLCJwcm9wcyIsImNyZWF0ZUVsZW1lbnQiLCJhc3NpZ24iLCJvcmlnR2V0SW5pdGlhbFByb3BzIiwiZ2V0SW5pdGlhbFByb3BzIiwiX19lc01vZHVsZSIsIm1vZHVsZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dist/pages/_app.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ \"./node_modules/next/app.js\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _hackclub_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @hackclub/theme */ \"@hackclub/theme\");\n/* harmony import */ var _hackclub_theme__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_hackclub_theme__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! theme-ui */ \"theme-ui\");\n/* harmony import */ var theme_ui__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(theme_ui__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_color_switcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/color-switcher */ \"./components/color-switcher.js\");\n/* harmony import */ var _hackclub_theme_fonts_reg_bold_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @hackclub/theme/fonts/reg-bold.css */ \"./node_modules/@hackclub/theme/fonts/reg-bold.css\");\n/* harmony import */ var _hackclub_theme_fonts_reg_bold_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_hackclub_theme_fonts_reg_bold_css__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n// import '@hackclub/theme/fonts/reg-bold.css'\n\n\n\n\nclass App extends (next_app__WEBPACK_IMPORTED_MODULE_2___default()) {\n    render() {\n        const { Component , pageProps  } = this.props;\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(theme_ui__WEBPACK_IMPORTED_MODULE_4__.ThemeProvider, {\n            theme: (_hackclub_theme__WEBPACK_IMPORTED_MODULE_3___default()),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/Users/thomasstubblefield/Developer/clubsdirectory/site/pages/_app.js\",\n                lineNumber: 15,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Users/thomasstubblefield/Developer/clubsdirectory/site/pages/_app.js\",\n            lineNumber: 14,\n            columnNumber: 7\n        }, this);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBOEI7QUFDQTtBQUU5Qiw4Q0FBOEM7QUFDWDtBQUNLO0FBQ2dCO0FBQ2I7QUFFNUIsTUFBTUssWUFBWUosaURBQU9BO0lBQ3RDSyxTQUFTO1FBQ1AsTUFBTSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBRSxHQUFHLElBQUksQ0FBQ0MsS0FBSztRQUMzQyxxQkFDRSw4REFBQ04sbURBQWFBO1lBQUNELE9BQU9BLHdEQUFLQTtzQkFDekIsNEVBQUNLO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0lBRzlCO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BoYWNrY2x1Yi90aGVtZS1zdGFydGVyLy4vcGFnZXMvX2FwcC5qcz9lMGFkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE5leHRBcHAgZnJvbSAnbmV4dC9hcHAnXG5cbi8vIGltcG9ydCAnQGhhY2tjbHViL3RoZW1lL2ZvbnRzL3JlZy1ib2xkLmNzcydcbmltcG9ydCB0aGVtZSBmcm9tICdAaGFja2NsdWIvdGhlbWUnXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAndGhlbWUtdWknXG5pbXBvcnQgQ29sb3JTd2l0Y2hlciBmcm9tICcuLi9jb21wb25lbnRzL2NvbG9yLXN3aXRjaGVyJ1xuaW1wb3J0ICdAaGFja2NsdWIvdGhlbWUvZm9udHMvcmVnLWJvbGQuY3NzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBOZXh0QXBwIHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gKFxuICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgIClcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiTmV4dEFwcCIsInRoZW1lIiwiVGhlbWVQcm92aWRlciIsIkNvbG9yU3dpdGNoZXIiLCJBcHAiLCJyZW5kZXIiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJwcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./node_modules/@hackclub/theme/fonts/reg-bold.css":
/*!*********************************************************!*\
  !*** ./node_modules/@hackclub/theme/fonts/reg-bold.css ***!
  \*********************************************************/
/***/ (() => {



/***/ }),

/***/ "@hackclub/theme":
/*!**********************************!*\
  !*** external "@hackclub/theme" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@hackclub/theme");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "theme-ui":
/*!***************************!*\
  !*** external "theme-ui" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("theme-ui");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();