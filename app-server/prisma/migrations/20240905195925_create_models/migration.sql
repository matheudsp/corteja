-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ativo', 'Inativo');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('Servico', 'Salao');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_path" TEXT DEFAULT '/uploads/default-avatar.png',
    "phone" TEXT NOT NULL DEFAULT '',
    "status" "Status" NOT NULL DEFAULT 'Ativo',

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salon" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT '',
    "geoCoordenadas" DOUBLE PRECISION[],

    CONSTRAINT "salon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Brasil',

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_path" TEXT DEFAULT '/uploads/default-avatar.png',
    "status" "Status" NOT NULL DEFAULT 'Ativo',

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salonService" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "avatar_path" TEXT DEFAULT '/uploads/default-avatar.png',
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "recurrence" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'Ativo',

    CONSTRAINT "salonService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupon" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dateStart" TIMESTAMP(3),
    "dateEnd" TIMESTAMP(3),
    "code" TEXT NOT NULL,
    "quantityUse" INTEGER NOT NULL,
    "remainingUses" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "salonId" TEXT NOT NULL,

    CONSTRAINT "coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "costumerId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "couponId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serviceRendered" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "days" INTEGER[],
    "hourStart" TIMESTAMP(3) NOT NULL,
    "hourEnd" TIMESTAMP(3) NOT NULL,
    "salonId" TEXT NOT NULL,

    CONSTRAINT "serviceRendered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee_SalonService" (
    "employeeId" TEXT NOT NULL,
    "salonServiceId" TEXT NOT NULL,

    CONSTRAINT "Employee_SalonService_pkey" PRIMARY KEY ("employeeId","salonServiceId")
);

-- CreateTable
CREATE TABLE "ServiceRendered_SalonService" (
    "serviceRenderedId" TEXT NOT NULL,
    "salonServiceId" TEXT NOT NULL,

    CONSTRAINT "ServiceRendered_SalonService_pkey" PRIMARY KEY ("salonServiceId","serviceRenderedId")
);

-- CreateTable
CREATE TABLE "ServiceRendered_Employees" (
    "serviceRenderedId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "ServiceRendered_Employees_pkey" PRIMARY KEY ("serviceRenderedId","employeeId")
);

-- CreateTable
CREATE TABLE "Customer_Salon" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "costumerId" TEXT NOT NULL,

    CONSTRAINT "Customer_Salon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "salon_name_key" ON "salon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "salon_email_key" ON "salon"("email");

-- CreateIndex
CREATE UNIQUE INDEX "address_salonId_key" ON "address"("salonId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_Salon_costumerId_salonId_key" ON "Customer_Salon"("costumerId", "salonId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salonService" ADD CONSTRAINT "salonService_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon" ADD CONSTRAINT "coupon_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "salonService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "serviceRendered" ADD CONSTRAINT "serviceRendered_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_SalonService" ADD CONSTRAINT "Employee_SalonService_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_SalonService" ADD CONSTRAINT "Employee_SalonService_salonServiceId_fkey" FOREIGN KEY ("salonServiceId") REFERENCES "salonService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRendered_SalonService" ADD CONSTRAINT "ServiceRendered_SalonService_serviceRenderedId_fkey" FOREIGN KEY ("serviceRenderedId") REFERENCES "serviceRendered"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRendered_SalonService" ADD CONSTRAINT "ServiceRendered_SalonService_salonServiceId_fkey" FOREIGN KEY ("salonServiceId") REFERENCES "salonService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRendered_Employees" ADD CONSTRAINT "ServiceRendered_Employees_serviceRenderedId_fkey" FOREIGN KEY ("serviceRenderedId") REFERENCES "serviceRendered"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceRendered_Employees" ADD CONSTRAINT "ServiceRendered_Employees_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Salon" ADD CONSTRAINT "Customer_Salon_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Salon" ADD CONSTRAINT "Customer_Salon_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
