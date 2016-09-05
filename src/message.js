

export const commands = {
  BUZZER: 0x89,
  MIFARE: {
    GET_SNR: 0x25
  }
}


export const reverse_replies = {
  OK: 'OK',
  ERROR: 'ERROR',
}


export const replies = {
  '0': 'OK',
  '1': 'ERROR',
  '83': 'NO CARD', // eslint-disable-line
  '87': 'UNKNOWN INTERNAL ERROR', // eslint-disable-line
  '85': 'UNKNOWN COMMAND', // eslint-disable-line
  '84': 'RESPONSE ERROR', // eslint-disable-line
  '82': 'READER TIMEOUTE', // eslint-disable-line
  '90': 'CARD DOES NOT SUPPORT THIS COMMAND', // eslint-disable-line
  '8f': 'UNNSUPPORTED CARD IN NFC WRITE MODE'
}
