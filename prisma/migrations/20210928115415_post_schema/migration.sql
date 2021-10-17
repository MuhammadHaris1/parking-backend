-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "category" TEXT,
    "color" TEXT,
    "location" TEXT,
    "foundDate" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
