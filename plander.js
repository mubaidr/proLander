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
    craft = game.add.sprite(350, 0, "lander0", 0);
    game.physics.startSystem(craft, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(craft);
    game.physics.arcade.gravity.y = 18;
    craft.body.collideWorldBounds = true;
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        craft.body.acceleration.y -= 1;
        craft.frame = 1;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        craft.body.acceleration.x += 0.9;
        craft.frame = 2;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        craft.body.acceleration.x -= 0.9;
        craft.frame = 3;
    } else {
        craft.body.acceleration.y = 0;
        craft.body.acceleration.x = 0;
        craft.frame = 0;
    }
}