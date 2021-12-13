export default [
  {
    url: "/",
    name: "Главная",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    url: "/posts",
    name: "Блог",
    slug: "blogPage",
    icon: "FileIcon",
  },
  {
    url: "/liked-videos",
    name: "Понравившиеся",
    slug: "like",
    icon: "HeartIcon",
  },
  {
    header: 'Категории',
    icon: 'LayersIcon',
    items: [
      {
        url: "/videos/novyitrend",
        name: "В тренде",
        slug: "popular",
        icon: "DropletIcon",
      },
    ],
  },
]
