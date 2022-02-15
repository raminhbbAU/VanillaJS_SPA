"use strict";


const Router = (routes) => {

    try {
        
        // check validation
        if (!routes)
        {
            throw 'routes array is required!';
        }

        this.constructor(routes);
        this.Init();

    } catch (error) {
        console.log(error);
    }

}

Router.prototype = {
        routes: undefined,
        rootElem: undefined,
        constructor: (routes) => {
            this.routes = routes;
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
                        scope.goToRoute(route.htmlName);
                    }
                }
            } else {
                for(var i=0, length = r.length; i<length;i++){
                    let route = r[i];
                    if (route.isActiveRoute(window.location.hash.substr(1))){
                        scope.goToRoute(route.htmlName);
                    }
                }
            }

        }
}