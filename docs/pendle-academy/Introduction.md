import CardGrid, { Card } from '@site/src/components/CardGrid';
import PendleSimple from '@site/src/components/icons/PendleSimple';
import PendleIntermediate from '@site/src/components/icons/PendleIntermediate';
import PendleAdvance from '@site/src/components/icons/PendleAdvance';

# Start Here

This doc is your full guide to yield-trading on Pendle. To learn more about the Pendle protocol and its mechanics, refer to [Pendle V2 Documentation](/pendle-v2/Introduction).

<CardGrid type="selfService">
  <Card
    title="Beginner"
    description="The basics of Pendle with easy to follow examples."
    link="pendle-101/chapter-1-introduction-to-optimizing-yield"
    icon={<PendleSimple />}
  />
  <Card
    title="Intermediate"
    description="Learn the various features available on Pendle."
    link="optimizing-yields-with-pendle/chapter-3.1-fixed-yield-on-pendle"
    icon={<PendleIntermediate />}
  />
  <Card
    title="Advanced"
    description="Dive deeper into yield trading and its intricacies to maximize your yield."
    link="yield-trading-deep-dives/chapter-6-shorting-yield"
    icon={<PendleAdvance />}
    hasSMIL
  />
</CardGrid>
