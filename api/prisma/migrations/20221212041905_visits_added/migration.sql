-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "link" INTEGER NOT NULL,
    "visitor" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "ua" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "browserVersion" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "engineVersion" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "osVersion" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "deviceVendor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_uuid_key" ON "Visitor"("uuid");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_link_fkey" FOREIGN KEY ("link") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_visitor_fkey" FOREIGN KEY ("visitor") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
