-- CreateTable
CREATE TABLE "Animal" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "fact" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Animal_id_key" ON "Animal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_name_key" ON "Animal"("name");
