"use strict";

const route = (name,htmlName,defaultRoute) => {

    try {
        
        // check validation
        if (!name || !htmlName)
        {
            throw 'the name and html name is required!'
        }

        // register new route in the route table
        this.constructor(name,htmlName,defaultRoute);

    } catch (error) {
        console.error(error);
    }

}


route.prototype = {
    name:undefined,
    htmlName:undefined,
    default:undefined,
    constructor: (name,htmlName,defaultRoute)=> {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: (hashedPath) => {
        return hashedPath.replace('#','') === this.name;
    }
}