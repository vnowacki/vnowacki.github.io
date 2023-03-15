const MAX_SPEED = .02;

export default class Paddle {
    constructor(object) {
        this.paddleObject = object;
        this.reset();
    }

    get position() {
        return parseFloat(getComputedStyle(this.paddleObject).getPropertyValue("--position"));
    }

    set position(value) {
        this.paddleObject.style.setProperty("--position", value);
    }

    reset() {
        this.position = 50;
    }

    rect() {
        return this.paddleObject.getBoundingClientRect();
    }

    update(delta, ballPosition) {
        this.position += MAX_SPEED * delta * (ballPosition - this.position);
    }
}