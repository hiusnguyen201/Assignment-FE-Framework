const data = [
  {
    id: 1,
    name: "John",
    status: "Active",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "John 2",
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 4,
    name: "John 4",
    status: "Active",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 3,
    name: "John 3",
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
];

for (let i: number = 5; i < 55; i++) {
  data.push({
    id: i,
    name: `John ${i}`,
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });
}

export default data;
