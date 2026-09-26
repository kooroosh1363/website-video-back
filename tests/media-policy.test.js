import test from "node:test";
import assert from "node:assert/strict";

import { shouldLoadVideo, videoStateLabel } from "../assets/js/media-policy.js";

test("video is allowed on normal connections", () => {
  assert.equal(shouldLoadVideo({
    reducedMotion: false,
    saveData: false,
    effectiveType: "4g",
  }), true);
});

test("reduced-motion disables optional background video", () => {
  assert.equal(shouldLoadVideo({
    reducedMotion: true,
    saveData: false,
    effectiveType: "4g",
  }), false);
});

test("Save-Data disables optional background video", () => {
  assert.equal(shouldLoadVideo({
    reducedMotion: false,
    saveData: true,
    effectiveType: "4g",
  }), false);
});

test("very slow effective connections disable video", () => {
  assert.equal(shouldLoadVideo({ effectiveType: "slow-2g" }), false);
  assert.equal(shouldLoadVideo({ effectiveType: "2g" }), false);
  assert.equal(shouldLoadVideo({ effectiveType: "3g" }), true);
});

test("video control labels reflect runtime state", () => {
  assert.equal(
    videoStateLabel({ loaded: false, paused: true, disabled: false }),
    "Loading background video",
  );
  assert.equal(
    videoStateLabel({ loaded: true, paused: false, disabled: false }),
    "Pause background video",
  );
  assert.equal(
    videoStateLabel({ loaded: true, paused: true, disabled: false }),
    "Play background video",
  );
  assert.equal(
    videoStateLabel({ loaded: false, paused: true, disabled: true }),
    "Video background disabled",
  );
});
