document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('#gameBoard');
    const scoreDisplay = document.querySelector('#score');
    const timerDisplay = document.querySelector('#timer');
    const startButton = document.querySelector('#startButton');
    const endMessage = document.querySelector('#endMessage');
    const restartButton = document.querySelector('#restartButton');
    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];
    let timeRemaining = 60;
    let timerId = null;
    let isGameOver = false;
    let isGameStarted = false;

    const cardArray = [
        { name: 'aveiro', img: 'CAC aveiro.png' },
        { name: 'aveiro', img: 'CAC aveiro.png' },
        { name: 'greta', img: 'cac greta.png' },
        { name: 'greta', img: 'cac greta.png' },
        { name: 'serena', img: 'CAC serena.png' },
        { name: 'serena', img: 'CAC serena.png' },
        { name: 'christine', img: 'christine 2 1.png' },
        { name: 'christine', img: 'christine 2 1.png' },
        { name: 'compo', img: 'Compo 1 insta 222.png' },
        { name: 'compo', img: 'Compo 1 insta 222.png' },
        { name: 'modjo', img: 'modjo ok.png' },
        { name: 'modjo', img: 'modjo ok.png' },
        { name: 'alexa', img: 'sam alexa.png' },
        { name: 'alexa', img: 'sam alexa.png' },
        { name: 'christine2', img: 'sam christine.png' },
        { name: 'christine2', img: 'sam christine.png' },
        { name: 'riga', img: 'sam riga.png' },
        { name: 'riga', img: 'sam riga.png' },
        { name: 'sans_titre', img: 'Sans titre.png' },
        { name: 'sans_titre', img: 'Sans titre.png' },
        // Ajoutez vos nouvelles paires de cartes ici
        // Ajoutez autant de paires de cartes que nécessaire
    ];

    function shuffleCards() {
        cardArray.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffleCards();
        gameBoard.innerHTML = '';
        cardArray.forEach((item, index) => {
            const card = document.createElement('img');
            card.setAttribute('src', 'recto.png');
            card.setAttribute('data-id', index);
            card.classList.add('card');
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (!isGameStarted || isGameOver) return;

        const cardId = this.getAttribute('data-id');
        if (!cardsChosenIds.includes(cardId) && cardsChosenIds.length < 2) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenIds.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        if (isGameOver) return;

        const [idOne, idTwo] = cardsChosenIds;
        const cardOne = cardArray[idOne];
        const cardTwo = cardArray[idTwo];

        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Vous avez trouvé une paire !');
            cardsChosenIds.forEach((id) => {
                const card = document.querySelector(`[data-id="${id}"]`);
                card.removeEventListener('click', flipCard);
            });
            cardsWon.push(cardsChosen);
            showPreview(cardOne.img);
        } else {
            cardsChosenIds.forEach((id) => {
                const card = document.querySelector(`[data-id="${id}"]`);
                card.setAttribute('src', 'recto.png');
            });
        }
        cardsChosen = [];
        cardsChosenIds = [];
        updateScoreDisplay();
    }

    function updateScoreDisplay() {
     const plural = (cardsWon.length === 0 || cardsWon.length === 1) ? '' : 's';
        scoreDisplay.textContent = `${cardsWon.length} paire${plural} trouvée${plural}`;
        if (cardsWon.length === cardArray.length / 2) {
            clearInterval(timerId);
            endMessage.textContent = `Félicitations ! Vous avez découvert toutes les paires.`;
            startButton.style.visibility = 'visible';
            restartButton.style.display = 'block';
            startButton.textContent = 'Recommencer';
            isGameOver = true;
        }
    }

    function showPreview(imgSrc) {
        const preview = document.createElement('img');
        preview.src = imgSrc;
        preview.id = 'preview';
        document.body.appendChild(preview);
        setTimeout(() => {
            preview.remove();
        }, 4000);
    }

    startButton.addEventListener('click', () => {
        startGame();
    });

    restartButton.addEventListener('click', () => {
        resetGame();
    });

    function startGame() {
        isGameStarted = true;
        isGameOver = false;
        cardsChosen = [];
        cardsChosenIds = [];
        cardsWon = [];
        timeRemaining = 60;
        timerDisplay.textContent = '01:00';
        scoreDisplay.textContent = '0 paire trouvée';
        endMessage.textContent = '';
document.getElementById('instructions').style.display = 'none'; // Masquer les instructions
        startButton.style.visibility = 'hidden';
        restartButton.style.display = 'none';
        if (timerId) {
            clearInterval(timerId);
        }
        createBoard();
        timerId = setInterval(() => {
            timeRemaining -= 1;
            timerDisplay.textContent = formatTime(timeRemaining);
            if (timeRemaining <= 0) {
            clearInterval(timerId);
            const plural = (cardsWon.length === 0 || cardsWon.length === 1) ? '' : 's';
            endMessage.textContent = `Temps écoulé ! Vous avez trouvé ${cardsWon.length} paire${plural}.`;
            startButton.style.visibility = 'visible';
            startButton.textContent = 'Recommencer';
            isGameOver = true;
            }
        }, 1000);
    }

    function resetGame() {
        isGameStarted = false;
        isGameOver = false;
        cardsChosen = [];
        cardsChosenIds = [];
        cardsWon = [];
        timeRemaining = 60;
        timerDisplay.textContent = '01:00';
        scoreDisplay.textContent = '0 paire trouvée';
        endMessage.textContent = '';
        startButton.style.visibility = 'visible';
        restartButton.style.display = 'none';
        if (timerId) {
            clearInterval(timerId);
        }
        createBoard();
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    }

    createBoard();
});
