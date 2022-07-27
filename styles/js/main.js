document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startBtn');
    let square = Array.from(document.querySelectorAll('.grid div'));
    const displaySquare = document.querySelectorAll('.miniGrid div');
    const displayWidth = 4;
    let displayIndex = 0;
    let nextRandom = 0;
    const width = 10;
    let timerId;
    let score = 0;
    const colors = ['orange', 'red', 'purple', 'yellow', 'green'];

    const tetraminoLshape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ]

    const tetraminoTshape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1],
    ]

    const tetraminoZshape = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ]

    const tetraminoIshape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
    ]

    const tetraminoOshape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
    ]

    const mainTetramino = [tetraminoLshape, tetraminoZshape, tetraminoTshape, tetraminoOshape, tetraminoIshape]

    let currentPosition = 4;
    let currentRotation = 0;

    //generating random shape from our array length
    let random = Math.floor(Math.random() * mainTetramino.length);
    let current = mainTetramino[random][currentRotation]

    const drawTetramino = () => {
        current.forEach(index => {
            square[currentPosition + index].classList.add('tetramino')
            square[currentPosition + index].style.background = colors[random]
        })
    }

    const unDrawTetramino = () => {
        current.forEach(index => {
            square[currentPosition + index].classList.remove('tetramino')
            square[currentPosition + index].style.background = '';
        })
    }

    // keyboard functions
    const control = (e) => {
        if (e.keyCode === 37 || e.keycode === 'ArrowRight') {
            leftMovement();
        }
        else if (e.keyCode === 38 || e.keyCode === 'ArrowUp') {
            rotate();
        }
        else if (e.keyCode === 39 || e.keyCode === 'ArrowRight') {
            rightMovement();
        }
        else if (e.keyCode === 40 || e.keyCode === 'ArrowDown') {
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    // Downward movement
    const moveDown = () => {
        unDrawTetramino();
        currentPosition += width;
        drawTetramino();
        freezeTetramino();
    }

    // freeze tetramino function
    const freezeTetramino = () => {
        if (current.some(index => square[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => square[currentPosition + index].classList.add('taken'))
            // new tetramino shape falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * mainTetramino.length)
            current = mainTetramino[random][currentRotation]
            currentPosition = 4;
            addScore();
            drawTetramino();
            displayShape();
            gameOver();
        }
    }

    // movement of the tetramino
    const leftMovement = () => {
        unDrawTetramino();
        const isLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isLeftEdge) currentPosition -= 1

        if (current.some(index => square[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        drawTetramino();
    }

    const rightMovement = () => {
        unDrawTetramino();
        const isRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isRightEdge) currentPosition += 1

        if (current.some(index => square[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        drawTetramino();
    }

    const rotate = () => {
        unDrawTetramino();
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = mainTetramino[random][currentRotation]
        drawTetramino();
    }

    const upNextTetramino = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // LTetramino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // ZTetramino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //Ttetramino
        [0, 1, displayWidth, displayWidth + 1], //OTetramino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] //ITetramino
    ]

    // showing the minGrid function
    const displayShape = () => {
        displaySquare.forEach(square => {
            square.classList.remove('tetramino');
            square.style.background = '';
        })
        upNextTetramino[nextRandom].forEach(index => {
            displaySquare[displayIndex + index].classList.add("tetramino")
            displaySquare[displayIndex + index].style.background = colors[nextRandom]
        })
    }

    // targeting the start and pause button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            timerId = null;
            clearInterval(timerId);
        }
        else {
            drawTetramino();
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * mainTetramino.length)
            displayShape();
        }
    });

    const addScore = () => {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9,]

            if (row.every(index => square[index].classList.contains("taken"))) {
                score += 10
                scoreDisplay.innerHTML = score;

                row.forEach(index => {
                    square[index].classList.remove('taken')
                    square[index].classList.remove('tetramino')
                    square[index].style.background = '';
                })
                const squareRemove = square.splice(i, width)
                square = squareRemove.concat(square);
                square.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    const gameOver = () => {
        if (current.some(index => square[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'GameOver'
            clearInterval(timerId)
        }
    }
});
