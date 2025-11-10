import { Prisma } from "@prisma/client";
import UsuarioModel from "../models/usuario";
import Boom from "@hapi/boom";

export default class UsuarioService {
  usuarioModel: UsuarioModel;

  constructor(usuarioModel: UsuarioModel) {
    this.usuarioModel = usuarioModel;
  }

  public async GetUsuarios() {
    return await this.usuarioModel.GetAll();
  }

  public async GetUsuario(id: number) {
    const usuario = await this.usuarioModel.GetById(id);
    if (usuario) return usuario;
    throw Boom.notFound("Usuario no encontrado");
  }

  public async NewUsuario(data: Prisma.UsuarioCreateInput) {
    return await this.usuarioModel.Create(data);
  }

  public async DeleteUsuario(Id_Usuario: number) {
    return await this.usuarioModel.Delete(Id_Usuario);
  }

  public async UpdateUsuario(
    data: Prisma.UsuarioUpdateInput,
    Id_Usuario: number
  ) {
    return await this.usuarioModel.Update(data, Id_Usuario);
  }

  public async GetUsuariosPorEntidad(idEntidad: number) {
    return await this.usuarioModel.GetByEntidad(idEntidad);
  }
}
