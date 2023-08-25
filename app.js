const selectionButtons = document.querySelectorAll('[data-selection]');
let finalColumn = document.querySelector('[data-final-column]');
let computerScoreSpan = document.querySelector('[data-computer-score]');
let yourScoreSpan = document.querySelector('[data-your-score]')
const resetButton = document.querySelector('.reset');

const SELECTIONS = [
    {
        name: 'rock',
        image: 'images/ROCK.png',
        beats: 'scissors'
    },
    {
        name: 'paper',
        image: 'images/PAPER.png',
        beats: 'rock'
    },
    {
        name: 'scissors',
        image: 'images/SCISSORS.png',
        beats: 'paper'
    }
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const computerWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, computerWinner);
    addSelectionResult(selection, yourWinner);

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('img');
    div.src = selection.image;
    div.classList.add('resultSelection');
    if (winner) div.classList.add('winner');
    finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}



resetButton.addEventListener('click', () => {

    yourScoreSpan.innerHTML = '0';
    computerScoreSpan.innerHTML = '0';
    // document.getElementsByClassName('resultSelection').remove();
    document.querySelectorAll('.resultSelection').forEach(e => e.parentNode.removeChild(e));

    // selection.image.innerHTML = "";


    // finalColumn.innerHTML = "";

});


