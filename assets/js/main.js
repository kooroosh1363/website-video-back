import { shouldLoadVideo, videoStateLabel } from "./media-policy.js";

const hero = document.querySelector("[data-hero]");
const video = document.querySelector("[data-bg-video]");
const toggle = document.querySelector("[data-video-toggle]");
const toggleLabel = document.querySelector("[data-video-toggle-label]");
const source = video?.querySelector("source");

const media = window.matchMedia("(prefers-reduced-motion: reduce)");
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

let loaded = false;
let disabled = false;

function updateButton() {
  if (!toggle || !toggleLabel || !video) return;

  toggleLabel.textContent = videoStateLabel({
    loaded,
    paused: video.paused,
    disabled,
  });

  toggle.disabled = disabled;
  toggle.setAttribute("aria-pressed", String(!video.paused && !disabled));
}

async function enableVideo() {
  if (!video || !source || loaded || disabled) return;

  source.src = source.dataset.src || "";
  video.load();

  try {
    await video.play();
    loaded = true;
    hero?.classList.add("hero--video-active");
  } catch {
    loaded = true;
    hero?.classList.remove("hero--video-active");
  }

  updateButton();
}

function disableVideo() {
  if (!video) return;

  disabled = true;
  video.pause();
  video.removeAttribute("src");
  source?.removeAttribute("src");
  hero?.classList.remove("hero--video-active");
  updateButton();
}

const allowed = shouldLoadVideo({
  reducedMotion: media.matches,
  saveData: Boolean(connection.saveData),
  effectiveType: connection.effectiveType || "",
});

if (allowed) {
  enableVideo();
} else {
  disableVideo();
}

toggle?.addEventListener("click", async () => {
  if (!video || disabled) return;

  if (video.paused) {
    try {
      await video.play();
    } catch {
      return;
    }
  } else {
    video.pause();
  }

  updateButton();
});

media.addEventListener?.("change", (event) => {
  if (event.matches) {
    disableVideo();
  }
});

video?.addEventListener("play", updateButton);
video?.addEventListener("pause", updateButton);
video?.addEventListener("canplay", () => {
  loaded = true;
  updateButton();
});

updateButton();
