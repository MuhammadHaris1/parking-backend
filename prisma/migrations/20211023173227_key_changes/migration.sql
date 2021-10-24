/*
  Warnings:

  - You are about to drop the column `bookingDateTime` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `bookingHours` on the `Bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "bookingDateTime",
DROP COLUMN "bookingHours",
ADD COLUMN     "bookingEndDate" TIMESTAMP(3),
ADD COLUMN     "bookingStartDate" TIMESTAMP(3);
