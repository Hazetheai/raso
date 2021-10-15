import querystring from 'querystring';
import { sendAmplitudeData } from './amplitude';
// Functions
const faCookieExp = 90;
const faProgramID = '3654';

const Cookie = {
  set: function (name, value, days) {
    var domain, domainParts, date, expires, host;

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }

    host = window.location.host;
    if (host.split('.').length === 1) {
      document.cookie = name + '=' + value + expires + '; path=/';
    } else {
      domainParts = host.split('.');
      domainParts.shift();
      domain = '.' + domainParts.join('.');

      document.cookie =
        name + '=' + value + expires + '; path=/; domain=' + domain;

      if (Cookie.get(name) == null || Cookie.get(name) != value) {
        domain = '.' + host;
        document.cookie =
          name + '=' + value + expires + '; path=/; domain=' + domain;
      }
    }
  },

  get: function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  erase: function (name) {
    Cookie.set(name, '', -1);
  },
};
const qs = querystring.parse(window.location.search.substr(1));

export const FAlogEvent = (faCategory = '', faOrderID = '') => {
  try {
    //Save params in cookie
    if (typeof qs['s_id'] !== 'undefined') {
      var t = qs['s_id'].split('X', 2);
      var werbeParams = t[1].split('C', 2);
      var faAdvData = {
        sid: qs['s_id'],
        wfid: werbeParams[0],
      };
      Cookie.set('faSID', faAdvData.sid, faCookieExp);
      window.localStorage.setItem('faAdvData', JSON.stringify(faAdvData));
    }

    if (typeof faProgramID !== 'undefined' && faProgramID != '') {
      if (typeof faValue === 'undefined' || faValue == '') {
        var faValue = '';
      }

      if (typeof faName === 'undefined' || faName == '') {
        var faName = '';
      }

      if (faOrderID == 'use_timestamp') {
        var faOrderID = Math.round(+new Date() / 1000);
      } else if (faOrderID == 'use_klickid') {
        if (Cookie.get('faSID') !== null) {
          var klickID = Cookie.get('faSID').split('X', 2);
          var faOrderID = klickID[0];
        } else if (localStorage.getItem('faAdvData') !== null) {
          var klickID = localStorage.getItem('faAdvData').split('X', 2);
          var faOrderID = klickID[0];
        } else {
          var faOrderID = Math.round(+new Date() / 1000);
        }
      }
      let data = '';

      if (Cookie.get('faSID') !== null) {
        data =
          'p=' +
          faProgramID +
          '&oid=' +
          faOrderID +
          '&ocategory=' +
          faCategory +
          '&oname=' +
          faName +
          '&ovalue=' +
          faValue +
          '&s_id=' +
          Cookie.get('faSID');
      } else if (localStorage.getItem('faAdvData') !== null) {
        var faAdvData = JSON.parse(localStorage.getItem('faAdvData'));
        data =
          'p=' +
          faProgramID +
          '&oid=' +
          faOrderID +
          '&ocategory=' +
          faCategory +
          '&oname=' +
          faName +
          '&ovalue=' +
          faValue +
          '&s_id=' +
          faAdvData.sid;
      }//No cookie no log

      if (data){
        fetch(`https://www.financeads.net/tl.php?${data}`, {
          method: 'GET',
          cache: 'default',
        });
        sendAmplitudeData('WEB_SIGNUP_SOURCE_AFFILATE', {
          source: 'FinanceAds',
          id: faOrderID,
          category: faCategory,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
