// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Determines enemy's x and y axis, speed and image
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Updates enemy's position
Enemy.prototype.update = function(dt) {
// Multiplies the speed by the dt parameter on the x axis
    this.x =+ this.speed * dt;
// Ensures enemies reappear off canvas randomly at random speeds
    if (this.x > 550) {
      this.x = -100;
      this.speed = 100 + Math.floor(Math.random() * 512);
    }
// Defines collision between enemy and player
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
// In case of collision, player gets reset to starting position
        player.x = 200;
        player.y = 380;
    }
};

// Renders enemy into game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Determines player's x and y axis and image
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = 'images/char-princess-girl.png'
}

Player.prototype.update = function() {
    // Prevents player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Checks for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};

// Renders player into game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

// Allows for use of arrow keys
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Array for all enemies
var allEnemies = [];

// Location of the 3 enemies on the y axis
var enemyLocation = [60, 140, 220];

enemyLocation.forEach(function(locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// Starting location of player
var player = new Player(200, 380, 50);

// Key press listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
