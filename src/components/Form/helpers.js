import produce from 'immer';
import { elsterStNrFormatter } from './validators';

export function formatStNrForELSTER(stnr, taxOffice) {
  if (taxOffice.charAt(0) === '2' || taxOffice.substring(0, 2) === '11') {
    return stnr
      .replace(/\/|\s/g, '')
      .replace(
        elsterStNrFormatter[taxOffice.substring(0, 2)].match,
        elsterStNrFormatter[taxOffice.substring(0, 2)].replace
      );
  } else {
    return stnr
      .replace(/\/|\s/g, '')
      .replace(
        elsterStNrFormatter[taxOffice.charAt(0)].match,
        elsterStNrFormatter[taxOffice.charAt(0)].replace
      );
  }
}

export function getNextVATDeadline(userData, lang) {
  const formatter = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { d, m, y } = userData.taxInfoFields.startdate;
  let nextVATDeadline = new Date(y, parseInt(m, 10) - 1, d);
  if (nextVATDeadline < new Date()) nextVATDeadline = new Date();

  if (nextVATDeadline.getDate() > 10) {
    nextVATDeadline.setMonth(nextVATDeadline.getMonth() + 1);
  }
  nextVATDeadline.setDate(10);

  return {
    vatDeadline: formatter.format(nextVATDeadline),
    showChargeVat: !!userData.taxInfoFields.chargeVAT,
  };
}

export function flatten2DObject(obj) {
  const newObj = {};
  Object.entries(obj).forEach((el) =>
    Object.entries(el[1]).forEach((item) => (newObj[item[0]] = item[1]))
  );
  return newObj;
}

/**
 *
 * @param {string} ticket
 * @param {Object} userData User Data Fields
 * @returns
 */

export function generateWebSignupPayLoad(ticket, userData) {
  const payload = {
    rasoRef: ticket,
    firstName: userData.personalFields.firstname,
    lastName: userData.personalFields.name,
    email: userData.personalFields.email,
    phoneNumber: userData.personalFields.phone,
  };
  if (userData.taxEstimateFields.profitGewerbetreibender)
    payload['accountType'] = 'gewerbetreibender_principal';
  else payload['accountType'] = 'freiberufler_principal_vat';

  if (userData.taxInfoFields.chargeVAT) {
    payload['VATReturnFrequency'] = 'monthly';
    payload['VATType'] = 'subjectToVAT';
  } else {
    //klein
    payload['VATReturnFrequency'] = 'quarterly';
    payload['VATType'] = 'noVAT';
    payload['noVATStatus'] = 'franchisee';
  }
  const b64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, '');

  return b64;
}

/**
 *
 * @param {number} n Number to Wrap
 * @param {number} min Minimum Value
 * @param {number} max Maximum Value
 * @returns {number}
 */
export function wrap(n, min, max) {
  if (typeof n !== 'number') n = sanitizeNumbers(n);

  if (n < min) return max;
  if (n > max) return min;

  return n;
}

/**
 *
 * @param {string|number} string
 * @returns
 */
export function sanitizeNumbers(string, nodecimal) {
  if (typeof string === 'number') return string;

  if (nodecimal) {
    return parseInt(`${string}`.replace(/\D|,|\./g, ''), 10);
  } else {
    return parseInt(`${string}`.replace(/\D/g, ''), 10);
  }
}

function formatDates(obj) {
  Object.entries(obj).forEach((entry) => {
    if (/\d\d\.\d\d\.\d\d\d\d/g.test(entry[1])) {
      const dateSections = entry[1].split('.');
      obj[entry[0]] = {
        d: dateSections[0],
        m: dateSections[1],
        y: dateSections[2],
      };
    }
  });

  return obj;
}

function reFormatDates(obj) {
  const newObj = produce(obj, (draft) => {
    Object.entries(draft).forEach((entry) => {
      if (entry[1].d && entry[1].m && entry[1].y) {
        draft[entry[0]] = `${entry[1].d}.${entry[1].m}.${entry[1].y}`;
      } else if (entry[1].d === '' && entry[1].m === '' && entry[1].y === '') {
        draft[entry[0]] = ``;
      }
    });
  });

  return newObj;
}

function formatYesNo(obj) {
  Object.entries(obj).forEach((entry) => {
    if (/\bno\b|001/i.test(entry[1])) {
      obj[entry[0]] = false;
    } else if (/\byes\b/i.test(entry[1])) {
      obj[entry[0]] = true;
    }
  });

  return obj;
}
function formatGender(obj) {
  Object.entries(obj).forEach((entry) => {
    if (/\female/gi.test(entry[1])) {
      console.log(`entry - female`, entry);
      obj[entry[0]] = 2;
    }
    if (/\bmale\b/gi.test(entry[1])) {
      console.log(`entry - male`, entry);
      obj[entry[0]] = 1;
    }
  });

  return obj;
}

function formatNumbers(obj) {
  Object.entries(obj).forEach((entry) => {
    // Is Money
    if (typeof entry[1] === 'string' && /€/gi.test(entry[1])) {
      obj[entry[0]] = sanitizeNumbers(entry[1], true);
    } else if (
      typeof entry[1] === 'string' &&
      /^[0-9]+(\.|\,)?[0-9]*/.test(entry[1])
    ) {
      // Is number-as-string (preserve "0" str padding etc)
      obj[entry[0]] = entry[1].replace(/\D/gi, '');
    } else {
      obj[entry[0]] = entry[1];
    }
  });
  return obj;
}

// Only for Dev
export function threeDJsonToPostmanXwwwForm(obj) {
  return Object.entries(obj)
    .map((key) => {
      if (typeof key[1] === 'object') {
        return Object.entries(key[1])
          .map((nestedKey) => {
            if (typeof nestedKey[1] === 'object') {
              return Object.entries(nestedKey[1])
                .map((nestedKey2) => {
                  return `${key[0]}[${nestedKey[0]}][${nestedKey2[0]}]:${nestedKey2[1]}\n`;
                })
                .join('\n');
            }
            return `${key[0]}[${nestedKey[0]}]:${nestedKey[1]}\n`;
          })
          .join('\n');
      }

      return `${key[0]}:${key[1]}`;
    })
    .join('\n');
}

function formatStrNumber(obj) {
  if (obj.steuernummer_value)
    obj.steuernummer_value = formatStNrForELSTER(
      obj.steuernummer_value,
      obj.steuernummer_state
    );

  return obj;
}

/**
 *
 * @param {Object} obj Raw User Data
 * @returns Object - Flattened User Data
 * @description Pass in raw user data (from context) and receive formatted for Elster Api Wrapper
 */
export const formatforAPICall = (obj) => {
  console.log(
    'formated',
    formatNumbers(formatGender(formatDates(formatYesNo(flatten2DObject(obj)))))
  );
  return formatStrNumber(
    formatNumbers(formatGender(formatDates(formatYesNo(flatten2DObject(obj)))))
  );
};

export const formatDatasection = (obj) => formatDates(obj);
export const reFormatForFormData = (obj) => reFormatDates(obj);
