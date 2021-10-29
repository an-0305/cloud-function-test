import * as functions from "firebase-functions";
import axios from "axios";
require("dotenv").config();

export const repository = functions.https.onRequest(
  async (request, response) => {
    await axios
      .post("https://api.github.com/user/repos", request.body, {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      })
      .then(() => {
        response.status(200).end();
      })
      .catch((error) => {
        response
          .status(error.response.status)
          .send(error.response.data.message);
      });
  }
);
