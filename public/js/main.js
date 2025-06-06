import { PLAYER_ID } from "./constants.js";
import { checkCharacter } from "./game/api.js";
import { initializeHintObserver } from "./powerups/effects.js";
import { showLobby, setupPuzzle, setupThumbnailListeners } from "./ui/ui.js";
import { initWebSocket } from "./websockets/websockets.js";

export const DOM = {
  lobbyView: document.querySelector("#lobby-view"), // lobby
  gameView: document.querySelector("#game-view"), // gameboard
  mainPuzzle: document.querySelector("#currentPuzzle"), // inPlayPuzzle
  mainPuzzleContainer: document.getElementById("puzzle-container"), // inPlayPuzzleContainer
  allPuzzles: document.querySelectorAll(".puzzle"), // puzzleThumbnails
  allPuzzleContainers: document.querySelectorAll(".puzzleSelect-container"), // puzzleThumbnailsContainer
  headshots: document.querySelectorAll(".headshot"), // auxCharHeadshots
  allHeadshotContainers: document.querySelectorAll(".headshot-container"), // auxCharHeadshotContainers
  timerDisplay: document.querySelector("#timer"),
  playerScore: document.querySelector("#playerScore"),
  opponentScore: document.querySelector("#opponentScore"),
  playerEffects: document.querySelector("#playerEffects"),
  opponentEffects: document.querySelector("#opponentEffects")
};

initializeHintObserver()
initWebSocket(PLAYER_ID);
setupPuzzle((index, x, y) => checkCharacter(index, x, y, PLAYER_ID));
setupThumbnailListeners();
showLobby();

