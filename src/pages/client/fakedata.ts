const data = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    status: "Active",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    measurements: [
      {
        id: 1,
        systolic: 120,
        diastolic: 80,
        heartRate: 80,
        time: new Date(),
        createdAt: new Date(),
      },
    ],
    lastVisit: new Date(),
  },
  {
    id: 2,
    firstName: "John 2",
    lastName: "Doe 2",
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    measurements: [],
    lastVisit: new Date(),
  },
  {
    id: 4,
    firstName: "John 4",
    lastName: "Doe 4",
    status: "Active",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    measurements: [
      {
        id: 2,
        systolic: 120,
        diastolic: 80,
        heartRate: 80,
        time: new Date(),
        createdAt: new Date(),
      },
      {
        id: 3,
        systolic: 150,
        diastolic: 80,
        heartRate: 100,
        time: new Date(),
        createdAt: new Date(),
      },
    ],
    lastVisit: new Date(),
  },
  {
    id: 3,
    firstName: "John 3",
    lastName: "Doe 3",
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    measurements: [],
    lastVisit: new Date(),
  },
];

for (let i: number = 5; i < 55; i++) {
  data.push({
    id: i,
    firstName: `John ${i}`,
    lastName: `Doe ${i}`,
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    measurements: [],
    lastVisit: new Date(),
  });
}

export default data;
