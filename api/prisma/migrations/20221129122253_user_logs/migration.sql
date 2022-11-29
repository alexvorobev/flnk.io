-- CreateEnum
CREATE TYPE "UserLogAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT');

-- CreateEnum
CREATE TYPE "UserLogActionEntity" AS ENUM ('LINK', 'USER');

-- CreateTable
CREATE TABLE "UserLog" (
    "id" SERIAL NOT NULL,
    "action" "UserLogAction" NOT NULL,
    "entity" "UserLogActionEntity" NOT NULL,
    "entityData" TEXT NOT NULL,
    "user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLog" ADD CONSTRAINT "UserLog_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
