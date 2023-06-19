/*
   Convention
   Use the file middleware.ts (or .js) in the root of your project to define Middleware. 
   For example, at the same level as pages or app, or inside src if applicable.
*/
import { nextResponse } from 'next/server'

export async function middleware(req) {
   const response = nextResponse.next()
 
   console.log('middleware in action !')                            
   response.headers.append('Access-Control-Allow-Origin', '*')
   response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
   response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization')
   response.headers.append('Access-Control-Max-Age', 300)
   console.log(response.headers)

   return response
}

// export async function middleware(req) {
//     const response = nextResponse.next()
  
//     console.log('middleware in action 1 !')
//     if (request.nextUrl.pathname.startsWith("/api")) {
//       response.headers.append("Access-Control-Allow-Origin", "*")
//       console.log('middleware in action 2 !')
//     }
//     //...
//     return response
// }

// export function middleware(req) {
    
//     console.log(req.method)
//     console.log(req.url)
//     console.log(req.nextUrl.pathname)
    
//     const response = nextResponse.next()
    
//     return response
// }

export const config = {
  matcher: ['/api/blogs'],
}
  
/*
   How to enable cors in Nextjs 13 Route Handlers
   https://github.com/vercel/next.js/discussions/47933

   NextJS middleware does not seem to be triggered
   https://stackoverflow.com/questions/73040090/nextjs-middleware-does-not-seem-to-be-triggered
  
   NextJS | Middleware
   https://nextjs.org/docs/app/building-your-application/routing/middleware/
*/
  