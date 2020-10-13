// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];

    //BONUS
    this.bonuses = [];

    //for score
    this.scoreText = new Text(this.root, "15px", "15px");
    this.score = 0;

    this.isTimeout = false;
    // We add the background image to the game
    addBackground(this.root);
    //is player dead
    this.isDead = false;
    //is starfish caught
    this.isCaught = false;

    this.gameOver = new Text(this.root, 0, 0);

    this.restartButton = document.getElementById("restartGame");
    this.restartButton.style.position = "absolute";
    this.restartButton.style.color = "rgb(0, 26, 120)";
    this.restartButton.style.fontWeight = "bold";
    this.restartButton.style.textAlign = "center";
    this.restartButton.style.left = "130px";
    this.restartButton.style.top = "400px";
    this.restartButton.style.fontFamily = "'Bungee Shade', cursive";
    this.restartButton.style.fontSize = "2rem";
    this.restartButton.style.border = "1px solid white";
    this.restartButton.style.backgroundColor = "rgb(255, 255, 255, 0.6)";
    this.restartButton.style.borderRadius = "5px";
    this.restartButton.style.display = "none";
    this.restartButton.style.zIndex = "2001";

    this.restartButton.addEventListener("click", this.restart);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    //BONUS
    this.bonuses.forEach((bonus) => {
      bonus.update(timeDiff);
    });
    //

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    //BONUS
    this.bonuses = this.bonuses.filter((bonus) => {
      return !bonus.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies); //////continue creating enemies as each leaves the screen
      this.enemies.push(new Enemy(this.root, spot));
    }

    //BONUS
    while (this.bonuses.length < MAX_BONUS) {
      const spot = nextBonusSpot(this.bonuses);
      this.bonuses.push(new Bonus(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.restartButton.style.display = "block";
      this.lostGame();
      document.removeEventListener("keydown", keydownHandler);

      return;
    }
    /////////////////////////////////////////////////////
    // BONUS SECTION THAT IS NOT WORKING
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    if (this.isStarfishCaught()) {
      // this.bonuses.destroyed = true;
    }

    this.scoreText.update(`${Math.round(this.score)}`);
    // this.bonuses.forEach((bonus) => {
    //   this.bonuses.destroyed = true;
    //   this.root.removeChild(this.bonuses);
    // });

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    this.enemies.forEach((enemy) => {
      let enemyBottom = enemy.y + ENEMY_HEIGHT;
      let enemySide = enemy.x;
      let playerTop = GAME_HEIGHT - PLAYER_HEIGHT - 10;
      let playerLeft = this.player.x;

      if (playerLeft === enemySide && playerTop < enemyBottom) {
        this.isDead = true;
      }
    });
    return this.isDead;
  };

  //BONUS
  isStarfishCaught = () => {
    this.bonuses.forEach((bonus) => {
      let bonusBottom = bonus.y + BONUS_HEIGHT;
      let bonusSide = bonus.x;
      let playerTop = GAME_HEIGHT - PLAYER_HEIGHT - 10;
      let playerLeft = this.player.x;

      if (
        playerLeft === bonusSide &&
        playerTop < bonusBottom &&
        !this.isTimeout
      ) {
        this.isCaught = true;
        this.isTimeout = true;
        this.score += 10;

        setTimeout(() => {
          this.isTimeout = false;
        }, 500);

        this.enemies.forEach((enemy) => {
          enemy.speed = enemy.speed / 2;
        });

        setTimeout(() => {
          this.enemies.forEach((enemy) => {
            enemy.speed = enemy.speed * 2;
          });
        }, 3000);

        // this.starfishTimeLeft = 5000;
        // this.root.bonuses.removeChild(this.bonuses);
      }
    });
    return this.isCaught;
  };

  lostGame = () => {
    let message = GAME_OVER[Math.floor(Math.random() * GAME_OVER.length)];

    this.gameOver.gameOverText(message);
  };

  restart = (event) => {
    this.isDead = false;
    this.gameOver.gameOverText("");
    this.gameOver.domElement.style.backgroundColor = "transparent";
    this.restartButton.style.display = "none";

    this.player.restartPosition();

    this.enemies.forEach((enemy) => {
      enemy.destroy();
      console.log(enemy);
    });
    this.enemies = [];

    this.score = 0;
    document.addEventListener("keydown", keydownHandler);
    gameEngine.gameLoop();
  };
}
