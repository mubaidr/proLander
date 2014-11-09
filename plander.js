var game = new Phaser.Game(800, 600, Phaser.AUTO, 'play', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.image("background", "images/2.jpg");
    game.load.spritesheet("lander0", "images/lander.png", 80, 79, 4);
    game.load.image("base", "images/base.png");
    game.load.audio('clap', 'sounds/clap.ogg');
    game.load.audio('fail', 'sounds/fail.ogg');
}

function create() {
    r = game.rnd.integerInRange(0, 700);
    tank = 100;
    background = game.add.tileSprite(0, 0, 800, 600, "background");
    craft = game.add.sprite(350, 0, "lander0", 0);
    pad = game.add.sprite(r, 580, "base");
    win = game.add.audio('clap');
    lose = game.add.audio('fail');
    game.world.bounds.setTo(-810, -1000, 1820, 1614);
    game.physics.setBoundsToWorld();
    game.physics.startSystem(craft, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(craft);
    game.physics.arcade.gravity.y = 18;
    craft.body.collideWorldBounds = true;
    velocity = game.add.text(20, 20, "", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    distance = game.add.text(20, 35, "", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    fuel = game.add.text(20, 50, "", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    keyH = game.add.text(734, 20, "Down: H", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    keyK = game.add.text(745, 35, "Left: K", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    keyL = game.add.text(738, 50, "Right: L", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    keyR = game.add.text(727, 65, "Restart: R", {
        font: "12px Arial",
        fill: "#ffffff"
    });
    landed = game.add.text(336, 70, "", {
        font: "24px Arial",
        fill: "#ffffff",
        align: "center"
    });
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.R)) {
        game.state.start(game.state.current);
    }
    if (!craft.body.onFloor() && tank > 0) {
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
    } else if (!craft.body.onFloor() && tank <= 0) {
        craft.body.acceleration.y = 18;
        craft.frame = 0;
    } else if (craft.body.onFloor() && (tank > 0 || tank <= 0)) {
        craft.frame = 0;
        craft.body.moves = false;
        if (craft.body.position.x >= (r - 10) && craft.body.position.x <= (r + 30) && craft.body.velocity.y < 20) {
            win.play();
            landed.setText("Safe Landing");
        } else {
            lose.play();
            landed.setText("  Crashed   ");
        }
    }
}

function render() {
    velocity.setText("Velocity: " + craft.body.speed.toFixed(2));
    distance.setText("Distance: " + game.physics.arcade.distanceToXY(craft, (r + 15), 535).toFixed(2));
    fuel.setText("Fuel: " + tank.toFixed(0));
}