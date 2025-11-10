import EntidadModel from "../models/entidad";
import Boom, { expectationFailed } from "@hapi/boom";

export default class EntidadService {
  entidadModel: EntidadModel;

  constructor(entidadModel: EntidadModel) {
    this.entidadModel = entidadModel;
  }

  public async GetEntidades() {
    return await this.entidadModel.GetAll();
  }

  public async GetEntidad(id: number) {
    let entidad = await this.entidadModel.GetById(id);
    if (entidad) {
      return entidad;
    } else {
      throw Boom.notFound("Entidad not found");
    }
  }
}
