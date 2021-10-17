
const { prisma } = require("../database.js");
const AuthServices = require("../services/authServices.js");


const Query = {
    loginUser : async (args, req, context) => {
        console.log("args, req, context", args, req, context)
        const response = await AuthServices.loginUser(req)
        return response
    },
    getAllUsers: async (args, req, context) => {
        const response = await prisma.user.findMany({
            // include: {
            //     Post: true
            // }
        })
        return response
    },
    // getAllPosts: async (args, req) => {
    //     return await prisma.post.findMany({
    //         include: {
    //             user: true
    //         }
    //     })
    // }
}

module.exports = {
    Query,
  }
