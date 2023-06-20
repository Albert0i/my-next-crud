import { revalidatePath, revalidateTag } from "next/cache";

export default async function Home() {
  
  const getAllPosts = async () => {
    try {
        const res = await fetch( 'http://localhost:3000/api/blogs', 
                                { method: 'GET', cache: 'no-store', tags: ['posts'] } );
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
        return { message: err.message }
    }
  }

  async function deletePost(data) {
    "use server";
    const id = data.get('id')
    try {
      const res = await fetch( `http://localhost:3000/api/blogs/${id}`, 
                              { method: 'DELETE', cache: 'no-store' } );
      console.log(res.status)
      revalidateTag('posts')
      revalidatePath('/')
    } catch (err) {
        console.log(err);
    }      
  }

  const data = await getAllPosts()
  //console.log(data.message)
  
  return (
    
    <main className='container p-4 mx-auto'>
      <ul className='flex flex-col justify-start list-none'>
          { data.posts.map( post => (
            <li className='mt-1' key={post.id}>{post.title} | {post.desc} | 
            <form className='' action={deletePost}>
              <input type="hidden" id="id" name='id' value={post.id} />
              <button className='px-2 text-white bg-red-500 rounded hover:bg-red-300'>Delete</button>
            </form>
            </li>
          ))}
      </ul>
      <div>{process.env.DB_HOST}</div>
      <div>{process.env.DB_USER}</div>
      <div>{process.env.DB_PASS}</div>
      <div>{process.env.APP_ENV}</div>
    </main>
  )
}

/*
   Reference: 

   1. Server Actions: NextJS 13.4's Best New Feature
      https://youtu.be/czvSZqnpTHs

   2. Next.js Server Actions in 15 min
      https://youtu.be/g1dwTNxGmFQ

   3. Build A Simple CRUD API With Next.js 13 App Router (REST API)
      https://youtu.be/O-NGENb6LNg

   4. NEXTjs Server Actions
      https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions

   5. How to use fetch API in Next.js?
      https://rapidapi.com/guides/how-to-use-fetch-api-in-next-js

   6, How to enable cors in Nextjs 13 Route Handlers
      https://github.com/vercel/next.js/discussions/47933

   7. How to Deploy Nextjs Web Application with PM2
      https://dykraf.com/blog/deploying-nextjs-web-application-with-pm2

   8. The Purloined Letter
      https://poemuseum.org/the-purloined-letter/
*/