class Game {
    constructor() {
        this.balance = 100;
        this.isRaceActive = false;
        this.raceResults = new Set();
        this.racers = [];
    }
    
    calculateWinnings(odds, betAmount) {
        if (odds > 1 && betAmount > 0){
            return (odds * betAmount);
        }
        return -1;
    }

    raceResult() {
        let position = 1;
        this.raceResults.forEach(racer => {
            let ordinal = "";
            switch (position) {
                case 1: ordinal = "st"; break;
                case 2: ordinal = "nd"; break;
                case 3: ordinal = "rd"; break;
                default: ordinal = "th"; break;
            }
            console.log(position + ordinal + " place: " + racer.name);
            position++;
        });
    }

    checkIfRaceActive() {
        if (this.racers.every(racer => racer.isFinished)) {
            this.isRaceActive = false;
            this.raceResult();
        }
    }

    betResult(racerNum) {
        return this.raceResults.has(racerNum) ? 1 : 0;
    }

    addRacer(racer) {
        this.racers.push(racer);
    }
    
    startRace() {
        this.isRaceActive = true;
    }
}

class Racer {
    constructor(name, image, odds, speed, distance) {
        this.name = name;
        this.image = image;
        this.odds = odds;
        this.speed = speed;
        this.distance = distance;
        this.isFinished = false;
    }

    getRandSpeed() {
        this.updateDistance();
        var minSpeed = 0.53 - 0.03 * this.odds;
        var maxSpeed = 1.03 - 0.03 * this.odds;
        this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        if (this.distance <= 0){
            this.isFinished = true;
        }

    }
    
    updateDistance() {
        var distanceTravelled = 15 * this.speed;
        console.log(this.name + ": " + this.distance.toFixed(2));
        return this.distance -= distanceTravelled;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.gold = 100;
        this.betAmount = 0;
        this.chosenRacer = 0;
    }

    makeBet(amount) {
        console.log("You have this much gold: " + this.gold);
        this.chosenRacer = prompt("Please enter your racer:");
        this.gold = this.gold - amount;
        this.betAmount = amount;
    }
    payoutBet(winngings){
        this.gold = this.gold + winngings;
    }
}

// initialise racers and game
const game = new Game();
const racer1 = new Racer("Racer 1", "x", 2, 0, 400);
const racer2 = new Racer("Racer 2", "x", 3, 0, 400);
const racer3 = new Racer("Racer 3", "x", 4, 0, 400);
const racer4 = new Racer("Racer 4", "x", 5, 0, 400);

game.addRacer(racer1);
game.addRacer(racer2);
game.addRacer(racer3);
game.addRacer(racer4);

game.startRace();

let intervalId = setInterval(() => {
    if (game.isRaceActive) {
        racer1.getRandSpeed();
        racer2.getRandSpeed();
        racer3.getRandSpeed();
        racer4.getRandSpeed();

        [racer1, racer2, racer3, racer4].forEach(racer => {
            if (racer.isFinished && !game.raceResults.has(racer)) {
                game.raceResults.add(racer);
            }
        });

        game.checkIfRaceActive();
    } else {
        clearInterval(intervalId); // Stop the interval when the race is no longer active
    }
}, 100);

// initialise player
const player = new Player("Player 1");
player.makeBet(10);
betResult(this.chosenRacer);
payoutBet(calculateWinnings(this.odds, this.betAmount));

console.log("You have this much gold: " + player.gold);






