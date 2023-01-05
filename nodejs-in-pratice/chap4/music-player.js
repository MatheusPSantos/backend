const EventEmitter = require('node:events');

class MusicPlayer extends EventEmitter {
    constructor() {
        super();
        this.playing = false;
    }
}

const AudioDevice = {
    play: (track) => { },
    stop: () => { }
};

const musicPlayer = new MusicPlayer();

musicPlayer.on('play', (track) => {
    this.playing = true;
    AudioDevice.play(track);
});

musicPlayer.on('stop', () => {
    this.playing = false;
    AudioDevice.stop();
});

musicPlayer.emit('play', 'The Roots - The Fire');

setTimeout(() => {
    musicPlayer.emit('stop');
}, 1000);
