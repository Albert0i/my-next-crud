import { revalidatePath } from "next/cache";

export default async function Add() {   

  async function addPost(data) {
    "use server";
    const title = data.get('title')
    const desc = data.get('desc')
    console.log(title, desc)
    try {
      await fetch( 'http://localhost:3000/api/blogs/', 
                              { method: 'POST', 
                                body: JSON.stringify({ title: title, desc: desc }) } );
      revalidatePath("/");

    } catch (err) {
        console.log(err);
    }      
  }
  
  return (
    <main className='container p-4 mx-auto'>
      <form action={addPost}>
        <div className='my-2'>
          <input type='text' id='title' name='title' placeholder='title' autoFocus />
        </div>
        <div className='my-2'>
          <input type='text' id='desc' name='desc' placeholder='description' />
        </div>
        <div className='my-2'>
          <button className='px-2 text-white bg-green-500 rounded' type='submit'>Add</button>
        </div>        
      </form>
    </main>
  )
}

/*
   How to use fetch API in Next.js?
   https://rapidapi.com/guides/how-to-use-fetch-api-in-next-js
*/