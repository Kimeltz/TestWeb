let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name:"Stick",
        power:5
    },
    {
        name:"Dagger",
        power:30
    },
    {
        name:"Claw hammer",
        power:50
    },
    {
        name:"Sword",
        power:100
    }
];

const locations = [
    {
        name : "town square",
        "button text" : ["Go to store", "Go to cave", "Fight dragon"],
        "button func" : [goStore, goCave, fightDragon],
        text : "You are in the town square. You see a sign that says \"Store\""
    },
    {
        name : "store",
        "button text" : ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to Town Square"],
        "button func" : [buyHealth, buyWeapon, goTown],
        text : "You entered a store"
    },    
    {
        name : "cave",
        "button text" : ["Fight Slime", "Fight Fanged Beast", "Go to Town Square"],
        "button func" : [fightSlime, fightFangedBeast, goTown],
        text : "You entered the cave. You see some monsters"
    },    
    {
        name : "fight",
        "button text" : ["Attack", "Dodge", "Run"],
        "button func" : [attack, dodge, goTown],
        text : "You are fighting a monster"
    },    
    {
        name : "kill monster",
        "button text" : ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button func" : [goTown, goTown, goTown],
        text : "You defeated the monster. You gained gold and xp"
    },    
    {
        name : "lose",
        "button text" : ["Replay?", "Replay?", "Replay?"],
        "button func" : [restart, restart, restart],
        text : "You lose" 
    },    
    {
        name : "win",
        "button text" : ["Replay?", "Replay?", "Replay?"],
        "button func" : [restart, restart, restart],
        text : "You defeated the dragon. You win the game!!!"
    }    
];

const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15

    },
    {
        name: "Fanged Beast",
        level: 8,
        health: 60

    },
    {
        name: "Dragon",
        level: 20,
        health: 300

    }
]

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    text.innerText = location.text;
    button1.onclick = location["button func"][0];
    button2.onclick = location["button func"][1];
    button3.onclick = location["button func"][2];
}

function goTown(){    
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function lose(){
    update(locations[5]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function fightSlime(){
    fighting = 0;
    goFight();
}
function fightFangedBeast(){
    fighting = 1;
    goFight();
}
function fightDragon(){
    fighting = 2;
    goFight();
}
function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function getMonsterAttackValue(level){
    let hit = (5*level) - Math.floor(Math.random() * xp);
    console.log(hit);
    return hit;
}

function attack(){
    text.innerText = `The ${monsters[fighting].name} attacks.`;
    text.innerText += `You attack it with your ${weapons[currentWeapon].name}`;
    health -= getMonsterAttackValue(monsters[fighting].level);
    healthText.innerText = health;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    } else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }

}
function dodge(){
    text.innerText = "You dodged the monster's attack";
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 67);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function winGame(){
    update(locations[6]);
}

function sellWeapon()
{
    if(inventory.length > 1){
        gold+=15;
        goldText.innerHTML = gold;
        let currentWeapon = inventory.shift();
        text.innerHTML = `You sold a ${currentWeapon}.`;
    }
    else{
        text.innerText = "Don't sell your only weapon";
    }
}

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerHTML = gold;
        healthText.innerHTML = health; 
    }
    else{
        text.innerHTML = "You don't have enough gold to buy health";
    }
}


function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerHTML = gold; 
            let newWeapon = weapons[currentWeapon].name;
            text.innerHTML = `You now have a <b>${newWeapon}</b>`
            inventory.push(newWeapon);
            
        }
        else{
            text.innerHTML = "You don't have enough gold to buy a weapon";
        }
    }
    else{
        text.innerHTML = "You already bought all weapons";
        button2.innerHTML = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;

    }    
}

  