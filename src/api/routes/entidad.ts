import { PrismaClient, Prisma } from "@prisma/client";
import { Router } from "express";
import EntidadService from "../../services/entidad";
import EntidadModel from "../../models/entidad";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const entidadService = new EntidadService(new EntidadModel(prisma));
  //   const escuelaService = new EscuelaService(new EscuelaModel(prisma))
  app.use("/entidades", router);

  router.get(["", "/"], async (req, res, next) => {
    try {
      let entidades = await entidadService.GetEntidades();

      res.status(200).json(entidades);
    } catch (error) {
      next(error);
    }
  });

  router.get(["", "/:id"], async (req, res, next) => {
    const { id } = req.params;
    try {
      let entidad = await entidadService.GetEntidad(Number(id));
      res.status(200).json(entidad);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const nuevaEntidad = await prisma.entidad.create({
        data: req.body,
      });
      res.status(201).json(nuevaEntidad);
    } catch (error) {
      next(error);
    }
  });

  // http://localhost:3000/api/entidades/1/usuarios para obtener los usuarios de la entidad con Id_Entidad = 1

  router.get("/:id/usuarios", async (req, res, next) => {
    const { id } = req.params;
    try {
      const entidad = await prisma.entidad.findUnique({
        where: { Id_Entidad: Number(id) },
        include: { usuarios: true },
      });

      if (!entidad) {
        return res.status(404).json({ error: "Entidad no encontrada" });
      }

      res.status(200).json(entidad.usuarios);
    } catch (error) {
      next(error);
    }
  });
};
