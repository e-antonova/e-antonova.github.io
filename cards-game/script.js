// объявление переменных
const difficulty = {
        easy: 3,
        medium: 6,
        hard: 10
    };

const easyContainer = `<div class="game__easy  cards">
        <div class="game__easy-wrap  cards__container"></div>
    </div>`;
const mediumContainer = `<div class="game__medium  cards">
        <div class="game__medium-wrap  cards__container"></div>
    </div>`;
const hardContainer = `<div class="game__hard  cards">
        <div class="game__hard-wrap  cards__container"></div>
    </div>`;
const card = `<div class="cards__wrap" id="#">
        <div class="cards__back"></div>
        <div class="cards__front"></div>
    </div>`;

const menu = document.getElementById('menu');
const field = document.getElementsByClassName('game')[0];

let canPlay = true;

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

// для выбора карты
function pickCard(bug) {
    if(canPlay === true) {
        let cardPicture = this.querySelectorAll('.cards__front')[0];
        if (Number(this.getAttribute('id')) === bug) {
            cardPicture.classList.replace('cards__front', 'cards__bug');
        }
        this.classList.add('active');
        canPlay = false;
    } else {
    // для перезагрузки игры
        field.innerHTML = '';
        menu.classList.remove('hidden');
        canPlay = true;
    }
};

function play() {
    // скрываем меню, определяем сложность и заполняем поле картами
    menu.classList.add('hidden');
    const radiobtn = document.querySelectorAll('input[type=radio]:checked')[0];
    const level = radiobtn.getAttribute('value');
    switch (level) {
        case 'easy':
            field.innerHTML = easyContainer;
            break;
        case 'medium':
            field.innerHTML = mediumContainer;
            break;
        case 'hard':
            field.innerHTML = hardContainer;
            break;
    };
    
    const cardsAmount = difficulty[level];
    let cards = '';
    const container = document.getElementsByClassName('cards__container')[0];
    for(let i = 1; i <= cardsAmount; i++) {
        cards += card.replace('#', i);
    };
    container.innerHTML = cards;

    // получаем случайное число для бага
    const bug = random(1, cardsAmount + 1);

    const wrapCards = document.querySelectorAll('.cards__wrap');

    wrapCards.forEach(oneCard => {
        oneCard.addEventListener('click', pickCard.bind(oneCard, bug));
    });
};

const btn = document.getElementById('button');
btn.addEventListener('click', play);