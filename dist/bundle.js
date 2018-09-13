!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}([function(t,e,n){var i;
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */!function(r,s,o,a){"use strict";function c(t,e,n){return setTimeout(d(t,n),e)}function l(t,e,n){return!!Array.isArray(t)&&(u(t,n[e],n),!0)}function u(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==a)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function h(t,e,n){var i="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=r.console&&(r.console.warn||r.console.log);return s&&s.call(r.console,i,n),t.apply(this,arguments)}}function p(t,e,n){var i,r=e.prototype;(i=t.prototype=Object.create(r)).constructor=t,i._super=r,n&&it(i,n)}function d(t,e){return function(){return t.apply(e,arguments)}}function f(t,e){return typeof t==ot?t.apply(e&&e[0]||a,e):t}function v(t,e){return t===a?e:t}function m(t,e,n){u(w(e),function(e){t.addEventListener(e,n,!1)})}function g(t,e,n){u(w(e),function(e){t.removeEventListener(e,n,!1)})}function y(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function T(t,e){return t.indexOf(e)>-1}function w(t){return t.trim().split(/\s+/g)}function S(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function E(t){return Array.prototype.slice.call(t,0)}function b(t,e,n){for(var i=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];S(r,o)<0&&i.push(t[s]),r[s]=o,s++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function A(t,e){for(var n,i,r=e[0].toUpperCase()+e.slice(1),s=0;s<rt.length;){if((i=(n=rt[s])?n+r:e)in t)return i;s++}return a}function L(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||r}function I(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){f(t.options.enable,[t])&&n.handler(e)},this.init()}function C(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,s=e&Tt&&i-r==0,o=e&(St|Et)&&i-r==0;n.isFirst=!!s,n.isFinal=!!o,s&&(t.session={}),n.eventType=e,function(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=P(e)),r>1&&!n.firstMultiple?n.firstMultiple=P(e):1===r&&(n.firstMultiple=!1);var s=n.firstInput,o=n.firstMultiple,a=o?o.center:s.center,c=e.center=x(i);e.timeStamp=lt(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=M(a,c),e.distance=O(a,c),function(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==Tt&&s.eventType!==St||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}(n,e),e.offsetDirection=_(e.deltaX,e.deltaY);var l=k(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=l.x,e.overallVelocityY=l.y,e.overallVelocity=ct(l.x)>ct(l.y)?l.x:l.y,e.scale=o?function(t,e){return O(e[0],e[1],_t)/O(t[0],t[1],_t)}(o.pointers,i):1,e.rotation=o?function(t,e){return M(e[1],e[0],_t)+M(t[1],t[0],_t)}(o.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,j(n,e);var u=t.element;y(e.srcEvent.target,u)&&(u=e.srcEvent.target),e.target=u}(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function j(t,e){var n,i,r,s,o=t.lastInterval||e,c=e.timeStamp-o.timeStamp;if(e.eventType!=Et&&(c>yt||o.velocity===a)){var l=e.deltaX-o.deltaX,u=e.deltaY-o.deltaY,h=k(c,l,u);i=h.x,r=h.y,n=ct(h.x)>ct(h.y)?h.x:h.y,s=_(l,u),t.lastInterval=e}else n=o.velocity,i=o.velocityX,r=o.velocityY,s=o.direction;e.velocity=n,e.velocityX=i,e.velocityY=r,e.direction=s}function P(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:at(t.pointers[n].clientX),clientY:at(t.pointers[n].clientY)},n++;return{timeStamp:lt(),pointers:e,center:x(e),deltaX:t.deltaX,deltaY:t.deltaY}}function x(t){var e=t.length;if(1===e)return{x:at(t[0].clientX),y:at(t[0].clientY)};for(var n=0,i=0,r=0;e>r;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:at(n/e),y:at(i/e)}}function k(t,e,n){return{x:e/t||0,y:n/t||0}}function _(t,e){return t===e?bt:ct(t)>=ct(e)?0>t?At:Lt:0>e?It:Ct}function O(t,e,n){n||(n=kt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function M(t,e,n){n||(n=kt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}function D(){this.evEl=Mt,this.evWin=Dt,this.pressed=!1,I.apply(this,arguments)}function q(){this.evEl=zt,this.evWin=Nt,I.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function R(){this.evTarget=Yt,this.evWin=Ht,this.started=!1,I.apply(this,arguments)}function z(){this.evTarget=Wt,this.targetIds={},I.apply(this,arguments)}function N(){I.apply(this,arguments);var t=d(this.handler,this);this.touch=new z(this.manager,t),this.mouse=new D(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function X(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches;setTimeout(function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)},Vt)}}function Y(t,e){this.manager=t,this.set(e)}function H(t){this.options=it({},this.defaults,t||{}),this.id=pt++,this.manager=null,this.options.enable=v(this.options.enable,!0),this.state=ne,this.simultaneous={},this.requireFail=[]}function F(t){return t&ae?"cancel":t&se?"end":t&re?"move":t&ie?"start":""}function W(t){return t==Ct?"down":t==It?"up":t==At?"left":t==Lt?"right":""}function V(t,e){var n=e.manager;return n?n.get(t):t}function U(){H.apply(this,arguments)}function G(){U.apply(this,arguments),this.pX=null,this.pY=null}function B(){U.apply(this,arguments)}function Z(){H.apply(this,arguments),this._timer=null,this._input=null}function $(){U.apply(this,arguments)}function K(){U.apply(this,arguments)}function J(){H.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function Q(t,e){return(e=e||{}).recognizers=v(e.recognizers,Q.defaults.preset),new tt(t,e)}function tt(t,e){this.options=it({},Q.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=function(t){var e=t.options.inputClass;return new(e||(ft?q:vt?z:dt?N:D))(t,C)}(this),this.touchAction=new Y(this,this.options.touchAction),et(this,!0),u(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function et(t,e){var n,i=t.element;i.style&&(u(t.options.cssProps,function(r,s){n=A(i.style,s),e?(t.oldCssProps[n]=i.style[n],i.style[n]=r):i.style[n]=t.oldCssProps[n]||""}),e||(t.oldCssProps={}))}function nt(t,e){var n=s.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}var it,rt=["","webkit","Moz","MS","ms","o"],st=s.createElement("div"),ot="function",at=Math.round,ct=Math.abs,lt=Date.now;it="function"!=typeof Object.assign?function(t){if(t===a||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==a&&null!==i)for(var r in i)i.hasOwnProperty(r)&&(e[r]=i[r])}return e}:Object.assign;var ut=h(function(t,e,n){for(var i=Object.keys(e),r=0;r<i.length;)(!n||n&&t[i[r]]===a)&&(t[i[r]]=e[i[r]]),r++;return t},"extend","Use `assign`."),ht=h(function(t,e){return ut(t,e,!0)},"merge","Use `assign`."),pt=1,dt="ontouchstart"in r,ft=A(r,"PointerEvent")!==a,vt=dt&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),mt="touch",gt="mouse",yt=25,Tt=1,wt=2,St=4,Et=8,bt=1,At=2,Lt=4,It=8,Ct=16,jt=At|Lt,Pt=It|Ct,xt=jt|Pt,kt=["x","y"],_t=["clientX","clientY"];I.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(L(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&g(this.element,this.evEl,this.domHandler),this.evTarget&&g(this.target,this.evTarget,this.domHandler),this.evWin&&g(L(this.element),this.evWin,this.domHandler)}};var Ot={mousedown:Tt,mousemove:wt,mouseup:St},Mt="mousedown",Dt="mousemove mouseup";p(D,I,{handler:function(t){var e=Ot[t.type];e&Tt&&0===t.button&&(this.pressed=!0),e&wt&&1!==t.which&&(e=St),this.pressed&&(e&St&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:gt,srcEvent:t}))}});var qt={pointerdown:Tt,pointermove:wt,pointerup:St,pointercancel:Et,pointerout:Et},Rt={2:mt,3:"pen",4:gt,5:"kinect"},zt="pointerdown",Nt="pointermove pointerup pointercancel";r.MSPointerEvent&&!r.PointerEvent&&(zt="MSPointerDown",Nt="MSPointerMove MSPointerUp MSPointerCancel"),p(q,I,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=qt[i],s=Rt[t.pointerType]||t.pointerType,o=s==mt,a=S(e,t.pointerId,"pointerId");r&Tt&&(0===t.button||o)?0>a&&(e.push(t),a=e.length-1):r&(St|Et)&&(n=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var Xt={touchstart:Tt,touchmove:wt,touchend:St,touchcancel:Et},Yt="touchstart",Ht="touchstart touchmove touchend touchcancel";p(R,I,{handler:function(t){var e=Xt[t.type];if(e===Tt&&(this.started=!0),this.started){var n=function(t,e){var n=E(t.touches),i=E(t.changedTouches);return e&(St|Et)&&(n=b(n.concat(i),"identifier",!0)),[n,i]}.call(this,t,e);e&(St|Et)&&n[0].length-n[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:mt,srcEvent:t})}}});var Ft={touchstart:Tt,touchmove:wt,touchend:St,touchcancel:Et},Wt="touchstart touchmove touchend touchcancel";p(z,I,{handler:function(t){var e=Ft[t.type],n=function(t,e){var n=E(t.touches),i=this.targetIds;if(e&(Tt|wt)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,s,o=E(t.changedTouches),a=[],c=this.target;if(s=n.filter(function(t){return y(t.target,c)}),e===Tt)for(r=0;r<s.length;)i[s[r].identifier]=!0,r++;for(r=0;r<o.length;)i[o[r].identifier]&&a.push(o[r]),e&(St|Et)&&delete i[o[r].identifier],r++;return a.length?[b(s.concat(a),"identifier",!0),a]:void 0}.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:mt,srcEvent:t})}});var Vt=2500,Ut=25;p(N,I,{handler:function(t,e,n){var i=n.pointerType==mt,r=n.pointerType==gt;if(!(r&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)(function(t,e){t&Tt?(this.primaryTouch=e.changedPointers[0].identifier,X.call(this,e)):t&(St|Et)&&X.call(this,e)}).call(this,e,n);else if(r&&function(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var r=this.lastTouches[i],s=Math.abs(e-r.x),o=Math.abs(n-r.y);if(Ut>=s&&Ut>=o)return!0}return!1}.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Gt=A(st.style,"touchAction"),Bt=Gt!==a,Zt="compute",$t="auto",Kt="manipulation",Jt="none",Qt="pan-x",te="pan-y",ee=function(){if(!Bt)return!1;var t={},e=r.CSS&&r.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=!e||r.CSS.supports("touch-action",n)}),t}();Y.prototype={set:function(t){t==Zt&&(t=this.compute()),Bt&&this.manager.element.style&&ee[t]&&(this.manager.element.style[Gt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return u(this.manager.recognizers,function(e){f(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),function(t){if(T(t,Jt))return Jt;var e=T(t,Qt),n=T(t,te);return e&&n?Jt:e||n?e?Qt:te:T(t,Kt)?Kt:$t}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(!this.manager.session.prevented){var i=this.actions,r=T(i,Jt)&&!ee[Jt],s=T(i,te)&&!ee[te],o=T(i,Qt)&&!ee[Qt];if(r){var a=1===t.pointers.length,c=t.distance<2,l=t.deltaTime<250;if(a&&c&&l)return}return o&&s?void 0:r||s&&n&jt||o&&n&Pt?this.preventSrc(e):void 0}e.preventDefault()},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ne=1,ie=2,re=4,se=8,oe=se,ae=16;H.prototype={defaults:{},set:function(t){return it(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(l(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=V(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return l(t,"dropRecognizeWith",this)?this:(t=V(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(l(t,"requireFailure",this))return this;var e=this.requireFail;return-1===S(e,t=V(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(l(t,"dropRequireFailure",this))return this;t=V(t,this);var e=S(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;se>i&&e(n.options.event+F(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=se&&e(n.options.event+F(i))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=32)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(32|ne)))return!1;t++}return!0},recognize:function(t){var e=it({},t);return f(this.options.enable,[this,e])?(this.state&(oe|ae|32)&&(this.state=ne),this.state=this.process(e),void(this.state&(ie|re|se|ae)&&this.tryEmit(e))):(this.reset(),void(this.state=32))},process:function(t){},getTouchAction:function(){},reset:function(){}},p(U,H,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(ie|re),r=this.attrTest(t);return i&&(n&Et||!r)?e|ae:i||r?n&St?e|se:e&ie?e|re:ie:32}}),p(G,U,{defaults:{event:"pan",threshold:10,pointers:1,direction:xt},getTouchAction:function(){var t=this.options.direction,e=[];return t&jt&&e.push(te),t&Pt&&e.push(Qt),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&jt?(r=0===s?bt:0>s?At:Lt,n=s!=this.pX,i=Math.abs(t.deltaX)):(r=0===o?bt:0>o?It:Ct,n=o!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return U.prototype.attrTest.call(this,t)&&(this.state&ie||!(this.state&ie)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=W(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),p(B,U,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Jt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ie)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),p(Z,H,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[$t]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(St|Et)&&!r)this.reset();else if(t.eventType&Tt)this.reset(),this._timer=c(function(){this.state=oe,this.tryEmit()},e.time,this);else if(t.eventType&St)return oe;return 32},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===oe&&(t&&t.eventType&St?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=lt(),this.manager.emit(this.options.event,this._input)))}}),p($,U,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Jt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ie)}}),p(K,U,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:jt|Pt,pointers:1},getTouchAction:function(){return G.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(jt|Pt)?e=t.overallVelocity:n&jt?e=t.overallVelocityX:n&Pt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&ct(e)>this.options.velocity&&t.eventType&St},emit:function(t){var e=W(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),p(J,H,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[Kt]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&Tt&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=St)return this.failTimeout();var s=!this.pTime||t.timeStamp-this.pTime<e.interval,o=!this.pCenter||O(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,o&&s?this.count+=1:this.count=1,this._input=t,0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=c(function(){this.state=oe,this.tryEmit()},e.interval,this),ie):oe}return 32},failTimeout:function(){return this._timer=c(function(){this.state=32},this.options.interval,this),32},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==oe&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),Q.VERSION="2.0.8",Q.defaults={domEvents:!1,touchAction:Zt,enable:!0,inputTarget:null,inputClass:null,preset:[[$,{enable:!1}],[B,{enable:!1},["rotate"]],[K,{direction:jt}],[G,{direction:jt},["swipe"]],[J],[J,{event:"doubletap",taps:2},["tap"]],[Z]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};tt.prototype={set:function(t){return it(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&oe)&&(r=e.curRecognizer=null);for(var s=0;s<i.length;)n=i[s],2===e.stopped||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(ie|re|se)&&(r=e.curRecognizer=n),s++}},get:function(t){if(t instanceof H)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(l(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(l(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=S(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==a&&e!==a){var n=this.handlers;return u(w(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==a){var n=this.handlers;return u(w(t),function(t){e?n[t]&&n[t].splice(S(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&nt(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&et(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},it(Q,{INPUT_START:Tt,INPUT_MOVE:wt,INPUT_END:St,INPUT_CANCEL:Et,STATE_POSSIBLE:ne,STATE_BEGAN:ie,STATE_CHANGED:re,STATE_ENDED:se,STATE_RECOGNIZED:oe,STATE_CANCELLED:ae,STATE_FAILED:32,DIRECTION_NONE:bt,DIRECTION_LEFT:At,DIRECTION_RIGHT:Lt,DIRECTION_UP:It,DIRECTION_DOWN:Ct,DIRECTION_HORIZONTAL:jt,DIRECTION_VERTICAL:Pt,DIRECTION_ALL:xt,Manager:tt,Input:I,TouchAction:Y,TouchInput:z,MouseInput:D,PointerEventInput:q,TouchMouseInput:N,SingleTouchInput:R,Recognizer:H,AttrRecognizer:U,Tap:J,Pan:G,Swipe:K,Pinch:B,Rotate:$,Press:Z,on:m,off:g,each:u,merge:ht,extend:ut,assign:it,inherit:p,bindFn:d,prefixed:A}),(void 0!==r?r:"undefined"!=typeof self?self:{}).Hammer=Q,void 0===(i=function(){return Q}.call(e,n,e,t))||(t.exports=i)}(window,document)},function(t,e,n){(function(t){function n(t,e){for(var n=0,i=t.length-1;i>=0;i--){var r=t[i];"."===r?t.splice(i,1):".."===r?(t.splice(i,1),n++):n&&(t.splice(i,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}var i=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,r=function(t){return i.exec(t).slice(1)};function s(t,e){if(t.filter)return t.filter(e);for(var n=[],i=0;i<t.length;i++)e(t[i],i,t)&&n.push(t[i]);return n}e.resolve=function(){for(var e="",i=!1,r=arguments.length-1;r>=-1&&!i;r--){var o=r>=0?arguments[r]:t.cwd();if("string"!=typeof o)throw new TypeError("Arguments to path.resolve must be strings");o&&(e=o+"/"+e,i="/"===o.charAt(0))}return e=n(s(e.split("/"),function(t){return!!t}),!i).join("/"),(i?"/":"")+e||"."},e.normalize=function(t){var i=e.isAbsolute(t),r="/"===o(t,-1);return(t=n(s(t.split("/"),function(t){return!!t}),!i).join("/"))||i||(t="."),t&&r&&(t+="/"),(i?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(s(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},e.relative=function(t,n){function i(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var r=i(t.split("/")),s=i(n.split("/")),o=Math.min(r.length,s.length),a=o,c=0;c<o;c++)if(r[c]!==s[c]){a=c;break}var l=[];for(c=a;c<r.length;c++)l.push("..");return(l=l.concat(s.slice(a))).join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){var e=r(t),n=e[0],i=e[1];return n||i?(i&&(i=i.substr(0,i.length-1)),n+i):"."},e.basename=function(t,e){var n=r(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){return r(t)[3]};var o="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n(2))},function(t,e){var n,i,r=t.exports={};function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(t){n=s}try{i="function"==typeof clearTimeout?clearTimeout:o}catch(t){i=o}}();var c,l=[],u=!1,h=-1;function p(){u&&c&&(u=!1,c.length?l=c.concat(l):h=-1,l.length&&d())}function d(){if(!u){var t=a(p);u=!0;for(var e=l.length;e;){for(c=l,l=[];++h<e;)c&&c[h].run();h=-1,e=l.length}c=null,u=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===o||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function f(t,e){this.fun=t,this.array=e}function v(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new f(t,e)),1!==l.length||u||a(d)},f.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=v,r.addListener=v,r.once=v,r.off=v,r.removeListener=v,r.removeAllListeners=v,r.emit=v,r.prependListener=v,r.prependOnceListener=v,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(t,e,n){"use strict";n.r(e);var i=function(t,e=!1){let n=document.querySelectorAll(t);return n[0]?1!==n.length||e?n:n[0]:null};var r=class{static init(t){t.next=function(t){if(1!==this.remoteState||t){let t=i('[anim-data="'+parseInt(this.currentAnimate+1)+'"]',!0);if(t){for(let e=0;e<t.length;e++){let n=t[e];n.classList.add("current"),n.classList.contains("cjs-slide")&&(this.allSlides[this.currentSlide].classList.add("prev"),this.allSlides[this.currentSlide].classList.remove("current"),this.currentSlide++,this.setPoint(this.currentSlide)),"VIDEO"==n.tagName&&"true"==n.getAttribute("cjs-autoplay")&&n.play()}this.currentAnimate++}}else{let t=new XMLHttpRequest;t.open("GET","./remote/changestate.php?set="+(this.currentAnimate+1),!0),t.send()}},t.prev=function(t){if(0===this.currentAnimate)return!1;if(1!==this.remoteState||t){let t=i('[anim-data="'+parseInt(this.currentAnimate)+'"]',!0);for(let e=0;e<t.length;e++){let n=t[e];n.classList.remove("current"),n.classList.contains("cjs-slide")&&(this.allSlides[this.currentSlide-1].classList.add("current"),this.allSlides[this.currentSlide-1].classList.remove("prev"),this.currentSlide--,this.setPoint(this.currentSlide))}this.currentAnimate--}else{let t=new XMLHttpRequest;t.open("GET","./remote/changestate.php?set="+(this.currentAnimate-1),!0),t.send()}},t.goto=function(t){if(t==this.currentSlide)return!1;{let e=this.currentAnimate,n=parseInt(this.allSlides[t].getAttribute("anim-data"));for(;this.currentAnimate!=n;)e-n<0?this.next(1):this.prev(1);if(this.currentSlide=t,1===this.remoteState){let t=new XMLHttpRequest;t.open("GET","./remote/changestate.php?set="+this.currentAnimate,!0),t.send()}}},t.gotoAnimate=function(e){if(e==t.currentAnimate)return!1;{let t=this.currentAnimate,n=e;for(;this.currentAnimate!=n;)t-n<0?this.next(this,1):this.prev(this,1)}},t.hideInterface=function(){i("#cjs-points").classList.add("hidden"),i("#cjs-interface").classList.add("hidden"),document.body.classList.add("nocursor")},t.showInterface=function(){i("#cjs-points").classList.remove("hidden"),i("#cjs-interface").classList.remove("hidden"),document.body.classList.remove("nocursor")},t.globalView=function(){this.slider.classList.toggle("globalview");for(let t=0;t<this.allSlides.length;t++)this.allSlides[t].classList.toggle("hidden");i("#cjs-points").classList.toggle("globalview"),i("#cjs-interface").classList.toggle("globalview"),i("#cjs-control").classList.toggle("globalview"),document.querySelector("#cjs-interface span").classList.toggle("fa-play-circle-o"),window.clearTimeout(this.timeOut1)}}};n(1);const s=function(t){let e='<div onclick="window.slideShow.goto(0);" class="cjs-point select"></div>';for(let n=1;n<t.allSlides.length;n++)e+='<div onclick="window.slideShow.goto('+n+');" class="cjs-point"></div>';document.querySelector("#cjs-points").innerHTML=e,t.allPoints=document.querySelectorAll(".cjs-point"),t.timeOut1=window.setTimeout(t.hideInterface,2e3)},o=function(t){let e,n,i,r="";for(let s=0;s<t.allSlides.length;s++){e=t.allSlides[s].style.backgroundColor,n=t.allSlides[s].querySelector("h1")?t.allSlides[s].querySelector("h1").innerHTML:"Slide "+s;let o=t.allSlides[s].querySelector("img");r+='<div class="cjs-thumbnail" onclick="window.slideShow.globalView(); window.slideShow.goto('+s+');"><div class="cjs-thumbnail-picture" style="background-color: '+e+';">'+(i=o?'<img src="'+(i=o.src)+'" class="cjs-thumbnail-image">':"")+' </div><div class="cjs-legend">'+n+"</div></div>"}document.querySelector("#cjs-thumbnails-list").innerHTML=r},a=function(t){let e=0;for(let n=0;n<t.allSlides.length;n++){t.allSlides[n].setAttribute("anim-data",e);let i=t.allSlides[n].querySelectorAll("[cjs-animate]"),r=0;for(let t=0;t<i.length;t++){let n=i[t],s=Number(n.getAttribute("cjs-animate"));n.setAttribute("anim-data",e+s),s>r&&(r=s)}e+=r+1}document.querySelectorAll('[anim-data="0"]').forEach(function(t){t.classList.add("current")}),t.allAnimate=document.querySelectorAll("[anim-data]")};var c=class{static generate(t){s(t),o(t),a(t)}static global(t){t.print=function(){this.goto(0),document.querySelectorAll("[animate]").forEach(function(t){t.classList.add("notransition"),t.classList.add("current")}),window.print()},t.setPoint=function(t){this.allPoints.forEach(function(t){t.classList.remove("select")}),this.allPoints[t].classList.add("select")}}},l=n(0),u=n.n(l);var h=class{static init(t){t.slider.addEventListener("wheel",function(e){e.preventDefault(),t.scrolling=e.deltaY,t.scrolling>0?t.next():t.prev(),t.allPoints[t.currentSlide].classList.add("select")}),document.addEventListener("mousemove",function(){window.clearTimeout(t.timeOut1),t.showInterface(),t.timeOut1=window.setTimeout(t.hideInterface,4e3)}),t.slider.addEventListener("click",function(){window.clearTimeout(t.timeOut1),t.showInterface(),t.timeOut1=window.setTimeout(t.hideInterface,4e3)}),document.addEventListener("keyup",function(e){t.allPoints[t.currentSlide].classList.remove("select"),37==e.keyCode||38==e.keyCode?t.prev():39==e.keyCode||40==e.keyCode||32==e.keyCode||13==e.keyCode?t.next():36==e.keyCode?t.goto(0):27==e.keyCode||72==e.keyCode?t.hideInterface():115==e.keyCode?t.globalView():35==e.keyCode&&t.goto(t.allSlides.length-1),t.allPoints[t.currentSlide].classList.add("select")}),document.addEventListener("keydown",function(e){e.ctrlKey&&80==e.keyCode&&(e.preventDefault(),t.print())}),new u.a(t.slider).on("swiperight",function(){t.prev()}).on("swipeleft",function(){t.next()})}};let p=function(t,e){let n=document.createElement("link");return n.rel="stylesheet",n.href=t,n.type="text/css",e&&(n.media=e),n};var d=class{static init(){let t=document.querySelector("link")||document.querySelector("style");t?(i("head").insertBefore(p("assets/css/colorjs.css"),t),i("head").insertBefore(p("assets/fontawesome/css/fontawesome-all.css"),t),i("head").insertBefore(p("assets/css/print.css","print"),t)):(i("head").appendChild(p("assets/css/colorjs.css")),i("head").appendChild(p("assets/fontawesome/css/fontawesome-all.css")),i("head").appendChild(p("assets/css/print.css","print")))}};(Node.prototype.insertAfter=function(t,e){this.insertBefore(t,e.nextSibling)},new Promise((t,e)=>{let n=document.body,i=n.querySelector("#cjs-slider"),r=document.createElement("div");r.id="globalview",r.innerHTML=`<header class="cjs-header">${document.title}</header>\n        <div class="independent"></div>\n        <div id="cjs-thumbnails-list">\n        </div>`,n.prepend(r);let s=document.createElement("div");s.id="cjs-points",n.insertAfter(s,i);let o=document.createElement("div");o.classList.add("material"),o.id="cjs-interface",o.innerHTML='<span class="fa fa-th" onclick="window.slideShow.globalView();"></span>\n        <span id="cjs-control">\n         <span class="fa fa-fast-backward" onclick="window.slideShow.goto(0);"></span>\n        <span class="fa fa-caret-left" onclick="window.slideShow.prev()"></span>\n        <span class="fa fa-caret-right" onclick="window.slideShow.next()"></span>\n        <span class="fa fa-fast-forward" onclick="window.slideShow.goto(window.slideShow.allSlides.length - 1)"></span>\n        <span class="fa fa-print" onclick="window.slideShow.print()"></span>\n        <span class="fa fa-wifi" id="remote" onclick="window.slideShow.remote.start();" style="display: none"></span>\n       </span>',n.insertAfter(o,s),t()})).then(()=>{d.init();let t=window.slideShow={slider:i("#cjs-slider"),scrolling:0,currentSlide:0,currentAnimate:0,allSlides:i(".cjs-slide"),allAnimate:document.querySelectorAll("[anim-data]"),remoteState:0};c.global(t),r.init(t),document.addEventListener("DOMContentLoaded",()=>{c.generate(t),h.init(t)})})}]);