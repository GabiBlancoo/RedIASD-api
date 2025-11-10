import { PrismaClient, Prisma } from "@prisma/client";

export default class PersonaModel {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async GetAll() {
    return await this.prisma.persona.findMany({
      include: {
        recomendaciones: true,
        desvinculaciones: true,
        curriculos: true,
      },
    });
  }

  public async GetById(Id_Persona: number) {
    return await this.prisma.persona.findFirst({
      where: { Id_Persona },
      include: {
        recomendaciones: {
          include: {
            entidad: true,
            usuario: {
              include: {
                entidad: true,
              },
            },
          },
        },
        desvinculaciones: true,
        curriculos: true,
      },
    });
  }

  public async Create(data: Prisma.PersonaCreateInput) {
    return await this.prisma.persona.create({
      data,
    });
  }

  public async Delete(Id_Persona: number) {
    return await this.prisma.persona.delete({
      where: { Id_Persona },
    });
  }

  public async Update(data: Prisma.PersonaUpdateInput, Id_Persona: number) {
    return await this.prisma.persona.update({
      where: { Id_Persona },
      data,
    });
  }

  public async BuscarPorNombreOEmail(filtro: string) {
    const lowerFiltro = filtro.toLowerCase();

    return await this.prisma.persona.findMany({
      where: {
        OR: [
          {
            Nombre: {
              contains: lowerFiltro,
            },
          },
          {
            Apellido: {
              contains: lowerFiltro,
            },
          },
          {
            Email: {
              contains: lowerFiltro,
            },
          },
        ],
      },
    });
  }

  public async GetConRecomendaciones() {
    return await this.prisma.persona.findMany({
      where: {
        recomendaciones: {
          some: { Activo: true },
        },
      },
      include: { recomendaciones: true },
    });
  }
}
