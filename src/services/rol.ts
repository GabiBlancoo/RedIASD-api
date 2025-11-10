import { Prisma } from "@prisma/client";
import RolModel from "../models/rol";
import Boom, { expectationFailed } from "@hapi/boom";

export default class RolService {
  rolModel: RolModel;

  constructor(rolModel: RolModel) {
    this.rolModel = rolModel;
  }

  public async GetRoles() {
    return await this.rolModel.GetAll();
  }

  public async GetRol(id: number) {
    let rol = await this.rolModel.GetById(id);

    if (rol) {
      return rol;
    } else {
      throw Boom.notFound("El Rol no existe");
    }
  }

  // no los voy a necesitar porque no se van a poder crear, eliminar ni modificar roles

  // public async NewRol(data: Prisma.RolCreateInput) {
  //   return await this.rolModel.Create(data);
  // }

  // public async NewRoles(data: Prisma.RolCreateManyInput[]) {
  //   return await this.rolModel.CreateMany(data);
  // }

  // public async DeleteRol(Id_Rol: number) {
  //   return await this.rolModel.Delete(Id_Rol);
  // }

  // public async UpdateRol(data: Prisma.RolCreateInput, Id_Rol: number) {
  //   return await this.rolModel.Update(data, Id_Rol);
  // }
}
