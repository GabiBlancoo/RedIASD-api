import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import MotivoDesvinculacionService from "../../services/motivoDesvinculacion";
import MotivoDesvinculacionModel from "../../models/motivoDesvinculacion";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const motivoService = new MotivoDesvinculacionService(
    new MotivoDesvinculacionModel(prisma)
  );

  app.use("/motivos-desvinculacion", router);

  // todos los motivos
  router.get(["", "/"], async (req, res, next) => {
    try {
      const motivos = await motivoService.GetMotivos();
      res.status(200).json(motivos);
    } catch (error) {
      next(error);
    }
  });

  // por id
  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const motivo = await motivoService.GetMotivo(Number(id));
      res.status(200).json(motivo);
    } catch (error) {
      next(error);
    }
  });

  // crear motivo
  router.post(["", "/"], async (req, res, next) => {
    try {
      const nuevoMotivo = await motivoService.NewMotivo(req.body);
      res.status(201).json(nuevoMotivo);
    } catch (error) {
      next(error);
    }
  });

  // actualizar motivo
  router.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const motivo = await motivoService.UpdateMotivo(req.body, Number(id));
      res.status(200).json(motivo);
    } catch (error) {
      next(error);
    }
  });

  // eliminar motivo
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const motivo = await motivoService.DeleteMotivo(Number(id));
      res.status(200).json(motivo);
    } catch (error) {
      next(error);
    }
  });
};
