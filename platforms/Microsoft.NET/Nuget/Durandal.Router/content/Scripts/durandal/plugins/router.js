define("plugins/router",["durandal/system","durandal/app","durandal/activator","durandal/events","plugins/history"],function(e,t,r,n,o){function i(e){return e=e.replace(s,"\\$&").replace(g,"(?:$1)?").replace(f,function(e,t){return t?e:"([^/]+)"}).replace(d,"(.*?)"),new RegExp("^"+e+"$")}function u(e){var t=e.indexOf(":"),r=t>0?t-1:e.length;return e.substring(0,r)}function a(e){return e.router&&e.router.loadUrl}var c,l,g=/\((.*?)\)/g,f=/(\(\?)?:\w+/g,d=/\*\w+/g,s=/[\-{}\[\]+?.,\\\^$|#\s]/g,v=function(){function l(t,r){e.log("Navigation Complete",t,r),y&&y.__moduleId__&&C.trigger("router:navigatedFrom:"+y.__moduleId__),y=t,S=r,y&&y.__moduleId__&&C.trigger("router:navigatedTo:"+y.__moduleId__),a(t)||C.updateDocumentTitle(t,r),C.trigger("router:navigation:complete",t,r,C)}function g(t,r){e.log("Navigation Cancelled"),S&&C.navigate(S.fragment,{trigger:!1}),k(!1),C.trigger("router:navigation:cancelled",t,r,C)}function f(t){e.log("Navigation Redirecting"),k(!1),C.navigate(t,{trigger:!0,replace:!0})}function d(e,t,r){e.activateItem(t,r.params).then(function(e){if(e){var n=y;l(t,r),a(t)&&I({router:t.router,fragment:r.fragment,queryString:r.queryString}),n==t&&C.afterCompose()}else g(t,r);c&&(c.resolve(),c=null)})}function s(t,r,n){var o=C.guardRoute(r,n);o?o.then?o.then(function(o){o?e.isString(o)?f(o):d(t,r,n):g(r,n)}):e.isString(o)?f(o):d(t,r,n):g(r,n)}function p(e,t,r){C.guardRoute?s(e,t,r):d(e,t,r)}function m(e){return S&&S.config.moduleId==e.config.moduleId&&y&&(y.canReuseForRoute&&y.canReuseForRoute.apply(y,e.params)||y.router&&y.router.loadUrl)}function h(){if(!k()){var t=T.shift();if(T=[],t){if(t.router){var n=t.fragment;return t.queryString&&(n+="?"+t.queryString),t.router.loadUrl(n),void 0}k(!0),m(t)?p(r.create(),y,t):e.acquire(t.config.moduleId).then(function(r){var n=new(e.getObjectResolver(r));p(U,n,t)})}}}function I(e){T.unshift(e),h()}function R(e,t,r){for(var n=e.exec(t).slice(1),o=0;o<n.length;o++){var i=n[o];n[o]=i?decodeURIComponent(i):null}var u=C.parseQueryString(r);return u&&n.push(u),n}function _(t){return e.isRegExp(t.route)||(t.title=t.title||C.convertRouteToTitle(t.route),t.moduleId=t.moduleId||C.convertRouteToModuleId(t.route),t.hash=t.hash||C.convertRouteToHash(t.route),t.route=i(t.route)),C.trigger("router:route:mapping",t,C),C.routes.push(t),C.route(t.route,function(e,r){I({fragment:e,queryString:r,config:t,params:R(t.route,e,r)})}),C}function b(e){e.isActive=ko.computed(function(){return U()&&U().__moduleId__==e.moduleId})}var y,S,T=[],k=ko.observable(!1),U=r.create(),C={handlers:[],routes:[],navigationModel:ko.observableArray([]),activeItem:U,isNavigating:ko.computed(function(){var e=U();return k()||e&&e.router&&e.router.isNavigating()})};return n.includeIn(C),C.parseQueryString=function(e){var t,r;if(!e)return null;if(r=e.split("&"),0==r.length)return null;t={};for(var n=0;n<r.length;n++){var o=r[n];if(""!==o){var i=o.split("=");t[i[0]]=i[1]&&decodeURIComponent(i[1].replace(/\+/g," "))}}return t},C.route=function(e,t){C.handlers.push({route:e,callback:t})},C.loadUrl=function(e){var t=C.handlers,r=null,n=e,o=e.indexOf("?");-1!=o&&(n=e.substring(0,o),r=e.substr(o+1));for(var i=0;i<t.length;i++){var u=t[i];if(u.route.test(n))return u.callback(n,r),!0}return!1},C.updateDocumentTitle=function(e,r){r.config.title?document.title=t.title?r.config.title+" | "+t.title:r.config.title:t.title&&(document.title=t.title)},C.navigate=function(e,t){o.navigate(e,t)},C.navigateBack=function(){o.history.back()},C.afterCompose=function(){setTimeout(function(){k(!1),C.trigger("router:navigation:composed",y,S,C),h()},10)},C.convertRouteToHash=function(e){return"#"+e},C.convertRouteToModuleId=function(e){return u(e)},C.convertRouteToTitle=function(e){var t=u(e);return t.substring(0,1).toUpperCase()+t.substring(1)},C.map=function(t,r){if(e.isArray(t)){for(var n=0;n<t.length;n++)C.map(t[n]);return C}return e.isString(t)||e.isRegExp(t)?(r?e.isString(r)&&(r={moduleId:r}):r={},r.route=t):r=t,_(r)},C.buildNavigationModel=function(t){var r=[],n=C.routes;t=t||100;for(var o=0;o<n.length;o++){var i=n[o];void 0!=i.nav&&(e.isNumber(i.nav)||(i.nav=t),b(i),r.push(i))}return r.sort(function(e,t){return e.nav-t.nav}),C.navigationModel(r),C},C.mapUnknownRoutes=function(t){var r=i("*catchall");return C.route(r,function(n,o){var i={fragment:n,queryString:o,config:{route:r},params:R(r,n,o)};if(t)if(e.isString(t))i.config.moduleId=t;else if(e.isFunction(t)){var u=t(i);if(u&&u.then)return u.then(function(){C.trigger("router:route:mapping",i.config,C),I(i)}),void 0}else i.config=t,i.config.route=r;else i.config.moduleId=n;C.trigger("router:route:mapping",i.config,C),I(i)}),C},C.reset=function(){C.handlers=[],C.routes=[],delete C.options},C.createChildRouter=function(){var e=v();return e.parent=C,e},C};return l=v(),l.activate=function(t){return e.defer(function(r){c=r,l.options=e.extend({routeHandler:l.loadUrl},l.options,t),o.activate(l.options)}).promise()},l.deactivate=function(){o.deactivate()},l});