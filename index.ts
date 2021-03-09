import express from "express";
const app = express()

app.get("/", (req,res) => {
    res.send("HELLOW WORLD");
})

app.get("/test", (req,res) => {
    res.send("ini test");
})

const port = process.env.PORT || 9600;

app.listen(port, () => console.log(`APP LISTEN ON PORT ${port}`));