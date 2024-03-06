
//VOLUME MUSICA DE FUNDO
const cfMusicSound = {
    volume: 0.1,
}
//VOLUME MUSICA DOS PREMIOS
const cfWinSound = {
    volume: 0.1,
}
//VOLUME MUSICA MAIS CREDITOS
const cfWinMcr = {
    volume: 0.09,
}
//VOLUME MUSICA NOVA CHANCE
const cfWinNch = {
    volume: 0.09,
}
//VOLUME MUSICA BONUS
const cfWinBns = {
    volume: 0.09,
}
//TEXTO LOADING 
const cfTextLoading = {
    fontFamily: 'Arial',
    fill: ['#ffffff'],
    fontSize: 50,
    fontWeight: 'bold',
    lineJoin: 'round',
    strokeThickness: 12,
}

const Cf = {
    H: {
        background: {
            image: 'backgroundGameH',
        },
        serpentina: {
            image: 'serpentina',
            x: 960,
            y: 850
        },
        extratora: {
            x: 0,
            y: -300
        },
        cartela: [
            {
                x: 100,
                y: 125,
            },
            {
                x: 1300,
                y: 125
            },
            {
                x: 100,
                y: 447,
            },
            {
                x: 1300,
                y: 447
            },

        ],
        btnPlay: {
            x: 1750,
            y: 900
        },
        btnAuto: {
            x: 1560,
            y: 930
        },
        btnChangeCards: {
            x: 350,
            y: 930
        },
        credito: {
            x: 1260,
            y: 980
        },
        premio: {
            x: 960,
            y: 980
        },
        id: {
            x: 10,
            y: 830
        }
    },
    V: {
        background: {
            image: 'backgroundGameV',
        },
        serpentina: {
            image: 'serpentina',
            x: 540,
            y: 1300
        },
        extratora: {
            x: 0,
            y: -300
        },
        cartela: [
            {
                x: 5,
                y: 225,
            },
            {
                x: 545,
                y: 225
            },
            {
                x: 5,
                y: 547,
            },
            {
                x: 545,
                y: 547
            },

        ],
        btnPlay: {
            x: 540,
            y: 1570
        },
        btnAuto: {
            x: 740,
            y: 1600
        },
        btnChangeCards: {
            x: 340,
            y: 1600
        },
        credito: {
            x: 140,
            y: 1800
        },
        premio: {
            x: 940,
            y: 1800
        },
        id: {
            x: 20,
            y: 1580
        }
    },
    celulas: [
        { x: 13, y: 40 },
        { x: 115, y: 40 },
        { x: 217, y: 40 },
        { x: 319, y: 40 },
        { x: 421, y: 40 },

        { x: 13, y: 115 },
        { x: 115, y: 115 },
        { x: 217, y: 115 },
        { x: 319, y: 115 },
        { x: 421, y: 115 },

        { x: 13, y: 190 },
        { x: 115, y: 190 },
        { x: 217, y: 190 },
        { x: 319, y: 190 },
        { x: 421, y: 190 },
    ],
    bolas: [
        { x: 470, y: 35, width: 60, height: 60 },
        { x: -470, y: 35, width: 60, height: 60 },
        { x: 400, y: 35, width: 60, height: 60 },
        { x: -400, y: 35, width: 60, height: 60 },
        { x: 330, y: 35, width: 60, height: 60 },
        { x: -330, y: 35, width: 60, height: 60 },
        { x: 260, y: 35, width: 60, height: 60 },
        { x: -260, y: 35, width: 60, height: 60 },
        { x: 190, y: 35, width: 60, height: 60 },
        { x: -190, y: 35, width: 60, height: 60 },
        { x: 120, y: 35, width: 60, height: 60 },
        { x: -120, y: 35, width: 60, height: 60 },
        { x: 50, y: 35, width: 60, height: 60 },
        { x: -50, y: 35, width: 60, height: 60 },

        { x: 470, y: -35, width: 60, height: 60 },
        { x: -470, y: -35, width: 60, height: 60 },
        { x: 400, y: -35, width: 60, height: 60 },
        { x: -400, y: -35, width: 60, height: 60 },
        { x: 330, y: -35, width: 60, height: 60 },
        { x: -330, y: -35, width: 60, height: 60 },
        { x: 260, y: -35, width: 60, height: 60 },
        { x: -260, y: -35, width: 60, height: 60 },
        { x: 190, y: -35, width: 60, height: 60 },
        { x: -190, y: -35, width: 60, height: 60 },
        { x: 120, y: -35, width: 60, height: 60 },
        { x: -120, y: -35, width: 60, height: 60 },
        { x: 50, y: -35, width: 60, height: 60 },
        { x: -50, y: -35, width: 60, height: 60 },
        { x: 0, y: 0, width: 60, height: 60 },
        { x: 0, y: 0, width: 60, height: 60 },
    ]
}