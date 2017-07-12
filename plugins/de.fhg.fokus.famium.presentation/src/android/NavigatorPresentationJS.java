/*
 * Copyright 2014 Fraunhofer FOKUS
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * AUTHORS: Louay Bassbouss <louay.bassbouss@fokus.fraunhofer.de>
 *          Martin Lasak <martin.lasak@fokus.fraunhofer.de>
 */
package de.fhg.fokus.famium.presentation;

/**
 * 
 * This class collects all JavaScript Code that will be injected in WebViews. At the moment there is only one constant  <code>RECEIVER</code>. New contants my be added in future releases.
 *
 */
public class NavigatorPresentationJS {
	/**
	 * RECEIVER contains a minified version of the JavaScript file receiver.js. It will be injected in the WebView of the presenting page after page load finished.
	 */
	public static String RECEIVER = "javascript:function PresentationConnectionCloseEvent(e,n){this.type=e;var t=n.message,o=n.reason;Object.defineProperty(this,'message',{get:function(){return t}}),Object.defineProperty(this,'reason',{get:function(){return o}})}!function(e){function n(){Object.defineProperty(this,'connectionList',{get:function(){return f}})}function t(e){var n=null,e=e;Object.defineProperty(this,'connections',{get:function(){return e}}),Object.defineProperty(this,'onconnectionavailable',{get:function(){return n},set:function(e){'function'!=typeof e&&null!==e||(n=e)}})}function o(e){Object.defineProperty(this,'state',{get:function(){return e&&e.state||null}}),Object.defineProperty(this,'id',{get:function(){return e&&e.id||null}}),Object.defineProperty(this,'url',{get:function(){return e&&e.url||null}}),Object.defineProperty(this,'onmessage',{get:function(){return e.onmessage},set:function(n){'function'!=typeof n&&null!==n||(e.onmessage=n)}}),Object.defineProperty(this,'onconnect',{get:function(){return e.onconnect},set:function(n){'function'!=typeof n&&null!==n||(e.onconnect=n)}}),Object.defineProperty(this,'onclose',{get:function(){return e.onclose},set:function(n){'function'!=typeof n&&null!==n||(e.onclose=n)}}),Object.defineProperty(this,'onterminate',{get:function(){return e.onterminate},set:function(n){'function'!=typeof n&&null!==n||(e.onterminate=n)}}),Object.defineProperty(this,'send',{get:function(){return function(n){return e.send(n)}}}),Object.defineProperty(this,'close',{get:function(){return function(){return e.close()}}}),Object.defineProperty(this,'terminate',{get:function(){return function(){return e.terminate()}}})}var r=function(){console.log('receiver: NavigatorPresentation receiverside',e);var t=new n;Object.defineProperty(this,'receiver',{get:function(){return t}})},i=new r;Object.defineProperty(window.navigator,'presentation',{get:function(){return i}});var c=[],u=new t(c),f=new Promise(function(n){e.onpresent=function(e){var t=new o(e);console.log('receiver: new connection',t),c.push(t),n(u),u.onconnectionavailable&&u.onconnectionavailable(t)}})}(function(e){function n(n,t){switch(n.state=t,t){case'connected':n.onconnect(n);break;case'connecting':e.setOnPresent();break;case'closed':var o=new PresentationConnectionCloseEvent('close',{message:t});n.onclose(o);break;case'terminated':n.onterminate(n),n=void 0;break;default:console.log('unknown connection state: ',t)}}var t={},o=function(){var n=null;Object.defineProperty(this,'onpresent',{get:function(){return n},set:function(t){'function'!=typeof t&&'undefined'!=typeof t&&null!==t||(n=t,n&&e.setOnPresent())}})};e.onsession=function(n){console.log('receiver: onsession',n),t[n.id]=t[n.id]||n;var o=function(){},i=function(){},c=function(){},u=function(){};Object.defineProperty(n,'onmessage',{get:function(){return o},set:function(e){'function'!=typeof e&&'undefined'!=typeof e&&null!==e||(o=e)}}),Object.defineProperty(n,'onconnect',{get:function(){return i},set:function(e){'function'!=typeof e&&'undefined'!=typeof e&&null!==e||(i=e)}}),Object.defineProperty(n,'onclose',{get:function(){return c},set:function(e){'function'!=typeof e&&'undefined'!=typeof e&&null!==e||(c=e)}}),Object.defineProperty(n,'onterminate',{get:function(){return u},set:function(e){'function'!=typeof e&&'undefined'!=typeof e&&null!==e||(u=e)}}),Object.defineProperty(n,'send',{get:function(){return function(t){var o=encodeURIComponent(JSON.stringify(t));return e.postMessage(n.id,o)}}}),Object.defineProperty(n,'close',{get:function(){return function(t){return e.close(n.id)}}}),Object.defineProperty(n,'terminate',{get:function(){return function(){return e.terminate(n.id)}}}),r.onpresent&&r.onpresent(n)},e.onmessage=function(e,n){console.log('receiver: onmessage '+n);var o,r=t[e],i=decodeURIComponent(n);try{o=JSON.parse(i)}catch(c){o=i}r&&r.onmessage&&r.onmessage.call(null,o)},e.onstatechange=function(e,o){console.log('receiver: onstatechange '+o);var r=t[e];r&&n(r,o)};var r=new o;return r}(NavigatorPresentationJavascriptInterface)),PresentationConnectionCloseEvent.prototype=Event.prototype;";
}
