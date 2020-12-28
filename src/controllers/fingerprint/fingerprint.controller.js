const Fingerprint2 = require('fingerprintjs2');
const UAParser = require('ua-parser-js');

const getFingerprint = () => {
  return new Promise((resolve, reject) => {
    async function getHash() {
      const options = {
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true,
        },
        preprocessor: (key, value) => {
          if (key === 'userAgent') {
            const parser = new UAParser(value);
            // return customized user agent (without browser version)
            return `${parser.getOS().name} :: ${parser.getBrowser().name} :: ${
              parser.getEngine().name
            }`;
          }
          return value;
        },
      };

      try {
        const components = await Fingerprint2.getPromise(options);
        const values = components.map(component => component.value);
        console.log('fingerprint hash components', components);

        return String(Fingerprint2.x64hash128(values.join(''), 31));
      } catch (e) {
        reject(e);
      }
    }

    // if (window.requestIdleCallback) {
    //   console.log('requestIdleCallback');
    // requestIdleCallback(async () => resolve(await getHash()));
    // } else {
    //   console.log('setTimeout');
      setTimeout(async () => resolve(await getHash()), 500);
    // }
  });
};
const wrapper = async (req, res) => {
  var fingerPrint;
  await getFingerprint().then(fingerprint => {
    fingerPrint = fingerprint;
  });
  sendFingerPrint(res, fingerPrint);
};
const sendFingerPrint = (res, fingerPrint) => {
  res.  send(fingerPrint);
};
module.exports = wrapper;
