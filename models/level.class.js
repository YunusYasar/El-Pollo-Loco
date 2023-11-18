/**
 * Represents a level in the game.
 * Contains various entities that make up the game environment and challenges.
 */
class Level {
   /**
    * Array of enemy objects in the level.
    * @type {MovableObject[]}
    */
   enemies;

   /**
    * The endboss object for the level.
    * @type {Endboss}
    */
   endboss;

   /**
    * Array of cloud objects in the level.
    * @type {Cloud[]}
    */
   clouds;

   /**
    * Array of background objects in the level.
    * @type {BackgroundObject[]}
    */
   backgroundObjects;

   /**
    * Array of coin objects in the level.
    * @type {Coins[]}
    */
   coins;

   /**
    * Array of bottle objects in the level.
    * @type {Bottles[]}
    */
   bottles;

   /**
    * The x-coordinate marking the end of the level.
    * @type {number}
    */
   level_end_x = 2200;

   /**
    * Constructs a Level instance with provided entities.
    * @param {MovableObject[]} enemies - Array of enemies in the level.
    * @param {Endboss} endboss - The endboss of the level.
    * @param {Cloud[]} clouds - Array of clouds in the level.
    * @param {BackgroundObject[]} backgroundObjects - Array of background objects in the level.
    * @param {Coins[]} coins - Array of coins in the level.
    * @param {Bottles[]} bottles - Array of bottles in the level.
    */
   constructor(enemies, endboss, clouds, backgroundObjects, coins, bottles) {
      this.enemies = enemies;
      this.endboss = endboss;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
      this.coins = coins;
      this.bottles = bottles;
   }
}
