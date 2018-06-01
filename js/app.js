// Enemies our player must avoid
var Enemy = function() {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x =+ this.speed * dt;
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

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-princess-girl.png'
}

Player.prototype.update = function(dt) {

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
