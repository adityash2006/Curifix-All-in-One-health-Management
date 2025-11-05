import { Server } from "socket.io";

let messages = {};   // { roomId: [ { sender, data, socketId, ts }, ... ] }
let timeOnline = {}; // { socketId: Date }

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // dev only — restrict in prod
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // record connect time
    timeOnline[socket.id] = new Date();

    // join-call: client asks to join a "room" (path)
    socket.on("join-call", (path) => {
      if (!path) return;

      // let socket.io manage rooms
      socket.join(path);

      // notify everyone in the room (including the joiner if you want)
      // we usually notify others that someone joined
      socket.to(path).emit("user-joined", socket.id, Array.from(io.sockets.adapter.rooms.get(path) || []));

      // send chat history (if any) to newly-joined socket
      if (messages[path] && messages[path].length > 0) {
        for (const m of messages[path]) {
          socket.emit("chat-message", m.data, m.sender, m.socketId, m.ts);
        }
      }
    });

    // signalling relay (peer-to-peer)
    socket.on("signal", (toId, payload) => {
      if (!toId) return;
      io.to(toId).emit("signal", socket.id, payload);
    });

    // chat message: store + broadcast to room(s) the socket is in
    socket.on("chat-message", (data, sender) => {
      // find rooms this socket is in (Socket.IO keeps a Set)
      // note: socket.rooms includes the socket.id itself plus rooms joined
      const rooms = [...socket.rooms].filter((r) => r !== socket.id);

      if (rooms.length === 0) return; // not in any "call" room

      // assume single room per socket for your app; if multiple, broadcast to all
      const room = rooms[0];

      messages[room] ??= [];
      const msg = {
        sender,
        data,
        socketId: socket.id,
        ts: new Date().toISOString(),
      };
      messages[room].push(msg);

      // broadcast to everyone in room (including sender if you want)
      io.to(room).emit("chat-message", data, sender, socket.id, msg.ts);
    });

    socket.on("disconnect", () => {
      // compute time online (ms)
      const start = timeOnline[socket.id];
      const durationMs = start ? (new Date() - start) : 0;
      delete timeOnline[socket.id];

      // notify all rooms this socket was in
      const rooms = [...socket.rooms].filter((r) => r !== socket.id);

      for (const room of rooms) {
        // let Socket.IO remove automatically when socket disconnects
        // just notify others
        socket.to(room).emit("user-left", socket.id, { durationMs });

        // optionally, cleanup server-side room state (if you were keeping per-room arrays)
        // Since we're using socket.io rooms, there's no manual list to remove from
      }
    });
  });

  return io;
};
