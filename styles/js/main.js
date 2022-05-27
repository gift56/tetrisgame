document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const scorceDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#startBtn');
    let square = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;

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

    let randomTetra = Math.floor(Math.random() * mainTetramino.length);
    let current = mainTetramino[randomTetra][currentRotation]

    const drawTetramino = () => {
        current.forEach(index => {
            square[currentPosition + index].classList.add('tetramino')
        })
    }

    const unDrawTetramino = () => {
        current.forEach(index => {
            square[currentPosition + index].classList.remove('tetramino')
        })
    }
});