import { Prisma } from "@prisma/client";
import CurriculoModel from "../models/curriculo";
import Boom from "@hapi/boom";

export default class CurriculoService {
  curriculoModel: CurriculoModel;

  constructor(curriculoModel: CurriculoModel) {
    this.curriculoModel = curriculoModel;
  }

  public async GetCurriculos() {
    return await this.curriculoModel.GetAll();
  }

  public async GetCurriculo(id: number) {
    const curriculo = await this.curriculoModel.GetById(id);
    if (curriculo) return curriculo;
    throw Boom.notFound("Currículo no encontrado");
  }

  public async NewCurriculo(data: Prisma.CurriculoCreateInput) {
    return await this.curriculoModel.Create(data);
  }

  public async DeleteCurriculo(Id_Curriculo: number) {
    return await this.curriculoModel.Delete(Id_Curriculo);
  }

  public async UpdateCurriculo(
    data: Prisma.CurriculoUpdateInput,
    Id_Curriculo: number
  ) {
    return await this.curriculoModel.Update(data, Id_Curriculo);
  }
}
