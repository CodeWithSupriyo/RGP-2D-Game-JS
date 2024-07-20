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

// defining bg class


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
    this.randomEnemy = Math.floor(Math.random() * 3) + 1
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
    this.frameHold = 12
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