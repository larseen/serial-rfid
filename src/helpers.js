
export function validate(data, checksum) {
  data = data.map(item => parseInt(item, 16));
  const calculatedChecksum = data.reduce((previousValue, currentValue) => previousValue ^ currentValue);
  return Math.abs(calculatedChecksum % 255) === parseInt(checksum, 16);
}

function calculateChecksum(command, data) {
  const payload = [data.length + 1, command, ...data];
  const checksum = payload.reduce((previousValue, currentValue) => previousValue ^ currentValue);
  return [...payload, checksum];
}

export function createMessage(command, data) {
  const payload = calculateChecksum(command, data)
  return new Buffer([0xAA, 0x00, ...payload, 0xBB]);
}
