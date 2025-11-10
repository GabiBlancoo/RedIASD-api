import { PrismaClient, Prisma } from "@prisma/client";
import { Router } from "express";
import RolService from "../../services/rol";
import RolModel from "../../models/rol";
import Boom from "@hapi/boom";

const router = Router();

export default (app: Router, prisma: PrismaClient) => {
  const rolService = new RolService(new RolModel(prisma));

  app.use("/roles", router);

  router.get(["", "/"], async (req, res, next) => {
    try {
      let roles = await rolService.GetRoles();

      res.status(200).json(roles);
    } catch (error) {
      next(error);
    }
  });

  router.get(["", "/:id"], async (req, res, next) => {
    const { id } = req.params;
    try {
      let rol = await rolService.GetRol(Number(id));
      res.status(200).json(rol);
    } catch (error) {
      next(error);
    }
  });

  // router.delete(["", "/:id"], async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     let rol = await rolService.DeleteRol(Number(id));
  //     res.status(200).json(rol);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  // router.post(["", "/"], async (req, res, next) => {
  //   try {
  //     const nuevoRol = await rolService.NewRol(req.body);
  //     res.status(201).json(nuevoRol);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  // // con POST /api/roles/bulk se crean varios roles a la vez
  // router.post("/bulk", async (req, res, next) => {
  //   try {
  //     const nuevosRoles = await rolService.NewRoles(req.body);
  //     res.status(201).json(nuevosRoles);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  // router.put(["", "/:id"], async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const rolActualizado = await rolService.UpdateRol(req.body, Number(id));
  //     res.status(200).json(rolActualizado);
  //   } catch (error) {
  //     next(error);
  //   }
  // });
};
