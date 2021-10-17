const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const crypto = require('crypto')
const { signAccessToken } = require("../utils/jwt.js");

const AuthServices = {
    async createUser (data) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
          })
          if(user) return createError(401, 'Email Already exist')
          data.password = bcrypt.hashSync(data.password, 8)
          const token = await crypto.randomBytes(6)
          
          // data.token = token
          try {
            const responseData =  await prisma.user.create({
              data: data
            })
            const tokenData = await prisma.token.create({
              data: {
                token: token.toString('hex'),
                userId: responseData.id
              }
            })
            return responseData
          } catch (error) {
            return createError(401, error)
          }
    },

    async verifyOtp (data) {
        const userExist = await prisma.user.findUnique({
            where: {email: data.email}
        })
        if (!userExist) return createError('404', 'User Not Found!')
        
        const verifyOtp = await prisma.token.findFirst({
          where: {
            userId: userExist.id
          }
        })
        if (!verifyOtp || (data.token != verifyOtp.token)) return createError('401', 'Otp is not set or expired')
        var diff = Math.abs(new Date(verifyOtp.createdAt) - new Date());
        var minutes = Math.floor((diff/1000)/60);
        console.log("minutes", minutes)
        if(minutes >= 2) return createError('401', 'Otp is expired')
        const userData = await prisma.user.update({
          where: {id: userExist.id},
          data: {isVerified: true}
        })
        return {...userData, status: true, message: 'Account is now verified'}
    },

    async resendOtp (data) {
      console.log("data", data)
      const userExist = await prisma.user.findUnique({
          where: {email: data.email}
      })
      if (!userExist) return createError('404', 'User Not Found!')
      const token = await crypto.randomBytes(6)
      const response = await prisma.token.update({
        where: {
          userId: userExist.id
        },
        data: {
          token: token.toString('hex'),
          createdAt: new Date()
        }
      })
      
      return {...userExist, status: true, message: 'otp is resend to your email'}
  },

    async loginUser (data) {
      const userExist = await prisma.user.findUnique({
          where: {email: data.email}
      })
      if (!userExist) return createError('404', 'User Not Found!')
      
      const checkPassword = bcrypt.compareSync(data.password, userExist.password)
      if (!checkPassword) return createError('401', 'Email/Password incorrect')
      if (!userExist.isVerified) return createError('401', 'Please Verify your account')

      delete userExist.password
      return {...userExist, status: true, message: 'Signin Successful'}
    },
    
    async changePassword (data) {
        const userExist = await prisma.user.findUnique({
            where: {id: data.id}
        })

        if (!userExist) return createError('404', 'User Not Found!')
        
        const checkPassword = bcrypt.compareSync(data.currentPassword, userExist.password)
        if (!checkPassword) return createError('401', 'Current Password is incorrect')
        const newPassword = bcrypt.hashSync(data.newPassword, 8)
        
        try {
          const responseData = await prisma.user.update({
            where: {
              id: data.id
            },
            data: {
              password: newPassword
            }
          })
          return responseData
        } catch (error) {
          return createError(401, error)
        }
    },

    async deleteUser (data) {
      const userExist = await prisma.user.findUnique({
          where: {id: data.id}
      })

      if (!userExist) return createError('404', 'User Not Found!')
      
      try {
        const responseData = await prisma.user.delete({
          where: {
            id: data.id
          },
        })

        const users = await prisma.user.findMany()
        return users
      } catch (error) {
        return createError(401, error)
      }
    }
}

module.exports = AuthServices