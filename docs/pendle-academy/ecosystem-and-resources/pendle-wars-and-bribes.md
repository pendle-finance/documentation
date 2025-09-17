import Hint from '@site/src/components/Hint';

# Pendle Wars & "Bribes"

> The information on this page was last updated: 2023-10-12

**“Pendle Wars”** is a term used to describe the competition for influence in the Pendle ecosystem among different platforms, like Penpie, Equilibria and StakeDAO, to accumulate \$PENDLE token and liquidity on Pendle. The goal of these projects is to **accumulate** **vePENDLE** by locking more \$PENDLE, which they can use to boost their yields on Pendle and pass them on to users.

### **What is vePENDLE?**

The vote-escrowed PENDLE (vePENDLE) is a locked version of the PENDLE token. It grants:

* Holders a share of the revenue generated on Pendle,
* Increases yield to LP positions (boosting) and
* Channeling of \$PENDLE emissions.

<Hint style="info">
💡 [Learn more about vePENDLE](https://docs.pendle.finance/ProtocolMechanics/Mechanisms/vePENDLE) in the documentation.
</Hint>

However, vePENDLE is not liquid, meaning that it is not transferrable until the lock period expires. This creates an opportunity for other platforms to offer alternative solutions that allow users to enjoy the benefits of vePENDLE without locking their tokens.

## Current major contenders in the Pendle Wars

* **Penpie** ([https://www.pendle.magpiexyz.io/](https://www.pendle.magpiexyz.io/))
* **Equilibria** ([https://equilibria.fi/](https://equilibria.fi/))
* **StakeDAO** ([https://lockers.stakedao.org/lockers/pendle](https://lockers.stakedao.org/lockers/pendle) or [https://beta.stakedao.org/lockers/pendle](https://beta.stakedao.org/lockers/pendle))

StakeDAO is Ethereum mainnet only, while Penpie and Equilibria are deployed on multiple chains.

<Hint style="info">
💡 **DISCLAIMER:** Please note that these projects are managed by external parties that are _not_ part of the Pendle team, _nor_ officially endorsed by Pendle. As always, **do your own research** and **understand your risks** when interacting with different protocols in DeFi.
</Hint>

### What do these platforms offer to Pendle users?

Different platforms offer various benefits to Pendle users, such as:

* Increasing yield (**APR boost**) on Pendle LP positions
* Governance rights over Pendle Finance and revenue sharing without locking \$PENDLE themselves
  * these platforms issue liquid wrapped version of vePENDLE (e.g. \$mPendle, \$ePendle, \$sdPendle) which also shares revenue on _their_ platforms
  * these platforms also issue their own governance tokens which can be locked to share governance rights and revenue over Pendle
* Earning **“Bribes”** as they vote to direct the flow of rewards to different Pendle pools
  * users typically need to obtain the vote-locked version of _their_ governance tokens to be able to vote and earn “bribes”
* Accessing other exclusive features and platform specific benefits, if any

### Pendle Wars Statistics

There are some interesting information to look at about Pendle Wars, such as:

1. The current distribution of vePENDLE among different platforms
2. The current and historical liquid wrapper pegs (i.e. the exchange rate of the liquid wrapper token against the ordinary version \$PENDLE)
3. The vote-locked percentage of the governance tokens of different platforms

Here are some of the community-created Pendle Wars statistics/visualisation:

1. DefiWars ([https://www.defiwars.xyz/wars/pendle](https://www.defiwars.xyz/wars/pendle))
2. Dune Analytics ([https://dune.com/coumarin/pendle-war](https://dune.com/coumarin/pendle-war))

***

## What are “Bribes”?

In the context of governance in DeFi protocols, “bribes” in voting refer to rewards offered to governance token holders in exchange for their votes on proposals. These rewards can be in the form of tokens, fees, or other incentives that aim to influence the outcome of the vote.

Despite the common name “bribes”, it’s important to note that these rewards can be seen as a legitimate way to incentivize participation and engagement in governance.

For Pendle, **“bribes” refer to the rewards offered to vePENDLE voters in exchange for their votes in Pendle’s gauge voting system**. The gauge voting system is used to direct the flow of rewards to different Pendle pools. By participating in voting, vePENDLE holders may earn rewards offered by other projects that have liquidity pool on Pendle.

### How to earn “Bribes”?

Currently, “bribes” are usually offered to the vePENDLE controlled by Penpie and Equilibria, so access to “bribes” is available only through the bribery markets on Penpie and Equilibria. However, this may change in the future if projects are willing to offer “bribes” directly to other vePENDLE holders.

To access the bribery markets on Penpie and Equilibria, you need to hold their vote-locked (vl-)tokens, namely vlPNP or vlEQB. These vl-tokens give voting rights and protocol revenue to their holders.

Here are the **active bribery markets** targeting Pendle’s gauge voting system:

* Penpie’s bribery market: [https://www.pendle.magpiexyz.io/bribe](https://www.pendle.magpiexyz.io/bribe)
* Equilibria’s bribery market: [https://equilibria.fi/vote](https://equilibria.fi/vote) & [https://hiddenhand.finance/equilibria](https://hiddenhand.finance/equilibria)

Please refer to each project’s documentation for more information on how each vote-locked token and bribery market works.

### Why do projects offer “Bribes”?

The TVL behind these vl-tokens is typically much less than the actual value of vePENDLE these protocols control. This creates leverage on the voting power controlled by these vl-tokens. As a result, a relatively small amount of “bribes” is enough to drive a large number of votes to flow to the target pool, thereby significantly increasing the \$PENDLE incentive flowing to the pool.

Therefore, it is much more capital-efficient for other projects to bribe voters than to directly emit token rewards to the LP pools. According to the tweet by Pendle Intern ([https://x.com/PendleIntern/status/1706240227776606528?s=20](https://x.com/PendleIntern/status/1706240227776606528?s=20)), based on a study made on Sep 25, 2023, the efficiency was as good as \$400 - \$2300 of \$PENDLE voted per \$1 bribed.

<figure><img src="/pendle-academy/imgs/image (26).png" alt="" /><figcaption><p>Bribe efficiency on Equilibria’s bribery market, as of Sep 25, 2023</p></figcaption></figure>

<figure><img src="/pendle-academy/imgs/image (27).png" alt="" /><figcaption><p>Bribe efficiency on Penpie’s bribery market, as of Sep 25, 2023</p></figcaption></figure>

### Conclusion

In conclusion, “bribes” are rewards offered to vePENDLE holders in exchange for their votes in the Gauge Voting system. Equilibria and Penpie offer different tokens (vlEQB and vlPNP) that give voting rights and protocol revenue. Protocols that have liquidity on Pendle Finance are very keen to buy votes from these platforms, as they can get more PENDLE emissions on their liquidity. After voting in the Gauge Voting or bribery market, vePENDLE holders can earn a vote reward from Pendle and a potential bribe reward from other protocols.
