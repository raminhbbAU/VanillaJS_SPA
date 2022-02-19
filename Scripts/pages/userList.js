import { getUserList } from "../API/API.js";
import { bindComponent,loadHTML } from "../common/common.js";


const pageInitilization = () => {

    let searchTextbox = document.getElementById('userNameSearchInput');
    searchTextbox.addEventListener('keyup', (event) => searchUser(event))

}

const searchUser = (e) => {

    if (e.keyCode === 13) {
        e.preventDefault();
        
        showWarning('');

        getUserList(e.target.value)
        .then( (data) => data.json())
        .then( (data) => showUsersOnThePage(data))
        .catch((error) => showWarning(error))    
    }
   
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

    data.items.map( (item) => {
        
        loadHTML('UserThumbnail.html','Components/',(data)=>{
            bindComponent(data,UserList,true,item);
        })
        
    })

}

pageInitilization();
