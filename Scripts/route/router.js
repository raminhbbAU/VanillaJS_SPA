"use strict";


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
                        scope.goToRoute(route.htmlName);
                    }
                }
            } else {
                for(var i=0, length = r.length; i<length;i++){
                    let route = r[i];
                    if (route.default){
                        scope.goToRoute(route.htmlName);
                    }
                }
            }

        },
        goToRoute: function(htmlName){
            (function(scope){

                let url = 'Views/' + htmlName;
                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function(){
                    if (this.readyState === 4 && this.status ===200){
                        //scope.rootElem.innerHTML = this.responseText;
                        scope.insertHTML(this.responseText,scope.rootElem,false);
                    }
                };
                xhttp.open('GET',url,true);
                xhttp.send();

            })(this);
        },
        insertHTML: function(html, dest, append=false) {

                // if no append is requested, clear the target element
                if(!append) dest.innerHTML = '';
                // create a temporary container and insert provided HTML code
                let container = document.createElement('div');
                container.innerHTML = html;
                // cache a reference to all the scripts in the container
                let scripts = container.querySelectorAll('script');
                console.log(scripts);
                // get all child elements and clone them in the target element
                let nodes = container.childNodes;
                for( let i=0; i< nodes.length; i++) dest.appendChild( nodes[i].cloneNode(true) );
                // force the found scripts to execute...
                for( let i=0; i< scripts.length; i++){
                    let script = document.createElement('script');
                    script.type = scripts[i].type || 'text/javascript';
                    if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
                    script.innerHTML = scripts[i].innerHTML;
                    console.log(script);
                    document.body.appendChild(script);
                    document.body.removeChild(script);
                }
                return true;

        }
}