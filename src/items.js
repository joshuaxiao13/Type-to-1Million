import purpleDrip from './Photos/purpleBlock.jpeg';
import tenFold from './Photos/tenFold.jpeg';
import gemRush from './Photos/gemRush.jpeg';
import flash from './Photos/flash.jpeg';
import mysteryBox from './Photos/mysteryBox.jpeg';

export const items = [
  {
    id: 0,
    url: purpleDrip,
    name: 'purpleDrip',
    title: 'Purple Drip',
    description:
      "Bored of plain black text? Unlock a sleek-looking purple text that's easy on the eyes.",
    cost: 250,
  },
  {
    id: 1,
    url: tenFold,
    name: 'tenFold',
    title: 'Ten Fold',
    description:
      "Not earning gems as quick as you'd like? Unlock this ability to increase your future earnings and losses by a factor of 10.",
    cost: 1000,
  },
  {
    id: 2,
    url: gemRush,
    name: 'gemRush',
    title: 'Gem Rush',
    description:
      "Feeling confident? Match or surpass your set goal in the next typing to earn 100 times the number of gems. Failure is not an option, or you'll lose all your gems and start all over!",
    cost: 7500,
  },
  {
    id: 3,
    url: flash,
    name: 'theFlash',
    title: 'The Flash',
    description:
      "Think you have fast fingers? Prove it. You'll have 60 seconds to type as many one word texts as you possibly can.",
    cost: 15000,
  },
  {
    id: 4,
    url: mysteryBox,
    name: 'mysteryBox',
    title: 'Mystery Box',
    description:
      'Once you have 1 million gems, unlock the mystery box and claim your special prize!',
    cost: 1000000,
  },
];
