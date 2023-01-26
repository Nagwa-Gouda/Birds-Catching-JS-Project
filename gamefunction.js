let welcomeblock = document.querySelector(".welc");
let welcparagraph = document.querySelector(".welcomeP");
let welh = document.querySelector(".welh");
let rolesP = document.querySelector(".roles");

window.addEventListener("load", () => {
  const params = new URL(document.location).searchParams;
  const name = params.get("name");

  document.getElementById("result-name").innerHTML = name;

  welh.textContent = ` Welcome ${name}`;
  welcparagraph.textContent = "We hope you enjoy our game";

  welcomeblock.style.background = "white";
  welcomeblock.style.width = "420px";
  welcomeblock.style.height = "220px";
  welcomeblock.style.margin = "auto";
  welcomeblock.style.textAlign = "center";

  rolesP.textContent =
    "To win, you should kill 25(black and white) birds in specified time";
});
let counter = 0;

let totalScore = 0;
function StartGame() {
  document.getElementById("score").innerHTML = `${totalScore}`;
  const bird_urls = [
    {
      src: "./Project_Images/small_bird.gif",
      score: 10,
    },
    {
      src: "./Project_Images/big_bird.gif",
      score: -5,
    },
    {
      src: "./Project_Images/white_bird.gif",
      score: 5,
    },
  ];
  welcomeblock.style.display = "none";

  for (let bird of bird_urls) {
    console.log(bird);
    generateBird(bird);
  }
  setInterval(function () {
    spawnBomb();
  }, 2000);

  setInterval(updateCountdown, 1000);
}


function generateBird(bird) {
  var img = document.createElement("img");
  img.src = bird.src;
  img.setAttribute("score", bird.score);
  img.style.cursor = "crosshair";
  img.className = "bird";
  let ele = document.getElementById("flying_birds").appendChild(img);

  // how many birds killed

  img.addEventListener("click", function (e) {
    counter++;
    document.getElementById("killed-birds").innerHTML = `${counter}`;

    let scoreGained = e.target.getAttribute("score");
    totalScore = parseInt(totalScore) + parseInt(scoreGained);
    console.log(totalScore);
    document.getElementById("score").innerHTML = `${totalScore}`;
  });

  ele.style.marginTop = Math.random() * (500 - 20) + 20 + "px";
  moveRight(ele, 0, bird);
}

const moveRight = function (imageObject, left, url) {
  let id = setInterval(function () {
    left += 10;

    imageObject.onclick = imageObject.remove;
    if (left < innerWidth - imageObject.width) {
      imageObject.style.left = left + "px";
    } else {
      clearInterval(id);
      imageObject.remove();
   
      generateBird(url);
    }
  }, 50); 
};


const spawnBomb = function () {
  let bombElement = document.createElement("img");
  bombElement.src = `./Project_Images/bomb-2025548_1280.png`;
  bombElement.style.position = "absolute";
  bombElement.style.width = "100px";
  bombElement.style.zIndex = 1;
  bombElement.style.cursor = "crosshair";
  bombElement.style.left =
    Math.round(
      Math.random() * (window.innerWidth - parseInt(bombElement.style.width))
    ) + "px";
  bombElement.style.top = -1 * parseInt(bombElement.height) + "px";

  document.querySelector("body").append(bombElement);
  moveDown(bombElement, 0);

  bombElement.addEventListener("click", function () {
    let detectedBirds = document.querySelectorAll(".bird");
    detectedBirds.forEach((bird) => {
      let bombX =
        parseInt(bombElement.style.left) + parseInt(bombElement.width);
      let bombY =
        parseInt(bombElement.style.top) + parseInt(bombElement.height);
      let birdX = parseInt(bird.style.left) + parseInt(bird.width);
      let birdY = parseInt(bird.style.marginTop) + parseInt(bird.height);
      let distance = Math.sqrt(
        Math.pow(bombX - birdX, 2) + Math.pow(bombY - birdY, 2)
      );
      console.log(distance);
      if (distance < 300) {
        console.log(distance);
        bird.remove();
      }
    });
    bombElement.remove();
  });
};

const moveDown = function (imageObject, top) {
  let id = setInterval(function () {
    top += 10;

    imageObject.onclick = imageObject.remove;
    if (top < innerHeight - imageObject.height) {
      imageObject.style.top = top + "px";
    } else {
      clearInterval(id);
      imageObject.remove();
    }
  }, 50); 
};


// 1min count down
const startingMinutes = 1;
let time = startingMinutes * 60;
let countDownEl = document.getElementById("countdown");
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countDownEl.innerHTML = `${minutes} : ${seconds}`;
  time--;
  if (time <= 0) {
    clearInterval(updateCountdown);
    alert(totalScore > 50 ? `Congrats you have won` : `GoodLuck next time ` );
    location.reload();
  }
}
console.log(time)