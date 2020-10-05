// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plusOrMinus = exports.debounce = exports.randomIntFromInterval = exports.outsideOfGame = exports.detectCollision = void 0;

function detectCollision(object, object2) {
  var bottomOfObject = object.position.y + object.height;
  var topOfObject = object.position.y;
  var leftOfObject = object.position.x;
  var rightOfObject = object.position.x + object.width;
  var topOfObject2 = object2.position.y;
  var leftSideOfObject2 = object2.position.x;
  var rightSideOfObject2 = object2.position.x + object2.width;
  var bottomOfObject2 = object2.position.y + object2.height;

  if (bottomOfObject >= topOfObject2 && topOfObject <= bottomOfObject2 && leftOfObject >= leftSideOfObject2 && rightOfObject <= rightSideOfObject2) {
    return true;
  } else {
    return false;
  }
}

exports.detectCollision = detectCollision;

function outsideOfGame(object, gameObject) {
  var bottomOfObject = object.position.y + object.height;
  var topOfObject = object.position.y;
  var leftOfObject = object.position.x;
  var rightOfObject = object.position.x + object.width;

  if (topOfObject >= gameObject.gameHeight || bottomOfObject <= 0 || leftOfObject >= gameObject.gameWidth || rightOfObject <= 0) {
    return true;
  } else {
    return false;
  }
}

exports.outsideOfGame = outsideOfGame;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.randomIntFromInterval = randomIntFromInterval;

function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var later = function later() {
      timeout = null;
      func.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

exports.debounce = debounce;
;

function plusOrMinus() {
  return Math.random() < 0.5 ? -1 : 1;
}

exports.plusOrMinus = plusOrMinus;
},{}],"src/key-input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var KeyInputHandler =
/** @class */
function () {
  function KeyInputHandler(ship, game) {
    document.addEventListener('keydown', function (event) {
      // console.log('keydown', ship.speed, event.code);
      switch (event.code) {
        case 'ArrowLeft':
          ship.moveLeft();
          break;

        case 'ArrowUp':
          ship.moveUp();
          break;

        case 'ArrowRight':
          ship.moveRight();
          break;

        case 'ArrowDown':
          ship.moveDown();
          break;

        case 'Space':
          ship.shoot();
          break;

        case 'KeyS':
          game.start();
          break;

        case 'KeyM':
          game.menu();
          break;
      }
    });
    document.addEventListener('keyup', utils_1.debounce(function (event) {
      // console.log('keyup', ship.speed, event.code);
      switch (event.code) {
        case 'ArrowLeft':
          // if (ship.speed.x < 0) 
          ship.stop();
          break;

        case 'ArrowUp':
          // if (ship.speed.y < 0) 
          ship.stop();
          break;

        case 'ArrowRight':
          // if (ship.speed.x > 0) 
          ship.stop();
          break;

        case 'ArrowDown':
          // if (ship.speed.y > 0) 
          ship.stop();
          break;
      }
    }, 50));
  }

  return KeyInputHandler;
}();

exports.default = KeyInputHandler;
},{"./utils":"src/utils.ts"}],"src/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHIP_MAX_SPEED = exports.OBJECT_TYPE = exports.DIRECTION = exports.GAMESTATE = void 0;
exports.GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  SPLASH_SCREEN: 4
};
exports.DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
};
exports.OBJECT_TYPE = {
  PLAYER_SHIP: 0,
  ENEMY_SHIP: 1,
  ROCKET: 2,
  PARTICLE: 3,
  PARTICLES: 4
};
exports.SHIP_MAX_SPEED = {
  x: 2,
  y: 2
};
},{}],"src/game-object.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameObject =
/** @class */
function () {
  function GameObject(width, height, position, speed, game) {
    this.angle = 0;
    this.position = {
      x: 0,
      y: 0
    };
    this.speed = {
      x: 0,
      y: 0
    };
    this.isDeleted = false;
    this.type = 0;
    this.color = '#0ff';
    this.width = width;
    this.height = height;
    this.game = game;
    this.position.x = position.x;
    this.position.y = position.y;
    this.speed.x = speed.x;
    this.speed.y = speed.y;
  }

  GameObject.prototype.loadImage = function (image) {
    this.image = new Image(this.width, this.height);
    this.image.src = image;
  };

  GameObject.prototype.speedUpdate = function () {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    this.setAngle();
  };

  GameObject.prototype.setAngle = function () {
    if (this.speed.x > 0 && this.speed.y > 0) {
      this.angle = 135 * Math.PI / 180;
    }

    if (this.speed.x > 0 && this.speed.y === 0) {
      this.angle = 90 * Math.PI / 180;
    }

    if (this.speed.x > 0 && this.speed.y < 0) {
      this.angle = 45 * Math.PI / 180;
    }

    if (this.speed.x === 0 && this.speed.y > 0) {
      this.angle = 180 * Math.PI / 180;
    }

    if (this.speed.x === 0 && this.speed.y < 0) {
      this.angle = 0 * Math.PI / 180;
    }

    if (this.speed.x < 0 && this.speed.y > 0) {
      this.angle = 225 * Math.PI / 180;
    }

    if (this.speed.x < 0 && this.speed.y === 0) {
      this.angle = 270 * Math.PI / 180;
    }

    if (this.speed.x < 0 && this.speed.y < 0) {
      this.angle = 315 * Math.PI / 180;
    }
  };

  return GameObject;
}();

exports.default = GameObject;
},{}],"src/rocket.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("./constants");

var utils_1 = require("./utils");

var game_object_1 = __importDefault(require("./game-object"));

var ROCKET_SPEED = {
  x: 4,
  y: 4
};

var Rocket =
/** @class */
function (_super) {
  __extends(Rocket, _super);

  function Rocket(game, position, speed) {
    var _this = this;

    var rocketSpeed = {
      x: 0,
      y: 0
    };

    if (speed.x === 0 && speed.y === 0) {
      rocketSpeed.x = ROCKET_SPEED.x;
      rocketSpeed.y = 0;
    } else {
      rocketSpeed = {
        x: speed.x > 0 ? ROCKET_SPEED.x : speed.x < 0 ? -ROCKET_SPEED.x : 0,
        y: speed.y > 0 ? ROCKET_SPEED.y : speed.y < 0 ? -ROCKET_SPEED.y : 0
      };
    }

    _this = _super.call(this, 10, 10, position, rocketSpeed, game) || this;
    _this.type = constants_1.OBJECT_TYPE.ROCKET;
    _this.color = '#f00';

    _this.loadImage('assets/rocket.png');

    return _this;
  }

  Rocket.prototype.update = function () {
    var _this = this;

    this.speedUpdate();

    if (utils_1.outsideOfGame(this, this.game)) {
      this.isDeleted = true;
    } else {
      var enemies = this.game.gameObjects.filter(function (object) {
        return object.type === constants_1.OBJECT_TYPE.ENEMY_SHIP;
      });

      if (enemies) {
        enemies.forEach(function (enemy) {
          if (utils_1.detectCollision(_this, enemy)) {
            enemy.exploded = true;
            _this.isDeleted = true;
          }
        });
      }
    }
  };

  Rocket.prototype.draw = function (ctx) {
    if (this.image) {
      ctx.save();
      ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
      ctx.rotate(this.angle);
      ctx.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2));
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      ctx.restore();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  };

  return Rocket;
}(game_object_1.default);

exports.default = Rocket;
},{"./constants":"src/constants.ts","./utils":"src/utils.ts","./game-object":"src/game-object.ts"}],"node_modules/js-binary-schema-parser/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loop = exports.conditional = exports.parse = void 0;

var parse = function parse(stream, schema) {
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : result;

  if (Array.isArray(schema)) {
    schema.forEach(function (partSchema) {
      return parse(stream, partSchema, result, parent);
    });
  } else if (typeof schema === 'function') {
    schema(stream, result, parent, parse);
  } else {
    var key = Object.keys(schema)[0];

    if (Array.isArray(schema[key])) {
      parent[key] = {};
      parse(stream, schema[key], result, parent[key]);
    } else {
      parent[key] = schema[key](stream, result, parent, parse);
    }
  }

  return result;
};

exports.parse = parse;

var conditional = function conditional(schema, conditionFunc) {
  return function (stream, result, parent, parse) {
    if (conditionFunc(stream, result, parent)) {
      parse(stream, schema, result, parent);
    }
  };
};

exports.conditional = conditional;

var loop = function loop(schema, continueFunc) {
  return function (stream, result, parent, parse) {
    var arr = [];

    while (continueFunc(stream, result, parent)) {
      var newParent = {};
      parse(stream, schema, result, newParent);
      arr.push(newParent);
    }

    return arr;
  };
};

exports.loop = loop;
},{}],"node_modules/js-binary-schema-parser/lib/parsers/uint8.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readBits = exports.readArray = exports.readUnsigned = exports.readString = exports.peekBytes = exports.readBytes = exports.peekByte = exports.readByte = exports.buildStream = void 0;

// Default stream and parsers for Uint8TypedArray data type
var buildStream = function buildStream(uint8Data) {
  return {
    data: uint8Data,
    pos: 0
  };
};

exports.buildStream = buildStream;

var readByte = function readByte() {
  return function (stream) {
    return stream.data[stream.pos++];
  };
};

exports.readByte = readByte;

var peekByte = function peekByte() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return function (stream) {
    return stream.data[stream.pos + offset];
  };
};

exports.peekByte = peekByte;

var readBytes = function readBytes(length) {
  return function (stream) {
    return stream.data.subarray(stream.pos, stream.pos += length);
  };
};

exports.readBytes = readBytes;

var peekBytes = function peekBytes(length) {
  return function (stream) {
    return stream.data.subarray(stream.pos, stream.pos + length);
  };
};

exports.peekBytes = peekBytes;

var readString = function readString(length) {
  return function (stream) {
    return Array.from(readBytes(length)(stream)).map(function (value) {
      return String.fromCharCode(value);
    }).join('');
  };
};

exports.readString = readString;

var readUnsigned = function readUnsigned(littleEndian) {
  return function (stream) {
    var bytes = readBytes(2)(stream);
    return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
  };
};

exports.readUnsigned = readUnsigned;

var readArray = function readArray(byteSize, totalOrFunc) {
  return function (stream, result, parent) {
    var total = typeof totalOrFunc === 'function' ? totalOrFunc(stream, result, parent) : totalOrFunc;
    var parser = readBytes(byteSize);
    var arr = new Array(total);

    for (var i = 0; i < total; i++) {
      arr[i] = parser(stream);
    }

    return arr;
  };
};

exports.readArray = readArray;

var subBitsTotal = function subBitsTotal(bits, startIndex, length) {
  var result = 0;

  for (var i = 0; i < length; i++) {
    result += bits[startIndex + i] && Math.pow(2, length - i - 1);
  }

  return result;
};

var readBits = function readBits(schema) {
  return function (stream) {
    var _byte = readByte()(stream); // convert the byte to bit array


    var bits = new Array(8);

    for (var i = 0; i < 8; i++) {
      bits[7 - i] = !!(_byte & 1 << i);
    } // convert the bit array to values based on the schema


    return Object.keys(schema).reduce(function (res, key) {
      var def = schema[key];

      if (def.length) {
        res[key] = subBitsTotal(bits, def.index, def.length);
      } else {
        res[key] = bits[def.index];
      }

      return res;
    }, {});
  };
};

exports.readBits = readBits;
},{}],"node_modules/js-binary-schema-parser/lib/schemas/gif.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("../");

var _uint = require("../parsers/uint8");

// a set of 0x00 terminated subblocks
var subBlocksSchema = {
  blocks: function blocks(stream) {
    var terminator = 0x00;
    var chunks = [];
    var total = 0;

    for (var size = (0, _uint.readByte)()(stream); size !== terminator; size = (0, _uint.readByte)()(stream)) {
      chunks.push((0, _uint.readBytes)(size)(stream));
      total += size;
    }

    var result = new Uint8Array(total);
    var offset = 0;

    for (var i = 0; i < chunks.length; i++) {
      result.set(chunks[i], offset);
      offset += chunks[i].length;
    }

    return result;
  }
}; // global control extension

var gceSchema = (0, _.conditional)({
  gce: [{
    codes: (0, _uint.readBytes)(2)
  }, {
    byteSize: (0, _uint.readByte)()
  }, {
    extras: (0, _uint.readBits)({
      future: {
        index: 0,
        length: 3
      },
      disposal: {
        index: 3,
        length: 3
      },
      userInput: {
        index: 6
      },
      transparentColorGiven: {
        index: 7
      }
    })
  }, {
    delay: (0, _uint.readUnsigned)(true)
  }, {
    transparentColorIndex: (0, _uint.readByte)()
  }, {
    terminator: (0, _uint.readByte)()
  }]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0xf9;
}); // image pipeline block

var imageSchema = (0, _.conditional)({
  image: [{
    code: (0, _uint.readByte)()
  }, {
    descriptor: [{
      left: (0, _uint.readUnsigned)(true)
    }, {
      top: (0, _uint.readUnsigned)(true)
    }, {
      width: (0, _uint.readUnsigned)(true)
    }, {
      height: (0, _uint.readUnsigned)(true)
    }, {
      lct: (0, _uint.readBits)({
        exists: {
          index: 0
        },
        interlaced: {
          index: 1
        },
        sort: {
          index: 2
        },
        future: {
          index: 3,
          length: 2
        },
        size: {
          index: 5,
          length: 3
        }
      })
    }]
  }, (0, _.conditional)({
    lct: (0, _uint.readArray)(3, function (stream, result, parent) {
      return Math.pow(2, parent.descriptor.lct.size + 1);
    })
  }, function (stream, result, parent) {
    return parent.descriptor.lct.exists;
  }), {
    data: [{
      minCodeSize: (0, _uint.readByte)()
    }, subBlocksSchema]
  }]
}, function (stream) {
  return (0, _uint.peekByte)()(stream) === 0x2c;
}); // plain text block

var textSchema = (0, _.conditional)({
  text: [{
    codes: (0, _uint.readBytes)(2)
  }, {
    blockSize: (0, _uint.readByte)()
  }, {
    preData: function preData(stream, result, parent) {
      return (0, _uint.readBytes)(parent.text.blockSize)(stream);
    }
  }, subBlocksSchema]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0x01;
}); // application block

var applicationSchema = (0, _.conditional)({
  application: [{
    codes: (0, _uint.readBytes)(2)
  }, {
    blockSize: (0, _uint.readByte)()
  }, {
    id: function id(stream, result, parent) {
      return (0, _uint.readString)(parent.blockSize)(stream);
    }
  }, subBlocksSchema]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0xff;
}); // comment block

var commentSchema = (0, _.conditional)({
  comment: [{
    codes: (0, _uint.readBytes)(2)
  }, subBlocksSchema]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0xfe;
});
var schema = [{
  header: [{
    signature: (0, _uint.readString)(3)
  }, {
    version: (0, _uint.readString)(3)
  }]
}, {
  lsd: [{
    width: (0, _uint.readUnsigned)(true)
  }, {
    height: (0, _uint.readUnsigned)(true)
  }, {
    gct: (0, _uint.readBits)({
      exists: {
        index: 0
      },
      resolution: {
        index: 1,
        length: 3
      },
      sort: {
        index: 4
      },
      size: {
        index: 5,
        length: 3
      }
    })
  }, {
    backgroundColorIndex: (0, _uint.readByte)()
  }, {
    pixelAspectRatio: (0, _uint.readByte)()
  }]
}, (0, _.conditional)({
  gct: (0, _uint.readArray)(3, function (stream, result) {
    return Math.pow(2, result.lsd.gct.size + 1);
  })
}, function (stream, result) {
  return result.lsd.gct.exists;
}), // content frames
{
  frames: (0, _.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function (stream) {
    var nextCode = (0, _uint.peekByte)()(stream); // rather than check for a terminator, we should check for the existence
    // of an ext or image block to avoid infinite loops
    //var terminator = 0x3B;
    //return nextCode !== terminator;

    return nextCode === 0x21 || nextCode === 0x2c;
  })
}];
var _default = schema;
exports["default"] = _default;
},{"../":"node_modules/js-binary-schema-parser/lib/index.js","../parsers/uint8":"node_modules/js-binary-schema-parser/lib/parsers/uint8.js"}],"node_modules/gifuct-js/lib/deinterlace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deinterlace = void 0;

/**
 * Deinterlace function from https://github.com/shachaf/jsgif
 */
var deinterlace = function deinterlace(pixels, width) {
  var newPixels = new Array(pixels.length);
  var rows = pixels.length / width;

  var cpRow = function cpRow(toRow, fromRow) {
    var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
  }; // See appendix E.


  var offsets = [0, 4, 2, 1];
  var steps = [8, 8, 4, 2];
  var fromRow = 0;

  for (var pass = 0; pass < 4; pass++) {
    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
      cpRow(toRow, fromRow);
      fromRow++;
    }
  }

  return newPixels;
};

exports.deinterlace = deinterlace;
},{}],"node_modules/gifuct-js/lib/lzw.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lzw = void 0;

/**
 * javascript port of java LZW decompression
 * Original java author url: https://gist.github.com/devunwired/4479231
 */
var lzw = function lzw(minCodeSize, data, pixelCount) {
  var MAX_STACK_SIZE = 4096;
  var nullCode = -1;
  var npix = pixelCount;
  var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
  var dstPixels = new Array(pixelCount);
  var prefix = new Array(MAX_STACK_SIZE);
  var suffix = new Array(MAX_STACK_SIZE);
  var pixelStack = new Array(MAX_STACK_SIZE + 1); // Initialize GIF data stream decoder.

  data_size = minCodeSize;
  clear = 1 << data_size;
  end_of_information = clear + 1;
  available = clear + 2;
  old_code = nullCode;
  code_size = data_size + 1;
  code_mask = (1 << code_size) - 1;

  for (code = 0; code < clear; code++) {
    prefix[code] = 0;
    suffix[code] = code;
  } // Decode GIF pixel stream.


  var datum, bits, count, first, top, pi, bi;
  datum = bits = count = first = top = pi = bi = 0;

  for (i = 0; i < npix;) {
    if (top === 0) {
      if (bits < code_size) {
        // get the next byte
        datum += data[bi] << bits;
        bits += 8;
        bi++;
        continue;
      } // Get the next code.


      code = datum & code_mask;
      datum >>= code_size;
      bits -= code_size; // Interpret the code

      if (code > available || code == end_of_information) {
        break;
      }

      if (code == clear) {
        // Reset decoder.
        code_size = data_size + 1;
        code_mask = (1 << code_size) - 1;
        available = clear + 2;
        old_code = nullCode;
        continue;
      }

      if (old_code == nullCode) {
        pixelStack[top++] = suffix[code];
        old_code = code;
        first = code;
        continue;
      }

      in_code = code;

      if (code == available) {
        pixelStack[top++] = first;
        code = old_code;
      }

      while (code > clear) {
        pixelStack[top++] = suffix[code];
        code = prefix[code];
      }

      first = suffix[code] & 0xff;
      pixelStack[top++] = first; // add a new string to the table, but only if space is available
      // if not, just continue with current table until a clear code is found
      // (deferred clear code implementation as per GIF spec)

      if (available < MAX_STACK_SIZE) {
        prefix[available] = old_code;
        suffix[available] = first;
        available++;

        if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
          code_size++;
          code_mask += available;
        }
      }

      old_code = in_code;
    } // Pop a pixel off the pixel stack.


    top--;
    dstPixels[pi++] = pixelStack[top];
    i++;
  }

  for (i = pi; i < npix; i++) {
    dstPixels[i] = 0; // clear missing pixels
  }

  return dstPixels;
};

exports.lzw = lzw;
},{}],"node_modules/gifuct-js/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decompressFrames = exports.decompressFrame = exports.parseGIF = void 0;

var _gif = _interopRequireDefault(require("js-binary-schema-parser/lib/schemas/gif"));

var _jsBinarySchemaParser = require("js-binary-schema-parser");

var _uint = require("js-binary-schema-parser/lib/parsers/uint8");

var _deinterlace = require("./deinterlace");

var _lzw = require("./lzw");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parseGIF = function parseGIF(arrayBuffer) {
  var byteData = new Uint8Array(arrayBuffer);
  return (0, _jsBinarySchemaParser.parse)((0, _uint.buildStream)(byteData), _gif["default"]);
};

exports.parseGIF = parseGIF;

var generatePatch = function generatePatch(image) {
  var totalPixels = image.pixels.length;
  var patchData = new Uint8ClampedArray(totalPixels * 4);

  for (var i = 0; i < totalPixels; i++) {
    var pos = i * 4;
    var colorIndex = image.pixels[i];
    var color = image.colorTable[colorIndex];
    patchData[pos] = color[0];
    patchData[pos + 1] = color[1];
    patchData[pos + 2] = color[2];
    patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
  }

  return patchData;
};

var decompressFrame = function decompressFrame(frame, gct, buildImagePatch) {
  if (!frame.image) {
    console.warn('gif frame does not have associated image.');
    return;
  }

  var image = frame.image; // get the number of pixels

  var totalPixels = image.descriptor.width * image.descriptor.height; // do lzw decompression

  var pixels = (0, _lzw.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels); // deal with interlacing if necessary

  if (image.descriptor.lct.interlaced) {
    pixels = (0, _deinterlace.deinterlace)(pixels, image.descriptor.width);
  }

  var resultImage = {
    pixels: pixels,
    dims: {
      top: frame.image.descriptor.top,
      left: frame.image.descriptor.left,
      width: frame.image.descriptor.width,
      height: frame.image.descriptor.height
    }
  }; // color table

  if (image.descriptor.lct && image.descriptor.lct.exists) {
    resultImage.colorTable = image.lct;
  } else {
    resultImage.colorTable = gct;
  } // add per frame relevant gce information


  if (frame.gce) {
    resultImage.delay = (frame.gce.delay || 10) * 10; // convert to ms

    resultImage.disposalType = frame.gce.extras.disposal; // transparency

    if (frame.gce.extras.transparentColorGiven) {
      resultImage.transparentIndex = frame.gce.transparentColorIndex;
    }
  } // create canvas usable imagedata if desired


  if (buildImagePatch) {
    resultImage.patch = generatePatch(resultImage);
  }

  return resultImage;
};

exports.decompressFrame = decompressFrame;

var decompressFrames = function decompressFrames(parsedGif, buildImagePatches) {
  return parsedGif.frames.filter(function (f) {
    return f.image;
  }).map(function (f) {
    return decompressFrame(f, parsedGif.gct, buildImagePatches);
  });
};

exports.decompressFrames = decompressFrames;
},{"js-binary-schema-parser/lib/schemas/gif":"node_modules/js-binary-schema-parser/lib/schemas/gif.js","js-binary-schema-parser":"node_modules/js-binary-schema-parser/lib/index.js","js-binary-schema-parser/lib/parsers/uint8":"node_modules/js-binary-schema-parser/lib/parsers/uint8.js","./deinterlace":"node_modules/gifuct-js/lib/deinterlace.js","./lzw":"node_modules/gifuct-js/lib/lzw.js"}],"src/ship.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var gifuct_js_1 = require("gifuct-js");

var game_object_1 = __importDefault(require("./game-object"));

var Ship =
/** @class */
function (_super) {
  __extends(Ship, _super);

  function Ship(game, size, position, maxSpeed) {
    var _this = _super.call(this, size.width, size.height, position, {
      x: 0,
      y: 0
    }, game) || this;

    _this.limitedToGameArea = false;
    _this.exploded = false;
    _this.maxSpeed = maxSpeed;
    _this.lastSpeed = maxSpeed;
    fetch('assets/explosion.gif').then(function (resp) {
      return resp.arrayBuffer();
    }).then(function (buff) {
      return gifuct_js_1.parseGIF(buff);
    }).then(function (gif) {
      _this.explosion = gifuct_js_1.decompressFrames(gif, true);
      _this.explosionFrame = 0;
    });
    return _this;
  }

  Ship.prototype.moveLeft = function () {
    if (this.position.x <= 0 && this.limitedToGameArea) {
      this.speed.x = 0;
    } else {
      this.speed.x = -this.maxSpeed.x;
    }
  };

  Ship.prototype.moveRight = function () {
    if (this.position.x + this.width >= this.game.gameWidth && this.limitedToGameArea) {
      this.speed.x = 0;
    } else {
      this.speed.x = this.maxSpeed.x;
    }

    ;
  };

  Ship.prototype.moveUp = function () {
    if (this.position.y <= 0 && this.limitedToGameArea) {
      this.speed.y = 0;
    } else {
      this.speed.y = -this.maxSpeed.y;
    }
  };

  Ship.prototype.moveDown = function () {
    if (this.position.y + this.height >= this.game.gameHeight && this.limitedToGameArea) {
      this.speed.y = 0;
    } else {
      this.speed.y = this.maxSpeed.y;
    }
  };

  Ship.prototype.stop = function () {
    this.lastSpeed = __assign({}, this.speed);
    this.speed.x = 0;
    this.speed.y = 0;
    return;
  };

  Ship.prototype.update = function () {
    this.speedUpdate();
  };

  Ship.prototype._draw = function (ctx) {
    if (this.image) {
      ctx.save();
      ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
      ctx.rotate(this.angle);
      ctx.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2));
      ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      ctx.restore();
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  };

  return Ship;
}(game_object_1.default);

exports.default = Ship;
},{"gifuct-js":"node_modules/gifuct-js/lib/index.js","./game-object":"src/game-object.ts"}],"src/player-ship.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("./constants");

var rocket_1 = __importDefault(require("./rocket"));

var ship_1 = __importDefault(require("./ship"));

var START_POSITION = {
  x: 100,
  y: 100
};

var PlayerShip =
/** @class */
function (_super) {
  __extends(PlayerShip, _super);

  function PlayerShip(game) {
    var _this = _super.call(this, game, {
      width: 40,
      height: 40
    }, START_POSITION, constants_1.SHIP_MAX_SPEED) || this;

    _this.type = constants_1.OBJECT_TYPE.PLAYER_SHIP;
    _this.limitedToGameArea = true;
    _this.color = '#00f';

    _this.loadImage('assets/player-ship.png');

    _this.angle = 90 * Math.PI / 180;
    return _this;
  }

  PlayerShip.prototype.shoot = function () {
    var rocketSpeed = this.speed.x === 0 && this.speed.y === 0 && (this.lastSpeed.x !== 0 || this.lastSpeed.y !== 0) ? this.lastSpeed : this.speed;
    var rocketPosition = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };
    var rocket = new rocket_1.default(this.game, rocketPosition, rocketSpeed);
    this.game.addObject(rocket);
  };

  PlayerShip.prototype.draw = function (ctx) {
    if (this.exploded) {
      if (this.explosion[this.explosionFrame]) {
        var frame = this.explosion[this.explosionFrame];
        var tempCanvas = document.createElement('canvas');
        var tempCtx = tempCanvas.getContext('2d');
        var dims = frame.dims;
        tempCanvas.width = dims.width;
        tempCanvas.height = dims.height;
        var frameImageData = tempCtx.createImageData(dims.width, dims.height);
        frameImageData.data.set(frame.patch);
        tempCtx.putImageData(frameImageData, 0, 0);
        ctx.drawImage(tempCanvas, this.position.x, this.position.y, this.width, this.height);
        this.explosionFrame++;
      } else {
        this.game.gameState = constants_1.GAMESTATE.MENU;
      }
    } else {
      this._draw(ctx);
    }
  };

  return PlayerShip;
}(ship_1.default);

exports.default = PlayerShip;
},{"./constants":"src/constants.ts","./rocket":"src/rocket.ts","./ship":"src/ship.ts"}],"src/particle.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var constants_1 = require("./constants");

var game_object_1 = __importDefault(require("./game-object"));

var PARTICLE_SPEED = {
  x: 1,
  y: 1
};
var PARTICLE_SIZE = {
  width: 2,
  height: 2
};

var Particle =
/** @class */
function (_super) {
  __extends(Particle, _super);

  function Particle(game, position) {
    var _this = this;

    var particleSpeed = {
      x: PARTICLE_SPEED.x * utils_1.randomIntFromInterval(-10, 10),
      y: PARTICLE_SPEED.y * utils_1.randomIntFromInterval(-10, 10)
    };
    _this = _super.call(this, PARTICLE_SIZE.width, PARTICLE_SIZE.height, position, particleSpeed, game) || this;
    _this.type = constants_1.OBJECT_TYPE.PARTICLE;
    _this.color = '#fffaff';
    return _this;
  }

  Particle.prototype.update = function () {
    this.speedUpdate();
  };

  Particle.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  };

  return Particle;
}(game_object_1.default);

exports.default = Particle;
},{"./utils":"src/utils.ts","./constants":"src/constants.ts","./game-object":"src/game-object.ts"}],"src/exploded-ship.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var particle_1 = __importDefault(require("./particle"));

var ExplodedShip =
/** @class */
function () {
  function ExplodedShip(game, position) {
    this.position = position;
    this.numberOfParticles = utils_1.randomIntFromInterval(10, 20);

    for (var i = 0; i < this.numberOfParticles; i++) {
      var particle = new particle_1.default(game, this.position);
      game.addObject(particle);
    }
  }

  return ExplodedShip;
}();

exports.default = ExplodedShip;
},{"./utils":"src/utils.ts","./particle":"src/particle.ts"}],"src/enemy-ship.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var constants_1 = require("./constants");

var exploded_ship_1 = __importDefault(require("./exploded-ship"));

var ship_1 = __importDefault(require("./ship"));

var EnemyShip =
/** @class */
function (_super) {
  __extends(EnemyShip, _super);

  function EnemyShip(game) {
    var _this = this;

    var startingPositionY = utils_1.randomIntFromInterval(0, 600);
    _this = _super.call(this, game, {
      width: 30,
      height: 30
    }, {
      x: 700,
      y: startingPositionY
    }, {
      x: -1,
      y: 0
    }) || this;
    _this.speed = {
      x: -1,
      y: 0
    };
    _this.type = constants_1.OBJECT_TYPE.ENEMY_SHIP;
    _this.color = '#0f0';

    _this.loadImage('assets/alien-ship2.png');

    setInterval(function () {
      _this.randomWay();
    }, 700);
    return _this;
  }

  EnemyShip.prototype.randomWay = function () {
    this.speed.x = utils_1.plusOrMinus();
    this.speed.y = utils_1.plusOrMinus();
  };

  EnemyShip.prototype.update = function () {
    // this.randomWay();
    this.speedUpdate();

    if (utils_1.outsideOfGame(this, this.game)) {
      this.isDeleted = true;
    } else {
      var playerShip = this.game.gameObjects.find(function (object) {
        return object.type === constants_1.OBJECT_TYPE.PLAYER_SHIP;
      });

      if (playerShip && utils_1.detectCollision(this, playerShip)) {
        playerShip.exploded = true;
      }
    }
  };

  EnemyShip.prototype.draw = function (ctx) {
    if (this.exploded) {
      if (this.explosion[this.explosionFrame]) {
        var frame = this.explosion[this.explosionFrame];
        var tempCanvas = document.createElement('canvas');
        var tempCtx = tempCanvas.getContext('2d');
        var dims = frame.dims;
        tempCanvas.width = dims.width;
        tempCanvas.height = dims.height;
        var frameImageData = tempCtx.createImageData(dims.width, dims.height);
        frameImageData.data.set(frame.patch);
        tempCtx.putImageData(frameImageData, 0, 0);
        ctx.drawImage(tempCanvas, this.position.x, this.position.y, this.width, this.height);
        this.explosionFrame++;
      } else {
        new exploded_ship_1.default(this.game, this.position);
        this.isDeleted = true;
      }

      return;
    } else {
      this._draw(ctx);
    }
  };

  return EnemyShip;
}(ship_1.default);

exports.default = EnemyShip;
},{"./utils":"src/utils.ts","./constants":"src/constants.ts","./exploded-ship":"src/exploded-ship.ts","./ship":"src/ship.ts"}],"src/game-screen.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameScreen =
/** @class */
function () {
  function GameScreen(size) {
    this.content = '';
    this.buttonElements = [];
    this.imageElements = [];
    this.size = size;
  }

  GameScreen.prototype.setContent = function (content, position) {
    this.content = content;
  };

  GameScreen.prototype.addMenuButton = function (menuButton) {
    this.buttonElements.push(menuButton);
  };

  GameScreen.prototype.addImages = function (image) {
    this.imageElements.push(image);
  };

  GameScreen.prototype.draw = function (ctx) {
    var _this = this;

    ctx.rect(0, 0, this.size.width, this.size.height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    if (this.content) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(this.content, this.size.width / 2, this.size.height / 2);
    }

    if (this.buttonElements.length > 0) {
      this.buttonElements.forEach(function (element) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.beginPath();
        ctx.rect(element.x, element.y, element.width, element.height);
        ctx.fillStyle = element.fillStyle;
        ctx.lineWidth = element.lineWidth;
        ctx.strokeStyle = element.strokeStyle;
        ctx.stroke();
        ctx.closePath();
        ctx.font = element.font;
        ctx.fillStyle = element.fillStyle;
        ctx.fillText(element.content, element.x + element.width / 2, element.y + element.height / 2 + 10);
      });
    }

    if (this.imageElements.length > 0) {
      this.imageElements.forEach(function (image) {
        ctx.drawImage(image.image, _this.size.width / 2 - image.size.width / 2, 80, image.size.width, image.size.height);
      });
    }
  };

  return GameScreen;
}();

exports.default = GameScreen;
},{}],"src/scrolling-sprite.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ScrollingSprite =
/** @class */
function () {
  function ScrollingSprite(image, x, y, width, height, speed) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  ScrollingSprite.prototype.scroll = function () {
    this.x -= this.speed;

    if (this.x <= -this.width) {
      this.x = this.width - 1;
    }
  };

  ScrollingSprite.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  return ScrollingSprite;
}();

exports.default = ScrollingSprite;
},{}],"src/mouse-input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MouseInputHandler =
/** @class */
function () {
  function MouseInputHandler(elements) {
    var _this = this;

    this.canvas = document.querySelector('#game-canvas');
    if (!this.canvas) return;
    this.canvas.addEventListener('click', function (event) {
      var mousePos = _this.getMousePos(_this.canvas, event);

      elements.forEach(function (element) {
        if (_this.isInside(mousePos, element)) {
          if (element.action) element.action();
          return;
        }
      });
    }, false);
  }

  MouseInputHandler.prototype.getMousePos = function (canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  MouseInputHandler.prototype.isInside = function (pos, rect) {
    return pos.x >= rect.x && pos.x <= rect.x + rect.width && pos.y <= rect.y + rect.height && pos.y >= rect.y;
  };

  return MouseInputHandler;
}();

exports.default = MouseInputHandler;
},{}],"src/menu-screen.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_screen_1 = __importDefault(require("./game-screen"));

var mouse_input_1 = __importDefault(require("./mouse-input"));

var constants_1 = require("./constants");

var MenuScreen =
/** @class */
function (_super) {
  __extends(MenuScreen, _super);

  function MenuScreen(size, game) {
    var _this = _super.call(this, size) || this;

    _this.game = game;
    var buttons = [{
      width: 300,
      height: 50,
      x: (size.width - 300) / 2,
      y: 150 + (size.height - 220) / 4,
      content: 'GAME1',
      lineWidth: 2,
      fillStyle: '#f3f3f3',
      strokeStyle: '#242424',
      font: 'Arial',
      action: function action() {
        _this.game.gameState = constants_1.GAMESTATE.RUNNING;
      }
    }, {
      width: 300,
      height: 50,
      x: (size.width - 300) / 2,
      y: 150 + (size.height - 220) / 4 * 2,
      content: 'GAME2',
      lineWidth: 2,
      fillStyle: '#f3f3f3',
      strokeStyle: '#242424',
      font: 'Arial',
      action: function action() {
        _this.game.gameState = constants_1.GAMESTATE.RUNNING;
      }
    }, {
      width: 300,
      height: 50,
      x: (size.width - 300) / 2,
      y: 150 + (size.height - 220) / 4 * 3,
      content: 'GAME3',
      lineWidth: 2,
      fillStyle: '#f3f3f3',
      strokeStyle: '#242424',
      font: 'Arial',
      action: function action() {
        _this.game.gameState = constants_1.GAMESTATE.RUNNING;
      }
    }, {
      width: 300,
      height: 50,
      x: (size.width - 300) / 2,
      y: 150 + (size.height - 220) / 4 * 4,
      content: 'EXIT',
      lineWidth: 2,
      fillStyle: '#f3f3f3',
      strokeStyle: '#242424',
      font: 'Arial',
      action: function action() {
        window.location.href = 'https://www.playngo.com/';
      }
    }];

    if (!_this.game.isMouselistenerAdded) {
      new mouse_input_1.default(buttons);
      _this.game.isMouselistenerAdded = true;
    }

    var logo = new Image();
    logo.src = 'assets/millennium-falcon.png';
    var logoImage = {
      image: logo,
      size: {
        width: 100,
        height: 100
      }
    };

    _this.addImages(logoImage);

    buttons.forEach(function (button) {
      _this.addMenuButton(button);
    });
    return _this;
  }

  return MenuScreen;
}(game_screen_1.default);

exports.default = MenuScreen;
},{"./game-screen":"src/game-screen.ts","./mouse-input":"src/mouse-input.ts","./constants":"src/constants.ts"}],"src/splash-screen.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_screen_1 = __importDefault(require("./game-screen"));

var constants_1 = require("./constants");

var SplashScreen =
/** @class */
function (_super) {
  __extends(SplashScreen, _super);

  function SplashScreen(size, game) {
    var _this = _super.call(this, size) || this;

    _this.angle = 10;
    _this.game = game;
    _this.image = new Image(300, 300);
    _this.image.src = 'assets/millennium-falcon.png';
    setTimeout(function () {
      _this.game.gameState = constants_1.GAMESTATE.MENU;
    }, 2000);
    return _this;
  }

  SplashScreen.prototype.update = function () {
    this.angle += 4;
  };

  SplashScreen.prototype.draw = function (ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.game.gameWidth, this.game.gameHeight);
    ctx.save();
    ctx.translate(this.game.gameWidth / 2, this.game.gameHeight / 2);
    ctx.rotate(this.angle * Math.PI / 180);
    ctx.translate(-(this.game.gameWidth / 2), -(this.game.gameHeight / 2));
    ctx.drawImage(this.image, this.game.gameWidth / 2 - 150, this.game.gameHeight / 2 - 150, 300, 300);
    ctx.restore();
  };

  return SplashScreen;
}(game_screen_1.default);

exports.default = SplashScreen;
},{"./game-screen":"src/game-screen.ts","./constants":"src/constants.ts"}],"src/game.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var key_input_1 = __importDefault(require("./key-input"));

var constants_1 = require("./constants");

var player_ship_1 = __importDefault(require("./player-ship"));

var enemy_ship_1 = __importDefault(require("./enemy-ship"));

var game_screen_1 = __importDefault(require("./game-screen"));

var scrolling_sprite_1 = __importDefault(require("./scrolling-sprite"));

var menu_screen_1 = __importDefault(require("./menu-screen"));

var splash_screen_1 = __importDefault(require("./splash-screen"));

var BACKGROUND_IMAGE = 'assets/space.png';
var BACKGROUND_SPEED = 0.3;

var Game =
/** @class */
function () {
  function Game(gameWidth, gameHeight) {
    this.sprites = [];
    this.isMouselistenerAdded = false;
    this.gameObjects = [];
    this.resources = {};
    this.screens = {};
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = constants_1.GAMESTATE.SPLASH_SCREEN;
    this.gameObjects = [];
    this.resources['backgroundImage'] = new Image(this.gameWidth, this.gameHeight);
    this.resources['backgroundImage'].src = BACKGROUND_IMAGE;
    this.resources['backgroundImage'].position = {
      x: 0,
      y: 0
    };
    var bgSprite = new scrolling_sprite_1.default(this.resources['backgroundImage'], 0, 0, this.gameWidth, this.gameHeight, BACKGROUND_SPEED);
    var bgSprite2 = new scrolling_sprite_1.default(this.resources['backgroundImage'], -this.gameWidth, 0, this.gameWidth, this.gameHeight, BACKGROUND_SPEED);
    this.sprites = [bgSprite, bgSprite2];
    this.playerShip = new player_ship_1.default(this);
    this.gameObjects = [this.playerShip];
    new key_input_1.default(this.playerShip, this);
    this.screens[constants_1.GAMESTATE.SPLASH_SCREEN] = new splash_screen_1.default({
      width: this.gameWidth,
      height: this.gameHeight
    }, this);
    this.screens[constants_1.GAMESTATE.MENU] = new menu_screen_1.default({
      width: this.gameWidth,
      height: this.gameHeight
    }, this);
    this.screens[constants_1.GAMESTATE.GAMEOVER] = new game_screen_1.default({
      width: this.gameWidth,
      height: this.gameHeight
    });
    this.initNewEnemies();
  }

  Game.prototype.addObject = function (object) {
    this.gameObjects.push(object);
  };

  Game.prototype.start = function () {
    if (this.gameState === constants_1.GAMESTATE.RUNNING) return;
    this.gameState = constants_1.GAMESTATE.RUNNING;
    this.gameObjects = [this.playerShip];
  };

  Game.prototype.menu = function () {
    if (this.gameState === constants_1.GAMESTATE.MENU) return;
    this.gameState = constants_1.GAMESTATE.MENU;
    this.gameObjects = [this.playerShip];
  };

  Game.prototype.update = function (deltaTime) {
    this.gameObjects.forEach(function (object) {
      object.update();
    });
    this.gameObjects = this.gameObjects.filter(function (object) {
      return !object.isDeleted;
    });
  };

  Game.prototype.draw = function (ctx) {
    if (this.gameState === constants_1.GAMESTATE.SPLASH_SCREEN) {
      this.screens[constants_1.GAMESTATE.SPLASH_SCREEN].update();
      this.screens[constants_1.GAMESTATE.SPLASH_SCREEN].draw(ctx);
    }

    if (this.gameState === constants_1.GAMESTATE.MENU) {
      this.screens[constants_1.GAMESTATE.MENU].draw(ctx);
    }

    if (this.gameState === constants_1.GAMESTATE.GAMEOVER) {
      this.screens[constants_1.GAMESTATE.GAMEOVER].setContent('GAME OVER');
      this.screens[constants_1.GAMESTATE.GAMEOVER].draw(ctx);
    }

    if (this.gameState === constants_1.GAMESTATE.RUNNING) {
      this.sprites.forEach(function (sprite) {
        sprite.scroll();
        sprite.draw(ctx);
      });
      this.gameObjects.forEach(function (object) {
        return object.draw(ctx);
      });
    }
  };

  Game.prototype.initNewEnemies = function () {
    var _this = this;

    setInterval(function () {
      if (_this.gameState === constants_1.GAMESTATE.RUNNING) {
        var enemy = new enemy_ship_1.default(_this);

        _this.gameObjects.push(enemy);
      }
    }, 2000);
  };

  return Game;
}();

exports.default = Game;
},{"./key-input":"src/key-input.ts","./constants":"src/constants.ts","./player-ship":"src/player-ship.ts","./enemy-ship":"src/enemy-ship.ts","./game-screen":"src/game-screen.ts","./scrolling-sprite":"src/scrolling-sprite.ts","./menu-screen":"src/menu-screen.ts","./splash-screen":"src/splash-screen.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = __importDefault(require("./game"));

var canvas = document.querySelector("#game-canvas");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var game = new game_1.default(GAME_WIDTH, GAME_HEIGHT);
var lastTime = 0;

function gameLoop(timestamp) {
  // console.log("gameLoop", timestamp);
  var deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
},{"./game":"src/game.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52195" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map