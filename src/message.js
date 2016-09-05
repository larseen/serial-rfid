/* eslint-disable */

export const commands = {
    BUZZER: 0x89,
    MIFARE: {
        GET_SNR: 0x25
    }
};

export const replies = {
    '0': 'OK',
    '1': 'ERROR',
    '83': 'NO CARD',
    '87': 'UNKNOWN INTERNAL ERROR',
    '85': 'UNKNOWN COMMAND',
    '84': 'RESPONSE ERROR',
    '82': 'READER TIMEOUTE',
    '90': 'CARD DOES NOT SUPPORT THIS COMMAND',
    '8f': 'UNNSUPPORTED CARD IN NFC WRITE MODE'
};
