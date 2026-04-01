import CardGrid, { Card } from '@site/src/components/CardGrid';
import BorosSimple from '@site/src/components/icons/BorosSimple';
import BorosAdvance from '@site/src/components/icons/BorosAdvance';

# Welcome

Welcome to Boros Academy!

Boros is a yield-trading platform on margin by Pendle. Curious how you can take advantage of Boros? Read on! This Academy covers all you need to know to understand and use Boros.

To learn more about the protocol mechanics, check out the [docs](/boros-docs/Introduction).

<CardGrid type="selfService" theme="boros">
  <Card
    title="Learn the Basics"
    link="the-basics/chapter-0-understanding-funding-rates"
    icon={<BorosSimple />}
  />
  <Card
    title="For the Pros"
    link="advanced-strategies/hedging-funding-rates-payment"
    icon={<BorosAdvance />}
  />
</CardGrid>
