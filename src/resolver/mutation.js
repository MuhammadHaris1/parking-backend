const { prisma } = require("../database.js");
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createError = require('http-errors');
const AuthServices = require("../services/authServices.js");
const BookingServices = require("../services/BookingServices");
const FeedbackServices = require("../services/feedbackServices.js");

const Mutation = {
  addUser: async (args, req) => {
    const response = await AuthServices.createUser(req)
    return response
  },
  changePassword: async (args, req) => {
    const response = await AuthServices.changePassword(req)
    return response
  },
  deleteUser: async (args, req) => {
    const response = await AuthServices.deleteUser(req)
    return response
  },
  verifyOtp: async (args, req) => {
    const response = await AuthServices.verifyOtp(req)
    return response
  },
  resendOtp: async (args, req) => {
    const response = await AuthServices.resendOtp(req)
    return response
  },
  addBooking: async (args, req) => {
    const response = await BookingServices.createBooking(req)
    return response
  },
  userCancelBooking: async (args, req) => {
    const response = await BookingServices.userCancelBooking(req)
    return response
  },
  cancelBookingByAdmin: async (args, req) => {
    const response = await BookingServices.cancelBookingByAdmin(req)
    return response
  },
  approveBookingByAdmin: async (args, req) => {
    const response = await BookingServices.approvedBookingByAdmin(req)
    return response
  },
  addFeedbackByUser: async (args, req) => {
    const response = await FeedbackServices.addFeedbackByUser(req)
    return response
  },
};

module.exports = {
  Mutation,
}

