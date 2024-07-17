/* hello,
I'm Supriyo 
this is a 2d game as a example project for my portfolio
feel free to use this code,
but do not resell it,
you can contribute my by giving me a star,
if this game has any kind of error or bug
then you post that error on github,
then we can do a conversation
feel free to flitch the repository

there are some use of howler js for the sound effects (sfx)
*/


// global var

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")

const canvasHeight = canvas.height = 2000
const canvasWidth = canvas.width = 2000

const paragraphOfWitch = document.querySelector('.paragraphOfWitch')
const nextImg = document.querySelector('img')
const paragraphOfWitch2 = document.querySelector('.paragraphOfWitch2')
const coins = document.querySelector('.coinsOfPlayer')
const boxOfSpeech = document.querySelector('.box')
const cornerOfBoxToSpeech = document.querySelector('.corner')

//declarying soundeffects as sfx

const sfx = {
  attack: new Howl({
    src: [
      '/assets/sounds/playerAttack.mp3'
    ]
  }),
  coinCollect: new Howl({
    src: [
      '/assets/sounds/coinCollect.mp3'
    ]
  }),
  bgm: new Howl({
    src: [
      '/assets/sounds/BGM.mp3'
    ],
    loop: true,
    autoplay: true
  })
}

// declarying let variables

let movementOfEnemyRandom 
let timeUsededForEnemyMove 
let defaultCoins = 0

// defining classes

// defining bg class

class Background {
  constructor({
    imageSrc,
    position,
    velocity,
    backgroundColor
  }) {
    this.image = new Image()
    this.image.src = imageSrc
    this.position = position
    this.velocity = velocity
    this.backgroundColor = backgroundColor
    this.height = canvasHeight
    this.width = canvasWidth
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.position.x
    this.position.y += this.position.y
  }
}

// defining player class
class Player {
  constructor({
    position,
    velocity,
    imageSrc,
    sprites,
    scale = 5,
    frameMax,
    offset = {
      x: 0,
      y: 0
    },
    attackBox,
    attackBoxColor = 'blue',
  }) {
    this.position = position
    this.velocity = velocity
    this.image = new Image()
    this.image.src = imageSrc
    this.height = this.image.height
    this.width = this.image.width
    this.sprites = sprites
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 8
    this.scale = scale
    this.frameMax = frameMax
    this.offset = offset
    this.dirX = -1
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y + 30
      },
      width: 130,
      height: 50,
      color: attackBoxColor,
    }
    this.charge = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  draw() {
    //console.log(this.image.height)
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.scale(this.dirX, 1)
    ctx.translate(-this.position.x, -this.position.y)
    ctx.drawImage(
      this.image,
      0,
      this.frameCurrent * (this.image.height / this.frameMax),
      this.image.width,
      this.image.height / this.frameMax,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width * this.scale,
      (this.image.height / this.frameMax) * this.scale
    )
    ctx.restore()
    //drawing the attack box
    //if you want to see the attack box then you can uncomment it
    //ctx.fillStyle = this.attackBox.color
    //ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
  }

  update() {
    this.draw()
    this.frameElapsed++
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.attackBox.position.y += this.velocity.y
    this.attackBox.position.x += this.velocity.x
  }

  charge() {
    this.charge = true
    setTimeout(() => {
      this.charge = false
    }, 100)
  }
}

class Witch {
  constructor({
    position,
    velocity,
    imageSrc,
    sprites,
    scale = 5,
    frameMax,
    offset = {
      x: 0,
      y: 0
    },
    //attackBox,
    attackBoxColor = 'blue',
  }) {
    this.position = position
    this.velocity = velocity
    this.image = new Image()
    this.image.src = imageSrc
    this.height = this.image.height
    this.width = this.image.width
    this.sprites = sprites
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 8
    this.scale = scale
    this.frameMax = frameMax
    this.offset = offset
    this.dirX = -1
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y + 30
      },
      width: 130,
      height: 50,
      color: attackBoxColor,
    }
    this.charge = false

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  draw() {
    //console.log(this.image.height)
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.scale(this.dirX, 1)
    ctx.translate(-this.position.x, -this.position.y)
    ctx.drawImage(
      this.image,
      0,
      this.frameCurrent * (this.image.height / this.frameMax),
      this.image.width,
      this.image.height / this.frameMax,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width * this.scale,
      (this.image.height / this.frameMax) * this.scale
    )
    ctx.restore()
    //drawing the attack box
    //if you want to see the attack box then you can uncomment it
    //ctx.fillStyle = this.attackBox.color
    //ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
  }

  update() {
    this.draw()
    this.frameElapsed++
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.attackBox.position.y += this.velocity.y
    this.attackBox.position.x += this.velocity.x
    //console.log(this.image.width / this.frameMax)
    //console.log(this.image.height / this.frameMax)
  }

  charge() {
    this.charge = true
    setTimeout(() => {
      this.charge = false
    }, 100)
  }
}


class Pown {
  constructor({
    position,
    velocity,
    imageSrc,
    sprites,
    scale,
    frameMax,
    offset,
    attackBoxColor
  }) {
    this.position = position
    this.velocity = velocity
    this.image = new Image()
    this.image.src = imageSrc
    this.height = this.image.height
    this.width = this.image.width / 4 //since this image sprite have 4 frames
    this.sprites = sprites
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 10
    this.scale = scale
    this.frameMax = frameMax
    this.offset = offset

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image()
      sprites[sprite].image.src = sprites[sprite].imageSrc
    }
  }

  draw() {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.scale(this.dirX, 1)
    ctx.translate(-this.position.x, -this.position.y)
    ctx.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    )
    ctx.restore()
  }

  update() {
    this.draw()
    this.frameElapsed++
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class PownPush {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 0,
      y: 0
    }
    this.crabEnemy = []
    this.randomEnemy = Math.floor(Math.random()) + 1
    for (var i = 0; i < this.randomEnemy; i++) {
      this.crabEnemy.push(
        new Pown({
          position: {
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
          },
          velocity: {
            x: 0,
            y: 0
          },
          imageSrc: '/assets/chees-pieces/GhastlyEye.png',
          sprites: {
            idle: {
              imageSrc: '/assets/chees-pieces/GhastlyEye.png',
              frameMax: 4
            }
          },
          scale: 3,
          frameMax: 4,
          offset: {
            x: 0,
            y: 0
          },
          attackBoxColor: 'red'
        })
      )
    }
  }
  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class BambooEnemy {
  constructor({
    position,
    imageSrc,
    scale,
    frameMax,
    offset,
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.height = this.image.height
    this.width = this.image.width //since this image sprite have 4 frames
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 4
    this.scale = scale
    this.frameMax = frameMax
    this.offset = offset
  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      this.frameCurrent * (this.image.height / this.frameMax),
      this.image.width / 4,
      this.image.height / this.frameMax,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      this.image.width / 4 * this.scale,
      (this.image.height / this.frameMax) * this.scale
    )
  }

  update() {
    this.draw()
    this.frameElapsed++
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        setTimeout(() => {
          this.frameCurrent++
        }, 0)
      } else {
        this.frameCurrent = 0
      }
    }
  }
}

class PlatformForWitch {
  constructor({
    position,
    imageSrc,
    scale,
    offset,
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.height = 75
    this.width = 96
    this.scale = scale
    this.offset = offset
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.position.x, 
      this.position.y,
      this.width * this.scale,
      this.height * this.scale
    )
  }

  update() {
    this.draw()
  }
}

class HealthBarPlayer {
  constructor({
    position,
    width,
    height,
    maxHealth,
    health,
    maxWidth,
    healthLeft,
    color = '#FF3900'
  }) {
    this.position = position
    this.width = width
    this.height = height
    this.maxHealth = maxHealth
    this.health = health
    this.maxWidth = maxWidth
    this.healthLeft = healthLeft
    this.color = color
  }

  draw() {
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.width = (this.health / this.maxHealth) * this.maxWidth
  }
}

class HealthHeartPlayer {
  constructor({
    position,
    imageSrc,
    scale = 2,
    frameMax,
    offset = {
      x: 0,
      y: 0
    }
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.height = this.image.height
    this.width = this.image.width / this.frameMax
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 8
    this.scale = scale
    this.frameMax = frameMax
    this.offset = offset
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    )
  }

  update() {
    this.draw()
    this.frameElapsed++
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }
}
class Coin {
  constructor({
    position,
    imageSrc,
    scale = 2,
    frameMax,
    offset = {
      x: 0,
      y: 0
    }
  }) {
    this.position = position
    this.image = new Image()
    this.image.src = imageSrc
    this.height = this.image.height
    this.width = this.image.width / this.frameMax
    this.frameCurrent = 0
    this.frameElapsed = 0
    this.frameHold = 8
    this.scale = scale
    this.frameMax = frameMax
    this.offset = offset
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    )
  }

  update() {
    this.draw()
    this.frameElapsed++
    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++
      } else {
        this.frameCurrent = 0
      }
    }
  }
}

class RedHealthBarPlayer {
  constructor({
    position,
    width,
    height
  }) {
    this.position = position
    this.width = width
    this.height = height
  }

  draw() {
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
  }
}

// defining those classes

const bg = new Background({
  imageSrc: '/assets/tileSet/1TileSet.png',
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  backgroundColor: '#1a5c28'
})

const player = new Player({
  position: {
    x: 400,
    y: 400
  },
  velocity: {
    x: 0,
    y: 0
  },
  imageSrc: '/assets/player/idle.png',
  frameMax: 5,
  scale: 2.5,
  offset: {
    x: 200,
    y: 0
  },
  sprites: {
    idle: {
      imageSrc: '/assets/player/idle.png',
      frameMax: 5
    },
    left: {
      imageSrc: '/assets/player/run.png',
      frameMax: 8
    },
    right: {
      imageSrc: '/assets/player/run.png',
      frameMax: 8
    },
    attack: {
      imageSrc: '/assets/player/attack.png',
      frameMax: 8
    },
    charge: {
      imageSrc: '/assets/player/charge.png',
      frameMax: 4
    },
    hit: {
      imageSrc: '/assets/player/hit.png',
      frameMax: 2
    },
    death: {
      imageSrc: '/assets/player/death.png',
      frameMax: 5
    }
  }
})

const witch = new Witch({
  position: {
    x: canvas.width / 2 + 75,
    y: canvas.height / 2 - 25
  },
  velocity: {
    x: 0,
    y: 0
  },
  imageSrc: '/assets/witch/B_witch_idle.png',
  sprites: {
    idle: {
      imageSrc: '/assets/witch/B_witch_idle.png',
      frameMax: 6
    }
  },
  scale: 4,
  frameMax: 6,
  offset: {
    x: 0,
    y: 0
  }
})

const pownPush = [new PownPush()]

const bambooEnemy = new BambooEnemy({
  position: {
    x: 1200,
    y: 400
  },
  imageSrc: '/assets/chees-pieces/bambooEnemy/SpriteSheet.png',
  scale: 5,
  frameMax: 4,
  offset: {
    x: 0,
    y: 0
  }
})

const platform = new PlatformForWitch({
  position: {
    x: canvas.width / 2 - 175,
  y: canvas.height / 2 - 25
  },
  imageSrc: '/assets/tileSet/structures/pltformForWitch.png',
  scale: 4,
  offset: {
    x: 0,
    y: 0
  }
})

const healthBarPlayer = new HealthBarPlayer({
  position: {
    x: 100,
    y: 50
  },
  width: 300,
  height: 30,
  maxHealth: 300,
  health: 300,
  maxWidth: 300,
  healthLeft: 300
})

const redHealthBarPlayer = new RedHealthBarPlayer({
  position: {
    x: 100,
    y: 50
  },
  width: 300,
  height: 30
})

const heartPlayer = new HealthHeartPlayer({
  position: {
    x: 70,
    y: 35
  },
  imageSrc: '/assets/heart_and_health/heart_rotate.png',
  scale: 2,
  frameMax: 12,
  offset: {
    x: 0,
    y: 0
  }
})

const coin = new Coin({
  position: {
    x: 75,
    y: 100
  },
  imageSrc: '/assets/coin/coin1_16x16.png',
  scale: 4,
  frameMax: 15,
  offset: {
    x: 0,
    y: 0
  }
})

// defining keys

const keys = {
  w: {
    isPressed: false
  },
  a: {
    isPressed: false
  },
  s: {
    isPressed: false
  },
  d: {
    isPressed: false
  },
  capsLock: {
    isPressed: false
  }
}

setInterval(() => {
  movementOfEnemyRandom = Math.floor(Math.random() * 4)
  timeUsededForEnemyMove = Math.floor(Math.random() * 5000) + 200
}, 4000)

let witchTextShow = true
let witchTextShow2 = false

//making function animate

sfx.bgm.play()

function animate() {
  requestAnimationFrame(animate)
  bg.update()
  coin.update()

  coins.style.left = coin.position.x + 'px'
  coins.style.top = (coin.position.y - 50) + 'px'
  coins.style.fontSize = 30 + 'px'

  cornerOfBoxToSpeech.style.left = 450 + 'px'
  cornerOfBoxToSpeech.style.top = 530 + 'px'
  cornerOfBoxToSpeech.style.display = 'none'

  boxOfSpeech.style.width = 450 + 'px'
  boxOfSpeech.style.height = 50 + 'px'
  boxOfSpeech.style.backgroundColor = 'white'
  boxOfSpeech.style.left = 160 + 'px'
  boxOfSpeech.style.top = 485 + 'px'
  boxOfSpeech.style.display = 'none'

  paragraphOfWitch.style.top = 510 + 'px'
  paragraphOfWitch.style.left = 350 + 'px'

  paragraphOfWitch2.style.top = 510 + 'px'
  paragraphOfWitch2.style.left = 380 + 'px'



  pownPush.forEach((crab) => {
    crab.update()
    crab.crabEnemy.forEach((enemy, i) => {
      enemy.update()

      enemy.velocity.x = 0
      enemy.velocity.y = 0

      if (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height &&
        keys.capsLock.isPressed
      ) {
        sfx.coinCollect.play()
        pownPush.splice(i, 1)
        healthBarPlayer.health += 0.2
        defaultCoins += 10
        coins.innerHTML = ':' + defaultCoins
      }

      if (
        player.position.x + player.width >= enemy.position.x &&
        player.position.x <= enemy.position.x + enemy.width &&
        player.position.y + player.height >= enemy.position.y &&
        player.position.y <= enemy.position.y + enemy.height
      ) {
        //console.log('true')
        healthBarPlayer.health -= 0.1
        player.image = player.sprites.hit.image
        player.frameMax = player.sprites.hit.frameMax
      }

      if (
        movementOfEnemyRandom === 0
      ) {
        setTimeout(() => {
          enemy.velocity.x = -2
          movementOfEnemyRandom++
        }, timeUsededForEnemyMove)
      }
      if (
        movementOfEnemyRandom === 1
      ) {
        setTimeout(() => {
          enemy.velocity.x = 2
          movementOfEnemyRandom++
        }, timeUsededForEnemyMove)
      }
      if (
        movementOfEnemyRandom === 2
      ) {
        setTimeout(() => {
          enemy.velocity.y = -2
          movementOfEnemyRandom++
        }, timeUsededForEnemyMove)
      }
      if (
        movementOfEnemyRandom === 3
      ) {
        setTimeout(() => {
          enemy.velocity.y = 2
          movementOfEnemyRandom--
        }, timeUsededForEnemyMove)
      }
    })
  })
  
  platform.update()
  witch.update()
  bambooEnemy.update()
  player.update()
  redHealthBarPlayer.update()
  healthBarPlayer.update()
  heartPlayer.update()

  //player.attackBox.position.x += player.position.x
  //player.attackBox.position.y += player.position.y + 50

  if (keys.w.isPressed) {
    player.velocity.y = -6
  } else if (keys.a.isPressed) {
    player.frameMax = player.sprites.left.frameMax
    player.offset.x = 148
    player.dirX = -1
    player.velocity.x = -6
    player.image = player.sprites.left.image
  } else if (keys.s.isPressed) {
    player.velocity.y = 6
  } else if (keys.d.isPressed) {
    player.velocity.x = 6
    player.dirX = 1
    player.frameMax = player.sprites.right.frameMax
    player.image = player.sprites.right.image
  } else if (keys.capsLock.isPressed) {
    player.image = player.sprites.attack.image
    player.frameMax = player.sprites.attack.frameMax
    setTimeout(() => {
      player.image = player.sprites.idle.image
    }, 9999999999)
  } else if (keys.capsLock.isPressed && keys.a.isPressed) {
    player.frameCurrent = 0
    player.dirX = -1
    player.image = player.sprites.attack.image
    player.frameMax = 8
  } else if (
    player.image === player.sprites.attack.image &&
    player.frameCurrent < player.sprites.attack.frameMax - 1
  )
    return
  else {
    player.frameCurrent = 0
    player.dirX = 1
    player.frameMax = player.sprites.idle.frameMax
    player.velocity.x = 0
    player.velocity.y = 0
    player.image = player.sprites.idle.image
  }

  if (healthBarPlayer.health <= 0) {
    console.log('death')
    player.image = player.sprites.death.image
    player.frameMax = player.sprites.death.frameMax
  }
  paragraphOfWitch.style.display = 'none'
  paragraphOfWitch2.style.display = 'none'
  nextImg.addEventListener("click", () => {
    witchTextShow = false
    witchTextShow2 = true
    paragraphOfWitch.style.display = 'none'
    nextImg.style.display = 'none'
    paragraphOfWitch2.style.display = 'block'
  })

  if (
    player.position.x + player.width >= witch.position.x &&
    player.position.x <= witch.position.x + witch.width &&
    player.position.y + player.height >= witch.position.y &&
    player.position.y <= witch.position.y + witch.height
  ) {
    cornerOfBoxToSpeech.style.display = 'block'
    boxOfSpeech.style.display = 'block'
    paragraphOfWitch.style.display = 'none'
    paragraphOfWitch2.style.display = 'none'
    if (witchTextShow) {
      paragraphOfWitch.style.display = 'block'
    }
    if (witchTextShow2) {
      paragraphOfWitch2.style.display = 'block'
    }
  }

}

// adding event listner

window.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case 'w':
      keys.w.isPressed = true
      lastKey = 'w'
      break
    case 'W':
      keys.w.isPressed = true
      lastKey = 'w'
      break
    case 'ArrowUp':
      keys.w.isPressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.isPressed = true
      break
    case 'A':
      keys.a.isPressed = true
      break
    case 'ArrowLeft':
      keys.a.isPressed = true
      break
    case 's':
      keys.s.isPressed = true
      lastKey = 's'
      break
    case 'S':
      keys.s.isPressed = true
      lastKey = 's'
      break
    case 'ArrowDown':
      keys.s.isPressed = true
      lastKey = 's'
      break
    case 'D':
      keys.d.isPressed = true
      lastKey = 'd'
      break
    case 'd':
      keys.d.isPressed = true
      lastKey = 'd'
      break
    case 'ArrowRight':
      keys.d.isPressed = true
      lastKey = 'd'
      break
    case 'CapsLock':
      keys.capsLock.isPressed = true
      sfx.attack.play()
      break
  }
  //console.log(ev.key)
})

window.addEventListener("keyup", (ev) => {
  switch (ev.key) {
    case 'w':
      keys.w.isPressed = false
      break
    case 'W':
      keys.w.isPressed = false
      break
    case 'ArrowUp':
      keys.w.isPressed = false
      break
    case 'a':
      keys.a.isPressed = false
      lastKey = 'a'
      break
    case 'A':
      keys.a.isPressed = false
      lastKey = 'a'
      break
    case 'ArrowLeft':
      keys.a.isPressed = false
      lastKey = 'a'
      break
    case 'S':
      keys.s.isPressed = false
      break
    case 's':
      keys.s.isPressed = false
      break
    case 'ArrowDown':
      keys.s.isPressed = false
      break
    case 'd':
      keys.d.isPressed = false
      break
    case 'D':
      keys.d.isPressed = false
      break
    case 'ArrowRight':
      keys.d.isPressed = false
      break
    case 'CapsLock':
      keys.capsLock.isPressed = false
      break
  }
})


// calling global function

animate()