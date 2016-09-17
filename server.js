var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});

app.listen(process.env.PORT || 8888);

app.use(express.static("public"));

var jokes=[{setup:"哪一位诗人有写关于中秋节的诗?",punchline:"李白"},{setup:"嫦娥到了月亮后，仙丹变成了什么？",punchline:"玉兔"},{setup:"中秋节除了吃月饼，还会有什么食物？",punchline:"柚子"},{setup:"在古代月圆和月缺一般形容什么？",punchline:"悲欢离合"},{setup:"在中秋节， 吃月饼的习俗是在多少年前开始的？",punchline:"650年前"},{setup:"嫦娥为什么会飞到月亮上去？",punchline:"她吞下后羿留下的仙丹"},{setup:"吃月饼的意义是什么?",punchline:"团圆"},{setup:"按照传统，中秋节起源于?",punchline:"汉朝"},{setup:"中秋节又称为?",punchline:"月夕"},{setup:"后羿是从谁得到仙丹的?",punchline:"西王母"}];

app.route("/jokes").get(function(req,res,next){
	randomJokeIndex = Math.floor(Math.random()*jokes.length);

	jokes[randomJokeIndex].id = randomJokeIndex;

	res.send(jokes[randomJokeIndex]);
});

app.post('/upvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes++;

    res.send(jokes[jokeIndex]);
});

app.post('/downvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes--;

    res.send(jokes[jokeIndex]);
});
