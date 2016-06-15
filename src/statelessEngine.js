"use strict";
const luis = require('./luis.js');
const responses = require('./faq/responses.json');


function computeResponse(message) {
  return luis
    .query(message)
    .then((result) => {
      console.log('INTENT2', result.intents[0].intent);
      let responseKey = [result.intents[0].intent];
      return [responses[responseKey]]
    })
    .catch(err => console.log(wrr));
}

module.exports = { computeResponse };
