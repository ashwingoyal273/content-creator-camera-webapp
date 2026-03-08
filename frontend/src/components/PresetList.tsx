import type { Preset } from "../types/preset";

type PresetListProps = {
  presets: Preset[];
  onApplyPreset: (preset: Preset) => void;
  onDeletePreset: (id: number) => void;
};

export default function PresetList({
  presets,
  onApplyPreset,
  onDeletePreset,
}: PresetListProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h2>Saved Presets</h2>

      {presets.length === 0 ? (
        <p>No presets saved yet.</p>
      ) : (
        <ul style={{ paddingLeft: 16 }}>
          {presets.map((preset) => (
            <li key={preset.id} style={{ marginBottom: 12 }}>
              <div>
                <strong>{preset.track_name}</strong>
              </div>
              <div>Start: {preset.start_time_ms} ms</div>
              <div>Duration: {preset.duration_ms} ms</div>
              <div>Countdown: {preset.countdown_seconds} s</div>
              <button onClick={() => onApplyPreset(preset)}>Apply</button>{" "}
              <button onClick={() => onDeletePreset(preset.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
