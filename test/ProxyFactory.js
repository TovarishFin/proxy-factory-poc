const assert = require('assert')
const Example = artifacts.require('./Example.sol')
const ProxyFactory = artifacts.require('./ProxyFactory.sol')
const BigNumber = require('bignumber.js')

describe('when deploying Example through ProxyFactory', () => {
  contract('ProxyFactory', () => {
    const name = 'ExampleCoin'
    const symbol = 'EXL'
    const decimals = new BigNumber(18)
    const totalSupply = new BigNumber(100e18)

    // Example Master
    let exm
    // Example Proxy
    let exp
    // ProxyFactory
    let pfy

    before('setup contracts', async () => {
      exm = await Example.new()
      pfy = await ProxyFactory.new()
    })

    it('should deploy an Example contract', async () => {
      const tx = await pfy.createProxy(exm.address, 0)

      const { proxyAddress, targetAddress } = tx.logs[0].args

      exp = await Example.at(proxyAddress)

      assert.equal(
        exm.address,
        targetAddress,
        'the master should be the same as exm'
      )
    })

    it('should setup', async () => {
      await exp.setup(name, symbol, decimals, totalSupply)
    })

    it('should start with the correct values after setup', async () => {
      const actualName = await exp.name()
      const actualSymbol = await exp.symbol()
      const actualDecimals = await exp.decimals()
      const actualTotalSupply = await exp.totalSupply()

      assert.equal(
        name,
        actualName,
        'actualName should match name given in constructor'
      )
      assert.equal(
        symbol,
        actualSymbol,
        'actualSymbol should match symbol given in constructor'
      )
      assert.equal(
        decimals.toString(),
        actualDecimals.toString(),
        'actualDecimals should match decimals given in constructor'
      )
      assert.equal(
        totalSupply.toString(),
        actualTotalSupply.toString(),
        'actualTotalSupply should match totalSupply given in constructor'
      )
    })
  })
})
