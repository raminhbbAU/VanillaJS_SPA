
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

const bindComponent = (html, dest, append=false,data=null) => {

    // if no append is requested, clear the target element
    if(!append) dest.innerHTML = '';

    // create a temporary container and insert provided HTML code
    let container = document.createElement('div');
    container.innerHTML = html;

    if (data) container.setAttribute('data-json',JSON.stringify(data))

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

export {bindHTML,loadHTML,bindComponent}