const apiPath = 'https://api.github.com/';
const repos_sort = "created: asc";

const getUserList = async(userName,perPage=20,pageindex=1) => {
    await fetch(apiPath + `search/users?per_page=${perPage}&page=${pageindex}&q=fullname:${userName}`)
}

const getUserRepositories = async(username,perPage=5,pageindex=1) => {
    await fetch(apiPath + `users/${username}/repos?per_page=${perPage}&page=${pageindex}&sort=${repos_sort}`)
}

export {getUserList,getUserRepositories}