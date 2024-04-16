---
title: "마스크aktm"
categories:
  - AI Regulation
tags:
  - AI
  - 코딩 예시
 

last_modified_at: 2024-04-16T12:50:50-12:59
---
<button type="button" id='startBtn' onclick="init()">시작</button>
<button type="button" id='stopBtn' onclick="stop()">중지</button>
<div id="webcam-container"></div>
<div id="label-container"></div>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
<script type="text/javascript">
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL = "../../my_model/";

    let model, webcam, labelContainer, maxPredictions;

    var flag = false;

    // Load the image model and setup the webcam
    async function init() {
        var element = document.getElementById('webcam-container');
        if (element.hasChildNodes()) {
            return;
        }

        flag = true;
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(350, 350, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").style.position = "relative";
        document.getElementById("webcam-container").style.left = "50%";
        document.getElementById("webcam-container").style.right = "50%";

        // append elements to the DOM
        document.getElementById('webcam-container').appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
        document.getElementById("label-container").style.position = "relative";
        document.getElementById("label-container").style.left = "50%";
        document.getElementById("label-container").style.right = "50%";

        document.getElementById("startBtn").style.visibility = "hidden";
        document.getElementById("stopBtn").style.visibility = "visible";
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        if (flag) {
            window.requestAnimationFrame(loop);
        }
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        var topChild;
        var topProb = 0;
        var topClassName = "";
        for (let i = 0; i < maxPredictions; i++) {
            prob = prediction[i].probability * 100
            if (prob > topProb) {
                topChild = labelContainer.childNodes[i];
                topProb = prob;
                topClassName = prediction[i].className + ": " + prob.toFixed(2) + "%";
            }
            labelContainer.childNodes[i].innerHTML = "";
        }
        topChild.innerHTML = topClassName;
        topChild.style.color = "black";
    }

    async function stop() {
        flag = false;
        webcam.stop();
        document.getElementById("webcam-container").removeChild(webcam.canvas);
        const labels = document.getElementById("label-container");
        while (labels.firstChild) {
            labels.removeChild(labels.lastChild);
        }
        document.getElementById("startBtn").style.visibility = "visible";
        document.getElementById("stopBtn").style.visibility = "hidden";
    }

    window.onload = function () {
        document.getElementById("stopBtn").style.visibility = "hidden";
    }
</script>