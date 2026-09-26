export function shouldLoadVideo({
  reducedMotion = false,
  saveData = false,
  effectiveType = "",
} = {}) {
  if (reducedMotion || saveData) return false;

  const slowTypes = new Set(["slow-2g", "2g"]);
  if (slowTypes.has(String(effectiveType).toLowerCase())) return false;

  return true;
}

export function videoStateLabel({ loaded, paused, disabled }) {
  if (disabled) return "Video background disabled";
  if (!loaded) return "Loading background video";
  return paused ? "Play background video" : "Pause background video";
}
