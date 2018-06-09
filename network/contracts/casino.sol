pragma solidity 0.4.23;

contract Casino {
    address public owner;

    event PlayEvent(address player, uint256 betSize, uint8 betNumber, uint8 winningNumber);
    event PayoutEvent(address winner, uint256 payout);

    constructor() public {
        owner = msg.sender;
    }

    function kill() external {
        require(msg.sender == owner, "Only the owner can kill this contract.");
        selfdestruct(owner);
    }

    function fund() external payable {}

    function bet(uint8 number) external payable {
        require(msg.value <= getMaxBet(), "Bet amount can not exceed max bet size.");
        require(msg.value > 0, "A bet should be placed.");

        uint8 winningNumber = generateWinningNumber();
        emit PlayEvent(msg.sender, msg.value, number, winningNumber);

        if (number == winningNumber) {
            payout(msg.sender, msg.value * 10);
        }
    }

    function getMaxBet() public view returns (uint256) {
        return address(this).balance / 100;
    }

    function generateWinningNumber() internal view returns (uint8) {
        // Don't do this in production
        return uint8(block.number % 10 + 1);
    }

    function payout(address winner, uint256 amount) internal {
        assert(amount > 0);
        assert(amount <= address(this).balance);

        winner.transfer(amount);
        emit PayoutEvent(winner, amount);
    }
}
