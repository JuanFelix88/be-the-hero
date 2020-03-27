import { Request, Response } from "express";
import connection from "../database/connection";

export default {
  async index(req: Request, res: Response) {
    const { page = 1 } = req.query;

    const ong_id = req.headers.authorization as string;

    const [count] = await connection("incidents")
      .where("ong_id", ong_id)
      .count();

    const incidents = await connection("incidents")
      .limit(5)
      .offset(5 * (page - 1))
      .where("ong_id", ong_id)
      .select("*");

    res.header("X-Total-Count", count["count(*)"]);

    res.send(incidents);
  }
};
