import Peer from "peerjs";
import { test } from "./test";

console.log(test);

const peer = new Peer();
peer.on("error", function (err) {
    console.log(`[${err.type}]: ${err.message}`);
});

peer.on("open", function (id) {
    console.log(id);
});

peer.on("connection", function (conn) {
    console.log(conn.label);
});