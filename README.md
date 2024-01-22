# Welcome to DeskFit!

## The ultimate desk workout program for busy professionals. #Gainz

Do you sit at a desk for a living?

Too busy to do a few push-ups now and then?

Now you can get totally swole with the help of computer vision! 💪

## What it is



## How it works



## Origin story

I like building things; unfortunately, I don't know JavaScript (yet), so I like to try and use ChatGPT to bring my ideas to life. My first ChatGPT collaboration was a Chrome extension called [SleepyStack](https://github.com/EricPostMaster/SleepyStack), which is a relatively simple extension that basically blocks StackOverflow late at night to encourage me to go to bed. 😅 For this project, I wanted to use a webcam to detect poses and count exercises, so I needed to do two new things: 1) use some kind of pose detection library in JavaScript and 2) collect and use data via a webcam.

I use ChatGPT3.5 (the free plan) because I like the idea that everybody has access to the resource in case they want to try something similar.

Turns out, ChatGPT really struggled with making PoseNet work! It made the basic webpage and accessed the webcam without any issues, but I could not for the life of me get it to produce code that would draw the keypoints skeleton onto the canvas correctly. Fortunately, I found a cool project called [SquatCam](https://squatcam.vercel.app/) that does a lot of the same stuff I was hoping to do, and I was able to use it as a starting point. The creator of SquatCam was also unfamiliar with JavaScript, so we both used [a template](https://editor.p5js.org/kylemcdonald/sketches/H1OoUd9h7) from JavaScript libraries called `ml5` and `p5`, which are libraries made specifically to simplify code so users can focus on creative work.

I also ran into a lot of difficulty trying to make this app as a Chrome Extension. Extensions seem to have tighter security policies than webpages, so I encountered issues with loading the libraries and running the model. As a workaround, I made the web app its own webpage, and the Chrome Extension is just a timer that opens a webpage (which just happens to be the app) when the timer runs out.

## Future work

There are several improvements that could be made to the app. Here are some ideas:
* **Better pose estimation.** Sometimes PoseNet works well, and one rep is counted once; however, it often struggles to idenfity my elbow correctly, so sometimes one rep gets counted as five reps. A newer library would probably do a better job.
* **More exercises.** This initial app just tracks the user's right arm to see if it is lifted above the shoulder and lowered again. I'd love to add jumping jacks, pushups, squats, lunges, etc. and have the timer alternate between exercises.
* **User-determined rep count.** Want to do 50 reps instead of 20? This feature would allow that.
* **Activity history.** How many times have you completed your exercise today? This week? Ever? It would be cool to store that data so the user could review or download it later. The [Marinara Chrome extension](https://github.com/schmich/marinara) does this well.
* **Replace UI with a video game.** Inspired by the now defunct 8-bit [Dungeon Runner app](https://www.sixtostart.com/dungeon-runner/), my original idea was to make a simple side-scroller video game that has a character who encounters obstacles, and the only way to remove the obstacles is to do exercises, such as lifting arms in the air repeatedly to open a gate. A game overlay is an extra layer of complexity that I decided could be tackled separately once the actual app was working. This [super simple tutorial from KnifeCircus](https://www.youtube.com/watch?v=bG2BmmYr9NQ) of the Google jumping dinosaur game looks like a great place to start. I just have to figure out how to replace the click events with events triggered by poses and also how to make obstacles approach and then stop in front of the player instead of flying past like the cactuses do in the dinosaur game.
