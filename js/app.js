// Enemies our player must avoid
var Enemy = function() {
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
    if (this.x > 510) {
      this.x = -50;
      this.speed = 100 + Math.floor(Math.random() * 300);
    }
// Defines collision between enemy and player
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
// In case of collision, player gets reset to starting position
        player.x = 202;
        player.y = 405,
    }
};

// Renders enemy into game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Determines player's x and y axis and image
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-princess-girl.png'
}

Player.prototype.update = function(dt) {

}

// Renders player into game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

// Allows for use of arrow keys
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
      this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
      this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
      this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
      this.y += 83;
    }
    if (this.y < 0) {
      setTimeout(function() {
        player.x = 202;
        player.y = 405;
      }, 500);
    }
}

// Array for all enemies
var allEnemies = [];

// Location of the 3 enemies on the y axis
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function(locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// Starting location of player
var player = new Player(202, 405);

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
