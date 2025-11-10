import { PrismaClient, Prisma } from "@prisma/client";

export default class MotivoDesvinculacionModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.motivo_Desvinculacion.findMany({});
  }

  public async GetById(Id_Motivo: number) {
    return await this.prisma.motivo_Desvinculacion.findFirst({
      where: { Id_Motivo },
    });
  }

  public async Create(data: Prisma.Motivo_DesvinculacionCreateInput) {
    return await this.prisma.motivo_Desvinculacion.create({
      data,
    });
  }

  public async Delete(Id_Motivo: number) {
    return await this.prisma.motivo_Desvinculacion.delete({
      where: { Id_Motivo },
    });
  }

  public async Update(
    data: Prisma.Motivo_DesvinculacionCreateInput,
    Id_Motivo: number
  ) {
    return await this.prisma.motivo_Desvinculacion.update({
      where: { Id_Motivo },
      data,
    });
  }
}
