"use strict";
const log = document.getElementById("log");
const username = document.getElementById("name");
const message = document.getElementById("message");
const my_id = document.getElementById("my-id");
const your_id = document.getElementById("your-id");
const connect_btn = document.getElementById("connect");
const error_text = document.getElementById("error");

if (localStorage.username !== undefined) username.value = localStorage.username;
username.addEventListener("input", function (event) {
  localStorage.username = username.value;
});

const peer = new Peer();
peer.on("error", function (err) {
  error_text.textContent = `[${err.type}]: ${err.message}`;
});

peer.on("open", function (id) {
  my_id.value = id;
});

peer.on("connection", function (conn) {
  setupChatting(conn);
});

connect_btn.addEventListener("click", function (event) {
  let conn = peer.connect(your_id.value);
  setupChatting(conn);
});

function setupChatting(conn) {
  conn.on("open", function () {
    connect_btn.style.display = "none";

    // Receive messages
    conn.on("data", function (data) {
      log.value += data;
    });

    // Send messages
    message.addEventListener("keyup", function (event) {
      if (event.code == "Enter") {
        const entry = `${username.value}: ${message.value}\n`;

        log.value += entry;
        conn.send(entry);
      }
    });
  });
}
