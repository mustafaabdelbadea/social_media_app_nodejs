import clc from "cli-color";
import express from "express";

export const app = express();

export let server;

export async function start() {
  server = await app.listen(process.env.PORT, () => {
    console.log(
      clc.green.bold(
        `Server Started on Port (${process.env.PORT}). successfully \\O/`
      )
    );
  });
}
