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
	public static String RECEIVER = "javascript:!function(n){function e(){Object.defineProperty(this,'connectionList',{get:function(){return f}})}function t(n){var e=null,n=n;Object.defineProperty(this,'connections',{get:function(){return n}}),Object.defineProperty(this,'onconnectionavailable',{get:function(){return e},set:function(n){'function'!=typeof n&&null!==n||(e=n)}})}function o(n){Object.defineProperty(this,'state',{get:function(){return n&&n.state||null}}),Object.defineProperty(this,'id',{get:function(){return n&&n.id||null}}),Object.defineProperty(this,'url',{get:function(){return n&&n.url||null}}),Object.defineProperty(this,'onmessage',{get:function(){return n.onmessage},set:function(e){'function'!=typeof e&&null!==e||(n.onmessage=e)}}),Object.defineProperty(this,'onconnect',{get:function(){return n.onconnect},set:function(e){'function'!=typeof e&&null!==e||(n.onconnect=e)}}),Object.defineProperty(this,'onclose',{get:function(){return n.onclose},set:function(e){'function'!=typeof e&&null!==e||(n.onclose=e)}}),Object.defineProperty(this,'onterminate',{get:function(){return n.onterminate},set:function(e){'function'!=typeof e&&null!==e||(n.onterminate=e)}}),Object.defineProperty(this,'send',{get:function(){return function(e){return n.send(e)}}}),Object.defineProperty(this,'close',{get:function(){return function(){return n.close()}}}),Object.defineProperty(this,'terminate',{get:function(){return function(){return n.terminate()}}})}var r=function(){console.log('receiver: NavigatorPresentation receiverside',n);var t=new e;Object.defineProperty(this,'receiver',{get:function(){return t}})},i=new r;Object.defineProperty(window.navigator,'presentation',{get:function(){return i}});var c=[],u=new t(c),f=new Promise(function(e){n.onpresent=function(n){var t=new o(n);console.log('receiver: new connection',t),c.push(t),e(u),u.onconnectionavailable&&u.onconnectionavailable(t)}})}(function(n){function e(n,e){switch(n.state=e,e){case'connected':n.onconnect(n);break;case'connecting':break;case'closed':n.onclose(n);break;case'terminated':n.onterminate(n),n=void 0;break;default:console.log('unknown connection state: ',e)}}var t={},o=function(){var e=null;Object.defineProperty(this,'onpresent',{get:function(){return e},set:function(t){'function'!=typeof t&&'undefined'!=typeof t&&null!==t||(e=t,e&&n.setOnPresent())}})};n.onsession=function(e){console.log('receiver: onsession',e),t[e.id]=t[e.id]||e;var o=function(){},i=function(){},c=function(){},u=function(){};Object.defineProperty(e,'onmessage',{get:function(){return o},set:function(n){'function'!=typeof n&&'undefined'!=typeof n&&null!==n||(o=n)}}),Object.defineProperty(e,'onconnect',{get:function(){return i},set:function(n){'function'!=typeof n&&'undefined'!=typeof n&&null!==n||(i=n)}}),Object.defineProperty(e,'onclose',{get:function(){return c},set:function(n){'function'!=typeof n&&'undefined'!=typeof n&&null!==n||(c=n)}}),Object.defineProperty(e,'onterminate',{get:function(){return u},set:function(n){'function'!=typeof n&&'undefined'!=typeof n&&null!==n||(u=n)}}),Object.defineProperty(e,'send',{get:function(){return function(t){var o=encodeURIComponent(JSON.stringify(t));return n.postMessage(e.id,o)}}}),Object.defineProperty(e,'close',{get:function(){return function(){return n.close(e.id)}}}),Object.defineProperty(e,'terminate',{get:function(){return function(){return n.terminate(e.id)}}}),r.onpresent&&r.onpresent(e)},n.onmessage=function(n,e){console.log('receiver: onmessage '+e);var o,r=t[n],i=decodeURIComponent(e);try{o=JSON.parse(i)}catch(c){o=i}r&&r.onmessage&&r.onmessage.call(null,o)},n.onstatechange=function(n,o){console.log('receiver: onstatechange '+o);var r=t[n];r&&e(r,o)};var r=new o;return r}(NavigatorPresentationJavascriptInterface));";
}
