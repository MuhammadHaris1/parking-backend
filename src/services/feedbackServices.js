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

    async getBookingById(data) {
        const booking = await prisma.bookings.findUnique({
            where: { id: data.id },
        })
        if (!booking) return createError(401, 'Booking not exist')
        try {
            return booking
        } catch (error) {
            return createError(401, error)
        }
    },

    async getBookingsByUserId(data) {
        const booking = await prisma.bookings.findMany({
            where: { userId: data.userId },
        })
        if (!booking) return createError(401, 'Booking not exist')
        try {
            return booking
        } catch (error) {
            return createError(401, error)
        }
    },

    async userCancelBooking(data) {
        const booking = await prisma.bookings.findFirst({
            where: { userId: data.userId, id: data.bookingId },
        })
        if (!booking) return createError(401, 'user not created this booking')
        try {
            await prisma.bookings.update({
                where: {
                    id: data.bookingId
                },
                data: {
                    status: "CANCELED"
                }
            })
            const userBookings = await prisma.bookings.findMany({
                where: {
                    userId: data.userId
                }
            })
            return userBookings
        } catch (error) {
            return createError(401, error)
        }
    },

    async cancelBookingByAdmin(data) {
        const booking = await prisma.bookings.findFirst({
            where: { id: data.bookingId },
            include: {
                user: true
            }
        })
        if (!booking) return createError(401, 'Booking not exist')
        try {
            await prisma.bookings.update({
                where: {
                    id: data.bookingId
                },
                data: {
                    status: "CANCELED"
                }
            })
            const allBookings = await prisma.bookings.findMany({})
            return allBookings
        } catch (error) {
            return createError(401, error)
        }
    },

    async approvedBookingByAdmin(data) {
        const booking = await prisma.bookings.findFirst({
            where: { id: data.bookingId },
            include: {
                user: true
            }
        })
        if (!booking) return createError(401, 'Booking not exist')
        try {
            await prisma.bookings.update({
                where: {
                    id: data.bookingId
                },
                data: {
                    status: "APPROVED"
                }
            })
            sendMail(booking.user.email, "You booking approved by admin", `Your booked your parking at ${booking.bookingDateTime} for ${booking.bookingHours} hours`)
            const allBookings = await prisma.bookings.findMany({
                include: {
                    user: true
                }
            })
            return allBookings
        } catch (error) {
            return createError(401, error)
        }
    },

}

module.exports = FeedbackServices