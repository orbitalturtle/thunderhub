const rewire = require('rewire');
const fs = require('fs');

let secureServ = require('./secure-server')
let rewiredServ = rewire('./secure-server');

let port = 8080;
let endpoint = "app.example.com";

const monkeyRequestValidation = (id, apiKey) => {
  throw new Error('=> [ssl] Failed to validate ssl certificate'); 
};

const monkeyValidateCert = () => {
  return false;
}

const monkeyRequestCert = () => {
  return {}
}

describe('Secure Server', () => {
  describe('validateCert', () => {
    beforeEach(() => {
          rewiredServ.__set__("requestValidation", monkeyRequestValidation)
    }); 
	  
    test('returns false if requesting validation of a cert fails multiple times', async () => {
      let data = {
	"validation": {
	  "other_methods": {
	    "app.example.com": {
       	      "file_validation_url_http": ""
	    }
          }
	} 
      }

      let resp = rewiredServ.validateCert(port, data, endpoint, "")
      resp.then(value => {
	expect(value).toBe(false)
      })
    });
  });

  describe('getCertificate', () => {
    beforeEach(() => {
          rewiredServ.__set__("requestCert", monkeyRequestCert)
	  rewiredServ.__set__("validateCert", monkeyValidateCert)
    });

    test('generates a selfsigned certificate if validation of a cert fails multiple times', async () => {
      let resp = await rewiredServ.getCertificate(endpoint, port, true, "test_selfsigned");
      expect(resp.certificate).toMatch(/-----BEGIN CERTIFICATE-----*/)
      expect(resp.privateKey).toMatch(/-----BEGIN RSA PRIVATE KEY-----*/)
      
      expect(() => fs.rmdirSync(__dirname + "/test_selfsigned", { recursive: true })).not.toThrow();
    });
  });
});
