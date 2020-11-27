window.scrollTo(0, 0);

const $parent = document.querySelector('body'),
  $buttons = document.querySelector('.button__block'),
  $tabloid = document.querySelector('#ChosenCar'),
  $tabloidAfter = document.querySelector('#tabloidAfter'),
  $ad = document.querySelector('#ad'),
  $musicPlayer = document.querySelector('.music-player');

`#${Math.floor(Math.random() * 16777215).toString(16)}`; //  рандомный цвет

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const BLUE_CAR = '../images/SimpleBlue.svg',
  GREEN_CAR = '../images/SimpleBrightGreen.svg',
  DARKBLUE_CAR = '../images/SimpleDarkBlue.svg',
  PINK_CAR = '../images/SimplePinkCar.svg';

const track1 = '../music/Lil Jon The East Side Boyz feat Ying Yang Twins - Get Low.mp3', 
  track2 = '../music/The Crystal Method - Born Too Slow (Album Version).mp3',
  track3 = '../music/Linkin Park - Faint.mp3',
  track4 = '../music/Static-X - The Only.mp3',
  track5 = '../music/Rob Zombie - Two-Lane Blacktop.mp3',
  track6 = '../music/Andy Hunter - The Wonders of You.mp3',
  track7 = '../music/Jerk - Sucked In.mp3',
  track8 = '../music/Story of the Year - And the Hero Will Drown.mp3',
  sound1 = '../music/car-sound-1.mp3',
  sound2 = '../music/car-sound-2.mp3',
  sound3 = '../music/car-sound-3.mp3',
  sound4 = '../music/car-sound-4.mp3';

const music = [track1, track2, track3, track4, track5, track6, track7, track8],
  sounds = [sound1, sound2, sound3, sound4];

const randomTrack = random(music),
  randomSound = random(sounds);

//console.log(randomTrack);

const posY = [10, 130, 245, 360];
const randomPos = random(posY);  //  рандмоное положение машинки, плохо работает.

class Car {
  constructor(x, y, pic, value) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.pic = pic;
    this.speed = 15;
    this.speedValue;
    this.drawCar();

    //--------------------//
    this.position = 0;
    this.positionValue;
  }  //  создаем машинку

  drawCar() {
    this.$carTag = document.createElement('img');
    this.$carTag.src = this.pic;
    
    this.$carTag.style = (
      `width: 200px; 
      position: absolute;
      left: ${this.x}px;
      top: ${this.y}px`
    );
    // this.$carTag.style.width = '200px';
    // this.$carTag.style.position = 'absolute';
    // this.$carTag.style.left = `${this.x}px`;
    // this.$carTag.style.top = `${this.y}px`;

    $parent.append(this.$carTag);
  }  // рисуем машинку

  moveRight() {
    this.speedValue = Math.floor(Math.random() * (this.speed));
    this.x += this.speedValue;
    this.$carTag.style.left = `${this.x}px`;
    carSound.play();
//---------------------------------------------//  
    // this.y += Math.floor(Math.random() * (this.positionValue));
    // this.$carTag.style.top += `${randomPos}px`;
    // this.$carTag.style.down -= `${randomPos}px`;
  } // езда машинки
}

class sound {
  constructor(src) {
    this.$carNoise = document.createElement('audio');
    this.$carNoise.src = src;
    this.$carNoise.setAttribute = ('preload', 'auto');
    this.$carNoise.setAttribute = ('controls', 'none');
    this.$carNoise.style.display = 'none';

    $parent.append(this.$carNoise);
    this.play = () => {
      this.$carNoise.play();
    };
    this.stop = () => {
      this.$carNoise.pause();
    };
  }
} // звук машинки 

const blue = new Car(0, 10, BLUE_CAR, 'Blue'),
  green = new Car(0, 130, GREEN_CAR, 'Green'),
  darkBlue = new Car(0, 245, DARKBLUE_CAR, 'Dark Blue'),
  pink = new Car(0, 360, PINK_CAR, 'Pink'),
  carSound = new sound(randomSound);

$musicPlayer.src = randomTrack;  //  рандомный муз трек
  
let statistics = [],
  index = null,
  choice = '',
  racePercents = null;

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

const raceProgress = (obj, objAfter) => { //!! obj - обязательно принимать, иначе баги!!
  racePercents = Math.floor(statistics[index] * 100 / 30000);
  objAfter.textContent = racePercents;
};

const moveParameter = list => {
  let indexArray = 0;
  let max = list[0];
  for (let i in list) {  // !! for...of - не применять, иначе баги!!
    list[i] > max && (max = list[i], indexArray = i);
  }

  return indexArray;
};

const startDrive = timerArgument => {
  blue.moveRight();
  green.moveRight();
  darkBlue.moveRight();
  pink.moveRight();

  statistics = [
    blue.x,
    green.x,
    darkBlue.x,
    pink.x,
  ];
  
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

    blue.x >= 30000 ? (blue.value === choice ? winner($ad) : loser($ad)) :
      green.x >= 30000 ? (green.value === choice ? winner($ad) : loser($ad)) :
        darkBlue.x >= 30000 ? (darkBlue.value === choice ? winner($ad) : loser($ad)) :
          (pink.value === choice ? winner($ad) : loser($ad));

    // если будут баги, использовать код ниже  

    // if (blue.x >= 30000) {
    //   blue.value === choice ? winner($ad) : loser($ad);
    // } else if (green.x >= 30000) {
    //   green.value === choice ? winner($ad) : loser($ad);
    // } else if (darkBlue.x >= 30000) {
    //   darkBlue.value === choice ? winner($ad) : loser($ad);
    // } else if (pink.x >= 30000) {
    //   pink.value === choice ? winner($ad) : loser($ad);
    // }

    fadeOut($tabloid);
    fadeOut($tabloidAfter);
    setTimeout(endButton, 2000);
  }
} //  тут сама гонка

const fadeOut = obj => {
  obj.style.opacity = '1';
  const arr = ['0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0'];
  actionTimeout = 20;
  arr.forEach((number, index) => {
    setTimeout(() => {
      obj.style.opacity = number;
    }, actionTimeout * index);
  }); //  fadeOut
}

const fadeIn = obj => {
  obj.style.opacity = '0';
  const arr = ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'];
  actionTimeout = 20;
  arr.forEach((number, index) => {
    setTimeout(() => {
      obj.style.opacity = number;
    }, actionTimeout * index);
  });
} //  fadeIn

const raceTimer = () => {
  let timer = setInterval(() => {
    startDrive(timer);
  }, 2);
} //  интервал езды

const countdown = block => {
  let actionTimeout = 1000;
  const arr = [3, 2, 1, 'GO!'];
  arr.forEach((number, index) => {
    setTimeout(() => {
      block.textContent = number;
    }, actionTimeout * index);
  }); //  отчет до начала гонки
}

const endButton = () => {
  const $parentBlock = document.querySelector('.form__placer');
  $parentBlock.style.display = 'flex';
  $parentBlock.style.justifyContent = 'center';

  const $refresh = document.createElement('button');
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

  fadeIn($refresh); //  кнопка try again

  $refresh.addEventListener('click', () => location.reload()); // что за location.reload() ?
}

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