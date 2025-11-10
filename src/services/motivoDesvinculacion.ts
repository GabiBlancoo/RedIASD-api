import { Prisma } from "@prisma/client";
import MotivoDesvinculacionModel from "../models/motivoDesvinculacion";
import Boom from "@hapi/boom";

export default class MotivoDesvinculacionService {
  motivoModel: MotivoDesvinculacionModel;

  constructor(motivoModel: MotivoDesvinculacionModel) {
    this.motivoModel = motivoModel;
  }

  public async GetMotivos() {
    return await this.motivoModel.GetAll();
  }

  public async GetMotivo(id: number) {
    const motivo = await this.motivoModel.GetById(id);
    if (motivo) {
      return motivo;
    } else {
      throw Boom.notFound("Motivo de desvinculación no encontrado");
    }
  }

  public async NewMotivo(data: Prisma.Motivo_DesvinculacionCreateInput) {
    return await this.motivoModel.Create(data);
  }

  public async DeleteMotivo(Id_Motivo: number) {
    return await this.motivoModel.Delete(Id_Motivo);
  }

  public async UpdateMotivo(
    data: Prisma.Motivo_DesvinculacionCreateInput,
    Id_Motivo: number
  ) {
    return await this.motivoModel.Update(data, Id_Motivo);
  }
}
