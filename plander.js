var game = new Phaser.Game(800, 600, Phaser.AUTO, 'play', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image("background", "images/2.jpg");
    game.load.spritesheet("lander0", "images/lander.png", 80, 79, 4);
}

function create() {
    background = game.add.tileSprite(0, 0, 800, 600, "background");
    craft = game.add.sprite(350, 0, "lander0");
    //craft.frame = 0;
}

function update() {

}