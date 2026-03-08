export type Preset = {
  id: number;
  track_name: string;
  start_time_ms: number;
  duration_ms: number;
  countdown_seconds: number;
};

export type CreatePresetPayload = Omit<Preset, "id">;
