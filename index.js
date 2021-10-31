const API = 'https://api.github.com/users/'
let output = document.getElementById('output')
let firstBlock = document.createElement('div')
let secondBlock = document.createElement('div')

let input = document.getElementById('input')

const go = (e) => {
    e.preventDefault()
    let users = API + input.value
    getUsersByName(users)
}
getUsersByName = async (users) => {
    output.innerHTML = ''
    let req = await fetch(users)
    let res = await req.json()
    console.log(res)
    renderUsers(res)
}

const renderUsers = (obj) => {
    firstBlock.innerHTML = ''
    secondBlock.innerHTML = ''

    let login = document.createElement('h1')
    let avatar = document.createElement('img')
    avatar.className = 'avatar'
    let followers = document.createElement('p')
    let following = document.createElement('p')
    let repos = document.createElement('p')

    login.innerHTML = obj.name
    avatar.src = obj.avatar_url
    followers.innerHTML = `followers :  ${obj.followers}`
    following.innerHTML = `following :  ${obj.following}`
    repos.innerHTML = `repositories :  ${obj.public_repos}`

    output.append(firstBlock, secondBlock)
    firstBlock.append(avatar, login, followers, following,repos)


    followers.addEventListener('click', () => {
        searchFollowers()
    })

    following.addEventListener('click', () => {
        searchFollowing()
    })

    repos.addEventListener('click', () => {
        searchRepos()
    })
}

const searchFollowers = async () => {
    let followers_url = API + input.value + '/followers'
    const req = await fetch(followers_url)
    const res = await req.json()
    console.log(res)
    renderFollowers(res)
}

let cardFollowers = document.createElement('div')
cardFollowers.className = 'card'


const renderFollowers = (arr) => {
    secondBlock.innerHTML = ''
    arr && arr.map((el, index, arr) => {
        let followersCard = document.createElement('div')
        cardFollowers.append(followersCard)
        // followersCard.append(followersTitle)
        let followersAvatar = document.createElement('img')
        followersAvatar.className = 'followers_avatar'
        let followersName = document.createElement('p')
        followersName.className = 'followers_name'
        followersAvatar.src = el.avatar_url
        followersName.innerHTML = el.login
        secondBlock.append(cardFollowers)
        followersCard.append(followersAvatar, followersName)
    })
}

const searchFollowing = async () => {
    let following_url = API + input.value + '/following'
    const req = await fetch(following_url)
    const res = await req.json()
    console.log(res)
    renderFollowing(res)
}

let cardFollowing = document.createElement('div')
cardFollowing.className = 'card'

const renderFollowing = (arr) => {
    secondBlock.innerHTML = ''
    arr.map((el, index, arr) => {
        let followingCard = document.createElement('div')
        cardFollowing.append(followingCard)
        let followingAvatar = document.createElement('img')
        followingAvatar.className ='following_avatar'
        let followingName = document.createElement('p')
        followingName.className = 'following_name'
        followingAvatar.src = el.avatar_url
        followingName.innerHTML = el.login
        secondBlock.append(cardFollowing)
        followingCard.append(followingAvatar, followingName)
    })
}

const searchRepos = async () => {
    let repos_url = API + input.value + '/repos'
    const req = await fetch(repos_url)
    const res = await req.json()
    console.log(res)
    renderRepos(res)

}

let cardRepos = document.createElement('div')
cardRepos.className = 'card'

const renderRepos = (arr) => {
    secondBlock.innerHTML = ''
    arr.map((el, index, array) => {
        let reposCard = document.createElement('div')
        reposCard.className = 'repos_card-item'
        cardRepos.append(reposCard)
        let reposName = document.createElement('h3')
        // let reposAvatar = document.createElement('img')
        let reposIsPrivate = document.createElement('p')
        let reposDescr = document.createElement('p')
        let reposLang = document.createElement('p')
        reposName.innerHTML = el.name
        // reposAvatar.src = el.owner.avatar_url
        reposIsPrivate.innerHTML = `Repository is private : ${el.private ? 'private' : 'public'}`
        reposDescr.innerHTML = el.description === null ? 'No description' : el.description
        reposLang.innerHTML = `Language : ${el.language}`

        secondBlock.append(cardRepos)
        reposCard.append(reposName, reposIsPrivate, reposDescr, reposLang)

    })
}





