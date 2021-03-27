const KEYS = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'];
const STEP = 20;

const heroDOM = document.querySelector('#panacek');
const coinDOM = document.querySelector('#mince');
const scoreDOM = document.querySelector('#score');
const hudba = document.querySelector('#hudba');
const zvukMince = document.querySelector('#zvukmince');
const zvukFanfara = document.querySelector('#zvukfanfara');

const windowWidth = parseInt(document.documentElement.clientWidth);
const windowHeight = document.documentElement.clientHeight;

const getElementParameters = ({ x, y, width, height }) => {
  return {
    x,
    y,
    width,
    height,
  };
};
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const changeCoinPosition = function () {
  coin.x = getRandomNumber(0, windowWidth - coin.width);
  coin.y = getRandomNumber(0, windowHeight - coin.height);
};

let score = 0;
const hero = getElementParameters(heroDOM.getClientRects()[0]);
const coin = getElementParameters(coinDOM.getClientRects()[0]);

const renderNewPosition = function (
  element,
  top = undefined,
  left = undefined
) {
  if (top) {
    element.style.top = top + 'px';
  }
  if (left) {
    element.style.left = left + 'px';
  }
};

const isIntersecting = () => {
  return !(
    hero.x + hero.width < coin.x ||
    coin.x + coin.width < hero.x ||
    hero.y + hero.height < coin.y ||
    coin.y + coin.height < hero.y
  );
};

const move = function (direction, step = STEP) {
  heroDOM.src = `./obrazky/panacek-${direction}.png`;
  if (direction === 'down') {
    hero.y = hero.y + hero.height + step >= windowHeight ? 0 : hero.y + step;
    renderNewPosition(heroDOM, hero.y);
  } else if (direction === 'up') {
    hero.y = hero.y - step <= 0 ? windowHeight - hero.height : hero.y - step;
    renderNewPosition(heroDOM, hero.y);
  } else if (direction === 'left') {
    hero.x = hero.x - step <= 0 ? windowWidth - hero.width : hero.x - step;
    renderNewPosition(heroDOM, undefined, hero.x);
  } else if (direction === 'right') {
    hero.x = hero.x + hero.width + step >= windowWidth ? 0 : hero.x + step;
    renderNewPosition(heroDOM, undefined, hero.x);
  }

  if (isIntersecting()) {
    zvukMince.play();
    changeCoinPosition();
    renderNewPosition(coinDOM, coin.y, coin.x);
    score++;
    scoreDOM.textContent = score;

    if (score === 5) {
      zvukFanfara.play();
      alert('Vyhrala jsi!');
    }
  }
};

hero.x = 200;
hero.y = 200;
changeCoinPosition();
renderNewPosition(coinDOM, coin.y, coin.x);
renderNewPosition(heroDOM, hero.y, hero.x);
document.addEventListener('keydown', function (event) {
  if (!KEYS.includes(event.key)) return;
  const direction = event.key.toLowerCase().replace('arrow', '');
  move(direction, STEP);
});
