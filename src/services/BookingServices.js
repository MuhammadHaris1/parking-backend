const { prisma } = require("../database.js");
// import { Bookings } from '@prisma/client'
require('dotenv').config();
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { sendMail } = require("../utils/mail.js");

const BookingServices = {
    async createBooking(data) {
        const stat = "CANCELED"
        try {
        const user = await prisma.user.findUnique({
            where: { id: data.userId },
        })
        if (!user) return createError(401, 'User not exist')

        // const booking = await prisma.$queryRaw`SELECT * FROM "Bookings" WHERE "selectedSlotNo" = ${data.selectedSlotNo} AND "status" != ${stat} AND (date(${data.bookingStartDate}) BETWEEN "bookingStartDate" AND "bookingEndDate" OR ${data.bookingEndDate} BETWEEN "bookingStartDate" AND "bookingEndDate")`
        // const booking = await prisma.$queryRaw`SELECT * FROM bookings`


        if(booking) return createError(401, "This slot is booked at this time")
  
            const responseData = await prisma.bookings.create({
                data: data,
                include: {
                    user: true
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
            include: {
                user: true,
                Feedbacks: {
                    include: {
                        user: true
                    }
                }
            }
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
            sendMail(booking.user.email, "You booking approved by admin", `Your booked your parking on ${booking.bookingStartDate.toLocaleDateString()}`,"")
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

module.exports = BookingServices