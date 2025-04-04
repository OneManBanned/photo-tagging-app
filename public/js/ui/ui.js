import { playerFoundWallyFeedback, fadePuzzle, opponentFoundWallyFeedback } from "./animations.js";
import { DOM } from "../main.js";
import { setupMagnifier } from "./magnifier.js";
import { extractImgPath, getCharFromImgPath,
    getPathFromURL, positionInPercent, } from "../utils.js";

export function showGame() {
    DOM.lobbyView.style.display = "none";
    DOM.gameView.style.display = "grid";
}

export function showLobby() {
    DOM.lobbyView.style.display = "block";
    DOM.gameView.style.display = "none";
    resetThumbnailsUI();
    resetFoundCharactersUI();
}

export function setupThumbnailListeners() {
    DOM.allPuzzles.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            fadePuzzle(thumb.src)
        })
    });
}

function resetThumbnailsUI() {
    DOM.allPuzzleContainers.forEach((c) => {
        c.style.opacity = 1;
        c.style.pointerEvents = "auto";
        const extras = c.querySelectorAll(
            ".wally-found-bg, .wally-headshot, .wally-white-circle",
        );
        extras.forEach((el) => el.remove());
    });
}

export function updateThumbnailUI(id, idx) {
    DOM.allPuzzleContainers[idx].style.pointerEvents = "none";
    id === playerId
        ? playerFoundWallyFeedback(idx)
        : opponentFoundWallyFeedback(idx);
}

export function resetFoundCharactersUI() {
    DOM.headshots.forEach((img) => {
        const overlay = img.nextElementSibling;
        img.style.opacity = "1";
        overlay.style.display = "none";
    });
}

export function updateFoundCharacterUI(idx, character) {
    const container = DOM.allHeadshotContainers[idx];
    if (!container) return;

    const headshots = container.querySelectorAll(".headshot");
    headshots.forEach((img) => {
        const char = getCharFromImgPath(img.src);
        if (char === character) {
            const overlay = img.nextElementSibling;
            img.style.opacity = 0.5;
            if (overlay) overlay.style.display = "block";
        }
    });
}

export const updateTimerDisplay = (str) => (DOM.timerDisplay.textContent = str);

export function updateScores(playerStats, playerId) {
    const {
        [playerId]: { wallysFound: playersWallys },
    } = playerStats;
    DOM.playerScore.innerText = playersWallys;
    const opponentId = Object.keys(playerStats).find((id) => id !== playerId);
    const { wallysFound: opponentsWallys } = playerStats[opponentId];

    DOM.opponentScore.innerText = opponentsWallys;
}

export function switchPuzzle(puzzles, foundArr, idx) {
    const mainPuzzleSrc = extractImgPath(DOM.mainPuzzle.src);
    const currentPuzzleIdx = puzzles.indexOf(mainPuzzleSrc);
    if (currentPuzzleIdx !== idx) return;

    const unsolvedIdx = foundArr.indexOf(false);

    if (unsolvedIdx !== -1) {
        fadePuzzle(puzzles[unsolvedIdx])
    }
}

export function targetingCoordinates(position, checkCharacter, rect) {
    const { xPercent, yPercent } = positionInPercent(position, rect);
    const pathname = getPathFromURL(DOM.mainPuzzle.src);

    const index = puzzles.indexOf(pathname);
    checkCharacter(index, xPercent, yPercent);
}

export function setupPuzzle(checkCharacter) {
    DOM.mainPuzzle.addEventListener("click", (e) => {
        const rect = DOM.mainPuzzle.getBoundingClientRect();
        const isFlipped = DOM.mainPuzzle.dataset.flipped === "true";

        const x = isFlipped ? -(e.clientX - rect.right) : e.clientX - rect.left;
        const y = isFlipped ? -(e.clientY - rect.bottom) : e.clientY - rect.top;

        targetingCoordinates({ x, y }, checkCharacter, rect);
    });

    setupMagnifier();
}

