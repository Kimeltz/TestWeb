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
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");
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
    },
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
        name : "town square",
        "button text" : ["Go to store", "Go to cave", "Fight dragon"],
        "button func" : [goStore, goCave, fightDragon],
        text : "You are in the town square. You see a sign that says \"Store\""
    },    
];



button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
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
    
}

function fightDragon(){
    
}

function sellWeapon()
{
    if(inventory.length > 1){
        gold+=15;
        goldText.innerHTML = gold;
        let currentWeapon = inventory.shift();
        text.innerHTML = "You sold a ${currentWeapon}.";
        text.innerHTML += "You sold a ${currentWeapon}.";
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
        health.innerHTML = health; 
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
        button2.onclick(sellWeapon);

    }    
}

  