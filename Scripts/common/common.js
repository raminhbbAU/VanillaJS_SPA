
const loadHTML = (htmlName,path='Views/',callback) => {

    let url = path + htmlName;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status ===200){
            callback(this.responseText)
        }
    };
    xhttp.open('GET',url,true);
    xhttp.send();

}

const bindHTML = (html, dest, append=false,data=null) => {

    // if no append is requested, clear the target element
    if(!append) dest.innerHTML = '';

    // create a temporary container and insert provided HTML code
    let container = document.createElement('div');
    container.innerHTML = html;

    if (data) container.setAttribute('data-json',JSON.stringify(data))

    // cache a reference to all the scripts in the container
    let scripts = container.querySelectorAll('script');
    //console.log(scripts);
   
    // get all child elements and clone them in the target element
    let nodes = container.childNodes;
    for( let i=0; i< nodes.length; i++) dest.appendChild( nodes[i].cloneNode(true) );
   
    // force the found scripts to execute...
    for( let i=0; i< scripts.length; i++){
        let script = document.createElement('script');
        script.type = scripts[i].type || 'text/javascript';
        if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
        script.innerHTML = scripts[i].innerHTML;
        //console.log(script);
        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    return true;

}

const bindComponent = (name,html, dest, append=false,data=null,clickCallback) => {

    // if no append is requested, clear the target element
    if(!append) dest.innerHTML = '';

    // create a temporary container and insert provided HTML code
    let container = document.createElement('div');
    container.innerHTML = html;

    switch (name) {
        case 'UserThumbnail.html':
            bindUserThumbnail(container,data,(res)=>{
                clickCallback(res);
            });
            break;  
        case 'PageNavigation.html':
            bindPageNavigation(container,(res)=>{
                    clickCallback(res);
                });
                break;     
        case 'UserMoreInfo.html':
            bindUserMoreInfo(container,data,(res)=>{
                clickCallback(res);
            });
            break;
        case 'RepositoryInfo.html':
            bindRepositoryInfo(container,data,(res)=>{
                clickCallback(res);
            });
            break;    
        default:
            break;
    }
        

    // get all child elements and clone them in the target element
    dest.appendChild(container);

    
    // cache a reference to all the scripts in the container
    let scripts = container.querySelectorAll('script');
    //console.log(scripts);
       
    // force the found scripts to execute...
    for( let i=0; i< scripts.length; i++){
        let script = document.createElement('script');
        script.type = scripts[i].type || 'text/javascript';
        if( scripts[i].hasAttribute('src') ) script.src = scripts[i].src;
        script.innerHTML = scripts[i].innerHTML;
        //console.log(script);
        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    return true;

}

const bindUserThumbnail = (container,data,clickCallback) => {

    let parentDiv = container.getElementsByClassName('userThumb_parentDiv')[0];
    parentDiv.setAttribute('data-id',data.id)
    parentDiv.setAttribute('data-avatar',data.avatar_url)
    parentDiv.setAttribute('data-login',data.login)

    let avatar = container.getElementsByClassName('userThumb_avatar')[0];
    avatar.src = data.avatar_url

    let fullName = container.getElementsByClassName('userThumb_fullName')[0];
    fullName.innerText  = data.login;

    parentDiv.addEventListener('click', (e) => {
        clickCallback(data);
    })

}

const bindUserMoreInfo = (container,data,clickCallback) => {

    let parentDiv = container.getElementsByClassName('userMoreInfo_parentDiv')[0];
    parentDiv.setAttribute('data-id',data.id)
    parentDiv.setAttribute('data-avatar',data.avatar_url)
    parentDiv.setAttribute('data-login',data.login)

    let bio = container.getElementsByClassName('userMoreInfo_bio')[0];
    bio.innerText  = data.bio;

    parentDiv.addEventListener('click', (e) => {
        clickCallback(data);
    })

}

const bindRepositoryInfo = (container,data,clickCallback) => {

    let parentDiv = container.getElementsByClassName('repositoryInfo_parentDiv')[0];
    parentDiv.setAttribute('data-id',data.id)
    parentDiv.setAttribute('data-name',data.name)

    let name = container.getElementsByClassName('repositoryInfo_name')[0];
    name.innerHTML = `<a src=${data.url}>${data.name}</a>`;

    let description = container.getElementsByClassName('repositoryInfo_description')[0];
    description.innerText  = data.description;


    parentDiv.addEventListener('click', (e) => {
        clickCallback(data);
    })

}

const bindPageNavigation = (container,clickCallback) => {

    let parentDiv = container.getElementsByClassName('pageNavigation_parentDiv')[0];


    let next = container.getElementsByClassName('pageNavigation_next')[0];
    let prev = container.getElementsByClassName('pageNavigation_prev')[0];

    next.addEventListener('click', (e) => {
        clickCallback(true);
    })

    prev.addEventListener('click', (e) => {
        clickCallback(false);
    })

}


export {bindHTML,loadHTML,bindComponent}