let megaSeeds = 500;

let player = {
  minePerClick: 1
}

let upgrades = [
  {
    id: 4,
    name: "Laser Gun",
    price: 100,
    quantity: 0,
    mineValue: 5,
    multiplier: 1.1
  },
  {
    id: 3,
    name: "Plumbus",
    price: 500,
    quantity: 0,
    mineValue: 25,
    multiplier: 1.3
  }
]

let autoUpgrades = [
  {
    id: 2,
    name: "Mortys",
    price: 500,
    quantity: 0,
    mineValue: 0,
    multiplier: 10
  },
  {
    id: 1,
    name: "Meeseeks",
    price: 2000,
    quantity: 0,
    mineValue: 0,
    multiplier: 50
  }
]

function mine() {
megaSeeds += player.minePerClick;
updateScreen();
}

function drawInventory() {
  let template = ""
  let inventoryElem = document.getElementById('inventory')

  upgrades.forEach(upgrade => {
    template += `<button onclick="buyUpgrade(${upgrade.id})"><h2>${upgrade.name}: ${upgrade.quantity}</h2></button>`;
  });
  
  autoUpgrades.forEach(autoUpgrade => {
    template += `<button onclick="buyAutoUpgrade(${autoUpgrade.id})"><h2>${autoUpgrade.name}: ${autoUpgrade.quantity}</h2></button>`;
  });
  inventoryElem.innerHTML = template;
}

function updateScreen() {
  let megaSeedsCountElem = document.getElementById('megaSeedsCount');
  megaSeedsCountElem.innerHTML = `${megaSeeds}`;
}

function buyUpgrade(id) {
  let upgrade = upgrades.find(upgrade => upgrade.id == id)
  
  if (megaSeeds < upgrade.price){
    console.log("not enough mega seeds")
  } else {
    upgrade.quantity++;
    megaSeeds -= upgrade.price;
    player.minePerClick += upgrade.mineValue
  }
  updateScreen();
  drawInventory();
}

function buyAutoUpgrade(id) {
  let autoUpgrade = autoUpgrades.find(autoUpgrade => autoUpgrade.id == id)
  
  if (megaSeeds < autoUpgrade.price){
    //alert user not enough mega seeds to buy
    console.log("not enough mega seeds")
  } else {
    autoUpgrade.quantity++;
    megaSeeds -= autoUpgrade.price;
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
   updateScreen()
}

function startInterval() {

  setInterval(collectAutoUpgrades, 1000);
}



updateScreen();
drawInventory();