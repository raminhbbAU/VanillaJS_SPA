"use strict";

(function(){
    function init(){
        let router = new Router([
            new Route('Home','home.html',true),
            new Route('About','about.html')
        ]);
    }
    init();
}());