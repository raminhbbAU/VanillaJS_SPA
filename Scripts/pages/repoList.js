import { getRepositoryList } from "../API/API.js";
import { bindComponent,loadHTML } from "../common/common.js";


const PerPage=20;
let pageIndex=1;
let searchValue='';

const pageInitilization = () => {

    let searchTextbox = document.getElementsByClassName('SearchInput')[0];
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

        searchRepo()
    }

}

const searchRepo = () => {

    getRepositoryList(searchValue,PerPage,pageIndex)
        .then( (data) => data.json())
        .then( (data) => showUserRepositories(data))
        .catch((error) => showWarning(error))    
  
}

const showWarning = (value) => {

    let userNameWarningLable = document.getElementsByClassName('WarningLable')[0];
    userNameWarningLable.innerText = value;

}

const showUserRepositories = (data) => {

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

    let userRepoList = document.getElementById('RepoList');
    userRepoList.innerHTML=''

    data.items.map( (item) => {
        
        loadHTML('RepositoryInfo.html','Components/',(data)=>{
            bindComponent('RepositoryInfo.html',data,userRepoList,true,item,(res)=>{
                // TODO: click on the repository
            });
        })
        
    })

}

const pageNavigatorListener = (next) => {

    if (next)
    {
        pageIndex+=1
        searchRepo()
    }
    else if (!next && pageIndex>1) {
        pageIndex-=1
        searchRepo();
    }
}

pageInitilization();
