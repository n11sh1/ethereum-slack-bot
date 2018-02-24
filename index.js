if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

if (!process.env.eth_network) {
    console.log('Error: Specify eth_network in environment');
    process.exit(1);
}

var Botkit = require('botkit');
let fs = require('fs')

var controller = Botkit.slackbot({
    debug: false
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

var Eth = require('web3-eth');
var eth = new Eth(Eth.givenProvider || process.env.eth_network);

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || process.env.eth_network);

controller.hears(['coinbase'],['direct_mention'], function(bot, message) {

    web3.eth.getCoinbase()
        .then(function(address) {
            var coinbase = address;
            bot.reply(message, 'coinbaseのアドレスは *' + coinbase + '* です。');
        });

});
