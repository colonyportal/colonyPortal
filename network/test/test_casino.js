const Casino = artifacts.require('Casino');
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

contract('casino', async (accounts) => {
    let casino;
    const fundingAccount = accounts[0];
    const bettingAccount = accounts[1];
    const fundingSize = 100;

    // build up and tear down a new Casino contract before each test
    beforeEach(async () => {
        casino = await Casino.new({from: fundingAccount});
        await casino.fund({from: fundingAccount, value: fundingSize});
        assert.equal(web3.eth.getBalance(casino.address).toNumber(), fundingSize);
    });

    afterEach(async () => {
        await casino.kill({from: fundingAccount});
    });

    it("should lose when bet on the wrong number", async () => {
        // given
        let betSize = 1;
        // we know what the winning number will be since we know the algorithm
        let betNumber = web3.eth.getBlock("latest").number % 10 + 1;

        // when
        let tx = await casino.bet(betNumber, {from: bettingAccount, value: betSize});

        // then
        // player should be the same as the betting account, and the betting number should not equal the winning number
        truffleAssert.eventEmitted(tx, 'PlayEvent', (ev) => {
            return ev.player === bettingAccount && ev.betNumber.eq(betNumber) && !ev.betNumber.eq(ev.winningNumber);
        });

        // there should be no payouts
        truffleAssert.eventNotEmitted(tx, 'PayoutEvent');

        // check the contract's balance
        assert.equal(web3.eth.getBalance(casino.address).toNumber(), fundingSize + betSize);
    });

    it("should win when bet on the right number", async() => {
        // given
        let betSize = 1;
        // we know what the winning number will be since we know the algorithm
        let betNumber = (web3.eth.getBlock("latest").number + 1) % 10 + 1;

        // when
        let tx = await casino.bet(betNumber, {from: bettingAccount, value: betSize});

        // then
        // player should be the same as the betting account, and the betting number should not equal the winning number
        truffleAssert.eventEmitted(tx, 'PlayEvent', (ev) => {
            return ev.player === bettingAccount && ev.betNumber.eq(betNumber) && ev.betNumber.eq(ev.winningNumber);
        });

        truffleAssert.eventEmitted(tx, 'PayoutEvent', (ev) => {
            return ev.winner === bettingAccount && ev.payout.toNumber() === 10 * betSize;
        });

        assert.equal(web3.eth.getBalance(casino.address).toNumber(), fundingSize + betSize - betSize * 10);
    });
});
