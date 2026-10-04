export const birthdayData = {
  name: 'Komal',
  fullName: 'Komal Sharma',
  birthday: '08 October',
  date: '08 · 10 · 2001',
  dateLong: '08 October 2001',
  introImage: '/images/komal-hero.jpg',
  heroImage: '/images/hero02.jpg',
  finalImage: '/images/final.jpg',
  giftImage: '/images/gift-box.png',

  hero: {
    label: 'HAPPY BIRTHDAY',
    title: 'Komal',
    lines: [
      'To the most beautiful part of my life,',
      'A day to celebrate the amazing person you are',
      '— today and always.',
    ],
    note: 'My Favorite\nPerson ♡',
  },

  letter: {
    chapter: '02',
    title: ['A LITTLE', 'SOMETHING', 'FOR YOU'],
    paragraphs: [
      'Komal,',
      "Today is your day, but somehow I feel like I'm the one who received the greatest gift — having you in my life.",
      'You bring a kind of happiness that words can never completely explain.',
      "Through ordinary days, crazy moments, laughter, little arguments, and countless memories, you've become someone incredibly special to me.",
      'I hope this year brings you everything your heart wishes for.',
      'Keep smiling.\nKeep shining.',
      'And always remember how deeply loved you are.',
      'Happy Birthday, my love. ❤️',
    ],
    note: 'And this is just the beginning... ♡',
  },

  story: {
    chapter: '03',
    title: 'Our Story',
    intro: [
      "Every beautiful story has a beginning...\nand I'm so grateful ours started.",
      'From the first time we talked, to all the little moments in between, life has been so much brighter with you in it...',
    ],
    note: 'And this\nis just the\nbeginning... ♡',
    events: [
      {
        year: '2024',
        title: 'Where It All Started',
        description: 'A simple conversation that became something so special.',
        image: '/images/2024.jpg',
        rotate: -3,
        size: 'md' as const,
        photoSide: 'left' as const,
      },
      {
        year: '2025',
        title: 'The First Memory',
        description: "The moment I realised you're truly one of a kind.",
        image: '/images/2025.jpg',
        rotate: 2,
        size: 'sm' as const,
        photoSide: 'right' as const,
      },
      {
        year: '2026',
        title: 'All The Little Moments',
        description:
          'Late-night talks, random laughs,\nand a million reasons to smile.',
        image: '/images/2026.jpg',
        rotate: -2,
        size: 'lg' as const,
        photoSide: 'left' as const,
      },
    ],
  },

  gallery: {
    chapter: '04',
    label: 'MEMORIES WE MADE',
    title: 'Memory Gallery',
    subtitle: 'A few of my favorite moments...\nwith my favorite person.',
    note: 'Connecting\nmoments\nwith you... ♡',
    viewAll: 'View All Photos',
    photos: [
      {
        src: '/images/memory-3.jpg',
        alt: 'Favorite memory',
        caption: 'My Favorite ♡',
        rotation: -2,
        role: 'main' as const,
      },
      {
        src: '/images/memory-1.jpg',
        alt: 'Couple memory',
        caption: '',
        rotation: -1.5,
        role: 'top' as const,
      },
      {
        src: '/images/memory-5.jpg',
        alt: 'Detail memory',
        caption: '',
        rotation: -3,
        role: 'bottom' as const,
      },
      {
        src: '/images/memory-4.jpg',
        alt: 'Sunset memory',
        caption: '',
        rotation: 1.8,
        role: 'sideTop' as const,
      },
      {
        src: '/images/memory-2.jpg',
        alt: 'Portrait memory',
        caption: '',
        rotation: -2,
        role: 'sideBottom' as const,
      },
      {
        src: '/images/memory-6.jpg',
        alt: 'Memory 6',
        caption: '',
        rotation: 1,
        role: 'extra' as const,
      },
    ],
  },

  loveThings: {
    chapter: '05',
    title: ['Little Things', 'I Love About You'],
    subtitle: 'The little things that make you, so incredibly you.',
    pinned: [
      'YOUR SMILE',
      'YOUR LAUGH',
      'YOUR KINDNESS',
      'THE WAY YOU CARE',
      'THE LITTLE THINGS',
      'AND SO MUCH MORE...',
    ],
    items: [
      { label: 'Your Smile', mark: '😊' },
      { label: 'Your Kindness', mark: '🤗' },
      { label: 'The Way You Care', mark: '🫶' },
      { label: 'Your Laugh', mark: '😄' },
      { label: 'Your Presence', mark: '✨' },
      { label: 'The Little Things You Do', mark: '🌸' },
      { label: 'Your Strength', mark: '💪' },
      { label: 'Your Heart', mark: '❤️' },
      { label: 'How You Make Me Feel', mark: '🥰' },
      { label: 'Everything About You', mark: '🌟' },
    ],
  },

  wish: {
    chapter: '06',
    title: ['ONE WISH', 'FOR YOU'],
    lead: 'Today, and always...\nI hope all your dreams come true.',
    quote:
      'My only wish is that this new year of your life gives you countless reasons to smile, dream bigger, and feel loved every single day.',
  },

  finale: {
    chapter: '07',
    title: ['And There\'s', 'One More Thing...'],
    subtitle: 'I saved the most special part\nfor the end...',
    cta: 'Open Your Final Surprise',
    note: 'Something special for you... ♡',
    revealTitle: 'Happy Birthday,\nKomal ❤️',
    revealBody: [
      'Whatever life brings us,',
      'I hope we always keep collecting',
      'moments worth remembering.',
      '',
      'Thank you for being you.',
      '',
      "Here's to you.",
      "Here's to us.",
      'And all the beautiful memories',
      'still waiting to be made.',
    ],
  },

  nav: [
    { id: 'hero', label: 'Home', chapter: '01' },
    { id: 'letter', label: 'Letter', chapter: '02' },
    { id: 'story', label: 'Our Story', chapter: '03' },
    { id: 'gallery', label: 'Gallery', chapter: '04' },
    { id: 'love', label: 'Little Things', chapter: '05' },
    { id: 'wish', label: 'Wish', chapter: '06' },
    { id: 'surprise', label: 'Surprise', chapter: '07' },
  ],

  footer: {
    line: 'Made with ❤️ for Komal',
    date: '08 - 10 - 2001',
  },
} as const;

export type BirthdayData = typeof birthdayData;
