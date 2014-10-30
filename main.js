var clapSound = new buzz.sound("sounds/clap", {
    formats: ["ogg", "mp3"]
});
var failSound = new buzz.sound("sounds/fail", {
    formats: ["ogg", "mp3"]
});

var bound = false;

function bindJavascript() {
    var pjs = Processing.getInstanceById("play");
    if (pjs != null) {
        pjs.bindJavascript(this);
        bound = true;
    }
    if (!bound) {
        setTimeout(bindJavascript, 250);
    }
}
bindJavascript();

function clap() {
    clapSound.play();
}

function fail() {
    failSound.play();
}