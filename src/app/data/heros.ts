interface Hero {
  image: string;
  title: string;
  text: string;
  isReverse?: boolean;
}

export const heros: Hero[] = [
  {
    image: "/undraw_team_spirit_re_yl1v.svg",
    title: "Quick and Simple",
    text: "Experience seamless navigation with our mobile-optimized design. Each page presents only essential information, avoiding clutter. Interactive fields expand only when clicked, making data entry efficient—just tap, update, and move on. The app intuitively guides you from creating groups to viewing detailed transactions and settings, with each action smoothly leading you to relevant pages without unnecessary steps.",
  },

  {
    isReverse: true,
    image: "/devices.svg",
    title: "Universal Compatibility",
    text: "Our app is built as a Progressive Web App (PWA), ensuring flawless operation across all devices, whether iPhone, Android, or desktop. Designed to function both online and offline, it can be added to your home screen or desktop for an app-like experience. This feature allows you to access all functionalities of our app with the convenience of native applications, promoting a seamless user experience on any platform.",
  },

  {
    image: "/offline.svg",
    text: "Our app prioritizes your ability to manage finances without interruption, ensuring functionality both online and offline. All data is stored locally first, allowing you to continue your activities even without an internet connection. Changes are seamlessly synchronized across all your devices once connectivity is restored, maintaining data integrity and providing a consistent experience no matter where you are.",
    title: "Always Accessible",
  },

  {
    isReverse: true,
    image: "/graphic.svg",
    text: "Tailor expense sharing to fit any scenario with our adjustable weight system. Each participant can have a set weight, reflecting their share in expenses, ranging from an equal split to a weighted division based on consumption or participation. This allows for precise financial management whether splitting costs equally, by percentage, or in unequal shares, catering to various needs like family units or individual preferences within groups.",
    title: "Flexible Splitting",
  },

  {
    image: "/world.svg",
    text: "Manage expenses in any currency with our versatile currency management system. Each group can define and use an unlimited number of currencies, setting specific exchange rates that remain constant across all transactions. The settlement calculations are based on the group's designated home currency, simplifying financial management across different monetary units while maintaining consistency in reporting and reconciliation.",
    title: "Multi-Currency Support",
  },

  {
    isReverse: true,
    image: "/real-time-sync.svg",
    text: "Ensure your financial data is always up-to-date across all your devices with our basic cloud sync feature. This synchronization allows for seamless data consistency, whether you're switching between devices or ensuring all entries are current. It's ideal for users who operate the app on multiple platforms, providing a unified view of their finances no matter where they access it from.",
    title: "Cloud Sync",
  },
];
