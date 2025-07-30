import { DEFAULT_HEADERS } from "@/lib/constants";
import {
  Application,
  ApplicationSchema,
  CreateApplication,
} from "@/types/nesto";

const API_BASE_URL = process.env.NEXT_PUBLIC_NESTO_API;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_NESTO_API environment variable is required");
}

export const api = {
  async createApplication(data: CreateApplication): Promise<Application> {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create application: ${response.statusText}`);
    }

    const responseData = await response.json();
    return ApplicationSchema.parse(responseData);
  },

  async updateApplication(
    id: string,
    data: Partial<Application>,
  ): Promise<Application> {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: "PUT",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update application: ${response.statusText}`);
    }

    const responseData = await response.json();
    return ApplicationSchema.parse(responseData);
  },
};
