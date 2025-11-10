import { Prisma } from "@prisma/client";
import PersonaModel from "../models/persona";
import Boom from "@hapi/boom";

export default class PersonaService {
  personaModel: PersonaModel;

  constructor(personaModel: PersonaModel) {
    this.personaModel = personaModel;
  }

  public async GetPersonas() {
    return await this.personaModel.GetAll();
  }

  public async GetPersona(id: number) {
    const persona = await this.personaModel.GetById(id);
    if (persona) return persona;
    throw Boom.notFound("Persona no encontrada");
  }

  public async NewPersona(data: Prisma.PersonaCreateInput) {
    return await this.personaModel.Create(data);
  }

  public async DeletePersona(Id_Persona: number) {
    return await this.personaModel.Delete(Id_Persona);
  }

  public async UpdatePersona(
    data: Prisma.PersonaUpdateInput,
    Id_Persona: number
  ) {
    return await this.personaModel.Update(data, Id_Persona);
  }

  public async BuscarPersonas(filtro: string) {
    return await this.personaModel.BuscarPorNombreOEmail(filtro);
  }

  public async GetPersonasConRecomendaciones() {
    return await this.personaModel.GetConRecomendaciones();
  }
}
