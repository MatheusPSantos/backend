const EventEmitter = require('node:events');

class MusicPlayer extends EventEmitter {
    constructor() {
        super();
        this.playing = false;
    }
}

const musicPlayer = new MusicPlayer();

musicPlayer.on('play', (track) => {
    this.playing = true;
});

musicPlayer.on('stop', () => {
    this.playing = false;
});

musicPlayer.emit('play', (track) => {
    console.log('Track now playing:', track)
});

musicPlayer.emit('play', 'The roots - The fire');

setTimeout(() => {
    musicPlayer.emit('stop');
}, 1000);
