const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = .00001;

export default class Ball {
    constructor(object) {
        this.ballObject = object;
        this.reset();
    }

    get x() {
        return parseFloat(getComputedStyle(this.ballObject).getPropertyValue("--x"));
    }

    set x(value) {
        this.ballObject.style.setProperty("--x", value);
    }

    get y() {
        return parseFloat(getComputedStyle(this.ballObject).getPropertyValue("--y"));
    }

    set y(value) {
        this.ballObject.style.setProperty("--y", value);
    }

    rect() {
        return this.ballObject.getBoundingClientRect();
    }

    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            let heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects, board) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        let rect = this.rect();
        let boardRect = board.getBoundingClientRect();

        if(rect.bottom >= boardRect.bottom || rect.top <= boardRect.top) { this.direction.y *= -1;}

        if(paddleRects.some(r => isCollision(r, rect))) { this.direction.x *= -1;}
    }
}

const randomNumberBetween = (min, max) => {
    return Math.random() * (max - min) + min;
}

const isCollision = (rect1, rect2) => {
    return rect1.left <= rect2.right && rect1.right >= rect2.left && rect1.top <= rect2.bottom && rect1.bottom >= rect2.top;
}