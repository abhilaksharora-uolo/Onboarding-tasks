"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 1000;
app.use((0, cors_1.default)());
app.use("/", userRoutes_1.default);
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Backend not responding");
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});
