"use strict";
import { bindHTML,loadHTML } from "../common/common.js";

export function Router (routes) {

    try {
        
        // check validation
        if (!routes)
        {
            throw 'routes array is required!';
        }

        this.constructor(routes);
        this.init();

    } catch (error) {
        console.log(error);
    }

}

Router.prototype = {
        routes: undefined,
        rootElem: undefined,
        constructor: function(routes) {
            this.routes = routes;
            this.rootElem = document.getElementById('app');
        },
        init: function() {
            let r = this.routes;
            (function(scope,r){
                window.addEventListener('hashchange',(e)=>{
                    scope.hasChanged(scope,r);
                })
            })(this,r);
            this.hasChanged(this,r)
        },
        hasChanged: function(scope,r) {
            
            if (window.location.hash.length >0) {
                for(var i=0, length = r.length; i<length;i++){
                    let route = r[i];
                    if (route.isActiveRoute(window.location.hash.substr(1))){
                        scope.goToRoute(route.htmlName,scope);
                    }
                }
            } else {
                for(var i=0, length = r.length; i<length;i++){
                    let route = r[i];
                    if (route.default){
                        scope.goToRoute(route.htmlName,scope);
                    }
                }
            }

        },
        goToRoute: function(htmlName,scope){
            loadHTML(htmlName,'Views/',(data)=>{
                bindHTML(data,scope.rootElem,false);
            })
        }
}