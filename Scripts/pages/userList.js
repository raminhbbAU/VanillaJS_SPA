import { getUserList } from "../API/API.js";
import { bindComponent,loadHTML } from "../common/common.js";


const PerPage=20;
let pageIndex=1;
let searchValue='';

const pageInitilization = () => {

    let searchTextbox = document.getElementById('userNameSearchInput');
    searchTextbox.addEventListener('keyup', (event) => searchKeyupListener(event))

    let navigationBoxes = document.getElementsByClassName('PageNavigation');
    for( let i=0; i< navigationBoxes.length; i++){

        loadHTML('PageNavigation.html','Components/',(data)=>{
            bindComponent('PageNavigation.html',data,navigationBoxes[i],false,null,(res)=>{
                console.log(res);
                pageNavigatorListener(res);
            });
        })

    }
}

const searchKeyupListener = (e) => {

    if (e.keyCode === 13) {
        e.preventDefault();
        
        showWarning('');
        pageIndex=1;
        searchValue = e.target.value;

        searchUser()
    }

}

const searchUser = () => {

    getUserList(searchValue,PerPage,pageIndex)
        .then( (data) => data.json())
        .then( (data) => showUsersOnThePage(data))
        .catch((error) => showWarning(error))    
  
}

const showWarning = (value) => {

    let userNameWarningLable = document.getElementById('userNameWarningLable');
    userNameWarningLable.innerText = value;

}

const showUsersOnThePage = (data) => {

    if (!data)
    {
        showWarning('data is unavilable!')
        return;
    }

    if (data.items.length <=0)
    {
        showWarning('data is empty!')
        return;
    }

    let UserList = document.getElementById('UserList');
    UserList.innerHTML=''

    data.items.map( (item) => {
        
        loadHTML('UserThumbnail.html','Components/',(data)=>{
            bindComponent('UserThumbnail.html',data,UserList,true,item,(res)=>{
                showUserDetail(res);
            });
        })
        
    })

}

const showUserDetail = (userInfo) => {

    window.location.hash = '#UserDetail/' + userInfo.login

}

const pageNavigatorListener = (next) => {

    if (next)
    {
        pageIndex+=1
        searchUser()
    }
    else if (!next && pageIndex>1) {
        pageIndex-=1
        searchUser();
    }
}

pageInitilization();
