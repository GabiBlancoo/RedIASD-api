import { PrismaClient, Prisma } from "@prisma/client";

export default class CurriculoModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.curriculo.findMany({
      include: { persona: true },
    });
  }

  public async GetById(Id_Curriculo: number) {
    return await this.prisma.curriculo.findFirst({
      where: { Id_Curriculo },
      include: { persona: true },
    });
  }

  public async Create(data: Prisma.CurriculoCreateInput) {
    return await this.prisma.curriculo.create({
      data,
      include: { persona: true },
    });
  }

  public async Delete(Id_Curriculo: number) {
    return await this.prisma.curriculo.delete({
      where: { Id_Curriculo },
    });
  }

  public async Update(data: Prisma.CurriculoUpdateInput, Id_Curriculo: number) {
    return await this.prisma.curriculo.update({
      where: { Id_Curriculo },
      data,
      include: { persona: true },
    });
  }
}
