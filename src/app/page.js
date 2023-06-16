import { revalidatePath, revalidateTag } from "next/cache";

export default async function Home() {
  
  const getAllPosts = async () => {
    try {
        const res = await fetch( 'http://localhost:3000/api/blogs/', 
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
    </main>
  )
}

/*
   How to use fetch API in Next.js?
   https://rapidapi.com/guides/how-to-use-fetch-api-in-next-js
*/