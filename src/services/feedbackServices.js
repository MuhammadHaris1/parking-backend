const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { sendMail } = require("../utils/mail.js");

const FeedbackServices = {
    async addFeedbackByUser(data) {
        const booking = await prisma.bookings.findFirst({
            where: {
                id: data.bookingId,
                userId: data.userId
            },
        })
        if (!booking) return createError(401, 'user not created this booking')
        const feedback = await prisma.feedbacks.findFirst({
            where: {
                bookingId: data.bookingId,
                userId: data.userId
            },
        })
        if(feedback) return createError(401, "user already add feedback in this booking")
        try {
            const responseData = await prisma.feedbacks.create({
                data: data,
                include: {
                    user: true,
                    Booking: true
                }
            })
            return responseData
        } catch (error) {
            return createError(401, error)
        }
    },
    async addFeedbackByAdmin(data) {
        const booking = await prisma.bookings.findFirst({
            where: {
                id: data.bookingId
            },
        })
        if (!booking) return createError(401, 'Booking Not Found')
        const feedback = await prisma.feedbacks.findFirst({
            where: {
                bookingId: data.bookingId,
                userId: data.userId
            },
        })
        if(feedback) return createError(401, "You already add feedback in this booking")
        try {
            const responseData = await prisma.feedbacks.create({
                data: data,
                include: {
                    user: true,
                    Booking: true
                }
            })
            return responseData
        } catch (error) {
            return createError(401, error)
        }
    },
}

module.exports = FeedbackServices