import { PrismaClient, Prisma } from "@prisma/client";

export default class RolModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.rol.findMany({});
  }

  public async GetById(Id_Rol: number) {
    return await this.prisma.rol.findFirst({
      where: { Id_Rol: Id_Rol },
    });
  }

  // public async Create(data: Prisma.RolCreateInput) {
  //   const rol = await this.prisma.rol.create({
  //     data: data,
  //   });
  //   return rol;
  // }

  // public async CreateMany(data: Prisma.RolCreateManyInput[]) {
  //   return await this.prisma.rol.createMany({
  //     data,
  //   });
  // }

  // public async Delete(Id_Rol: number) {
  //   return await this.prisma.rol.delete({
  //     where: { Id_Rol: Id_Rol },
  //   });
  // }

  // public async Update(data: Prisma.RolCreateInput, Id_Rol: number) {
  //   return await this.prisma.rol.update({
  //     where: { Id_Rol: Id_Rol },
  //     data: data,
  //   });
  // }
}
