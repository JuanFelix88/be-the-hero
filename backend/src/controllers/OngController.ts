import { Router, Request, Response } from "express";
import crypto from "crypto";

import connection from "../database/connection";

interface RequestToCreateOng extends Request {
  body: {
    name: string;
    email: string;
    city: string;
    whatsapp: string;
    uf: string;
  };
}

export default {
  async index(req: Request, res: Response) {
    const ongs = await connection("ongs").select("*");

    res.send(ongs);
  },

  async create(req: RequestToCreateOng, res: Response) {
    const { city, email, name, uf, whatsapp } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("ongs").insert({
      id,
      city,
      email,
      name,
      uf,
      whatsapp
    });

    res.send({ id });
  }
};
