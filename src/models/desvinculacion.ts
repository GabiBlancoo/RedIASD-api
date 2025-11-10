import { PrismaClient, Prisma } from "@prisma/client";

export default class DesvinculacionModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.desvinculacion.findMany({
      include: {
        persona: true,
        entidad: true,
        motivo: true,
      },
    });
  }

  public async GetById(Id_Desvinculacion: number) {
    return await this.prisma.desvinculacion.findFirst({
      where: { Id_Desvinculacion },
      include: {
        persona: true,
        entidad: true,
        motivo: true,
      },
    });
  }

  public async Create(data: Prisma.DesvinculacionCreateInput) {
    return await this.prisma.desvinculacion.create({
      data,
      include: {
        persona: true,
        entidad: true,
        motivo: true,
      },
    });
  }

  public async Delete(Id_Desvinculacion: number) {
    return await this.prisma.desvinculacion.delete({
      where: { Id_Desvinculacion },
    });
  }

  public async Update(
    data: Prisma.DesvinculacionUpdateInput,
    Id_Desvinculacion: number
  ) {
    return await this.prisma.desvinculacion.update({
      where: { Id_Desvinculacion },
      data,
      include: {
        persona: true,
        entidad: true,
        motivo: true,
      },
    });
  }
}
