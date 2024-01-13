let counter = 0;

console.log("exercise.js is running")

async function setupCamera() {
  const video = document.getElementById('webcam');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
    video.srcObject = stream;

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  } catch (e) {
    console.error('Error accessing webcam:', e);
  }
}

async function loadPoseNet() {
  console.log("Loading PoseNet")
  const net = await posenet.load();
  console.log("PoseNet loaded")
  return net;
}

async function detectPoseInRealTime(video, net) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.getElementById('video-container').appendChild(canvas);

  async function poseDetectionFrame() {
    const pose = await net.estimateSinglePose(video, {
      flipHorizontal: false
    });

    const leftWrist = pose.keypoints.find(point => point.part === 'leftWrist');
    const leftElbow = pose.keypoints.find(point => point.part === 'leftElbow');
    const leftShoulder = pose.keypoints.find(point => point.part === 'leftShoulder');

    const rightWrist = pose.keypoints.find(point => point.part === 'rightWrist');
    const rightElbow = pose.keypoints.find(point => point.part === 'rightElbow');
    const rightShoulder = pose.keypoints.find(point => point.part === 'rightShoulder');

    if (isHandRaised(leftWrist, leftElbow, leftShoulder) || isHandRaised(rightWrist, rightElbow, rightShoulder)) {
      updateCounter();
    }

    // Render pose on canvas if needed
    // renderPoseOnCanvas(canvas, ctx, pose);

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}

function isHandRaised(wrist, elbow, shoulder) {
  if (wrist && elbow && shoulder) {
    const angleElbow = calculateAngle(elbow.position, wrist.position);
    const angleShoulder = calculateAngle(shoulder.position, elbow.position);

    // Set thresholds based on testing
    const elbowThreshold = 150; // Example threshold for the elbow angle
    const shoulderThreshold = 20; // Example threshold for the shoulder angle

    return angleElbow > elbowThreshold && angleShoulder < shoulderThreshold;
  }

  return false;
}

function calculateAngle(pointA, pointB) {
  const deltaY = pointB.y - pointA.y;
  const deltaX = pointB.x - pointA.x;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return angle < 0 ? angle + 360 : angle; // Convert angle to positive values
}

async function main() {
  const video = await setupCamera();
  const net = await loadPoseNet();

  updateCounter();
  detectPoseInRealTime(video, net);
}

document.addEventListener('DOMContentLoaded', function() {
  main();
});

function updateCounter() {
  counter++;
  document.getElementById('counter').innerText = counter;
}
