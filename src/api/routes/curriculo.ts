import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import CurriculoService from "../../services/curriculo";
import CurriculoModel from "../../models/curriculo";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const curriculoService = new CurriculoService(new CurriculoModel(prisma));

  app.use("/curriculos", router);

  // GET todos los currículos
  router.get(["", "/"], async (req, res, next) => {
    try {
      const curriculos = await curriculoService.GetCurriculos();
      res.status(200).json(curriculos);
    } catch (error) {
      next(error);
    }
  });

  // GET currículo por ID
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const curriculo = await curriculoService.GetCurriculo(Number(id));
      res.status(200).json(curriculo);
    } catch (error) {
      next(error);
    }
  });

  // POST crear currículo
  router.post(["", "/"], async (req, res, next) => {
    try {
      const data = req.body;
      const nuevoCurriculo = await curriculoService.NewCurriculo({
        Profesion: data.Profesion,
        Experiencia: data.Experiencia,
        Adjunto_CV: data.Adjunto_CV,
        persona: { connect: { Id_Persona: data.Id_Persona } },
      });
      res.status(201).json(nuevoCurriculo);
    } catch (error) {
      next(error);
    }
  });

  // PUT actualizar currículo
  router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const data = req.body;
      const curriculo = await curriculoService.UpdateCurriculo(
        {
          Profesion: data.Profesion,
          Experiencia: data.Experiencia,
          Adjunto_CV: data.Adjunto_CV,
          persona: { connect: { Id_Persona: data.Id_Persona } },
        },
        Number(id)
      );
      res.status(200).json(curriculo);
    } catch (error) {
      next(error);
    }
  });

  // DELETE eliminar currículo
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const curriculo = await curriculoService.DeleteCurriculo(Number(id));
      res.status(200).json(curriculo);
    } catch (error) {
      next(error);
    }
  });
};
