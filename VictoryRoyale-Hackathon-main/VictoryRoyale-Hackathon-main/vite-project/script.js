const numCharacters = 4;
const gridWidth = 400; // Total width of the grid in pixels
let racer_odds = [2, 3, 4, 5];
let balance = 100;
document.getElementById("balance").textContent = balance;

function getRandomMove(index) {
  var minSpeed = 0.53 - 0.03 * racer_odds[index];
  var maxSpeed = 7.03 - 0.03 * racer_odds[index];
  return Math.floor(Math.random() * (maxSpeed - minSpeed) * 1.5) + 2; //  Can change how much they move
}

// finish line position
const finishLinePos = document.querySelector(".finish-line").offsetLeft;
function moveDot(dot, currentPos, index) {
  const move = getRandomMove(index);
  const newPos = currentPos + move;
  const racetrackWidth = dot.parentElement.clientWidth;

  const finishLinePos = racetrackWidth - 125; // Finish line position

  if (newPos >= finishLinePos) {
    dot.style.left = finishLinePos + "px";
    return true; // Dot reached the end, return true to indicate the winner
  } else {
    dot.style.left = newPos + "px";
    return false; // Dot still moving, return false
  }
}

function updateLeaderboard(dots) {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = ""; // Clear existing leaderboard

  // Sort the dots based on their distance (left position)
  const sortedDots = dots
    .slice()
    .sort((a, b) => parseFloat(b.style.left) - parseFloat(a.style.left));

  // Display the dots in the leaderboard based on their current order
  for (let i = 0; i < sortedDots.length; i++) {
    const dot = sortedDots[i];
    const distance = parseFloat(dot.style.left) / gridWidth;
    const leaderboardItem = document.createElement("div");
    leaderboardItem.textContent = `Racer ${
      dots.indexOf(dot) + 1
    }: ${distance.toFixed(2)}`;
    leaderboard.appendChild(leaderboardItem);
    if (i === 0) {
      // Add "Leader" label for the leading dot
      leaderboardItem.textContent = leaderboardItem.textContent;
    }
  }
}

function showMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

let interval;

function resetRace() {
  clearInterval(interval);
  const messageElement = document.getElementById("message");
  messageElement.textContent = "";

  const dots = [];
  for (let i = 1; i <= numCharacters; i++) {
    const dot = document.getElementById("dot" + i);
    dots.push(dot);
    dot.style.left = "0px"; // Reset the position of each dot
  }
}

function startRace() {
  clearInterval(interval); // Clear any existing intervals before starting a new race
  const messageElement = document.getElementById("message");
  messageElement.textContent = "";
  let bid = document.getElementById("bid_amount").value;
  balance = balance - document.getElementById("bid_amount").value;
  document.getElementById("balance").textContent = balance;
  let selected_racer = document.getElementById("racer").value;
  console.log(selected_racer);
  const dots = [];
  for (let i = 1; i <= numCharacters; i++) {
    const dot = document.getElementById("dot" + i);
    dots.push(dot);
    dot.style.left = "0px"; // Reset the position of each dot
  }

  // Move the dots across the grid
  interval = setInterval(() => {
    let winner = null;
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const currentPos = parseFloat(dot.style.left);
      const isWinner = moveDot(dot, currentPos, i);
      if (isWinner && winner === null) {
        winner = i + 1;
      }
    }
    if (winner !== null) {
      clearInterval(interval);
      updateLeaderboard(dots);
      showMessage(`Racer ${winner} is the winner!`);
      console.log(winner);
      if (parseInt(selected_racer) + 1 == winner) {
        console.log("win");
        balance += racer_odds[selected_racer] * bid;
        document.getElementById("balance").textContent = balance;
        alert("You've won ");
      } else {
      }
    } else {
      updateLeaderboard(dots); // update leaderboard as race progresses
    }
  }, 100); // Adjust the interval to control the speed of movement
}

const startButton = document.querySelector("button");
// startButton.addEventListener("click", startRace);
