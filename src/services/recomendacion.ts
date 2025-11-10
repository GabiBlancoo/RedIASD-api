import { Prisma } from "@prisma/client";
import RecomendacionModel from "../models/recomendacion";
import Boom from "@hapi/boom";

export default class RecomendacionService {
  recomendacionModel: RecomendacionModel;

  constructor(recomendacionModel: RecomendacionModel) {
    this.recomendacionModel = recomendacionModel;
  }

  public async GetRecomendaciones() {
    return await this.recomendacionModel.GetAll();
  }

  public async GetRecomendacion(id: number) {
    const recomendacion = await this.recomendacionModel.GetById(id);
    if (recomendacion) return recomendacion;
    throw Boom.notFound("Recomendación no encontrada");
  }

  public async NewRecomendacion(data: Prisma.RecomendacionCreateInput) {
    return await this.recomendacionModel.Create(data);
  }

  public async DeleteRecomendacion(Id_Recomendacion: number) {
    return await this.recomendacionModel.Delete(Id_Recomendacion);
  }

  public async UpdateRecomendacion(
    data: Prisma.RecomendacionUpdateInput,
    Id_Recomendacion: number
  ) {
    return await this.recomendacionModel.Update(data, Id_Recomendacion);
  }
}
