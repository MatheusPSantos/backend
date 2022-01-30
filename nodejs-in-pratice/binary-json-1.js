const fs = require('fs');

fs.readFile('./world.dbf', function (error, buf) {
  //Buffer.isBuffer(buf);
  console.log(buf.toString());

  let header = {};
  let date = new Date();
  date.setUTCFullYear(1900 + buf[1]);
  date.setUTCMonth(buf[2]);
  date.setUTCDate(buf[3]);
  header.lastUpdated = date.toUTCString();

  header.totalRecords = buf.readUInt32LE(4);

  header.bytesInHeader = buf.readUInt16LE(8);
  header.bytesPerRecord = buf.readUInt16LE(10);

  console.log('\nheader << ', header)

  let fields = [];
  let fieldOffset = 32;
  let fieldTerminator = 0x0D;
  7
  let FIELD_TYPES = {
    C: 'Character',
    N: 'Numeric'
  };

  while (buf[fieldOffset] != fieldTerminator) {
    let fieldBuf = buf.slice(fieldOffset, fieldOffset + 32);

    let field = {};
    field.name = fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, '');
    field.type = FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)];
    field.length = fieldBuf[16];
    fields.push(field);
    fieldOffset += 32;
  }

  let startingRecordOffset = header.bytesInHeader;
  let records = [];

  for (let i = 0; i < header.totalRecords; i++) {
    let recordOffset = startingRecordOffset + (i * header.bytesPerRecord);
    let record = {};

    record._isDel = buf.readUInt8(recordOffset) == 0x2A;
    recordOffset++;

    for (let j = 0; j < fields.length; j++) {
      field = fields[j];
      let Type = field.type === 'Numeric' ? Number : String;
      record[field.name] = Type(buf.toString('utf8', recordOffset, recordOffset + field.length).trim());
      records.push(record);
    }

    console.log({ header, fields, records })
  }
});