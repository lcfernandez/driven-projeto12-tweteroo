import express from "express";
import cors from "cors";

import tweets from "./assets/tweets.js"
import users from "./assets/users.js"


// instance of express

const app = express();


// configs

app.use(cors());
app.use(express.json());


// GET function

app.get("/tweets", (req, res) => {
    const lastTweets = tweets.slice(-10).reverse();
    const tweetsWithAvatar = lastTweets.map(tweet => {
        const tweetUser = users.find(user => user.username === tweet.username);

        return {
            ...tweetUser,
            tweet: tweet.tweet
        };
    });

    res.send(tweetsWithAvatar);
});


// POST functions

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;

    if (username === undefined || avatar === undefined) {
        return res.status(422).send({message: "Todos os campos são obrigatórios!"});
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
        users.push({
            username,
            avatar
        });

        return res.send("OK");
    }
    
    res.sendStatus(400);
});

app.post("/tweets", (req, res) => {
    tweets.push(req.body);

    res.send("OK");
}); 


// auxiliary functions

// checks if it is a string and has only letters, numbers and underscore
// (empty string also returns false)
function validUsername(username) {
    return /^\w+$/.test(username) && typeof username === "string";
}


// starts the server

app.listen(5000, () => console.log(`Server running in port: 5000`));
