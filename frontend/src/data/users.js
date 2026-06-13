export const users = [
  {
    id: "user-001",
    fullName: "Nguyễn Minh Anh",
    email: "minhanh@example.com",
    phone: "0988 123 456",
    role: "customer",
    status: "active",
    createdAt: "2026-06-01T08:00:00.000Z",
  },
  {
    id: "admin-001",
    fullName: "CampVibe Admin",
    email: "admin@campvibe.vn",
    phone: "0900 000 000",
    role: "admin",
    status: "active",
    createdAt: "2026-06-01T08:00:00.000Z",
  },
]

export function getUserById(id) {
  return users.find((user) => user.id === String(id)) || users[0]
}
