import { create } from "domain";
import { Request, Response } from "express";
import connection from "../database/connection";

interface RequestBodyToCreate extends Request {
  body: {
    title: string;
    description: string;
    value: number;
  };
}

interface PageQuery {
  page?: number;
}

export default {
  async index(req: Request, res: Response) {
    const { page = 1 } = req.query as PageQuery;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset(5 * (page - 1))
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    res.header("X-Total-Count", count["count(*)"]);

    res.send(incidents);
  },

  async create(req: RequestBodyToCreate, res: Response) {
    const { description, title, value } = req.body;

    const ong_id = req.headers.authorization as string;

    const [id]: number[] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    res.send({ id });
  },

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const ong_id = req.headers.authorization as string;

    const incident: DataBase.Incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id)
      return res.status(401).send({ error: "Operation not permitted." });

    await connection("incidents")
      .where("id", id)
      .delete();

    res.status(204).send();
  }
};
