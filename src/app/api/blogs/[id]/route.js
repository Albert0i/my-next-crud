import { nextResponse } from 'next/server'
import { getPostById, deletePost, updatePost } from '../../../lib/data'

// Get a post 
export async function GET(req, res) {    
    // console.log(`id=${req.url.split('blogs/')[1]}`)
    // console.log(req)
    // console.log(res)
    try {
        const id = parseInt(res.params.id)
        const post = getPostById(id)
        if (post) 
            return nextResponse.json({ message: 'OK', post}, { status:200 })
        else 
            return nextResponse.json({ message: 'Error'}, { status:404 })
    } catch (err) {
        return nextResponse.json({ message: 'Error'}, { status:500 })
    }
}

// Update a post 
export async function PUT(req, res) {
    //console.log(`id=${req.url.split('blogs/')[1]}`)
    try {        
        const id = parseInt(res.params.id)
        const body = await req.json()
        updatePost({id, ...body})
        return nextResponse.json({ message: 'OK'}, { status:200 })
    } catch (err) {
        return nextResponse.json({ message: 'Error'}, { status:500 })
    }
}

// Delete a post 
export async function DELETE(req, res) {
    //console.log(`id=${req.url.split('blogs/')[1]}`)
    try {
        const id = parseInt(res.params.id)
        deletePost(id)
        return nextResponse.json({ message: 'OK'}, { status:204 })
    } catch (err) {
        return nextResponse.json({ message: 'Error'}, { status:500 })
    }
}

/*
   Build A Simple CRUD API With Next.js 13 App Router (REST API)
   https://youtu.be/O-NGENb6LNg

   route.js
   https://nextjs.org/docs/app/api-reference/file-conventions/route
*/