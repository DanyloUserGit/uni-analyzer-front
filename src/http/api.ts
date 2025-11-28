import axios from "axios";

const baseURL =
  typeof window !== "undefined" && window.location.host === "localhost:3000"
    ? "http://localhost:8000"
    : "impact-ai-back-m5cbop3f8-danylos-projects-a0826163.vercel.app";
interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
}

export const $api = {
  get: async (url: string, options?: RequestOptions) => {
    let query = "";
    if (options?.params) {
      query =
        "?" +
        new URLSearchParams(
          Object.entries(options.params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString();
    }

    const res = await fetch(baseURL + url + query, {
      ...options,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Помилка запиту");
    }

    return res.json();
  },

  post: async (url: string, body?: any, options?: RequestOptions) => {
    const res = await fetch(baseURL + url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Помилка запиту");
    }

    return res.json();
  },

  put: async (url: string, body?: any, options?: RequestOptions) => {
    const res = await fetch(baseURL + url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Помилка запиту");
    }

    return res.json();
  },

  delete: async (url: string, options?: RequestOptions) => {
    const res = await fetch(baseURL + url, {
      ...options,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Помилка запиту");
    }

    return res.json();
  },
};
