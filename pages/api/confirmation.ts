import { mailOptions, transporter } from "../../config/nodemailer";
import clientPromise from "../../lib/mongodb";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const authToken = Math.floor(100000 + Math.random() * 900000);
      const client = await clientPromise;
      const db = client.db("data");
      const users = await db.collection("userData").insertOne({
        dni: parseInt(data.dni),
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        password: data.password,
        phone: data.phone,
        codigo: authToken,
        confirmed: false,
      });
      await transporter.sendMail({
        ...mailOptions,
        to: data.email,
        subject: "Confirmación de correo electrónico",
        html: `<h1>Hola ${data.firstName} ${data.lastName}</h1>
        <p>Este es tu token ${authToken}</p>
        <p>Ingresa a este link para confirmar tu correo electrónico</p>
        <a target="_blank" href="${process.env.URL_PAGE}confirmar-registro/paso-1">Confirmar correo electrónico</a>
        `,
      });
      return res.status(200).json({ message: "Email sent" });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: "Error" });
    }
  } else if (req.method === "GET") {
    const { email } = req.query;
    const client = await clientPromise;
    const db = await client.db("data");
    const user = await db.collection("userData").findOne({ email });
    if (user) {
      return res.status(200).json({ codigo: user.codigo });
    }
  } else if (req.method === "PUT") {
    const { email } = req.body.params;
    const client = await clientPromise;
    const db = await client.db("data");
    const user = await db.collection("userData").findOne({ email });
    if (user) {
      await db
        .collection("userData")
        .updateOne({ email }, { $set: { confirmed: true } });
      return res.status(200).json({ user: user });
    }
  } else return res.status(400).json({ message: "Bad request" });
};

export default handler;
