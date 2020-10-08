parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UldJ":[function(require,module,exports) {
"use strict";function o(o,t){var i=o.position.y+o.height,e=o.position.y,n=o.position.x,r=o.position.x+o.width,s=t.position.y,p=t.position.x,u=t.position.x+t.width,a=t.position.y+t.height;return i>=s&&e<=a&&n>=p&&r<=u}function t(o,t){var i=o.position.y+o.height,e=o.position.y,n=o.position.x,r=o.position.x+o.width;return e>=t.gameHeight||i<=0||n>=t.gameWidth||r<=0}function i(o,t){return Math.floor(Math.random()*(t-o+1)+o)}function e(o,t){var i;return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];clearTimeout(i),i=setTimeout(function(){i=null,o.apply(void 0,e)},t)}}function n(){return Math.random()<.5?-1:1}Object.defineProperty(exports,"__esModule",{value:!0}),exports.plusOrMinus=exports.debounce=exports.randomIntFromInterval=exports.outsideOfGame=exports.detectCollision=void 0,exports.detectCollision=o,exports.outsideOfGame=t,exports.randomIntFromInterval=i,exports.debounce=e,exports.plusOrMinus=n;
},{}],"ZYDa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./utils"),r=function(){return function(r,o){document.addEventListener("keydown",function(e){switch(e.code){case"ArrowLeft":r.moveLeft();break;case"ArrowUp":r.moveUp();break;case"ArrowRight":r.moveRight();break;case"ArrowDown":r.moveDown();break;case"Space":r.shoot();break;case"KeyS":o.start();break;case"KeyM":o.menu()}}),document.addEventListener("keyup",e.debounce(function(e){switch(e.code){case"ArrowLeft":case"ArrowUp":case"ArrowRight":case"ArrowDown":r.stop()}},50))}}();exports.default=r;
},{"./utils":"UldJ"}],"RhqW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SHIP_MAX_SPEED=exports.OBJECT_TYPE=exports.DIRECTION=exports.GAMESTATE=void 0,exports.GAMESTATE={PAUSED:0,RUNNING:1,MENU:2,GAMEOVER:3,SPLASH_SCREEN:4},exports.DIRECTION={LEFT:0,RIGHT:1,UP:2,DOWN:3},exports.OBJECT_TYPE={PLAYER_SHIP:0,ENEMY_SHIP:1,ROCKET:2,PARTICLE:3,PARTICLES:4},exports.SHIP_MAX_SPEED={x:2,y:2};
},{}],"vnFL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,e,s,i,h){this.angle=0,this.position={x:0,y:0},this.speed={x:0,y:0},this.isDeleted=!1,this.type=0,this.color="#0ff",this.width=t,this.height=e,this.game=h,this.position.x=s.x,this.position.y=s.y,this.speed.x=i.x,this.speed.y=i.y}return t.prototype.loadImage=function(t){this.image=new Image(this.width,this.height),this.image.src=t},t.prototype.speedUpdate=function(){this.position.x+=this.speed.x,this.position.y+=this.speed.y,this.setAngle()},t.prototype.setAngle=function(){this.speed.x>0&&this.speed.y>0&&(this.angle=135*Math.PI/180),this.speed.x>0&&0===this.speed.y&&(this.angle=90*Math.PI/180),this.speed.x>0&&this.speed.y<0&&(this.angle=45*Math.PI/180),0===this.speed.x&&this.speed.y>0&&(this.angle=180*Math.PI/180),0===this.speed.x&&this.speed.y<0&&(this.angle=0*Math.PI/180),this.speed.x<0&&this.speed.y>0&&(this.angle=225*Math.PI/180),this.speed.x<0&&0===this.speed.y&&(this.angle=270*Math.PI/180),this.speed.x<0&&this.speed.y<0&&(this.angle=315*Math.PI/180)},t}();exports.default=t;
},{}],"dAWS":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function o(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(o.prototype=i.prototype,new o)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("./constants"),o=require("./utils"),s=e(require("./game-object")),r={x:4,y:4},n=function(e){function s(t,o,s){var n=this,h={x:0,y:0};return 0===s.x&&0===s.y?(h.x=r.x,h.y=0):h={x:s.x>0?r.x:s.x<0?-r.x:0,y:s.y>0?r.y:s.y<0?-r.y:0},(n=e.call(this,10,10,o,h,t)||this).type=i.OBJECT_TYPE.ROCKET,n.color="#f00",n.loadImage("assets/rocket.png"),n}return t(s,e),s.prototype.update=function(){var t=this;if(this.speedUpdate(),o.outsideOfGame(this,this.game))this.isDeleted=!0;else{var e=this.game.gameObjects.filter(function(t){return t.type===i.OBJECT_TYPE.ENEMY_SHIP});e&&e.forEach(function(e){o.detectCollision(t,e)&&(e.exploded=!0,t.isDeleted=!0)})}},s.prototype.draw=function(t){this.image?(t.save(),t.translate(this.position.x+this.width/2,this.position.y+this.height/2),t.rotate(this.angle),t.translate(-(this.position.x+this.width/2),-(this.position.y+this.height/2)),t.drawImage(this.image,this.position.x,this.position.y,this.width,this.height),t.restore()):(t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.width,this.height))},s}(s.default);exports.default=n;
},{"./constants":"RhqW","./utils":"UldJ","./game-object":"vnFL"}],"D2YK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.loop=exports.conditional=exports.parse=void 0;var r=function r(e,o){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t;if(Array.isArray(o))o.forEach(function(o){return r(e,o,t,n)});else if("function"==typeof o)o(e,t,n,r);else{var i=Object.keys(o)[0];Array.isArray(o[i])?(n[i]={},r(e,o[i],t,n[i])):n[i]=o[i](e,t,n,r)}return t};exports.parse=r;var e=function(r,e){return function(o,t,n,i){e(o,t,n)&&i(o,r,t,n)}};exports.conditional=e;var o=function(r,e){return function(o,t,n,i){for(var s=[];e(o,t,n);){var a={};i(o,r,t,a),s.push(a)}return s}};exports.loop=o;
},{}],"pjUj":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.readBits=exports.readArray=exports.readUnsigned=exports.readString=exports.peekBytes=exports.readBytes=exports.peekByte=exports.readByte=exports.buildStream=void 0;var r=function(r){return{data:r,pos:0}};exports.buildStream=r;var e=function(){return function(r){return r.data[r.pos++]}};exports.readByte=e;var t=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return function(e){return e.data[e.pos+r]}};exports.peekByte=t;var n=function(r){return function(e){return e.data.subarray(e.pos,e.pos+=r)}};exports.readBytes=n;var o=function(r){return function(e){return e.data.subarray(e.pos,e.pos+r)}};exports.peekBytes=o;var a=function(r){return function(e){return Array.from(n(r)(e)).map(function(r){return String.fromCharCode(r)}).join("")}};exports.readString=a;var u=function(r){return function(e){var t=n(2)(e);return r?(t[1]<<8)+t[0]:(t[0]<<8)+t[1]}};exports.readUnsigned=u;var s=function(r,e){return function(t,o,a){for(var u="function"==typeof e?e(t,o,a):e,s=n(r),i=new Array(u),p=0;p<u;p++)i[p]=s(t);return i}};exports.readArray=s;var i=function(r,e,t){for(var n=0,o=0;o<t;o++)n+=r[e+o]&&Math.pow(2,t-o-1);return n},p=function(r){return function(t){for(var n=e()(t),o=new Array(8),a=0;a<8;a++)o[7-a]=!!(n&1<<a);return Object.keys(r).reduce(function(e,t){var n=r[t];return n.length?e[t]=i(o,n.index,n.length):e[t]=o[n.index],e},{})}};exports.readBits=p;
},{}],"IWdQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../"),t=require("../parsers/uint8"),r={blocks:function(e){for(var r=[],n=0,i=(0,t.readByte)()(e);0!==i;i=(0,t.readByte)()(e))r.push((0,t.readBytes)(i)(e)),n+=i;for(var d=new Uint8Array(n),a=0,o=0;o<r.length;o++)d.set(r[o],a),a+=r[o].length;return d}},n=(0,e.conditional)({gce:[{codes:(0,t.readBytes)(2)},{byteSize:(0,t.readByte)()},{extras:(0,t.readBits)({future:{index:0,length:3},disposal:{index:3,length:3},userInput:{index:6},transparentColorGiven:{index:7}})},{delay:(0,t.readUnsigned)(!0)},{transparentColorIndex:(0,t.readByte)()},{terminator:(0,t.readByte)()}]},function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&249===r[1]}),i=(0,e.conditional)({image:[{code:(0,t.readByte)()},{descriptor:[{left:(0,t.readUnsigned)(!0)},{top:(0,t.readUnsigned)(!0)},{width:(0,t.readUnsigned)(!0)},{height:(0,t.readUnsigned)(!0)},{lct:(0,t.readBits)({exists:{index:0},interlaced:{index:1},sort:{index:2},future:{index:3,length:2},size:{index:5,length:3}})}]},(0,e.conditional)({lct:(0,t.readArray)(3,function(e,t,r){return Math.pow(2,r.descriptor.lct.size+1)})},function(e,t,r){return r.descriptor.lct.exists}),{data:[{minCodeSize:(0,t.readByte)()},r]}]},function(e){return 44===(0,t.peekByte)()(e)}),d=(0,e.conditional)({text:[{codes:(0,t.readBytes)(2)},{blockSize:(0,t.readByte)()},{preData:function(e,r,n){return(0,t.readBytes)(n.text.blockSize)(e)}},r]},function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&1===r[1]}),a=(0,e.conditional)({application:[{codes:(0,t.readBytes)(2)},{blockSize:(0,t.readByte)()},{id:function(e,r,n){return(0,t.readString)(n.blockSize)(e)}},r]},function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&255===r[1]}),o=(0,e.conditional)({comment:[{codes:(0,t.readBytes)(2)},r]},function(e){var r=(0,t.peekBytes)(2)(e);return 33===r[0]&&254===r[1]}),s=[{header:[{signature:(0,t.readString)(3)},{version:(0,t.readString)(3)}]},{lsd:[{width:(0,t.readUnsigned)(!0)},{height:(0,t.readUnsigned)(!0)},{gct:(0,t.readBits)({exists:{index:0},resolution:{index:1,length:3},sort:{index:4},size:{index:5,length:3}})},{backgroundColorIndex:(0,t.readByte)()},{pixelAspectRatio:(0,t.readByte)()}]},(0,e.conditional)({gct:(0,t.readArray)(3,function(e,t){return Math.pow(2,t.lsd.gct.size+1)})},function(e,t){return t.lsd.gct.exists}),{frames:(0,e.loop)([n,a,o,i,d],function(e){var r=(0,t.peekByte)()(e);return 33===r||44===r})}],c=s;exports.default=c;
},{"../":"D2YK","../parsers/uint8":"pjUj"}],"OYjY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.deinterlace=void 0;var e=function(e,r){for(var t=new Array(e.length),n=e.length/r,o=function(n,o){var a=e.slice(o*r,(o+1)*r);t.splice.apply(t,[n*r,r].concat(a))},a=[0,4,2,1],c=[8,8,4,2],i=0,l=0;l<4;l++)for(var s=a[l];s<n;s+=c[l])o(s,i),i++;return t};exports.deinterlace=e;
},{}],"R7KX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lzw=void 0;var r=function(r,e,n){var o,i,t,f,a,u,c,s,w,y,l,p,v,A,d,x,b=n,z=new Array(n),_=new Array(4096),j=new Array(4096),k=new Array(4097);for(a=(i=1<<(y=r))+1,o=i+2,c=-1,t=(1<<(f=y+1))-1,s=0;s<i;s++)_[s]=0,j[s]=s;for(l=p=v=A=d=x=0,w=0;w<b;){if(0===A){if(p<f){l+=e[x]<<p,p+=8,x++;continue}if(s=l&t,l>>=f,p-=f,s>o||s==a)break;if(s==i){t=(1<<(f=y+1))-1,o=i+2,c=-1;continue}if(-1==c){k[A++]=j[s],c=s,v=s;continue}for(u=s,s==o&&(k[A++]=v,s=c);s>i;)k[A++]=j[s],s=_[s];v=255&j[s],k[A++]=v,o<4096&&(_[o]=c,j[o]=v,0==(++o&t)&&o<4096&&(f++,t+=o)),c=u}A--,z[d++]=k[A],w++}for(w=d;w<b;w++)z[w]=0;return z};exports.lzw=r;
},{}],"Z4YR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.decompressFrames=exports.decompressFrame=exports.parseGIF=void 0;var e=i(require("js-binary-schema-parser/lib/schemas/gif")),r=require("js-binary-schema-parser"),t=require("js-binary-schema-parser/lib/parsers/uint8"),a=require("./deinterlace"),s=require("./lzw");function i(e){return e&&e.__esModule?e:{default:e}}var o=function(a){var s=new Uint8Array(a);return(0,r.parse)((0,t.buildStream)(s),e.default)};exports.parseGIF=o;var n=function(e){for(var r=e.pixels.length,t=new Uint8ClampedArray(4*r),a=0;a<r;a++){var s=4*a,i=e.pixels[a],o=e.colorTable[i];t[s]=o[0],t[s+1]=o[1],t[s+2]=o[2],t[s+3]=i!==e.transparentIndex?255:0}return t},c=function(e,r,t){if(e.image){var i=e.image,o=i.descriptor.width*i.descriptor.height,c=(0,s.lzw)(i.data.minCodeSize,i.data.blocks,o);i.descriptor.lct.interlaced&&(c=(0,a.deinterlace)(c,i.descriptor.width));var p={pixels:c,dims:{top:e.image.descriptor.top,left:e.image.descriptor.left,width:e.image.descriptor.width,height:e.image.descriptor.height}};return i.descriptor.lct&&i.descriptor.lct.exists?p.colorTable=i.lct:p.colorTable=r,e.gce&&(p.delay=10*(e.gce.delay||10),p.disposalType=e.gce.extras.disposal,e.gce.extras.transparentColorGiven&&(p.transparentIndex=e.gce.transparentColorIndex)),t&&(p.patch=n(p)),p}console.warn("gif frame does not have associated image.")};exports.decompressFrame=c;var p=function(e,r){return e.frames.filter(function(e){return e.image}).map(function(t){return c(t,e.gct,r)})};exports.decompressFrames=p;
},{"js-binary-schema-parser/lib/schemas/gif":"IWdQ","js-binary-schema-parser":"D2YK","js-binary-schema-parser/lib/parsers/uint8":"pjUj","./deinterlace":"OYjY","./lzw":"R7KX"}],"ad4s":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}(),e=this&&this.__assign||function(){return(e=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var s=require("gifuct-js"),o=i(require("./game-object")),h=function(i){function o(t,e,o,h){var n=i.call(this,e.width,e.height,o,{x:0,y:0},t)||this;return n.limitedToGameArea=!1,n.exploded=!1,n.maxSpeed=h,n.lastSpeed=h,fetch("assets/explosion.gif").then(function(t){return t.arrayBuffer()}).then(function(t){return s.parseGIF(t)}).then(function(t){n.explosion=s.decompressFrames(t,!0),n.explosionFrame=0}),n}return t(o,i),o.prototype.moveLeft=function(){this.position.x<=0&&this.limitedToGameArea?this.speed.x=0:this.speed.x=-this.maxSpeed.x},o.prototype.moveRight=function(){this.position.x+this.width>=this.game.gameWidth&&this.limitedToGameArea?this.speed.x=0:this.speed.x=this.maxSpeed.x},o.prototype.moveUp=function(){this.position.y<=0&&this.limitedToGameArea?this.speed.y=0:this.speed.y=-this.maxSpeed.y},o.prototype.moveDown=function(){this.position.y+this.height>=this.game.gameHeight&&this.limitedToGameArea?this.speed.y=0:this.speed.y=this.maxSpeed.y},o.prototype.stop=function(){this.lastSpeed=e({},this.speed),this.speed.x=0,this.speed.y=0},o.prototype.update=function(){this.speedUpdate()},o.prototype._draw=function(t){this.image?(t.save(),t.translate(this.position.x+this.width/2,this.position.y+this.height/2),t.rotate(this.angle),t.translate(-(this.position.x+this.width/2),-(this.position.y+this.height/2)),t.drawImage(this.image,this.position.x,this.position.y,this.width,this.height),t.restore()):(t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.width,this.height))},o}(o.default);exports.default=h;
},{"gifuct-js":"Z4YR","./game-object":"vnFL"}],"tuP4":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}(),e=this&&this.__assign||function(){return(e=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var s=require("./constants"),o=i(require("./rocket")),r=i(require("./ship")),n={x:100,y:100},a=function(i){function r(t){var e=i.call(this,t,{width:40,height:40},n,s.SHIP_MAX_SPEED)||this;return e.type=s.OBJECT_TYPE.PLAYER_SHIP,e.limitedToGameArea=!0,e.color="#00f",e.loadImage("assets/player-ship.png"),e.angle=90*Math.PI/180,e}return t(r,i),r.prototype.shoot=function(){var t=0!==this.speed.x||0!==this.speed.y||0===this.lastSpeed.x&&0===this.lastSpeed.y?this.speed:this.lastSpeed,e={x:this.position.x+this.width/2,y:this.position.y+this.height/2},i=new o.default(this.game,e,t);this.game.addObject(i)},r.prototype.reset=function(){this.exploded=!1,this.isDeleted=!1,this.position=e({},n)},r.prototype.draw=function(t){if(this.exploded)if(this.explosion[this.explosionFrame]){var e=this.explosion[this.explosionFrame],i=document.createElement("canvas"),o=i.getContext("2d"),r=e.dims;i.width=r.width,i.height=r.height;var n=o.createImageData(r.width,r.height);n.data.set(e.patch),o.putImageData(n,0,0),t.drawImage(i,this.position.x,this.position.y,this.width,this.height),this.explosionFrame++}else this.game.gameState=s.GAMESTATE.MENU;else this._draw(t)},r}(r.default);exports.default=a;
},{"./constants":"RhqW","./rocket":"dAWS","./ship":"ad4s"}],"jDrX":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,o){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(e,o)};return function(e,o){function r(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./utils"),r=require("./constants"),i=e(require("./game-object")),n={x:1,y:1},s={width:2,height:2},u=function(e){function i(t,i){var u=this,c={x:n.x*o.randomIntFromInterval(-10,10),y:n.y*o.randomIntFromInterval(-10,10)};return(u=e.call(this,s.width,s.height,i,c,t)||this).type=r.OBJECT_TYPE.PARTICLE,u.color="#fffaff",u}return t(i,e),i.prototype.update=function(){this.speedUpdate()},i.prototype.draw=function(t){t.fillStyle=this.color,t.fillRect(this.position.x,this.position.y,this.width,this.height)},i}(i.default);exports.default=u;
},{"./utils":"UldJ","./constants":"RhqW","./game-object":"vnFL"}],"n5Ki":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./utils"),r=t(require("./particle")),i=function(){return function(t,i){this.position=i,this.numberOfParticles=e.randomIntFromInterval(10,20);for(var u=0;u<this.numberOfParticles;u++){var n=new r.default(t,this.position);t.addObject(n)}}}();exports.default=i;
},{"./utils":"UldJ","./particle":"jDrX"}],"fF24":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("./utils"),s=require("./constants"),o=e(require("./exploded-ship")),n=e(require("./ship")),r=function(e){function n(t){var o=this,n=i.randomIntFromInterval(0,600);return(o=e.call(this,t,{width:30,height:30},{x:700,y:n},{x:-1,y:0})||this).speed={x:-1,y:0},o.type=s.OBJECT_TYPE.ENEMY_SHIP,o.color="#0f0",o.loadImage("assets/alien-ship2.png"),setInterval(function(){o.randomWay()},700),o}return t(n,e),n.prototype.randomWay=function(){this.speed.x=i.plusOrMinus(),this.speed.y=i.plusOrMinus()},n.prototype.update=function(){if(this.speedUpdate(),i.outsideOfGame(this,this.game))this.isDeleted=!0;else{var t=this.game.gameObjects.find(function(t){return t.type===s.OBJECT_TYPE.PLAYER_SHIP});t&&i.detectCollision(this,t)&&(t.exploded=!0)}},n.prototype.draw=function(t){if(this.exploded)if(this.explosion[this.explosionFrame]){var e=this.explosion[this.explosionFrame],i=document.createElement("canvas"),s=i.getContext("2d"),n=e.dims;i.width=n.width,i.height=n.height;var r=s.createImageData(n.width,n.height);r.data.set(e.patch),s.putImageData(r,0,0),t.drawImage(i,this.position.x,this.position.y,this.width,this.height),this.explosionFrame++}else new o.default(this.game,this.position),this.isDeleted=!0;else this._draw(t)},n}(n.default);exports.default=r;
},{"./utils":"UldJ","./constants":"RhqW","./exploded-ship":"n5Ki","./ship":"ad4s"}],"F6gP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.content="",this.buttonElements=[],this.imageElements=[],this.size=t}return t.prototype.setContent=function(t,e){this.content=t},t.prototype.addMenuButton=function(t){this.buttonElements.push(t)},t.prototype.addImages=function(t){this.imageElements.push(t)},t.prototype.draw=function(t){var e=this;t.rect(0,0,this.size.width,this.size.height),t.fillStyle="rgba(0,0,0,1)",t.fill(),this.content&&(t.font="30px Arial",t.fillStyle="white",t.textAlign="center",t.fillText(this.content,this.size.width/2,this.size.height/2)),this.buttonElements.length>0&&this.buttonElements.forEach(function(e){t.font="30px Arial",t.fillStyle="white",t.textAlign="center",t.beginPath(),t.rect(e.x,e.y,e.width,e.height),t.fillStyle=e.fillStyle,t.lineWidth=e.lineWidth,t.strokeStyle=e.strokeStyle,t.stroke(),t.closePath(),t.font=e.font,t.fillStyle=e.fillStyle,t.fillText(e.content,e.x+e.width/2,e.y+e.height/2+10)}),this.imageElements.length>0&&this.imageElements.forEach(function(i){t.drawImage(i.image,e.size.width/2-i.size.width/2,80,i.size.width,i.size.height)})},t}();exports.default=t;
},{}],"NJRb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,i,h,s,e,o){this.image=t,this.x=i,this.y=h,this.width=s,this.height=e,this.speed=o}return t.prototype.scroll=function(){this.x-=this.speed,this.x<=-this.width&&(this.x=this.width-1)},t.prototype.draw=function(t){t.drawImage(this.image,this.x,this.y,this.width,this.height)},t}();exports.default=t;
},{}],"tX9Y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){var e=this;this.canvas=document.querySelector("#game-canvas"),this.canvas&&this.canvas.addEventListener("click",function(n){var i=e.getMousePos(e.canvas,n);t.forEach(function(t){e.isInside(i,t)&&t.action&&t.action()})},!1)}return t.prototype.getMousePos=function(t,e){var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}},t.prototype.isInside=function(t,e){return t.x>=e.x&&t.x<=e.x+e.width&&t.y<=e.y+e.height&&t.y>=e.y},t}();exports.default=t;
},{}],"h2mA":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var i=e(require("./game-screen")),n=e(require("./mouse-input")),o=function(e){function i(t,i){var o=e.call(this,t)||this;o.game=i;var r=[{width:300,height:50,x:(t.width-300)/2,y:150+(t.height-220)/4,content:"GAME1",lineWidth:2,fillStyle:"#f3f3f3",strokeStyle:"#242424",font:"Arial",action:function(){o.game.start()}},{width:300,height:50,x:(t.width-300)/2,y:150+(t.height-220)/4*2,content:"GAME2",lineWidth:2,fillStyle:"#f3f3f3",strokeStyle:"#242424",font:"Arial",action:function(){o.game.start()}},{width:300,height:50,x:(t.width-300)/2,y:150+(t.height-220)/4*3,content:"GAME3",lineWidth:2,fillStyle:"#f3f3f3",strokeStyle:"#242424",font:"Arial",action:function(){o.game.start()}},{width:300,height:50,x:(t.width-300)/2,y:150+(t.height-220)/4*4,content:"EXIT",lineWidth:2,fillStyle:"#f3f3f3",strokeStyle:"#242424",font:"Arial",action:function(){window.location.href="https://www.playngo.com/"}}];o.game.isMouselistenerAdded||(new n.default(r),o.game.isMouselistenerAdded=!0);var a=new Image;a.src="assets/millennium-falcon.png";var f={image:a,size:{width:100,height:100}};return o.addImages(f),r.forEach(function(t){o.addMenuButton(t)}),o}return t(i,e),i}(i.default);exports.default=o;
},{"./game-screen":"F6gP","./mouse-input":"tX9Y"}],"fKdC":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,a){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])})(e,a)};return function(e,a){function i(){this.constructor=e}t(e,a),e.prototype=null===a?Object.create(a):(i.prototype=a.prototype,new i)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var a=e(require("./game-screen")),i=require("./constants"),n=function(e){function a(t,a){var n=e.call(this,t)||this;return n.angle=10,n.game=a,n.image=new Image(300,300),n.image.src="assets/millennium-falcon.png",setTimeout(function(){n.game.gameState=i.GAMESTATE.MENU},2e3),n}return t(a,e),a.prototype.update=function(){this.angle+=4},a.prototype.draw=function(t){t.fillStyle="#000000",t.fillRect(0,0,this.game.gameWidth,this.game.gameHeight),t.save(),t.translate(this.game.gameWidth/2,this.game.gameHeight/2),t.rotate(this.angle*Math.PI/180),t.translate(-this.game.gameWidth/2,-this.game.gameHeight/2),t.drawImage(this.image,this.game.gameWidth/2-150,this.game.gameHeight/2-150,300,300),t.restore()},a}(a.default);exports.default=n;
},{"./game-screen":"F6gP","./constants":"RhqW"}],"dgAm":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./key-input")),s=require("./constants"),i=e(require("./player-ship")),h=e(require("./enemy-ship")),a=e(require("./game-screen")),r=e(require("./scrolling-sprite")),n=e(require("./menu-screen")),E=e(require("./splash-screen")),u="assets/space.png",g=.3,c=function(){function e(e,h){this.sprites=[],this.isMouselistenerAdded=!1,this.gameObjects=[],this.resources={},this.screens={},this.gameWidth=e,this.gameHeight=h,this.gameState=s.GAMESTATE.SPLASH_SCREEN,this.gameObjects=[],this.resources.backgroundImage=new Image(this.gameWidth,this.gameHeight),this.resources.backgroundImage.src=u,this.resources.backgroundImage.position={x:0,y:0};var c=new r.default(this.resources.backgroundImage,0,0,this.gameWidth,this.gameHeight,g),o=new r.default(this.resources.backgroundImage,-this.gameWidth,0,this.gameWidth,this.gameHeight,g);this.sprites=[c,o],this.playerShip=new i.default(this),this.gameObjects=[this.playerShip],new t.default(this.playerShip,this),this.screens[s.GAMESTATE.SPLASH_SCREEN]=new E.default({width:this.gameWidth,height:this.gameHeight},this),this.screens[s.GAMESTATE.MENU]=new n.default({width:this.gameWidth,height:this.gameHeight},this),this.screens[s.GAMESTATE.GAMEOVER]=new a.default({width:this.gameWidth,height:this.gameHeight}),this.initNewEnemies()}return e.prototype.addObject=function(e){this.gameObjects.push(e)},e.prototype.start=function(){this.gameState!==s.GAMESTATE.RUNNING&&(this.gameState=s.GAMESTATE.RUNNING,this.playerShip.reset(),this.gameObjects=[this.playerShip])},e.prototype.menu=function(){this.gameState!==s.GAMESTATE.MENU&&(this.gameState=s.GAMESTATE.MENU,this.gameObjects=[this.playerShip])},e.prototype.update=function(e){this.gameObjects.forEach(function(e){e.update()}),this.gameObjects=this.gameObjects.filter(function(e){return!e.isDeleted})},e.prototype.draw=function(e){this.gameState===s.GAMESTATE.SPLASH_SCREEN&&(this.screens[s.GAMESTATE.SPLASH_SCREEN].update(),this.screens[s.GAMESTATE.SPLASH_SCREEN].draw(e)),this.gameState===s.GAMESTATE.MENU&&this.screens[s.GAMESTATE.MENU].draw(e),this.gameState===s.GAMESTATE.GAMEOVER&&(this.screens[s.GAMESTATE.GAMEOVER].setContent("GAME OVER"),this.screens[s.GAMESTATE.GAMEOVER].draw(e)),this.gameState===s.GAMESTATE.RUNNING&&(this.sprites.forEach(function(t){t.scroll(),t.draw(e)}),this.gameObjects.forEach(function(t){return t.draw(e)}))},e.prototype.initNewEnemies=function(){var e=this;setInterval(function(){if(e.gameState===s.GAMESTATE.RUNNING){var t=new h.default(e);e.gameObjects.push(t)}},2e3)},e}();exports.default=c;
},{"./key-input":"ZYDa","./constants":"RhqW","./player-ship":"tuP4","./enemy-ship":"fF24","./game-screen":"F6gP","./scrolling-sprite":"NJRb","./menu-screen":"h2mA","./splash-screen":"fKdC"}],"B6dB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./game")),r=document.querySelector("#game-canvas"),a=r.getContext("2d"),u=800,n=600,i=new t.default(u,n),o=0;function s(e){var t=e-o;o=e,a.clearRect(0,0,u,n),i.update(t),i.draw(a),requestAnimationFrame(s)}requestAnimationFrame(s);
},{"./game":"dgAm"}]},{},["B6dB"], null)
//# sourceMappingURL=/src.f7d6c848.js.map