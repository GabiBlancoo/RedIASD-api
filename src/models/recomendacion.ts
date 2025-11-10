import { PrismaClient, Prisma } from "@prisma/client";

export default class RecomendacionModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.recomendacion.findMany({
      include: {
        persona: true,
        entidad: true,
      },
    });
  }

  public async GetById(Id_Recomendacion: number) {
    return await this.prisma.recomendacion.findFirst({
      where: { Id_Recomendacion },
      include: {
        persona: true,
        entidad: true,
      },
    });
  }

  public async Create(data: Prisma.RecomendacionCreateInput) {
    return await this.prisma.recomendacion.create({
      data,
      include: {
        persona: true,
        entidad: true,
      },
    });
  }

  public async Delete(Id_Recomendacion: number) {
    return await this.prisma.recomendacion.delete({
      where: { Id_Recomendacion },
    });
  }

  public async Update(
    data: Prisma.RecomendacionUpdateInput,
    Id_Recomendacion: number
  ) {
    return await this.prisma.recomendacion.update({
      where: { Id_Recomendacion },
      data,
      include: {
        persona: true,
        entidad: true,
      },
    });
  }
}
