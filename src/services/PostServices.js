const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const PostServices = {
//     async createPost (data) {
//         const user = await prisma.user.findUnique({
//             where: { id: data.userId },
//           })
//           if(!user) return createError(401, 'User not exist')
//           try {
//             const responseData =  await prisma.post.create({
//               data: data
//             })
//             return responseData
//           } catch (error) {
//             return createError(401, error)
//           }
//     },
  
//   async changePassword (data) {
//       const userExist = await prisma.user.findUnique({
//           where: {id: data.id}
//       })
//       console.log("data", data)

//       if (!userExist) return createError('404', 'User Not Found!')
      
//       const checkPassword = bcrypt.compareSync(data.currentPassword, userExist.password)
//       if (!checkPassword) return createError('401', 'Current Password is incorrect')
//       const newPassword = bcrypt.hashSync(data.newPassword, 8)
      
//       try {
//         const responseData = await prisma.user.update({
//           where: {
//             id: data.id
//           },
//           data: {
//             password: newPassword
//           }
//         })
//         return responseData
//       } catch (error) {
//         return createError(401, error)
//       }
//   },

//   async deletePost (data) {
//     const userExist = await prisma.post.findUnique({
//         where: {id: data.id}
//     })

//     if (!userExist) return createError('404', 'Post Not Found!')
    
//     try {
//       const responseData = await prisma.post.delete({
//         where: {
//           id: data.id
//         },
//       })

//       const posts = await prisma.post.findMany()
//       return posts
//     } catch (error) {
//       return createError(401, error)
//     }
// }
}

module.exports = PostServices