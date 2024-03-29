# Welcome to DeskFit!

## The ultimate desk workout program for busy professionals. #Gainz

Do you sit at a desk for a living?

Too busy to do a few push-ups now and then?

Now you can get totally swole with the help of computer vision! 💪

## What it is ⏲

DeskFit is a simple web application where the user sets a timer to be reminded to exercise, and when the timer completes, it opens [the DeskFit website](https://ericpostmaster.github.io/exercise_desk/) and prompts the user to do 20 repetitions of a simple exercise. In the current version, there is only one exercise, which is lifting one's hands in the air and bringing them back down. Once the user has completed the repetitions, they reset the timer and get back to work. It's a quick, easy way to build just a little bit more exercise into the day!

If you are using the app as a Chrome extension, you just set the timer like so:

<img src="img/popup.png">

Once the timer goes off (or if you load the page manually), the webpage loads, you're webcam turns on, and you'll be on your way to Gainzville in no time! **#BasicallyPelotonButFree**

<img src="img/desk_fit_demo.gif">

Ready to get ripped? [Click here to get started!](https://ericpostmaster.github.io/exercise_desk/)

## How it works ⚙

Under the hood, the app uses PoseNet for pose estimation. ChatGPT struggled to get PoseNet to work as a Chrome extension, so I started looking around online and found [a template](https://editor.p5js.org/kylemcdonald/sketches/H1OoUd9h7) using `ml5` and `p5`, which are libraries made specifically to simplify code so users can focus on creative work.

In the current version, there is only one exercise, which is lifting one's hands in the air and bringing them back down. This exercise is tracked using the right shoulder and right elbow key points. The app assumes you start with your elbow below your shoulder (generally the case for normal human beings), then detects a partial rep if the y-coordinate of the elbow is above the shoulder, and finally counts a completed rep when the y-coordinate of the elbow drops below the shoulder again.

The site can be loaded directly, but if you want to launch it based on a timer using the Chrome extension, you can just upload the whole directory to Chrome, and it will add the DeskFit popup to your extensions list.

## Origin story 🤔

I like building things; unfortunately, I don't know JavaScript (yet), so I like to try and use ChatGPT to bring my ideas to life. I use ChatGPT3.5 (the free plan) because I like the idea that everybody has access to the resource in case they want to try something similar.

My first ChatGPT collaboration was a Chrome extension called [SleepyStack](https://github.com/EricPostMaster/SleepyStack), which is a relatively simple extension that blocks StackOverflow late at night to encourage me to go to bed. 😅 For this project, I wanted to use a webcam to detect poses and count exercises, so I needed to do two new things: 1) use some kind of pose detection library in JavaScript and 2) collect and use data via a webcam.

Turns out, ChatGPT really struggled with making PoseNet work! It made the basic webpage and accessed the webcam without any issues, but I could not for the life of me get it to produce code that would draw the keypoints skeleton onto the canvas correctly. Fortunately, I found a cool project called [SquatCam](https://squatcam.vercel.app/) that does a lot of the same stuff I was hoping to do, and I was able to use it as a starting point. The creator of SquatCam was also unfamiliar with JavaScript, so we both used [the template](https://editor.p5js.org/kylemcdonald/sketches/H1OoUd9h7) I mentioned above to get started.

I also ran into a lot of difficulty trying to make this app as a Chrome Extension. Extensions seem to have tighter security policies than webpages, so I encountered issues with loading the libraries and running the model. As a workaround, I made the web app its own webpage, and the Chrome Extension is just a timer that opens a webpage (which just happens to be the app) when the timer runs out.

## Future work ✨

There are several improvements that could be made to the app. Here are some ideas:
* **Better pose estimation.** Sometimes PoseNet works well, and one rep is counted once; however, it often struggles to idenfity my elbow correctly, so sometimes one rep gets counted as five reps. A newer library would probably do a better job.
* **More exercises.** This initial app just tracks the user's right arm to see if it is lifted above the shoulder and lowered again. I'd love to add jumping jacks, pushups, squats, lunges, etc. and have the timer alternate between exercises.
* **User-determined rep count.** Want to do 50 reps instead of 20? This feature would allow that.
* **Activity history.** How many times have you completed your exercise today? This week? Ever? It would be cool to store that data so the user could review or download it later. The [Marinara Chrome extension](https://github.com/schmich/marinara) does this well.
* **Replace UI with a video game.** Inspired by the now defunct 8-bit [Dungeon Runner app](https://www.sixtostart.com/dungeon-runner/), my original idea was to make a simple side-scroller video game that has a character who encounters obstacles, and the only way to remove the obstacles is to do exercises, such as lifting arms in the air repeatedly to open a gate. A game overlay is an extra layer of complexity that I decided could be tackled separately once the actual app was working. This [super simple tutorial from KnifeCircus](https://www.youtube.com/watch?v=bG2BmmYr9NQ) of the Google jumping dinosaur game looks like a great place to start. I just have to figure out how to replace the click events with events triggered by poses and also how to make obstacles approach and then stop in front of the player instead of flying past like the cactuses do in the dinosaur game.
