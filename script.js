const Gameboard = (() => {
    const gameboardArray = ['', '', '', '', '', '', '', '', ''];   
    const setField = (sign, fieldIndex) => {
        gameboardArray[fieldIndex] = sign;
    }
    const getField = (fieldIndex) => {
        return gameboardArray[fieldIndex];
    }
    return {getField, setField};
})();


const Player = (sign, name) => {
    const getSign = () => {
        return sign;
    }
    const getName = () => {
        return name;
    }
    return {getSign, getName};
};


const displayController = (() => {
    const fields = document.querySelectorAll('.field');
    const turnMessage = document.querySelector('.message');
    const playerXIcon = document.querySelector('#playerX > span');
    const playerOIcon = document.querySelector('#playerO > span');
    for (const field of fields) {
        field.addEventListener('click', () => {
            gameController.playGameRound(field.dataset.index);
            updateGameboard();
        })
    }
    function updateGameboard() {
        for (let i = 0; i < fields.length; i++) {
            fields[i].textContent = Gameboard.getField(i);
            if(fields[i].textContent=== 'x') {
                if(!fields[i].classList.contains('x-color')){
                    fields[i].classList.add('x-color');
                }
            } else if(fields[i].textContent === 'o') {
                if(!fields[i].classList.contains('o-color')){
                    fields[i].classList.add('o-color');
                }
            }
        }
    }

    const updateIcons = () => {
        if(playerXIcon.classList.contains('x-color')){
            playerXIcon.classList.remove('x-color');
            playerOIcon.classList.add('o-color');
        } else if (playerOIcon.classList.contains('o-color')) {
            playerOIcon.classList.remove('o-color');
            playerXIcon.classList.add('x-color');
        }
    }

    const setTurnMessage = (message) => {
        turnMessage.textContent = message;
    }
    return {setTurnMessage, updateIcons};
})();


const gameController = (() => {
    const playerX = Player("x", "Vale");
    const playerO = Player("o", "Mila");
    let round = 1;
    let isOver = false;

    const playGameRound = (fieldIndex) => {
        if(Gameboard.getField(fieldIndex) === "" && isOver === false) {
            Gameboard.setField(getCurrentPlayerSign(), fieldIndex);
            //If some player has won
            if(isOver = checkIfOver(fieldIndex)){
                displayController.setTurnMessage(`Player ${getCurrentPlayerSign().toUpperCase()} wins!`);
                return;
            }
            round++;
            //If the match ends in draw
            if(round === 10) {
                isOver = true;
                displayController.setTurnMessage('Draw!');
                return;
            }
            displayController.updateIcons();
            displayController.setTurnMessage(`Player ${getCurrentPlayerSign().toUpperCase()} turn`);
        }
    }

    function checkIfOver(fieldIndex) {
        const gameIsOver = [[0,1,2], [3,4,5], [6,7,8],  //horizontal win
                            [0,3,6], [1,4,7], [2,5,8],  //vertical win
                            [0,4,8], [2,4,6]];          //diagonal win
        const toCheck = gameIsOver.filter((trio) => trio.includes(parseInt(fieldIndex)));

        const isOver = toCheck.some((trio) => trio.every((element) => Gameboard.getField(element) === Gameboard.getField(fieldIndex)));
            
        return isOver;
    }

    function getCurrentPlayerSign() {
        return (round % 2 === 0) ? playerO.getSign() : playerX.getSign();
    }
    return {playGameRound, isOver};
})();