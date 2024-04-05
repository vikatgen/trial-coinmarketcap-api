import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import CMC_API from "./services/CMCApi.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        optionsSuccessStatus: 200,
    })
);

app.get("/", (request, response) => {
    response.send({
        message: "Teretulemast minu backendi",
    });
});

app.get("/cryptocurrency/categories", async (request, response) => {
    const categoryResponse = await CMC_API.get("/v1/cryptocurrency/categories");

    if (!categoryResponse) {
        response.status(404).send({
            message: "Kategooriaid ei leitud. Hoia FIATis.",
        });
    }

    response.status(200).json(categoryResponse);
});

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
