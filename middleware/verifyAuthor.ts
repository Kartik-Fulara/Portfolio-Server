import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const verifyAuthor = async (req: Request, res: Response, next: any) => {
  const pass = req.headers.password;
  const hash_pass = process.env.HASH_PASSWORD || "none";
  console.log(pass);

  const isAuthor = bcrypt.compareSync(`${pass}`, `${hash_pass}`);
  if (isAuthor) {
    next();
  } else {
    res.redirect("/");
  }
};

export default verifyAuthor;
