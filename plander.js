var game = new Phaser.Game(800, 600, Phaser.AUTO, 'play', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.image("background", "images/2.jpg");
    game.load.image("pad", "images/pad.png");
    game.load.spritesheet("lander0", "images/lander.png", 80, 79, 4);
}

function create() {
    position = game.rnd.integerInRange(0, 700);
    background = game.add.tileSprite(0, 0, 800, 600, "background");
    pad = game.add.sprite(position, 580, "pad");
    craft = game.add.sprite(350, 0, "lander0", 0);
    game.physics.startSystem(craft, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(craft);
    game.physics.arcade.gravity.y = 18;
    velocity = game.add.text(20, 20, "", {
        font: "12px Arial",
        fill: "#ffffff",
    });
    distance = game.add.text(20, 35, "", {
        font: "12px Arial",
        fill: "#ffffff",
    });
    fuel = game.add.text(20, 50, "", {
        font: "12px Arial",
        fill: "#ffffff",
    });
    landed = game.add.text(300, 40, "", {
        font: "24px Arial",
        fill: "#ffffff",
    });
    tank = 100;
}

function update() {
    if (craft.body.position.y < 531 && tank > 0) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.H)) {
            craft.body.acceleration.y -= 1;
            craft.frame = 1;
            tank -= 0.1;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.K)) {
            craft.body.acceleration.x += 0.9;
            craft.frame = 2;
            tank -= 0.08;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            craft.body.acceleration.x -= 0.9;
            craft.frame = 3;
            tank -= 0.08;
        } else {
            craft.body.acceleration.y = 0;
            craft.body.acceleration.x = 0;
            craft.frame = 0;
        }
    } else if (craft.body.position.y < 531 && tank <= 0) {
        craft.body.acceleration.y = 18;
        craft.frame = 0;
    } else if (craft.body.position.y >= 531 && tank > 0) {
        craft.body.velocity.x = 0;
        craft.frame = 0;
        if (craft.body.position.x >= (position - 10) && craft.body.position.x <= (position + 30) && craft.body.velocity.y < 20) {
            landed.setText("Safe Landing");
        } else
            landed.setText("Crashed");
    }
}

function render() {
    velocity.setText("Velocity: " + craft.body.velocity.y.toFixed(2));
    distance.setText("Distance: " + (531 - craft.body.position.y.toFixed(0)));
    fuel.setText("Fuel: " + tank.toFixed(0));
}