"use strict";
/**
 * @fileoverview This file stores the configuration object required for
 *     Stately.js. It represents the state machine that composes the bot.
 */
var regex = require('./regex.js');
var STATES = require('./states.json');
var State = require('./State.js');

var room_price, room_num;

function getResponsesByKeys(responses) {
  return responses.map(response => STATES[response]);
}

module.exports = {
  "GREETING": new State({
    onEnter: function() {
      return ['GREETING', JSON.stringify(['GREETING']) ]
    },
    onInput: function(message) {
      if (message.search(regex.no) >= 0) {
        return ['NO_HELP', JSON.stringify(['NO_HELP'])];
      } else if (message.search(regex.faq) >= 0) {
        return ['FAQ', JSON.stringify(['HELP'])];
      } else {
        return ['GREETING', JSON.stringify(['I_DONT_UNDERSTAND', 'GREETING']) ];
      }
    }
  }),
  "FAQ": new State({
    onEnter: function(){

    },
    onInput: function(message){
      if (message.search(regex.viewing) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'VIEWING'])];
      } else if (message.search(regex.deposit) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'SECURITY_DEPOSIT'])];
      } else if (message.search(regex.pet) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'PET_FRIENDLY'])];
      } else if (message.search(regex.utilities) >= 0) {
        return ['FAQ', JSON.stringify(['MORE_HELP', 'UTILITIES'])];
      }else if (message.search(regex.no) >= 0) {
        return ['NO_HELP', JSON.stringify(['NO_HELP'])];
      }else{
        return ['FAQ', JSON.stringify(['I_DONT_UNDERSTAND', 'FAQ']) ];
      }
    }
  })
};
