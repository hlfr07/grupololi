const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const enviarGMAIL = async (req, res) => {
  const {nombre,apellido, correo, token } = req.body;

  const CLIENT_ID = "977106642985-tk77d9dc3sdi102kcanj8uq1ikhpib1s.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URL = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04Mnn_b-yvQHmCgYIARAAGAQSNwF-L9IrzXHLpgXr9aQecDxi5KMSFqMFoO-RF3POHomgjzoMNzuzd4U6NMacL896320VQKOEIUw";

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });

  async function sendEmail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporte = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "hlfr46078@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const resetLink = "http://localhost:4000/token"; // Reemplaza esto con la URL real de reseteo de contraseña
/*
      const payload = {
        contra: "hotel",
      };

      const token = jwt.sign(payload, "hotel1801", { expiresIn: "1d" });*/
      const contentHTML = `
      <div style="max-width: 600px; margin: 50px auto; background-color:  #ffffff; border-radius: 25px; padding: 40px; box-shadow: 0 0 25px rgba(0, 0, 0, 0.2); text-align: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h1 style="color: #ff6347; font-size: 36px; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);">¡HOLA ${nombre} ${apellido}!</h1>
      <h2 style="color: #ff6347; font-size: 28px; margin-top: 15px; font-weight: bold;">Bienvenido al Increíble Sistema</h2>
      <img style="display: block; margin: 30px auto; max-width: 100%; border-radius: 15px; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);" src="https://i.ibb.co/JRfZ883/image.png" alt="Logo del Hotel Hub">
      <p style="margin-bottom: 25px; color: #555; font-size: 18px; line-height: 1.5;">Guarda este <strong style="color: #ff6347;">Token</strong> como llave maestra para acceder a las APIS del Hotel HUB. Será tu pasaporte a un mundo de posibilidades.</p>
      <input style="width: 100%; padding: 18px; border-radius: 10px; border: 2px solid #ff6347; box-sizing: border-box; color: #333; font-size: 20px; text-align: center; outline: none; margin-bottom: 25px; background-color: #fff8f3;" type="text" value="${token}" readonly>
      <p style="margin-bottom: 30px; color: #555; font-size: 18px; line-height: 1.5;">Este token es más que un código, es tu acceso exclusivo a un mundo de servicios premium. ¡Aprovéchalo al máximo!</p>
      <h3 style="color: #ff6347; font-size: 22px; font-weight: bold;">¡Guarda muy bien este<strong style="color: #ff6347;"> TOKEN</strong> para desbloquear las maravillosas APIS!</h3>
  </div>
  
`;
      const mailOptions = {
        from: "hlfr46078@gmail.com",
        to: correo,
        subject: "TOKEN de autorización Hoteles",
        html: contentHTML,
      };

      const respuesta = await transporte.sendMail(mailOptions);
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const respuesta = await sendEmail();
    res.status(200).send("Correo enviado");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al enviar el correo");
  }
};

module.exports = enviarGMAIL;