import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import http from 'http'

const app: Application = express()
const server: http.Server = http.createServer(app)
const PORT: number = Number(process.env.PORT) || 8080;


// Model
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(prompt: string) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

app.use(express.json())
app.use(cors({
    origin: "*",
})) /*
Allow from all origins
*/

app.get("/api/health", async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            health: "ok"
        })
    } catch (error: any) {
        res.status(500).json({
            health: "bad"
        })
    }
})

app.post("/api/getResponse", async (req: Request, res: Response) => {

    if (req.method === "POST") {

        const body: any = req.body;
        const prompt: string = body.prompt.toString();

        const response: string = await run(prompt);
        res.status(200).json({
            status: 'ok',
            response: response,
        });
    } else {
        res.status(500).json({
            error : 'Wrong HTTP Method'
        })
    }
})

server.listen(PORT, () => {
    console.log(`Listening on :${PORT}`);

})