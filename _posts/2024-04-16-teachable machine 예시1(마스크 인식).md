---
title: "마스크 착용여부 확인 하기(디처블 머신)"
categories:
#   - coding
 - Non-coding

tags:
  - AI
  - coding
  - 테디노트
  - Teachable Machine
  - 티처블 머신
 

last_modified_at: 2024-04-23T23:52:50-23:59
---

from [테디노트 TeddyNote](https://youtu.be/SpiYDdVGgcs?si=dstwPqCq_DxmRtBy)



---

# 마스크 착용 감지 웹 애플리케이션

<div class="container" style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2rem;">
    <div style="display: flex; gap: 1rem;">
        <button type="button" id="startBtn" onclick="init()" style="padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer;">시작</button>
        <button type="button" id="stopBtn" onclick="stop()" style="padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer;">중지</button>
    </div>
    <div id="webcam-container"></div>
    <div id="label-container" style="font-size: 1.2rem; margin-top: 1rem;"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
<script>
    // Teachable Machine 모델 URL - GitHub Pages 경로에 맞게 수정 필요
    const URL = "./my_model/";
    
    let model, webcam, labelContainer, maxPredictions;
    let flag = false;

    async function init() {
        // 이미 웹캠이 실행 중인 경우 중복 실행 방지
        if (document.getElementById('webcam-container').hasChildNodes()) {
            return;
        }

        try {
            flag = true;
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            // 모델 로드
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();

            // 웹캠 설정
            webcam = new tmImage.Webcam(350, 350, true); // width, height, flip
            await webcam.setup(); // 카메라 접근 권한 요청
            await webcam.play();

            // DOM에 웹캠 엘리먼트 추가
            document.getElementById('webcam-container').appendChild(webcam.canvas);

            // 예측 결과를 표시할 레이블 컨테이너 설정
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = ''; // 기존 내용 초기화
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }

            // 버튼 상태 변경
            document.getElementById("startBtn").style.display = "none";
            document.getElementById("stopBtn").style.display = "block";

            // 예측 루프 시작
            window.requestAnimationFrame(loop);
        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
            alert('카메라 접근 권한을 확인해주세요.');
        }
    }

    async function loop() {
        if (!flag) return;
        webcam.update(); // 웹캠 프레임 업데이트
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        try {
            const prediction = await model.predict(webcam.canvas);
            let highestProbability = 0;
            let bestPrediction = null;

            // 가장 높은 확률의 예측 찾기
            prediction.forEach((p, i) => {
                const probability = p.probability * 100;
                if (probability > highestProbability) {
                    highestProbability = probability;
                    bestPrediction = {
                        className: p.className,
                        probability: probability,
                        index: i
                    };
                }
                labelContainer.childNodes[i].innerHTML = "";
            });

            // 최고 확률의 결과만 표시
            if (bestPrediction) {
                labelContainer.childNodes[bestPrediction.index].innerHTML = 
                    `${bestPrediction.className}: ${bestPrediction.probability.toFixed(2)}%`;
            }
        } catch (error) {
            console.error('예측 중 오류 발생:', error);
        }
    }

    async function stop() {
        flag = false;
        if (webcam) {
            webcam.stop();
            document.getElementById('webcam-container').innerHTML = '';
            document.getElementById('label-container').innerHTML = '';
            document.getElementById("startBtn").style.display = "block";
            document.getElementById("stopBtn").style.display = "none";
        }
    }

    // 페이지 로드 시 초기 설정
    window.onload = function() {
        document.getElementById("stopBtn").style.display = "none";
    }
</script>