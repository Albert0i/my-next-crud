import { nextResponse } from 'next/server'
import { getPosts, addPost } from '../../lib/data'

// Get all posts 
export async function GET(req, res) {
    try {
        const posts = getPosts()
        return nextResponse.json({ message: 'OK', posts}, { status:200 })
    } catch (err) {
        return nextResponse.json({ message: 'Error'}, { status:500 })
    }    
}

// Create a post 
export async function POST(req, res) {
    const body = await req.json()

    try {
        addPost(body)
        return nextResponse.json({ message: 'OK'}, { status:201 })
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