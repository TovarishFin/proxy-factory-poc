const Example = artifacts.require('./Example.sol')
const BigNumber = require('bignumber.js')

module.exports = deployer => {
  deployer
    .then(async () => {
      await deployer.deploy(Example)
      const exl = await Example.deployed()
      await exl.setup('ExampleToken', 'EXT', 18, new BigNumber('100e18'))

      return true
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
}
