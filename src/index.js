import SerialPort from 'serialport';
import Promise from 'bluebird';
import { validate, createMessage } from './helpers';
import { commands, replies } from './message';

Promise.promisifyAll(SerialPort);
let PORT = null;
let SCANNING = false;

function write(data) {
    return PORT.writeAsync(data)
    .then(() => PORT.drainAsync());
}

function scan(predicate, data) {
    const scanWhile = () => {
        if (!predicate) return;
        return Promise.resolve(write(data)).then(scanWhile);
    };
    return Promise.resolve().then(scanWhile);
}

export function connect(device) {
    return new Promise(resolve => {
        PORT = new SerialPort(device, {
            parser: SerialPort.parsers.byteDelimiter(0xBB)
        }, resolve);
        Promise.promisifyAll(PORT);
    });
}

export function list() {
    return SerialPort.listAsync();
}

export function mifareUID() {
    SCANNING = true;
    return new Promise((resolve) => {
        PORT.on('data', (response) => {
            const hexValues = response.map(decimal => decimal.toString(16));
            const stationId = hexValues[1];
            const length = hexValues[2];
            const status = hexValues[3];
            const flag = hexValues[4];
            const data = hexValues.slice(5, parseInt(length, 16) + 3);
            const checksum = hexValues[hexValues.length - 2];
            const valid = validate([stationId, length, status, flag, ...data], checksum);

            if (replies[status] === 'OK' && valid) {
                SCANNING = false;
                PORT.removeAllListeners();
                const mifareUidString = data.map(value => value.toString(16));
                resolve(mifareUidString.join(':'));
            }
        });

        scan(SCANNING, createMessage(commands.MIFARE.GET_SNR, [0x26, 0x00]));
    });
}
