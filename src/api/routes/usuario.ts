import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import UsuarioService from "../../services/usuario";
import UsuarioModel from "../../models/usuario";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const usuarioService = new UsuarioService(new UsuarioModel(prisma));

  app.use("/usuarios", router);

  // todos los usuarios
  router.get(["", "/"], async (req, res, next) => {
    try {
      const usuarios = await usuarioService.GetUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  });

  // usuario por ID
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.GetUsuario(Number(id));
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  });

  // crear usuario
  router.post(["", "/"], async (req, res, next) => {
    try {
      const data = req.body;
      const nuevoUsuario = await usuarioService.NewUsuario({
        Nombre: data.Nombre,
        Apellido: data.Apellido,
        Email: data.Email,
        entidad: { connect: { Id_Entidad: data.Id_Entidad } },
        rol: { connect: { Id_Rol: data.Id_Rol } },
      });
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      next(error);
    }
  });

  // actualizar usuario
  router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = req.body;
      const usuario = await usuarioService.UpdateUsuario(
        {
          Nombre: data.Nombre,
          Apellido: data.Apellido,
          Email: data.Email,
          entidad: { connect: { Id_Entidad: data.Id_Entidad } },
          rol: { connect: { Id_Rol: data.Id_Rol } },
        },
        Number(id)
      );
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  });

  // eliminar usuario
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.DeleteUsuario(Number(id));
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  });

  // traerse todos los usuarios de una entidad
  router.get("/entidad/:id_entidad", async (req, res, next) => {
    try {
      const { id_entidad } = req.params;
      const usuarios = await prisma.usuario.findMany({
        where: { Id_Entidad: Number(id_entidad) },
        include: {
          entidad: true,
          rol: true,
        },
      });
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  });

  router.get("/entidad/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const usuarios = await usuarioService.GetUsuariosPorEntidad(Number(id));
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  });
};
