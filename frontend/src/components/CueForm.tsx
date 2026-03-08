import { useState } from "react";
import { createPreset } from "../api/presets";
import type { CreatePresetPayload } from "../types/preset";

type CueFormProps = {
  onPresetSaved: () => void;
  onCueChange: (cue: CreatePresetPayload) => void;
};

const initialCue: CreatePresetPayload = {
  track_name: "",
  start_time_ms: 30000,
  duration_ms: 15000,
  countdown_seconds: 3,
};

export default function CueForm({
  onPresetSaved,
  onCueChange,
}: CueFormProps) {
  const [cue, setCue] = useState<CreatePresetPayload>(initialCue);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField<K extends keyof CreatePresetPayload>(
    key: K,
    value: CreatePresetPayload[K]
  ) {
    const updatedCue = { ...cue, [key]: value };
    setCue(updatedCue);
    onCueChange(updatedCue);
  }

  async function handleSavePreset() {
    try {
      setSaving(true);
      setMessage("");
      await createPreset(cue);
      setMessage("Preset saved");
      onPresetSaved();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save preset");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h2>Cue Form</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Track Name</label>
        <br />
        <input
          value={cue.track_name}
          onChange={(e) => updateField("track_name", e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Start Time (ms)</label>
        <br />
        <input
          type="number"
          value={cue.start_time_ms}
          onChange={(e) => updateField("start_time_ms", Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Duration (ms)</label>
        <br />
        <input
          type="number"
          value={cue.duration_ms}
          onChange={(e) => updateField("duration_ms", Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Countdown (seconds)</label>
        <br />
        <input
          type="number"
          value={cue.countdown_seconds}
          onChange={(e) =>
            updateField("countdown_seconds", Number(e.target.value))
          }
        />
      </div>

      <button onClick={handleSavePreset} disabled={saving}>
        {saving ? "Saving..." : "Save Preset"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
