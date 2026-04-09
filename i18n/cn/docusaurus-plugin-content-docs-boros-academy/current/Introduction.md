import CardGrid, { Card } from '@site/src/components/CardGrid';
import BorosSimple from '@site/src/components/icons/BorosSimple';
import BorosAdvance from '@site/src/components/icons/BorosAdvance';

# 欢迎

欢迎来到 Boros 学院！

Boros 是 Pendle 旗下的保证金收益率交易平台。想知道如何利用 Boros 获益？继续阅读！本学院涵盖你理解和使用 Boros 所需的一切知识。

如需了解更多协议机制，请查看[文档](/boros-docs/Introduction)。

<CardGrid type="selfService" theme="boros">
  <Card
    title="学习基础知识"
    link="the-basics/chapter-0-understanding-funding-rates"
    icon={<BorosSimple />}
  />
  <Card
    title="进阶策略"
    link="advanced-strategies/hedging-funding-rates-payment"
    icon={<BorosAdvance />}
  />
</CardGrid>
