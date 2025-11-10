import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import RecomendacionService from "../../services/recomendacion";
import RecomendacionModel from "../../models/recomendacion";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const recomendacionService = new RecomendacionService(
    new RecomendacionModel(prisma)
  );

  app.use("/recomendaciones", router);

  // todas las recomendaciones
  router.get(["", "/"], async (req, res, next) => {
    try {
      const recomendaciones = await recomendacionService.GetRecomendaciones();
      res.status(200).json(recomendaciones);
    } catch (error) {
      next(error);
    }
  });

  // recomendación por ID
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const recomendacion = await recomendacionService.GetRecomendacion(
        Number(id)
      );
      res.status(200).json(recomendacion);
    } catch (error) {
      next(error);
    }
  });

  // GET de recomendaciones por persona
  router.get("/persona/:id_persona", async (req, res, next) => {
    try {
      const { id_persona } = req.params;
      const recomendaciones = await prisma.recomendacion.findMany({
        where: { Id_Persona: Number(id_persona) },
        include: { entidad: true, persona: true },
      });
      res.status(200).json(recomendaciones);
    } catch (error) {
      next(error);
    }
  });

  // crear recomendación
  router.post(["", "/"], async (req, res, next) => {
    try {
      const data = req.body;
      const nuevaRecomendacion = await recomendacionService.NewRecomendacion({
        Activo: data.Activo ?? true,
        Perfil_Profesional: data.Perfil_Profesional,
        Persona_Recomienda: data.Persona_Recomienda,
        Email_Recomienda: data.Email_Recomienda,
        Telefono_Recomienda: data.Telefono_Recomienda,
        persona: { connect: { Id_Persona: data.Id_Persona } },
        entidad: { connect: { Id_Entidad: data.Id_Entidad } },
        usuario: { connect: { Id_Usuario: data.Id_Usuario } },
      });
      res.status(201).json(nuevaRecomendacion);
    } catch (error) {
      next(error);
    }
  });

  // actualizar recomendación
  router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = req.body;
      const recomendacion = await recomendacionService.UpdateRecomendacion(
        {
          Activo: data.Activo,
          Perfil_Profesional: data.Perfil_Profesional,
          Persona_Recomienda: data.Persona_Recomienda,
          Email_Recomienda: data.Email_Recomienda,
          Telefono_Recomienda: data.Telefono_Recomienda,
          persona: { connect: { Id_Persona: data.Id_Persona } },
          entidad: { connect: { Id_Entidad: data.Id_Entidad } },
        },
        Number(id)
      );
      res.status(200).json(recomendacion);
    } catch (error) {
      next(error);
    }
  });

  // eliminar recomendación
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const recomendacion = await recomendacionService.DeleteRecomendacion(
        Number(id)
      );
      res.status(200).json(recomendacion);
    } catch (error) {
      next(error);
    }
  });

  // traerse todas las recomendaciones de una persona
  router.get("/persona/:id_persona", async (req, res, next) => {
    try {
      const { id_persona } = req.params;
      const recomendaciones = await prisma.recomendacion.findMany({
        where: { Id_Persona: Number(id_persona) },
        include: {
          entidad: true,
          persona: true,
        },
      });
      res.status(200).json(recomendaciones);
    } catch (error) {
      next(error);
    }
  });
};
