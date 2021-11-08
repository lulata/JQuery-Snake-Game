$(document).ready(function() {
  let gameArea = $("#game-area");
  let maxGameAra = 20;

  let playerLenght = 4;
  let playerPos = {
    "tr": 9,
    "td": 9
  }
  let playerDir = {
    "up": 1,
    "right": 2,
    "down": 3,
    "left": 4
  }
  let currentPlayerDir = playerDir["right"];

  let pointPosX = Math.floor(Math.random() * 19) + 0;
  let pointPosY = Math.floor(Math.random() * 19) + 0;
  let pointPos = {
    "posX": pointPosX,
    "posY": pointPosY
  };

  let gameScore = 0;
  let frameCount = 0;
  let playerIsDead = false;

  function drawGameArena() {
    for (let index = 0; index < maxGameAra; index++) {
      gameArea.append("<tr class='tr" + index + "'></tr>");

      let thisTr = $(".tr" + index);

      for (let indexTd = 0; indexTd < maxGameAra; indexTd++) {
        thisTr.append("<td class='tr" + index + "td" + indexTd + "'></td>");
      }
    }
  }

  drawGameArena();

  function drawPoint() {
    let setPointPos = $(".tr" + pointPos["posX"] + "td" + pointPos["posY"]);

    setPointPos.addClass("draw-point");
  }

  drawPoint();



  document.addEventListener("keydown", function(event) {
    if (event.which == 38) {
      currentPlayerDir = playerDir["up"];
    } else if (event.which == 39) {
      currentPlayerDir = playerDir["right"];
    } else if (event.which == 40) {
      currentPlayerDir = playerDir["down"];
    } else if (event.which == 37) {
      currentPlayerDir = playerDir["left"];
    }

  });

  function playerEatsPoint() {
    let setPointPos = $(".tr" + pointPos["posX"] + "td" + pointPos["posY"]);

    setPointPos.removeClass()

    pointPosX = Math.floor(Math.random() * 19) + 0;
    pointPosY = Math.floor(Math.random() * 19) + 0;

    pointPos = {
      "posX": pointPosX,
      "posY": pointPosY
    };

    setPointPos = $(".tr" + pointPos["posX"] + "td" + pointPos["posY"]);

    setPointPos.addClass("draw-point");

    gameScore += 1;

    playerLenght += 1;
  }

  function drawPlayer() {
    frameCount += 1;
    let getPlayerPos;

    switch (currentPlayerDir) {
      case 1:
        playerPos["tr"] -= 1;
        getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
        getPlayerPos.addClass("draw-player framecount" + frameCount);
        break;
      case 2:
        playerPos["td"] += 1;
        getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
        getPlayerPos.addClass("draw-player framecount" + frameCount);
        break;
      case 3:
        playerPos["tr"] += 1;
        getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
        getPlayerPos.addClass("draw-player framecount" + frameCount);
        break;
      case 4:
        playerPos["td"] -= 1;
        getPlayerPos = $(".tr" + playerPos["tr"] + "td" + playerPos["td"]);
        getPlayerPos.addClass("draw-player framecount" + frameCount);
        break;
      default:
        alert("Error Drawing Player");
        break;
    }
    let calcPlayerTailPos = frameCount - playerLenght;
    let getPlayerTailPos = $(".framecount" + calcPlayerTailPos);
    getPlayerTailPos.removeClass("draw-player framecount" + frameCount);

  }

  function scoreHandeler() {
    document.getElementById("game-score").innerHTML = gameScore;
  }

  function deathHandeler() {
    document.getElementById("game-status").innerHTML = "You Lose!";
  }



  setInterval(function() {
    let checkNextPlayerPosX = playerPos["tr"];
    let checkNextPlayerPosY = playerPos["td"];
    switch (currentPlayerDir) {
      case 1:
        checkNextPlayerPosX -= 1;
        break;
      case 2:
        checkNextPlayerPosY += 1;
        break;
      case 3:
        checkNextPlayerPosX += 1;
        break;
      case 4:
        checkNextPlayerPosY -= 1;
        break;
      default:
        alert("Error Checkin  Player Colusion");
        break;
    }

    //Death by wall
    if (playerPos["tr"] == 20 || playerPos["td"] == 20 || playerPos["tr"] == -1 || playerPos["td"] == -1) {
      deathHandeler();
      playerIsDead = true;
    }
    //Death by eating self
    else if ($(".tr" + checkNextPlayerPosX + "td" + checkNextPlayerPosY).hasClass("draw-player")) {
      deathHandeler();
      playerIsDead = true;
    }
    //Gain point
    else if (playerPos["tr"] == pointPos["posX"] && playerPos["td"] == pointPos["posY"] && playerIsDead == false) {
      playerEatsPoint();
      drawPlayer();
      scoreHandeler();
    }
    //Draw Player
    else if (playerIsDead == false) {
      drawPlayer();
    }
  }, 300);

})