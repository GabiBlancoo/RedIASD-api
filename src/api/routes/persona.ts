import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import PersonaService from "../../services/persona";
import PersonaModel from "../../models/persona";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const personaService = new PersonaService(new PersonaModel(prisma));

  app.use("/personas", router);

  // todas las personas
  router.get(["", "/"], async (req, res, next) => {
    try {
      const personas = await personaService.GetPersonas();
      res.status(200).json(personas);
    } catch (error) {
      next(error);
    }
  });

  // crear persona
  router.post(["", "/"], async (req, res, next) => {
    try {
      const nuevaPersona = await personaService.NewPersona(req.body);
      res.status(201).json(nuevaPersona);
    } catch (error) {
      next(error);
    }
  });

  // actualizar persona
  router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const persona = await personaService.UpdatePersona(req.body, Number(id));
      res.status(200).json(persona);
    } catch (error) {
      next(error);
    }
  });

  // eliminar persona
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const persona = await personaService.DeletePersona(Number(id));
      res.status(200).json(persona);
    } catch (error) {
      next(error);
    }
  });

  router.get("/buscar/:texto", async (req, res, next) => {
    const { texto } = req.params;
    const personas = await personaService.BuscarPersonas(texto);
    res.json(personas);
  });

  router.get("/con-recomendaciones", async (req, res, next) => {
    try {
      const personas = await personaService.GetPersonasConRecomendaciones();
      res.status(200).json(personas);
    } catch (error) {
      next(error);
    }
  });

  // persona por ID
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const persona = await personaService.GetPersona(Number(id));
      res.status(200).json(persona);
    } catch (error) {
      next(error);
    }
  });
};
