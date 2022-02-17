"use strict";

import { Route } from "./route.js";
import { Router } from "./router.js";


export const routingModuleInitilization = () => {
    
    let router = new Router([
        new Route('Home','home.html',true),
        new Route('About','about.html')
    ])

}