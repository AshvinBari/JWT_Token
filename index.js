const express = require("express")
const jwt = require('jsonwebtoken')
const app = express();
const secretKey = "secretkey";

app.get("/", (req, resp) => {
    resp.json({
        message: "a sample api"
    })
})

app.post("/Login", (req, resp) => {
    const user = {
        id: 1,
        username: 'Ashu',
        phone: "9175390621"
    }
    jwt.sign({ user }, secretKey, { expiresIn: '1000s' }, (err, token) => {
        resp.json({
            token
        })
    })
})
app.post("/profile", verifyToken, (req, resp) => {
    jwt.verify(req.token, secretKey, (err, authdata) => {
        if (err) {
            resp.send({ result: "invalid token" })
        } else {
            resp.json({
                message: "profile accessed",
                authdata
            })
        }
    })
})
//verify the token
function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split("");
        const token = bearer[1];
        req.token = token;
        next();

    } else {
        resp.send({
            result: 'Token is not valid'
        })

    }
}
app.listen(5000, () => {
    console.log("app is running on 5000 port");
})

