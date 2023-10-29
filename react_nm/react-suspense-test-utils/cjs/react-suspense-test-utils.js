/*
 React
 react-suspense-test-utils.js

 Copyright (c) Meta Platforms, Inc. and affiliates.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
'use strict';const d=require("react").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentCache;function g(){throw Error("This feature is not supported by ReactSuspenseTestUtils.");}
exports.waitForSuspense=function(h){const f=new Map,k={getCacheSignal:g,getCacheForType(b){let a=f.get(b);void 0===a&&(a=b(),f.set(b,a));return a}};return new Promise((b,a)=>{function e(){const l=d.current;d.current=k;try{const c=h();b(c)}catch(c){"function"===typeof c.then?c.then(e,e):a(c)}finally{d.current=l}}e()})};

//# sourceMappingURL=react-suspense-test-utils.js.map
