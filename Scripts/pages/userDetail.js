import { getUserifno,getUserRepositories } from "../API/API.js";
import { bindComponent,loadHTML } from "../common/common.js";

let userName='';
const PerPage=20;
let pageIndex=1;

const pageInitilization = () => {

    let navigationBoxes = document.getElementsByClassName('PageNavigation');
    for( let i=0; i< navigationBoxes.length; i++){

        loadHTML('PageNavigation.html','Components/',(data)=>{
            bindComponent('PageNavigation.html',data,navigationBoxes[i],false,null,(res)=>{
                console.log(res);
                pageNavigatorListener(res);
            });
        })

    }


    //load userinfo
    userName = window.location.hash.replace('#UserDetail/','')
    fetchUserInfo(userName);
    fetchUserRepositories(userName);



}

const fetchUserInfo = (userName) => {

    getUserifno(userName)
        .then( (data) => data.json())
        .then( (data) => showUserInfo(data))
        .catch((error) => showWarning(error))    
  
}

const fetchUserRepositories = (userName) => {

    getUserRepositories(userName,PerPage,pageIndex)
        .then( (data) => data.json())
        .then( (data) => showUserRepositories(data))
        .catch((error) => showWarning(error))    
  
}

const showUserInfo = (userInfo) => {

    if (!userInfo)
    {
        showWarning('data is unavilable!')
        return;
    }


    let userThumbnail = document.getElementById('userMoreInfo');
    userThumbnail.innerHTML=''
        
    loadHTML('UserThumbnail.html','Components/',(data)=>{
        bindComponent('UserThumbnail.html',data,userThumbnail,true,userInfo,(res)=>{
            //TODO: Click on the userThumbnail
        });
    })
        
    loadHTML('UserMoreInfo.html','Components/',(data)=>{
        bindComponent('UserMoreInfo.html',data,userThumbnail,true,userInfo,(res)=>{
            //TODO: Click on the userThumbnail
        });
    })

}

const showUserRepositories = (data) => {

    if (!data)
    {
        showWarning('data is unavilable!')
        return;
    }

    if (data.length <=0)
    {
        showWarning('data is empty!')
        return;
    }

    let userRepoList = document.getElementById('userRepoList');
    userRepoList.innerHTML=''

    data.map( (item) => {
        
        loadHTML('RepositoryInfo.html','Components/',(data)=>{
            bindComponent('RepositoryInfo.html',data,userRepoList,true,item,(res)=>{
                // TODO: click on the repository
            });
        })
        
    })

}

const showWarning = (value) => {

    console.log(value);

}

const pageNavigatorListener = (next) => {

    // if (next)
    // {
    //     pageIndex+=1
    //     searchUser()
    // }
    // else if (!next && pageIndex>1) {
    //     pageIndex-=1
    //     searchUser();
    // }
}

pageInitilization();
