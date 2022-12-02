/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-dd76a1de'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/favicon.png",
    "revision": "8955521e8f2c8893314dbc16b66ed0d7"
  }, {
    "url": "assets/favicon12.png",
    "revision": "e9b18142a3670e227dc25529f0542e0a"
  }, {
    "url": "assets/favicon24.png",
    "revision": "666bc40c18667a4446d3e15a79ef40e3"
  }, {
    "url": "assets/logo12.png",
    "revision": "1f003a105cf0d8cf0718df6e7beea84b"
  }, {
    "url": "assets/logo192.png",
    "revision": "8fcd4f0782efb9ebe6d2d37098ff8e76"
  }, {
    "url": "assets/logo24.png",
    "revision": "51be62e5b14d4634d042667089494aaa"
  }, {
    "url": "assets/logo32.png",
    "revision": "767053754d6a2ac4a21316e345da3c13"
  }, {
    "url": "assets/logo512.png",
    "revision": "a1fdf19b9045dbcf60ee1c94cd02b300"
  }, {
    "url": "assets/logo64.png",
    "revision": "7bc973330584777026b7499a656d9907"
  }, {
    "url": "favicon.png",
    "revision": "8955521e8f2c8893314dbc16b66ed0d7"
  }, {
    "url": "index.html",
    "revision": "6f2c84123c7801c16dd509373e6d15c9"
  }, {
    "url": "main.js",
    "revision": "f9d91cc19098650a054c4ee32057a02a"
  }, {
    "url": "manifest.json",
    "revision": "145590bde5b1b5b0c18fdd4900aab444"
  }], {});
  workbox.registerRoute(/\.js$/, new workbox.NetworkFirst(), 'GET');

}));
//# sourceMappingURL=service-worker.js.map
