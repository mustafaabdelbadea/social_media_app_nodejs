import * as mongodb from './databases/index.js'
import * as app from "./servers/index.js";

export async function start() {
    await Promise.all([
        mongodb.start(),
        app.start(),
      ]);
}