import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cargando datos iniciales...");

  // ---------- ENTIDADES ----------
  const entidades = await prisma.entidad.createMany({
    data: [
      { Nombre: "Asociación Argentina del Norte" },
      { Nombre: "Asociación Argentina Central" },
      { Nombre: "Asociación Argentina del Sur" },
      { Nombre: "Unión Austral" },
      { Nombre: "Unión Argentina" },
    ],
  });
  console.log(`Entidades cargadas (${entidades.count})`);

  // ---------- ROLES ----------
  const roles = await prisma.rol.createMany({
    data: [
      { Nombre: "Administrador" },
      { Nombre: "Reclutador" },
      { Nombre: "Empleado" },
    ],
  });
  console.log(`Roles cargados (${roles.count})`);

  // ---------- USUARIOS ----------
  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        Nombre: "Gabriel",
        Apellido: "Blanco",
        Email: "gabiblanco1601@gmail.com",
        Id_Entidad: 1,
        Id_Rol: 1,
      },
      {
        Nombre: "Lucas",
        Apellido: "Sand",
        Email: "lucas.sand@iasd.org",
        Id_Entidad: 2,
        Id_Rol: 2,
      },
      {
        Nombre: "Sebastián",
        Apellido: "Pérez",
        Email: "sebastian.perez@iasd.org",
        Id_Entidad: 3,
        Id_Rol: 1,
      },
      {
        Nombre: "Damián",
        Apellido: "Frick",
        Email: "damian.frick@iasd.org",
        Id_Entidad: 4,
        Id_Rol: 2,
      },
    ],
  });
  console.log(`Usuarios cargados (${usuarios.count})`);

  // ---------- PERSONAS ----------
  const personas = await prisma.persona.createMany({
    data: [
      {
        Nombre: "Teo",
        Apellido: "Furlan",
        Dni: 40123456,
        Fecha_Nacimiento: new Date("1998-03-15"),
        Telefono: "1166543892",
        Email: "teo.furlan@example.com",
      },
      {
        Nombre: "Evelyn",
        Apellido: "Ernst",
        Dni: 38999123,
        Fecha_Nacimiento: new Date("1996-07-22"),
        Telefono: "1156784321",
        Email: "evelyn.ernst@example.com",
      },
      {
        Nombre: "Adriel",
        Apellido: "San Martín",
        Dni: 37888999,
        Fecha_Nacimiento: new Date("1994-11-02"),
        Telefono: "1164432299",
        Email: "adriel.sanmartin@example.com",
      },
    ],
  });
  console.log(`Personas cargadas (${personas.count})`);

  // ---------- CURRÍCULOS ----------
  const curriculos = await prisma.curriculo.createMany({
    data: [
      {
        Id_Persona: 1,
        Profesion: "Desarrollador Full Stack",
        Experiencia: "3 años en desarrollo web con Node.js y React",
        Adjunto_CV:
          "https://res.cloudinary.com/local-seek-map/image/upload/v1761328884/dtozvcximfs55exhkvcs.jpg",
      },
      {
        Id_Persona: 2,
        Profesion: "Diseñadora UX/UI",
        Experiencia: "2 años en diseño de interfaces en Figma",
        Adjunto_CV: null,
      },
    ],
  });
  console.log(`Currículos cargados (${curriculos.count})`);

  // ---------- MOTIVOS DE DESVINCULACIÓN ----------
  const motivos = await prisma.motivo_Desvinculacion.createMany({
    data: [
      { Nombre: "Renuncia voluntaria" },
      { Nombre: "Finalización de contrato" },
      { Nombre: "Reestructuración organizacional" },
    ],
  });
  console.log(`Motivos cargados (${motivos.count})`);

  // ---------- DESVINCULACIONES ----------
  const desvinculaciones = await prisma.desvinculacion.createMany({
    data: [
      {
        Id_Persona: 1,
        Id_Entidad: 2,
        Id_Motivo: 1,
        Persona_Referencia: "Lucas Sand",
        Email_Referencia: "lucas.sand@iasd.org",
        Telefono_Referencia: "1145678901",
      },
    ],
  });
  console.log(`Desvinculaciones cargadas (${desvinculaciones.count})`);

  // ---------- RECOMENDACIONES ----------
  const recomendaciones = await prisma.recomendacion.createMany({
    data: [
      {
        Id_Persona: 2,
        Id_Entidad: 1,
        Id_Usuario: 1,
        Fecha_Recomendacion: new Date("2023-10-01"),
        Activo: true,
        Perfil_Profesional:
          "Excelente trabajadora, con habilidades de liderazgo y comunicación.",
        Persona_Recomienda: "Gabriel Blanco",
        Email_Recomienda: "gabiblanco1601@gmail.com",
        Telefono_Recomienda: "1166543892",
      },
      {
        Id_Persona: 2,
        Id_Entidad: 3,
        Id_Usuario: 2,
        Fecha_Recomendacion: new Date(),
        Activo: true,
        Perfil_Profesional: "Destacada en trabajo en equipo y comunicación.",
        Persona_Recomienda: "Lucas Sand",
        Email_Recomienda: "lucas.sand@iasd.org",
        Telefono_Recomienda: "1177788899",
      },
    ],
  });
  console.log(`Recomendaciones cargadas (${recomendaciones.count})`);

  console.log("Seed completado correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
