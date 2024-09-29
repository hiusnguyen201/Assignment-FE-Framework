export { rows };

const rows = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/300",
    gender: "",
    role: "Admin",
    name: "John",
    status: "Active",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "John 2",
    role: "Customer",
    avatar: "https://i.pravatar.cc/300",
    gender: "Male",
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 4,
    name: "John 4",
    role: "Admin",
    avatar: "https://i.pravatar.cc/300",
    gender: "Female",
    status: "Active",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
  {
    id: 3,
    name: "John 3",
    role: "Customer",
    avatar: "https://i.pravatar.cc/300",
    gender: "Other",
    status: "Inactive",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  },
];

for (let i: number = 5; i < 55; i++) {
  rows.push({
    id: i,
    name: `John ${i}`,
    role: i % 2 === 0 ? "Admin" : "Customer",
    avatar: "https://i.pravatar.cc/300",
    gender: i % 2 === 0 ? "Male" : i % 3 === 0 ? "Female" : "Other",
    status: i % 2 === 0 ? "Active" : i % 3 === 0 ? "Inactive" : "Blocked",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });
}

export default rows;
