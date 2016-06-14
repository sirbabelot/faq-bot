"use strict";
/**
 * @fileoverview This file stores the configuration object required for
 *     Stately.js. It represents the state machine that composes the bot.
 */
var regex = require('./regex.js');
var STATES = require('./states.json');
var State = require('./State.js');
const luis = require('./luis.js');


var room_price, room_num;

function getResponsesByKeys(responses) {
  return responses.map(response => STATES[response]);
}

module.exports = {
  "GREETING": new State({
    onEnter() {
      return ['FAQ', JSON.stringify(['GREETING']) ]
    }
  }),
  "FAQ": new State({
    onInput(message){
      let self = this;
      luis
        .query(message)
        .then((result) => {
          console.log('INTENT', result.intents[0].intent);
        })
        .catch(err => console.log(wrr));


      if (message.search(regex.viewing) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'VIEWING'])];
      } else if (message.search(regex.deposit) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'SECURITY_DEPOSIT'])];
      } else if (message.search(regex.pet) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'PET_FRIENDLY'])];
      } else if (message.search(regex.utilities) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'UTILITIES'])];
      }else if (message.search(regex.no) >= 0) {
        return ['FAQ', JSON.stringify(['NO_HELP'])];
      }else{
        return ['FAQ', JSON.stringify(['I_DONT_UNDERSTAND']) ];
      }
    }
  })
};
