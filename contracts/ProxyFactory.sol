pragma solidity 0.4.23;


// props to GNSPS
// code taken from https://gist.github.com/GNSPS/ba7b88565c947cfd781d44cf469c2ddb#file-proxyfactory-sol-L60
contract ProxyFactory {
  event ProxyDeployed(address proxyAddress, address targetAddress);

  function createProxy(address _target)
    public
    returns (address proxyContract)
  {
    assembly {
      let contractCode := mload(0x40) // Find empty storage location using "free memory pointer"
      
      mstore(add(contractCode, 0x0b), _target) // Add target address, with a 11 bytes [i.e. 23 - (32 - 20)] offset to later accomodate first part of the bytecode
      mstore(sub(contractCode, 0x09), 0x000000000000000000603160008181600b9039f3600080808080368092803773) // First part of the bytecode, shifted left by 9 bytes, overwrites left padding of target address
      mstore(add(contractCode, 0x2b), 0x5af43d828181803e808314602f57f35bfd000000000000000000000000000000) // Final part of bytecode, offset by 43 bytes

      proxyContract := create(0, contractCode, 60) // total length 60 bytes
      if iszero(extcodesize(proxyContract)) {
        revert(0, 0)
      }
    }

    emit ProxyDeployed(proxyContract, _target);
  }
}