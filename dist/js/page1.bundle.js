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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
  click: false
};

var colors = ["#BF0413", "orange", "#730202", "#D9D9D9"];

// Event Listeners
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("mousedown", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.click = "down";
});
addEventListener("mouseup", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  mouse.click = "up";
});

addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

var gravity = 1;
var friction = 0.95;

// Objects
function Ball(y, radius, color) {
  this.radius = Math.random() * 20;
  this.x = Math.random() * canvas.width - this.radius;
  this.y = Math.random() * canvas.height - this.radius;
  this.dx = (Math.random() - 0.5) * 3;
  this.dy = (Math.random() - 0.5) * 3;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };

  this.checkForWall = function () {
    if (this.y > canvas.height - this.radius + 2) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if (this.y < this.radius) {
      this.dy = -this.dy;
    }
    if (this.x > canvas.width - this.radius || this.x < this.radius) {
      this.dx = -this.dx * friction;
    }
  };
  this.checkMouseClick = function () {
    if (mouse.click === "down") {
      gravity = 1;
      if (this.x !== mouse.x) {
        if (this.x < mouse.x) {
          if (this.x !== mouse.x) {
            this.x += 12;
            this.dx = 2;
          }
        }
        if (this.x > mouse.x) {
          if (this.x !== mouse.x) {
            this.x -= 12;
            this.dx = 2;
          }
        }
      }
      if (this.y !== mouse.y) {
        if (this.y > mouse.y) {
          if (this.y !== mouse.y) {
            this.y -= 12;
            this.dy = 2;
          }
        }
        if (this.y < mouse.y) {
          if (this.y !== mouse.y) {
            this.y += 12;
            this.dy = 2;
          }
        }
      }
    } else if (mouse.click === "up") {
      gravity = 0;
      this.dy = (Math.random() - 0.5) * 50;
      this.dx = (Math.random() - 0.5) * 50;
      if (this.y - mouse.y > 50) {
        gravity = 1;
        mouse.click = undefined;
      }
    }
  };

  this.update = function () {
    this.draw();
    this.checkMouseClick();
    this.checkForWall();

    this.x += this.dx;
    this.y += this.dy;
  };
}

// Implementation

var ballArr = [];

function init() {
  ballArr = [];
  for (var i = 0; i < 200; i++) {
    ballArr.push(new Ball());
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ballArr.map(function (item) {
    item.update();
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=page1.bundle.js.map