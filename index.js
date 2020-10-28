const express = require('express');

const postsRouter = require("./posts/posts-router");
const commentsRouter = require("./comments/comments-router");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
    <h1>Test header</h1>
    <p>Post info</p>
    `)
});

server.use("/api/posts", postsRouter);
server.use("/api/comments", commentsRouter);

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})

