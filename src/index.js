import * as boot from "./boot/index.js";
import * as server from "./boot/servers/index.js";
import router from "./app/apis/rest/index.js";
import express from "express";
import cors from "cors";

export async function start() {
  try {
    server.app.use(express.json());
    server.app.use(cors());
    server.app.use(router);

    await boot.start();
  } catch (error) {
    console.log("APP ERROR");
    console.trace(error);
  }
}

start();
