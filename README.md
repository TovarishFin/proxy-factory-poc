# proxy factory proof of concept
based off of [gnosis safe-contracts](https://github.com/gnosis/safe-contracts)

Need the following contracts

1. master copy
    * code for deployed contract is copied from here (cannot have constructor)
1. proxy
    * deployed normally with constructor
    * used to forward calls on to master copy
1. proxy factory
    * deploys new proxy contracts which point to a master copy