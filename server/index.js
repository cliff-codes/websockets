import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8000;
const app = express();
app.use(express.static(path.join(__dirname, "public")));


const httpSever = createServer(app);

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

const io = new Server(expressServer, {
    cors: {
        origin: "*" 
    }    
});

io.on("connection", (socket) => {
    console.log("a user connected " + socket.id);
    
    //upon connection -only to user
    socket.emit("message", "Welcome to Chat App");

    //let everone know that a new user has joined
    socket.broadcast.emit("message", `${socket.id.substring(0,5)} has joined the chat`);
    
    //listen for a message event
    socket.on("message", (msg) => {
        console.log("message received: " + msg);
        io.emit("message", `${socket.id.substring(0,5)
        }: ${msg}`);
    });

    //when a user disconnects
    socket.on("disconnect", () => {
        io.emit("message", `${socket.id.substring(0,5)} has left the chat`);
    });

    //listen for activity event
    socket.on("activity", (data) => {
        socket.broadcast.emit("activity", data);
    });
});



