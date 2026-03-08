import { useEffect, useState } from "react";
import { deletePreset, fetchPresets } from "./api/presets";
import CameraRecorder from "./components/CameraRecorder";
import CueForm from "./components/CueForm";
import PresetList from "./components/PresetList";
import type { CreatePresetPayload, Preset } from "./types/preset";

const initialCue: CreatePresetPayload = {
  track_name: "",
  start_time_ms: 30000,
  duration_ms: 15000,
  countdown_seconds: 3,
};

function App() {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [activeCue, setActiveCue] = useState<CreatePresetPayload>(initialCue);

  async function loadPresets() {
    const data = await fetchPresets();
    setPresets(data);
  }

  async function handleDeletePreset(id: number) {
    await deletePreset(id);
    await loadPresets();
  }

  function handleApplyPreset(preset: Preset) {
    setActiveCue({
      track_name: preset.track_name,
      start_time_ms: preset.start_time_ms,
      duration_ms: preset.duration_ms,
      countdown_seconds: preset.countdown_seconds,
    });
  }

  useEffect(() => {
    loadPresets();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>Content Creator Camera Webapp</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <CueForm
          cue={activeCue}
          onCueChange={setActiveCue}
          onPresetSaved={loadPresets}
        />
        <PresetList
          presets={presets}
          onApplyPreset={handleApplyPreset}
          onDeletePreset={handleDeletePreset}
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <CameraRecorder cue={activeCue} />
      </div>

      <div style={{ marginTop: 24 }}>
        <h2>Active Cue</h2>
        <pre>{JSON.stringify(activeCue, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
