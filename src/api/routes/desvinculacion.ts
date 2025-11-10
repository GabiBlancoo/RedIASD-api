import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import DesvinculacionService from "../../services/desvinculacion";
import DesvinculacionModel from "../../models/desvinculacion";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const desvService = new DesvinculacionService(
    new DesvinculacionModel(prisma)
  );
  app.use("/desvinculaciones", router);

  // GET todas
  router.get(["", "/"], async (req, res, next) => {
    try {
      const desv = await desvService.GetDesvinculaciones();
      res.status(200).json(desv);
    } catch (error) {
      next(error);
    }
  });

  // GET por ID
  router.get("/:id", async (req, res, next) => {
    try {
      const desv = await desvService.GetDesvinculacion(Number(req.params.id));
      res.status(200).json(desv);
    } catch (error) {
      next(error);
    }
  });

  // GET desvinculaciones por entidad
  router.get("/entidad/:id_entidad", async (req, res, next) => {
    try {
      const { id_entidad } = req.params;
      const desvinculaciones = await prisma.desvinculacion.findMany({
        where: { Id_Entidad: Number(id_entidad) },
        include: { persona: true, motivo: true },
      });
      res.status(200).json(desvinculaciones);
    } catch (error) {
      next(error);
    }
  });

  // crear
  router.post(["", "/"], async (req, res, next) => {
    try {
      const data = req.body;
      const nuevaDesvinculacion = await desvService.NewDesvinculacion({
        Persona_Referencia: data.Persona_Referencia,
        Email_Referencia: data.Email_Referencia,
        Telefono_Referencia: data.Telefono_Referencia,
        persona: { connect: { Id_Persona: data.Id_Persona } },
        entidad: { connect: { Id_Entidad: data.Id_Entidad } },
        motivo: { connect: { Id_Motivo: data.Id_Motivo } },
      });
      res.status(201).json(nuevaDesvinculacion);
    } catch (error) {
      next(error);
    }
  });

  // actualizar
  router.put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const desv = await desvService.UpdateDesvinculacion(
        {
          Persona_Referencia: data.Persona_Referencia,
          Email_Referencia: data.Email_Referencia,
          Telefono_Referencia: data.Telefono_Referencia,
          persona: { connect: { Id_Persona: data.Id_Persona } },
          entidad: { connect: { Id_Entidad: data.Id_Entidad } },
          motivo: { connect: { Id_Motivo: data.Id_Motivo } },
        },
        Number(id)
      );
      res.status(200).json(desv);
    } catch (error) {
      next(error);
    }
  });

  // eliminar
  router.delete("/:id", async (req, res, next) => {
    try {
      const desv = await desvService.DeleteDesvinculacion(
        Number(req.params.id)
      );
      res.status(200).json(desv);
    } catch (error) {
      next(error);
    }
  });

  // traerse todas las desvinculaciones de una entidad
  router.get("/entidad/:id_entidad", async (req, res, next) => {
    try {
      const { id_entidad } = req.params;
      const desvinculaciones = await prisma.desvinculacion.findMany({
        where: { Id_Entidad: Number(id_entidad) },
        include: {
          persona: true,
          motivo: true,
          entidad: true,
        },
      });
      res.status(200).json(desvinculaciones);
    } catch (error) {
      next(error);
    }
  });
};
