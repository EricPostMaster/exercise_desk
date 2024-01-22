/* ===
The base code here is from this sketch:
https://editor.p5js.org/kylemcdonald/sketches/H1OoUd9h7
The sketch is copyright 2018 ml5 and released under the MIT License.
https://opensource.org/licenses/MIT
=== */

let video;
let poseNet;
let poses = [];
let counter = 0;
let repetitionCount = 0;
const totalRepetitions = 20; // Set your total goal here

// Add a global variable to store the state of the exercise
let isBelowShoulder = true;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.flipHorizontal
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();

  // Check the y-coordinate of the right elbow for the exercise
  checkElbowPosition();

  // Display repetition count and progress bar on the canvas
  // displayRepetitionCount();
  displayProgressBar();
  // Display repetition count above the canvas
  select('#rep_counter').html(`${repetitionCount}/${totalRepetitions}`);

  // Check if exercise is complete
  checkExerciseComplete();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // console.log(`Pose ${i + 1}:`, poses[i].pose);
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw a mark is the pose probability is above threshold
      if (keypoint.score > 0.95) {
        fill(255,255,255);
        strokeWeight(1);
        stroke('#444444');
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 255, 255);
      strokeWeight(1);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// A function to check the y-coordinate of the right elbow for the exercise
function checkElbowPosition() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, get the keypoints
    let pose = poses[i].pose;

    // Check if rightElbow keypoint is present in the current pose
    if (pose.keypoints.find(keypoint => keypoint.part === 'rightElbow')) {
      let rightElbow = pose.keypoints.find(keypoint => keypoint.part === 'rightElbow');
      let rightShoulder = pose.keypoints.find(keypoint => keypoint.part === 'rightShoulder');
      let rightEye = pose.keypoints.find(keypoint => keypoint.part === 'rightEye');

      // Check if the keypoints needed for the exercise are defined
      if (rightElbow && rightShoulder && rightEye) {
        // Check the steps of a repetition
        if (isBelowShoulder && rightElbow.position.y < rightShoulder.position.y) {
          // logRightElbow();
          console.log("elbow higher than shoulder");
          select('#exercise_msg').html('Waiting for repetition');
          // Step 1: Right elbow is below right shoulder (starting point)
          
          isBelowShoulder = false;
        // } else if (!isBelowShoulder && rightElbow.position.y < rightEye.position.y) {
        //   // Step 2: Right elbow is above right eye (high point)
        //   // You can add any specific action here if needed
        } else if (!isBelowShoulder && rightElbow.position.y > rightShoulder.position.y) {
          // Step 3: Right elbow returns to below right shoulder (finish point and start of next repetition)
          isBelowShoulder = true;
          // Repetition detected!
          // You can increment a counter or perform any other action here
          // logRightElbow();
          console.log("Repetition detected!");
          counter += 1
          repetitionCount++;

          select('#exercise_msg').html('Repetition detected!');
          // select('#rep_counter').html(counter);
        }
      }
    }
  }
}



let lastLogTime = 0;
const logInterval = 1000; // Log once per second (in milliseconds)

// A function to log information about the rightElbow keypoint for each pose
function logRightElbow() {
  // Check if a second has passed since the last log
  if (millis() - lastLogTime > logInterval) {
    // Update the last log time
    lastLogTime = millis();

    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
      // For each pose detected, get the keypoints
      let pose = poses[i].pose;

      // Find the rightElbow keypoint within the keypoints
      let rightElbow = pose.keypoints.find(keypoint => keypoint.part === 'rightElbow');
      let rightShoulder = pose.keypoints.find(keypoint => keypoint.part === 'rightShoulder');

      if (rightElbow) {
        // Log information about the rightElbow keypoint to the console
        console.log(`Pose ${i + 1} - Right Elbow:`, {
          position: rightElbow.position,
          score: rightElbow.score
        });
      }
      if (rightShoulder) {
        // Log information about the rightShoulder keypoint to the console
        console.log(`Pose ${i + 1} - Right Shoulder:`, {
          position: rightShoulder.position,
          score: rightShoulder.score
        });
      }
    }
  }
}

function displayRepetitionCount() {
  // Display the repetition count as "X/20"
  fill(255,255,255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  select('#rep_counter').html(`${repetitionCount}/${totalRepetitions}`);
  text(`${repetitionCount}/${totalRepetitions}`, width / 2, height - 30);
}

function displayProgressBar() {
  // Display a progress bar
  let progress = map(repetitionCount, 0, totalRepetitions, 0, width);
  fill('#06C258'); // Blue color for the progress bar
  rect(0, height - 10, progress, 10);
}

function checkExerciseComplete() {
  // Check if repetition count equals the goal count
  if (repetitionCount >= totalRepetitions) {
    select('#exercise_msg').html('Exercise complete! Well done.');
  }
  // else {
  //   select('#exercise_msg').html('Waiting for repetition...');
  // }
}