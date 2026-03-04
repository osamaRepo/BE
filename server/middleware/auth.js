// import { verifyToken } from '../utils/authenticator'
// import { errorResponse } from '../utils/response'

// export default defineEventHandler(async (event) => {
//   const path = event.path

//   const publicPaths = ['/api/auth/login']
  
//   if (publicPaths.some(p => path.startsWith(p))) {
//     return 
//   }

//   const token = getCookie(event, 'accessToken') || 
//                 getHeader(event, 'authorization')?.replace('Bearer ', '')

//   if (!token) {
//     throw createError({
//       statusCode: 401,
//       message: 'Unauthorized'
//     })
//   }

//   const decoded = verifyToken(token)
  
//   if (!decoded) {
//     throw createError({
//       statusCode: 401,
//       message: 'Invalid token'
//     })
//   }

//   event.context.user = decoded
// })