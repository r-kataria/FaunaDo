import { Client, fql, FaunaError } from "fauna";

export default function handler(req, res) {
  const client = new Client({
    secret: process.env.SERVER_FAUNA_KEY
  });

  client
    .query(fql`todo.create({list:[]})`)
    .then((e) => {
      res.status(200).json({ listid: e.data.id });
    })
    .catch((e) => res.status(500).json({ error: "db error", e: e }));
}
