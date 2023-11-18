/**
 * Initializes the game level by creating and assembling all necessary game objects.
 * @returns {Level} The initialized game level with all game objects.
 */
function initLevel() {
   level1 = new Level(createEnemies(), createEndboss(), createClouds(), createBackgroundObjects(), createCoins(), createBottles());
}

/**
 * Creates an array of enemy objects for the game level.
 * @returns {Chicken[]} An array of Chicken and SmallChicken objects.
 */
function createEnemies() {
   return [
      new Chicken(), // Create a new Chicken object
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
   ];
}

/**
 * Creates an array containing the endboss object for the game level.
 * @returns {Endboss[]} An array containing a single Endboss object.
 */
function createEndboss() {
   return [
      new Endboss(), // Create a new Endboss object
   ];
}

/**
 * Creates an array of cloud objects for the game level.
 * @returns {Cloud[]} An array of Cloud objects.
 */
function createClouds() {
   return [
      new Cloud(), // Create a new Cloud object
      new Cloud(),
      new Cloud(),
      new Cloud(),
   ];
}

/**
 * Creates an array of background objects for the game level.
 * @returns {BackgroundObject[]} An array of BackgroundObject instances for different layers and positions.
 */
function createBackgroundObjects() {
   return [
      // Create BackgroundObject instances for different layers and positions
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
      new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
   ];
}

/**
 * Creates an array of coin objects for the game level.
 * @returns {Coins[]} An array of Coins objects.
 */
function createCoins() {
   return [
      new Coins(), // Create a new Coins object
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
   ];
}

/**
 * Creates an array of bottle objects for the game level.
 * @returns {Bottles[]} An array of Bottles objects.
 */
function createBottles() {
   return [
      new Bottles(), // Create a new Bottles object
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
      new Bottles(),
   ];
}
