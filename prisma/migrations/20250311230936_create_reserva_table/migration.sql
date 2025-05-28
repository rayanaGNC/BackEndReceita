-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL,
    "numMesa" INTEGER NOT NULL,
    "dataRes" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nome" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);
