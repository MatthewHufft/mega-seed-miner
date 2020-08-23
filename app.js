//TODO Refactor these stats inside player object
let megaSeeds = 0;
let currentAutomaticSeeds = 0;

let player = {
  minePerClick: 1,
  totalLifetimeSeeds: 0
}

let upgrades = [
  {
    id: 4,
    name: "Laser Gun",
    sound: "laser-gun-sound",
    image: "lasergun-item.jpg",
    price: 50,
    priceIncrease: 1.1,
    quantity: 0,
    mineValue: 1,
    multiplier: 1.1
  },
  {
    id: 3,
    name: "Plumbus",
    sound: "plumbus-sound",
    image: "plumbus-item.jpg",
    price: 500,
    priceIncrease: 1.1,
    quantity: 0,
    mineValue: 5,
    multiplier: 1.3
  }
]

let autoUpgrades = [
  {
    id: 2,
    name: "Mortys",
    sound: "morty-sound",
    image: "morty-item.jpg",
    price: 2000,
    priceIncrease: 1.2,
    quantity: 0,
    multiplier: 10
  },
  {
    id: 1,
    name: "Meeseeks",
    sound: "meeseeks-sound",
    image: "meeseeks-item.jpg",
    price: 5000,
    priceIncrease: 1.3,
    quantity: 0,
    multiplier: 25
  }
]


function mine() {
megaSeeds += player.minePerClick;
player.totalLifetimeSeeds += player.minePerClick
updateScreen();
drawMegaSeed();
}

function drawMegaSeed() {
  let megaSeedElem = document.getElementById('megaSprite')
  megaSeedElem.innerHTML = `<img src="/mega-seed-sprite.jpg" alt="megaseed" class="sprite">`

  setTimeout(() => {
    megaSeedElem.innerHTML = ""
  }, 1000)
}

function drawInventory() {
  let template = ""
  let inventoryElem = document.getElementById('inventory')

  upgrades.forEach(upgrade => {
    // template += `<button onclick="buyUpgrade(${upgrade.id})">${upgrade.name}: ${upgrade.quantity}</button>`;
       template += `<div class="card m-2 rounded shadow grow shrink-on-click" style="width: 45%;" onclick="buyUpgrade(${upgrade.id})">
       <img src="${upgrade.image}" class="card-img-top" alt="...">
       <div class="card-body bg-secondary">
         <p class="card-text">Owned: ${upgrade.quantity}</p>
         <p class="card-text">Cost: ${upgrade.price}</p>
       </div>
     </div>`
  });
  
  autoUpgrades.forEach(autoUpgrade => {
    // template += `<button onclick="buyAutoUpgrade(${autoUpgrade.id})">${autoUpgrade.name}: ${autoUpgrade.quantity}</button>`;
       template += `<div class="card m-2 shadow grow shrink-on-click" style="width: 45%;" onclick="buyAutoUpgrade(${autoUpgrade.id})">
       <img src="${autoUpgrade.image}" class="card-img-top" alt="...">
       <div class="card-body bg-secondary">
         <p class="card-text">Owned: ${autoUpgrade.quantity}</p>
         <p class="card-text">Cost: ${autoUpgrade.price}</p>
       </div>
     </div>`
  });
  inventoryElem.innerHTML = template;
}

function updateScreen() {
  let megaSeedsCountElem = document.getElementById('megaSeedsCount');
  megaSeedsCountElem.innerHTML = `${megaSeeds}`;

  updateCalculations();
}

function updateCalculations() {
  let seedsPerClickElem = document.getElementById('seedsPerClick')
  let seedsPerMinuteElem = document.getElementById('seedsPerMinute')
  let totalSeedsElem = document.getElementById('totalSeedsCollected')
  let calculatePerMinute = currentAutomaticSeeds * 20;
  seedsPerClickElem.innerHTML = `${player.minePerClick}`
  seedsPerMinuteElem.innerHTML = `${calculatePerMinute}`
  totalSeedsElem.innerHTML = `${player.totalLifetimeSeeds}`
}


function buyUpgrade(id) {
  let upgrade = upgrades.find(upgrade => upgrade.id == id)
  
  if (megaSeeds < upgrade.price){
    console.log("not enough mega seeds")
  } else {
    upgrade.quantity++;
    megaSeeds -= upgrade.price;
    upgrade.price = Math.floor(upgrade.price * upgrade.priceIncrease);
    player.minePerClick += upgrade.mineValue;
    // @ts-ignore
    document.getElementById(upgrade.sound).play();
  }
  updateScreen();
  drawInventory();
}

function buyAutoUpgrade(id) {
  let autoUpgrade = autoUpgrades.find(autoUpgrade => autoUpgrade.id == id)
  let soundBite = autoUpgrade.sound
  if (megaSeeds < autoUpgrade.price){
    //TODO notify user they don't have enough seeds to buy the upgrade.
    console.log("not enough mega seeds")
  } else {
    autoUpgrade.quantity++;
    megaSeeds -= autoUpgrade.price;
    autoUpgrade.price = Math.floor(autoUpgrade.price * autoUpgrade.priceIncrease);
    // @ts-ignore
    document.getElementById(autoUpgrade.sound).play();
    startInterval();
  }
  updateScreen();
  drawInventory();
}

function collectAutoUpgrades() {
  let autoUpgradeValue = 0;

  for(let i = 0; i < autoUpgrades.length; i++){
    let autoUpgrade = autoUpgrades[i];
    autoUpgradeValue += autoUpgrade.quantity * autoUpgrade.multiplier
  }
   megaSeeds += autoUpgradeValue;
   player.totalLifetimeSeeds += autoUpgradeValue;
   currentAutomaticSeeds = autoUpgradeValue;
   updateScreen()
}

function startInterval() {

  setInterval(collectAutoUpgrades, 3000);
}


updateScreen();
drawInventory();