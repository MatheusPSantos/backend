function Bomb() {
	this.message = "Boom!";
}

Bomb.prototype.explode = function () {
	console.log(this.message);
};

let bomb = new Bomb();

let timeoutId = setTimeout(bomb.explode.bind(bomb), 1000);

clearTimeout(timeoutId);

