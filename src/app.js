import express from "express";
import cors from "cors";


// instance of express

const app = express();


// configs

app.use(cors());
app.use(express.json());


// global variables

const tweets = [];
const users = [];


// GET functions

app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);

    if (!page || page < 0) {
        return res.status(400).send("Informe uma página válida!");
    }

    const lastPaginatedTweets = tweets.slice(page * 10 - 10, page * 10);
    const tweetsWithAvatar = lastPaginatedTweets.map(
        tweet => {
            const tweetUser = users.find(user => user.username === tweet.username);

            return {
                ...tweetUser,
                tweet: tweet.tweet
            };
        }
    );

    res.send(tweetsWithAvatar);
});

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    const tweetUser = users.find(user => user.username === username);
    const userTweets = tweets.filter(tweet => tweet.username === username);

    const tweetsWithAvatar = userTweets.map(
        tweet => {
            return {
                ...tweetUser,
                tweet: tweet.tweet
            };
        }
    );

    res.send(tweetsWithAvatar);
});


// POST functions

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (username === undefined || avatar === undefined) {
        return res.status(422).send("Todos os campos são obrigatórios!");
    }

    const validURL = (url) => {
        let test;
    
        try {
            test = new URL(url);
        } catch (_) {
            return false;
        }
    
        return test.protocol === "http:" || test.protocol === "https:";
    }

    if (validUsername(username) && validURL(avatar)) {
        users.push(req.body);

        return res.status(201).send("OK");
    }
    
    res.sendStatus(400);
});

app.post("/tweets", (req, res) => {
    const username = req.headers.user;
    const { tweet } = req.body;

    if (username === undefined || tweet === undefined) {
        return res.status(422).send("Todos os campos são obrigatórios!");
    }

    if (validUsername(username) && typeof tweet === "string" && tweet.trim() !== "") {
        tweets.unshift(
            {
                username,
                tweet
            }
        );

        return res.status(201).send("OK");
    }

    res.sendStatus(400);
}); 


// auxiliary function, allows only strings of letters, numbers or underscores
// (empty string also returns false)

function validUsername(username) {
    return /^\w+$/.test(username) && typeof username === "string";
}


// starts the server

app.listen(5000, () => console.log(`Server running in port: 5000`));
