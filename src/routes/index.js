const { Router } = require("express");

const usersRoutes = require("./users.routes");
const tagsRouter = require("./tags.routes");
const notesRouter = require("./notes.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;
