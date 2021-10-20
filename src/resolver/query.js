
const { prisma } = require("../database.js");
const AuthServices = require("../services/authServices.js");
const BookingServices = require("../services/BookingServices.js");


const Query = {
    loginUser: async (args, req, context) => {
        const response = await AuthServices.loginUser(req)
        return response
    },
    getAllUsers: async (args, req, context) => {
        const response = await prisma.user.findMany({
            include: {
                Bookings: true,
                Feedbacks: true
            }
        })
        return response
    },
    getAllBookings: async (args, req, context) => {
        const response = await prisma.bookings.findMany({
            include: {
                user: true,
                Feedbacks: true
            }
        })
        return response
    },
    getBookingById: async (args, req, context) => {
        const response = await BookingServices.getBookingById(req)
        return response
    },
    getBookingsByUserId: async (args, req, context) => {
        const response = await BookingServices.getBookingsByUserId(req)
        return response
    },
    getFeedbacksByUserId: async (args, req, context) => {
        const response = await prisma.feedbacks.findMany({
            where: {
                userId: req.userId
            },
            include: {
                Booking: true,
                user: true
            }
        })
        return response
    },
    getFeedbacksByBookingId: async (args, req, context) => {
        const response = await prisma.feedbacks.findMany({
            where: {
                bookingId: req.bookingId
            },
            include: {
                Booking: true,
                user: true
            }
        })
        return response
    },
    getAllFeedbacks: async (args, req, context) => {
        const response = await prisma.feedbacks.findMany({
            include: {
                Booking: true,
                user: true
            }
        })
        return response
    },
}

module.exports = {
    Query,
}
