import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import entidadesRoutes from "./entidad";
import rolesRoutes from "./rol";
import motivoDesvinculacionRoutes from "./motivoDesvinculacion";
import usuarioRoutes from "./usuario";
import personaRoutes from "./persona";
import curriculoRoutes from "./curriculo";
import recomendacionRoutes from "./recomendacion";
import desvinculacionRoutes from "./desvinculacion";

const prisma = new PrismaClient();
const router = Router();

// módulo de entidades
entidadesRoutes(router, prisma);
rolesRoutes(router, prisma);
motivoDesvinculacionRoutes(router, prisma);
usuarioRoutes(router, prisma);
personaRoutes(router, prisma);
curriculoRoutes(router, prisma);
recomendacionRoutes(router, prisma);
desvinculacionRoutes(router, prisma);

export default router;
