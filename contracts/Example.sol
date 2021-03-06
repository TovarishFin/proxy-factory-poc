pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";


contract Example is StandardToken {
  string public name;
  string public symbol;
  uint256 public decimals;
  bool public hasSetup;

  function setup(
    string _name,
    string _symbol,
    uint256 _decimals,
    uint256 _totalSupply
  )
    external
  {
    require(!hasSetup);
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    totalSupply_ = _totalSupply;
    hasSetup = true;
  }
}
