"use strict";

import { Route } from "./route.js";
import { Router } from "./router.js";


export const routingModuleInitilization = () => {
    
    let router = new Router([
        new Route('Users','userList.html',true),
        new Route('UserDetail','userDetail.html'),
        new Route('Repositories','Repositories.html'),
        new Route('About','about.html')
    ])

}