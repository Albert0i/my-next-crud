
let posts = [
        { id:1, title: 'first title', desc: 'first desc'},
        { id:2, title: 'second title', desc: 'second desc'},
        { id:3, title: 'third title', desc: 'third desc'}
    ]

// handlers 
export const getPosts = () => posts

export const getPostById = (id) => posts.find(post => post.id === id)

export const addPost = (newPost) => { 
    let id = 1
    if (posts.length !==0)
        id = posts[posts.length-1].id + 1
    posts.push({id, ...newPost}) 
}

export const deletePost = (id) => {    
    posts = posts.filter(post => post.id !== id)
}
    
export const updatePost = (newPost) => {
    console.log(posts)
    console.log(newPost)
    const oldPost = posts.find(post => post.id===newPost.id)

    if (oldPost) {
        oldPost.title = newPost.title
        oldPost.desc = newPost.desc 
    }
    else {
        throw new Error(`Post id=${newPost.id} not found!`)
    }
}