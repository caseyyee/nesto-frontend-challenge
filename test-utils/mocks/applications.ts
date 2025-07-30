import type { Application } from "@/types/nesto";

export const mockApplication: Application = {
  id: "app-1",
  type: "NEW",
  applicants: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567",
    },
  ],
  productId: 1,
  createdAt: "2024-01-15T10:30:00Z",
};

export const mockApplications: Application[] = [
  {
    id: "app-1",
    type: "NEW",
    applicants: [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
      },
    ],
    productId: 1,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "app-2",
    type: "RENEWAL",
    applicants: [
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "555-987-6543",
      },
    ],
    productId: 2,
    createdAt: "2024-01-16T14:45:00Z",
  },
  {
    id: "app-3",
    type: "REFINANCE",
    applicants: [
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "555-555-5555",
      },
    ],
    createdAt: "2024-01-17T09:15:00Z",
  },
];

export function createMockApplication(overrides: Partial<Application> = {}): Application {
  return {
    ...mockApplication,
    ...overrides,
  };
}

export function createMockApplications(count: number, overrides: Partial<Application>[] = []): Application[] {
  return Array.from({ length: count }, (_, i) => 
    createMockApplication({
      id: `app-${i + 1}`,
      createdAt: `2024-01-${15 + i}T10:30:00Z`,
      ...overrides[i],
    })
  );
}