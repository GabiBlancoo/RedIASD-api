import { PrismaClient, Prisma } from "@prisma/client";

export default class UsuarioModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.usuario.findMany({
      include: { entidad: true, rol: true },
    });
  }

  public async GetById(Id_Usuario: number) {
    return await this.prisma.usuario.findFirst({
      where: { Id_Usuario },
      include: { entidad: true, rol: true },
    });
  }

  public async Create(data: Prisma.UsuarioCreateInput) {
    return await this.prisma.usuario.create({
      data,
      include: { entidad: true, rol: true },
    });
  }

  public async Delete(Id_Usuario: number) {
    return await this.prisma.usuario.delete({
      where: { Id_Usuario },
    });
  }

  public async Update(data: Prisma.UsuarioUpdateInput, Id_Usuario: number) {
    return await this.prisma.usuario.update({
      where: { Id_Usuario },
      data,
      include: { entidad: true, rol: true },
    });
  }

  public async GetByEntidad(Id_Entidad: number) {
    return await this.prisma.usuario.findMany({
      where: { Id_Entidad },
      include: { entidad: true, rol: true },
    });
  }
}
