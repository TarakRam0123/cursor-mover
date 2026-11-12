const express = require("express");
const {
  mouse,
  straightTo,
  Point,
} = require("@nut-tree-fork/nut-js");

const router = express.Router();

let timeoutId = null;
let isActive = false;



async function moveMouseRandomly() {
  if (!isActive) return;

  try {
    const currentPos = await mouse.getPosition();

    // Small random movement (-20 to +20 pixels)
    const randomX = Math.floor(Math.random() * 41) - 20;
    const randomY = Math.floor(Math.random() * 41) - 20;

    const targetX = currentPos.x + randomX;
    const targetY = currentPos.y + randomY;

    await mouse.move(
      straightTo(new Point(targetX, targetY))
    );

    console.log(
      `Mouse moved from (${currentPos.x}, ${currentPos.y}) to (${targetX}, ${targetY})`
    );
  } catch (error) {
    console.error("Mouse movement error:", error);
  }

  // Random delay between 5 and 15 seconds
  const randomDelay =
    Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;

  timeoutId = setTimeout(moveMouseRandomly, randomDelay);
}

// Activate mouse movement
router.post("/activate", async (req, res) => {
  if (!isActive) {
    isActive = true;
    moveMouseRandomly();
  }

  res.json({
    success: true,
    status: "ACTIVE",
  });
});

// Deactivate mouse movement
router.post("/deactivate", (req, res) => {
  isActive = false;

  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  res.json({
    success: true,
    status: "INACTIVE",
  });
});

// Check current status
router.get("/status", (req, res) => {
  res.json({
    success: true,
    status: isActive ? "ACTIVE" : "INACTIVE",
  });
});

module.exports = router;