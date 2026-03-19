const initialData = {
  id: "dept-imperial-throne",
  name: "Золотий Трон (Арракіс)",
  manager: {
    name: "Лето II Атрід",
    position: "Бог-Імператор Всесвіту",
    photo:
      "https://images.unsplash.com/photo-1626544823105-0b215276296a?w=100&h=100&fit=crop",
  },
  staff: ["Монео Атрід (Мажордом)", "Наяла (Командир Рибомов)"],
  subDepartments: [
    {
      id: "dept-landsraad",
      name: "Ландсраад (Великі Доми)",
      manager: {
        name: "Пол Муад'Діб Атрід",
        position: "Герцог Арракіса",
        photo:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      },
      staff: [
        "Гурні Галлек (Військовий майстер)",
        "Данкан Айдахо (Майстер меча)",
      ],
      subDepartments: [
        {
          id: "dept-fremen",
          name: "Фрименські Ситчі",
          manager: {
            name: "Стілґар",
            position: "Наіб Ситчу Табр",
            photo:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          },
          staff: ["Чані (Федакін)", "Джаміс (Воїн)"],
          subDepartments: [],
        },
        {
          id: "dept-harkonnen",
          name: "Дім Харконнен",
          manager: {
            name: "Владімір Харконнен",
            position: "Барон, Сірдар-губернатор",
            photo:
              "https://images.unsplash.com/photo-1541534741688-6078c64b5ca5?w=100&h=100&fit=crop",
          },
          staff: ["Фейд-Раута (Спадкоємець)", "Глоссу Раббан (Звір)"],
          subDepartments: [],
        },
      ],
    },
    {
      id: "dept-bene-gesserit",
      name: "Орден Бене Ґессеріт",
      manager: {
        name: "Гайя-Елена Могіям",
        position: "Преподобна Мати",
        photo:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      },
      staff: ["Леді Джессіка (Послушниця)", "Марго Фенрінг (Агент)"],
      subDepartments: [
        {
          id: "dept-spacing-guild",
          name: "Космічна Гільдія",
          manager: {
            name: "Едрік",
            position: "Гільд-Навігатор",
            photo:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
          },
          staff: ["Представник Гільдії", "Банкіри Гільдії"],
          subDepartments: [],
        },
        {
          id: "dept-mentats",
          name: "Школа Ментатів",
          manager: {
            name: "Туфір Хават",
            position: "Майстер-Ментат",
            photo:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
          },
          staff: ["Пітер де Вріз (Викривлений Ментат)"],
          subDepartments: [],
        },
      ],
    },
  ],
};

export default initialData;
