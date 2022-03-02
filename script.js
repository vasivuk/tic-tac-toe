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
    for (const field of fields) {
        field.addEventListener('click', () => {
            gameController.playGameRound(field.dataset.index);
            updateGameboard();
        })
    }
    function updateGameboard() {
        for (let i = 0; i < fields.length; i++) {
            fields[i].textContent = Gameboard.getField(i);
        }
    }

    const setTurnMessage = (message) => {
        turnMessage.textContent = message;
    }
    return {setTurnMessage};
})();


const gameController = (() => {
    const playerX = Player("x", "Vale");
    const playerO = Player("o", "Mila");
    let round = 1;
    let isOver = false;

    const playGameRound = (fieldIndex) => {
        Gameboard.setField(getCurrentPlayerSign(), fieldIndex);
        round++;
        displayController.setTurnMessage(`Player ${getCurrentPlayerSign().toUpperCase()} turn`);
    }

    function getCurrentPlayerSign() {
        return (round % 2 === 0) ? playerO.getSign() : playerX.getSign();
    }
    return {playGameRound};
})();