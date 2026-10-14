import CardGrid, { Card } from '@site/src/components/CardGrid';
import BorosSimple from '@site/src/components/icons/BorosSimple';
import BorosAdvance from '@site/src/components/icons/BorosAdvance';

# Welcome

Welcome to Boros Academy!

Boros is a rate-trading platform on margin by Pendle. Want to unlock fixed yields from perpetuals markets, or speculate on funding rates and the spreads between exchanges? You've come to the right place. This Academy covers all you need to know to understand and use Boros.

To learn more about the protocol mechanics, check out the [docs](/boros-docs/Introduction).

<CardGrid type="selfService" theme="boros">
  <Card
    title="Learn the Basics"
    link="the-basics/chapter-0-understanding-funding-rates"
    icon={<BorosSimple />}
  />
  <Card
    title="For the Pros"
    link="advanced-strategies/spread-markets-101"
    icon={<BorosAdvance />}
  />
</CardGrid>
