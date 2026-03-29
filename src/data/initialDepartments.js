// Приклад структури даних для АТ "Хмельницькобленерго"
// Цей масив має містити лише КОРЕНЕВІ підрозділи (Top-level)
const initialDepartments = [
  {
    id: "hq-001",
    name: "Генеральна дирекція",
    manager: {
      name: "Олександр Ковальчук",
      position: "Генеральний директор",
      phone: "+380671234567",
      hasCar: true,
      carInfo: "Skoda Superb (BX 0001 AA)",
      photo:
        "https://ui-avatars.com/api/?name=Олександр+Ковальчук&background=0054a6&color=fff",
      notes: ["В штаті з 2005 року", "Кандидат технічних наук"],
    },
    subDepartments: [
      {
        id: "tech-001",
        name: "Технічна дирекція",
        manager: {
          name: "Ігор Степаненко",
          position: "Головний інженер",
          phone: "+380671112233",
          hasCar: true,
          carInfo: "Toyota Hilux (BX 1122 AB)",
          photo:
            "https://ui-avatars.com/api/?name=Ігор+Степаненко&background=0054a6&color=fff",
          notes: ["Відповідальний за ОЗП"],
        },
        subDepartments: [
          {
            id: "res-001",
            name: "Хмельницький міський РЕМ",
            manager: null,
            subDepartments: [],
          },
        ],
      },
    ],
  },
];

export default initialDepartments;
