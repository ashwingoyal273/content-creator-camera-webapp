import { createPreset } from "../api/presets";
import type { CreatePresetPayload } from "../types/preset";

type CueFormProps = {
  cue: CreatePresetPayload;
  onCueChange: (cue: CreatePresetPayload) => void;
  onPresetSaved: () => void;
};

export default function CueForm({
  cue,
  onCueChange,
  onPresetSaved,
}: CueFormProps) {
  async function handleSavePreset() {
    try {
      await createPreset(cue);
      onPresetSaved();
    } catch (error) {
      console.error(error);
      alert("Failed to save preset");
    }
  }

  function updateField<K extends keyof CreatePresetPayload>(
    key: K,
    value: CreatePresetPayload[K]
  ) {
    onCueChange({ ...cue, [key]: value });
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

      <button onClick={handleSavePreset}>Save Preset</button>
    </div>
  );
}
