'use strict';

window.scrollTo(0, 0);

const $parent = document.querySelector('body');
const $buttons = document.querySelector('.button__block');
const $tabloid = document.querySelector('#ChosenCar');
const $tabloidAfter = document.querySelector('#tabloidAfter');
const $ad = document.querySelector('#ad');
const $musicPlayer = document.querySelector('.music-player');

const BLUE_CAR = '../images/SimpleBlue.svg';
const GREEN_CAR = '../images/SimpleBrightGreen.svg';
const DARKBLUE_CAR = '../images/SimpleDarkBlue.svg';
const PINK_CAR = '../images/SimplePinkCar.svg';

const track1 = '../music/track_1.mp3'; 
const track2 = '../music/track_2.mp3';
const track3 = '../music/track_3.mp3';
const track4 = '../music/track_4.mp3';
const track5 = '../music/track_5.mp3';
const track6 = '../music/track_6.mp3';
const track7 = '../music/track_7.mp3';
const track8 = '../music/track_8.mp3';
const sound1 = '../music/car-sound-1.mp3';
const sound2 = '../music/car-sound-2.mp3';
const sound3 = '../music/car-sound-3.mp3';
const sound4 = '../music/car-sound-4.mp3';

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const music = [track1, track2, track3, track4, track5, track6, track7, track8];
const sounds = [sound1, sound2, sound3, sound4];

const randomTrack = random(music);
const randomSound = random(sounds);

class Car {
  constructor(x, y, pic, value) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.pic = pic;
    this.speed = 15;
    this.speedValue;

    this.drawCar();

    this.position = 0;
    this.positionValue;
  };

  drawCar = () => {
    this.$carTag = document.createElement('img');
    this.$carTag.src = this.pic;
    
    this.$carTag.style.width = '200px';
    this.$carTag.style.position = 'absolute';
    this.$carTag.style.left = `${this.x}px`;
    this.$carTag.style.top = `${this.y}px`;

    $parent.append(this.$carTag);
  };

  moveRight = () => {
    this.speedValue = Math.floor(Math.random() * (this.speed));
    this.x += this.speedValue;
    this.$carTag.style.left = `${this.x}px`;

    carSound.play();
  };
}

class Sound {
  constructor(src) {
    this.$carNoise = document.createElement('audio');
    this.$carNoise.src = src;
    this.$carNoise.setAttribute = ('preload', 'auto');
    this.$carNoise.setAttribute = ('controls', 'none');
    this.$carNoise.style.display = 'none';

    $parent.append(this.$carNoise);
  }
  
  play = () => {
    this.$carNoise.play();
  };

  stop = () => {
    this.$carNoise.pause();
  };
};

const blue = new Car(0, 10, BLUE_CAR, 'Blue');
const green = new Car(0, 130, GREEN_CAR, 'Green');
const darkBlue = new Car(0, 245, DARKBLUE_CAR, 'Dark Blue');
const pink = new Car(0, 360, PINK_CAR, 'Pink');
const carSound = new Sound(randomSound);

$musicPlayer.src = randomTrack;
  
let statistics = [];
let index = null;
let choice = '';
let racePercents = null;

const chosenCar = obj => {
  obj.textContent = `Your car is ${choice}`;

  fadeIn(obj);
  
  switch (choice) {
    case 'Blue':
      obj.style.color = '#32bffe';
      break;
    case 'Green':
      obj.style.color = '#affe14';
      break;
    case 'Dark Blue':
      obj.style.color = '#3278fe';
      break;
    default:
      obj.style.color = '#fe32e8';
  }
};

const raceProgress = (obj, objAfter) => {
  racePercents = Math.floor(statistics[index] * 100 / 30000);
  objAfter.textContent = racePercents;
};

const moveParameter = list => {
  let indexArray = 0;
  let max = list[0];

  for (let i in list) {
    list[i] > max && (max = list[i], indexArray = i);
  }

  return indexArray;
};

const startDrive = timerArgument => {
  blue.moveRight();
  green.moveRight();
  darkBlue.moveRight();
  pink.moveRight();

  statistics = [blue.x, green.x, darkBlue.x, pink.x];
  
  index = moveParameter(statistics, index);

  raceProgress($tabloid, $tabloidAfter);
  window.scrollTo(statistics[index] - 1000, 0);

  if (statistics[index] >= 30000) {
    clearInterval(timerArgument);

    const winner = block => {
      fadeIn(block);

      block.style.position = 'fixed';
      block.style.zIndex = '10';
      block.style.top = '25%';
      block.style.fontSize = '80px';
      block.style.color = '#eac84c';

      block.textContent = `Congratulations, ${choice} Car won!!!`;
    };

    const loser = block => {
      fadeIn(block);

      block.style.position = 'fixed';
      block.style.zIndex = '10';
      block.style.top = '25%';
      block.style.fontSize = '80px';
      block.style.color = '#c90000';
      
      block.textContent = `Your ${choice} Car lose!`;
    }

    if (blue.x >= 30000) {
      blue.value === choice ? winner($ad) : loser($ad);
    } else if (green.x >= 30000) {
      green.value === choice ? winner($ad) : loser($ad);
    } else if (darkBlue.x >= 30000) {
      darkBlue.value === choice ? winner($ad) : loser($ad);
    } else if (pink.x >= 30000) {
      pink.value === choice ? winner($ad) : loser($ad);
    }

    fadeOut($tabloid);
    fadeOut($tabloidAfter);
    setTimeout(endButton, 2000);
  }
};

const fadeOut = obj => {
  const arr = ['0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0'];
  let actionTimeout = 20;

  obj.style.opacity = '1';

  arr.forEach((number, index) => {
    setTimeout(() => obj.style.opacity = number, actionTimeout * index);
  });
};

const fadeIn = obj => {
  const arr = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'];
  let actionTimeout = 20;

  obj.style.opacity = '0';

  arr.forEach((number, index) => {
    setTimeout(() => obj.style.opacity = number, actionTimeout * index);
  });
};

const raceTimer = () => {
  let timer = setInterval(() => startDrive(timer), 2);
};

const countdown = block => {
  const arr = [3, 2, 1, 'GO!'];
  let actionTimeout = 1000;

  arr.forEach((number, index) => {
    setTimeout(() => block.textContent = number, actionTimeout * index);
  });
};

const endButton = () => {
  const $parentBlock = document.querySelector('.form__placer');
  const $refresh = document.createElement('button');

  $parentBlock.style.display = 'flex';
  $parentBlock.style.justifyContent = 'center';  
  $refresh.style.position = 'fixed';
  $refresh.style.fontFamily = 'Neon';
  $refresh.style.color = 'palevioletred';
  $refresh.style.borderRadius = '50%';
  $refresh.style.width = '150px';
  $refresh.style.height = '150px';
  $refresh.style.fontSize = '32px';
  $refresh.style.border = 'none';
  $refresh.style.backgroundColor = 'white';
  $refresh.style.marginTop = '54px';
  $refresh.style.opacity = '0';
  $refresh.textContent = 'Try again';

  $parentBlock.append($refresh);

  fadeIn($refresh);

  $refresh.addEventListener('click', () => location.reload());
};

$buttons.addEventListener('click', ({ target }) => {
  if (target.type === 'button') {
    choice = target.value;

    fadeOut($buttons);
    fadeOut($tabloid);

    setTimeout(() => {
      $buttons.style.display = 'none';

      countdown($ad);
      chosenCar($tabloid);
      
      setTimeout(raceTimer, 3000)
    }, 1000);
  }
});