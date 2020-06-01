 new Vue({
          el: '#app',
          data: {
              isGameStarted: false,
              myHealth: 100,
              monstersHealth: 100,
              specialAttackDisabled: false,
              healDisabled: false,
              actions: []
          },
          methods: {
              startGame: function () {
                  this.isGameStarted = true;
                  this.myHealth = 100;
                  this.monstersHealth = 100,
                      this.specialAttackDisabled = false;
                  this.healDisabled = false;
                  this.actions = [];
              },
              attack: function () {
                  let dmg = this.getRandomDamage(3, 10);
                  this.monstersHealth -= dmg

                  this.actions.unshift({
                      isPlayer: true,
                      message: `Player hits monster for ${dmg}`
                  })

                  if (this.checkWinning()) {
                      return;
                  }

                  this.monsterAttack();

              },
              specialAttack: function () {
                  let dmg = this.getRandomDamage(9, 18);
                  this.monstersHealth -= dmg

                  this.actions.unshift({
                      isPlayer: true,
                      message: `[S P E C I A L] Player hits monster for ${dmg}`
                  })

                  if (this.checkWinning()) {
                      return;
                  }

                  this.monsterAttack();

                  this.specialAttackDisabled = true
              },
              heal: function () {
                  let healedNum = this.getRandomDamage(5, 10);
                  this.myHealth += healedNum

                  this.actions.unshift({
                      isPlayer: true,
                      message: `Player HEALS for ${healedNum}`
                  })

                  this.healDisabled = true;
              },
              giveUp: function () {
                  if (confirm('You want to give up?')) {
                      this.isGameStarted = false;
                  }
              },
              getRandomDamage: function (min, max) {
                  return Math.max((Math.floor(Math.random() * max) + 1), min);
              },
              monsterAttack: function () {
                  let dmg = this.getRandomDamage(6, 12);
                  this.myHealth -= dmg;

                  this.actions.unshift({
                      isPlayer: false,
                      message: `Monster hits player for ${dmg}`
                  })

                  this.checkWinning();
              },
              checkWinning: function () {
                  if (this.monstersHealth <= 0) {
                      if (confirm('You won, want a new game?')) {
                          this.startGame();
                      } else {
                          this.isGameStarted = false
                      }
                      return true;
                  } else if (this.myHealth <= 0) {
                      if (confirm('You lost, want a new game?')) {
                          this.startGame();
                      } else {
                          this.isGameStarted = false
                      }
                      return true;
                  } else {
                      return false;
                  }
              }
          },
          computed: {

          }
      }) 