const zlib = require('zlib');

let database = [[], [], [], [], [], [], [], []];
let bitmasks = [1, 2, 4, 8, 16, 32, 64, 128];

function store(buf) {
  let db = buf[0];
  let key = buf.readUInt8(1);

  if (buf[2] === 0x78) {
    zlib.inflate(buf.slice(2), function (error, inflatedBuf) {
      if (error) return console.error(error);
      let data = inflatedBuf.toString();

      bitmasks.forEach(function (bitmask, index) {
        if ((db & bitmask) === bitmask) {
          database[index][key] = data;
        }
      });
    });
  }
}