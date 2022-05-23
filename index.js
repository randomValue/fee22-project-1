import express from 'express';
import * as path from "path";

const __dirname = path.resolve();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './source/public')));



app.get("/:note/:some", (req, res) => {
    res.sendFile(path.join(__dirname, './source/public/index.html'))
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
