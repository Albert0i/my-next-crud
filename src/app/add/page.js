import { revalidatePath, revalidateTag } from "next/cache";

export default async function Add() {   

  async function addPost(data) {
    "use server";
    const title = data.get('title')
    const desc = data.get('desc')
    try {
      const res = await fetch( 'http://localhost:3000/api/blogs/', 
                              { method: 'POST',
                                cache: 'no-store', 
                                body: JSON.stringify({ title: title, desc: desc }) } );      
      console.log(res.status)
      revalidateTag('posts')
      revalidatePath('/')
    } catch (err) {
        console.log(err);
    }      
  }
  
  return (
    <main className='container p-4 mx-auto'>
      <form action={addPost}>
        <div className='my-2'>
          <input type='text' id='title' name='title' placeholder='title' className='p-2' autoFocus />
        </div>
        <div className='my-2'>
          <input type='text' id='desc' name='desc' placeholder='description' className='p-2' />
        </div>
        <div className='my-2'>
          <button className='px-2 text-white bg-green-500 rounded hover:bg-green-300' type='submit'>Add</button>
        </div>        
      </form>
    </main>
  )
}

/*
   How to use fetch API in Next.js?
   https://rapidapi.com/guides/how-to-use-fetch-api-in-next-js
*/