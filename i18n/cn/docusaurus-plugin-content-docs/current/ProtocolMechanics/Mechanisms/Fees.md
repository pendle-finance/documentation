---
hide_table_of_contents: true
---

# 费用

Pendle 协议有两个收入来源：

- **YT 费用**
    
Pendle 从所有现有 YT 赚取的所有收益中收取 5% 的费用，以及所有未兑现 PT 的 SY 的收益。

- **交易费用**
    
Pendle 从所有 PT 交易的“隐含收益”中收取一定比例的交易费用。每个费用级别将在 dApp 中显示，并由池部署者决定（目前只有 Pendle 团队在 Pendle 上部署池）。

实质上，当发生交易时，Pendle 对 PT 的收益应收税款。这种方式为所有池和到期时间提供了公平的费用，因为它是按照池的到期时间进行缩放的（到期时间越短 -> 收益越少 -> 以美元计算的费用越低）。由于 YT 交易也通过 PT AMM 进行路由，因此其费用是基于交易的 PT 计算的。

- **费用分配**

Pendle 协议有两种费用来源：**YT 费用** 和 **Swap（交易）费用**。其中，20% 的 Swap 费用将作为收益分配给该池的 LP 提供者。

剩余的 Swap 费用以及 全部 YT 费用，将按照以下比例在 PENDLE 回购基金 与 Pendle 协议之间进行分配：
- 80% 用于 PENDLE 回购
- 10% 分配至协议金库（Protocol Treasury）
- 10% 用于协议运营（Protocol Operations）

