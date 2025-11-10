import { PrismaClient } from "@prisma/client";

export default class EntidadModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.entidad.findMany();
  }

  public async GetById(Id_Entidad: number) {
    return await this.prisma.entidad.findFirst({
      where: { Id_Entidad: Id_Entidad },
    });
  }
}
