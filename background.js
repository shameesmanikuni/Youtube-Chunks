// background.js

const VIDEO_LIST_KEY = 'videoList';
const SETTINGS_KEY = 'settings';

// --- Initialization ---
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('Extension installed or updated:', details.reason);
  await setupInitialSettings();
});

// --- Settings ---
async function setupInitialSettings() {
  const currentSettings = await chrome.storage.local.get(SETTINGS_KEY);
  const defaults = {
    defaultChunkSizeMinutes: 15,
    dailyGoalMinutes: 30 // Default goal: 30 mins
  };

  const settingsToSave = {
    ...defaults,
    ...(currentSettings[SETTINGS_KEY] || {}) // Merge existing settings over defaults
  };
  await chrome.storage.local.set({ [SETTINGS_KEY]: settingsToSave });
  console.log('Initial settings configured:', settingsToSave);

  // Ensure videoList exists
  const result = await chrome.storage.local.get(VIDEO_LIST_KEY);
  if (!result[VIDEO_LIST_KEY]) {
      await chrome.storage.local.set({ [VIDEO_LIST_KEY]: [] });
      console.log('Initialized empty video list.');
  }
}

console.log("Background script loaded and running.");