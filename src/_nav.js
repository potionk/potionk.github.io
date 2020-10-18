export default {
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: 'icon-home',
    },
    {
      name: '알고리즘',
      url: '/algorithm',
      icon: 'icon-note',
      children: [
        {
          name: 'Programmers Helper',
          url: '/algorithm/programmers',
          icon: 'icon-note',
          children: [
            {
              name: '테스트용 메인 생성기',
              url: '/algorithm/programmers/main_maker',
              icon: 'icon-pencil',
            },
          ],
        },
        {
          name: 'LeetCode Helper',
          url: '/algorithm/leetcode',
          icon: 'icon-note',
          children: [
            {
              name: '테스트용 메인 생성기',
              url: '/algorithm/programmers/main_maker',
              icon: 'icon-pencil',
            },
          ],
        },
        {
          name: 'Java',
          url: '/algorithm/Java',
          icon: 'icon-note',
          children: [
            {
              name: 'Class skeleton 생성기',
              url: '/algorithm/java/class_maker',
              icon: 'icon-pencil',
            },
          ],
        },
      ],
    },
    // {
    //   name: 'Game',
    //   url: '/game',
    //   icon: 'icon-game-controller',
    //   children: [
    //     {
    //       name: '공지사항',
    //       url: '/game/notice',
    //       icon: 'icon-bulb',
    //     },
    //     {
    //       name: '업데이트',
    //       url: '/game/update',
    //       icon: 'icon-magic-wand',
    //     },
    //     {
    //       name: '이벤트',
    //       url: '/game/event',
    //       icon: 'icon-fire',
    //     },
    //     {
    //       name: '랭킹',
    //       url: '/game/ranking',
    //       icon: 'icon-people',
    //     },
    //     {
    //       name: '자료실',
    //       url: '/game/download',
    //       icon: 'icon-folder-alt',
    //     },
    //   ],
    // },
  ],
};
