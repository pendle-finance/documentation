---
hide_table_of_contents: true
---

# 代币经济学

<figure>
  <img src="/pendle-docs/imgs/ProtocolMechanics/pendle_distribution.png" alt="PENDLE 分配" />
  <figcaption>截至 2022 年 10 月的 PENDLE 分配情况</figcaption>
</figure>

截至 2024 年 9 月，团队和投资者代币已全部归属完毕。此后流通供应量的增加将仅来自于激励和生态系统建设。

## 每周释放量

截至 2024 年 9 月的每周释放量为 216,076 个，此后每周递减 1.1%，直至 2026 年 4 月。届时将切换为每年 2% 的终态通胀率，专用于激励。

随着行业的成熟，治理层可能根据生态系统最佳实践的演变提出调整方案。

<figure>
  <img src="/pendle-docs/imgs/ProtocolMechanics/weekly_emission.png" alt="每周释放量" />
  <figcaption>每周释放量</figcaption>
</figure>

## 流通供应量

**流通供应量**是指所有自由流通的 PENDLE 代币，**不包括**以下地址中的代币：

1. 质押在 [sPENDLE 合约](https://etherscan.io/address/0x999999999991E178D52Cd95AFd4b00d066664144)中的 PENDLE
2. 在 [vePENDLE 合约](https://etherscan.io/address/0x4f30a9d41b80ecc5b94306ab4364951ae3170210)中的 PENDLE（正在逐步退出——用户应迁移至 sPENDLE）
3. 在[生态系统基金地址](https://etherscan.io/address/0x399be606db281a054e359eb709df9f21e922ec9a)中的 PENDLE
4. 在[治理多签地址](https://etherscan.io/address/0x8119ec16f0573b7dac7c0cb94eb504fb32456ee1)中的 PENDLE
5. 在[团队多签地址](https://etherscan.io/address/0x918cf6b16d1426b5aa0edf0492ced1aa89f9659a)中的 PENDLE

任意时点的 PENDLE 总供应量 = **流通供应量** + 上述 5 个地址中的 PENDLE。

<figure>
  <img src="/pendle-docs/imgs/ProtocolMechanics/pendle_supply.png" alt="PENDLE 供应量" />
  <figcaption>PENDLE 总供应量</figcaption>
</figure>
