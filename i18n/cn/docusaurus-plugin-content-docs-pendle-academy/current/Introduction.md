import CardGrid, { Card } from '@site/src/components/CardGrid';
import PendleSimple from '@site/src/components/icons/PendleSimple';
import PendleIntermediate from '@site/src/components/icons/PendleIntermediate';
import PendleAdvance from '@site/src/components/icons/PendleAdvance';

# 从这里开始

本文档是您在 Pendle 上进行收益交易的完整指南。如需了解 Pendle 协议及其机制，请参阅 [Pendle V2 文档](/pendle-v2/Introduction)。

<CardGrid type="selfService">
  <Card
    title="初级"
    description="通过简单易懂的示例了解 Pendle 的基础知识。"
    link="pendle-101/chapter-1-introduction-to-optimizing-yield"
    icon={<PendleSimple />}
  />
  <Card
    title="中级"
    description="学习 Pendle 上各种可用功能。"
    link="optimizing-yields-with-pendle/chapter-3.1-fixed-yield-on-pendle"
    icon={<PendleIntermediate />}
  />
  <Card
    title="高级"
    description="深入了解收益交易的复杂机制，最大化您的收益。"
    link="yield-trading-deep-dives/chapter-6-shorting-yield"
    icon={<PendleAdvance />}
    hasSMIL
  />
</CardGrid>
