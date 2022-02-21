const apiPath = 'https://api.github.com/';
const repos_sort = "created: asc";

const getUserList = async(userName,perPage=20,pageindex=1) => {
    return await fetch(apiPath + `search/users?per_page=${perPage}&page=${pageindex}&q=fullname:${userName}`)
}

const getUserifno = async(userName) => {
    return await fetch(apiPath + `users/${userName}`)
}

const getUserRepositories = async(userName,perPage=5,pageindex=1) => {
    return await fetch(apiPath + `users/${userName}/repos?per_page=${perPage}&page=${pageindex}&sort=${repos_sort}`)
}

export {getUserList,getUserifno,getUserRepositories}