import Hint from '@site/src/components/Hint';

# 第 3 章 - 开仓与平仓

## 开仓

在 Boros 上，交易者可以开设 YU 多头或空头头寸。

开仓前，交易者需要在抵押品账户中存入足够的余额，以支撑所需的头寸规模。

你可以在[第 7 章](chapter-7-margin-and-liquidations)中了解更多关于抵押品的内容。

### 做多 YU

<figure><img src="/boros-academy/imgs/image (6).png" alt="" /><figcaption></figcaption></figure>

若 BTC 当前交易价格为 \$50,000 且你看涨 BTC，你会开设 BTC 多头——即以当前价格买入 BTC，期望日后以高于 \$50,000 的价格卖出。

同理，在 Boros 上，若你预期资金费率将上升，应开设 YU 多头头寸。这意味着支付当前 YU 的「价格」（即隐含 APR），以换取底层 APR 的收益。

本质上，你承诺支付一个固定利率，期待收取更高的利率。

当底层 APR 高于入场时的隐含 APR 时，YU 多头持仓者将获利。

<Hint style="info">
**做多 YU**

* 承诺支付固定 APR（即开仓时的隐含 APR），以收取底层 APR。
* 预期底层 APR > 隐含 APR
</Hint>

### 做空 YU

<figure><img src="/boros-academy/imgs/image (7).png" alt="" /><figcaption></figcaption></figure>

YU 空头头寸与多头头寸相反。若你预期资金费率将下降，应开设空头头寸。

空头持仓者支付底层 APR，以换取固定利率（即入场时的隐含 APR）。当底层 APR 低于入场时的隐含 APR 时，空头持仓者将获利。

简而言之，做空 YU 是押注你锁定的固定利率最终将高于你需要支付的底层 APR。

<Hint style="info">
**做空 YU**

* 承诺支付底层 APR，以收取固定 APR（即开仓时的隐含 APR）。
* 预期隐含 APR > 底层 APR
</Hint>

平仓时，Boros 会自动开设一个相同规模的反向头寸。
