import type { CreatePresetPayload, Preset } from "../types/preset";

const API_BASE = "http://localhost:8000";

export async function fetchPresets(): Promise<Preset[]> {
  const response = await fetch(`${API_BASE}/presets`);
  if (!response.ok) {
    throw new Error("Failed to fetch presets");
  }
  return response.json();
}

export async function createPreset(
  payload: CreatePresetPayload
): Promise<Preset> {
  const response = await fetch(`${API_BASE}/presets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create preset");
  }

  return response.json();
}

export async function deletePreset(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/presets/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete preset");
  }
}
