import { Prisma } from "@prisma/client";
import DesvinculacionModel from "../models/desvinculacion";
import Boom from "@hapi/boom";

export default class DesvinculacionService {
  desvinculacionModel: DesvinculacionModel;

  constructor(desvinculacionModel: DesvinculacionModel) {
    this.desvinculacionModel = desvinculacionModel;
  }

  public async GetDesvinculaciones() {
    return await this.desvinculacionModel.GetAll();
  }

  public async GetDesvinculacion(id: number) {
    const desv = await this.desvinculacionModel.GetById(id);
    if (desv) return desv;
    throw Boom.notFound("Desvinculación no encontrada");
  }

  public async NewDesvinculacion(data: Prisma.DesvinculacionCreateInput) {
    return await this.desvinculacionModel.Create(data);
  }

  public async DeleteDesvinculacion(Id_Desvinculacion: number) {
    return await this.desvinculacionModel.Delete(Id_Desvinculacion);
  }

  public async UpdateDesvinculacion(
    data: Prisma.DesvinculacionUpdateInput,
    Id_Desvinculacion: number
  ) {
    return await this.desvinculacionModel.Update(data, Id_Desvinculacion);
  }
}
