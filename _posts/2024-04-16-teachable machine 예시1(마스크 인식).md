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
    <div id="status-message" style="color: #666; margin: 10px 0;"></div>
    <div id="webcam-container"></div>
    <div id="label-container" style="font-size: 1.2rem; margin-top: 1rem;"></div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"></script>
<script>
    const URL = "./my_model/";
    let model, webcam, labelContainer, maxPredictions;
    let flag = false;

    // 상태 메시지 표시 함수
    function showStatus(message, isError = false) {
        const statusDiv = document.getElementById('status-message');
        statusDiv.textContent = message;
        statusDiv.style.color = isError ? '#ff0000' : '#666';
    }

    // 카메라 권한 확인 함수
    async function checkCameraPermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop()); // 체크 후 스트림 정지
            return true;
        } catch (err) {
            console.error('카메라 권한 확인 중 에러:', err);
            return false;
        }
    }

    async function init() {
        if (document.getElementById('webcam-container').hasChildNodes()) {
            return;
        }

        showStatus("카메라 권한을 확인하는 중...");

        try {
            // 카메라 권한 먼저 확인
            const hasPermission = await checkCameraPermission();
            if (!hasPermission) {
                throw new Error('카메라 접근이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.');
            }

            showStatus("모델을 로딩하는 중...");

            // 모델 로드
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            try {
                model = await tmImage.load(modelURL, metadataURL);
            } catch (modelError) {
                throw new Error('모델 로딩에 실패했습니다. 파일 경로를 확인해주세요.');
            }

            maxPredictions = model.getTotalClasses();

            showStatus("카메라를 초기화하는 중...");

            // 웹캠 설정
            webcam = new tmImage.Webcam(350, 350, true);
            await webcam.setup();
            await webcam.play();
            
            flag = true;

            // DOM 업데이트
            document.getElementById('webcam-container').appendChild(webcam.canvas);
            
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }

            // 버튼 상태 업데이트
            document.getElementById("startBtn").style.display = "none";
            document.getElementById("stopBtn").style.display = "block";

            showStatus("실행 중...");
            window.requestAnimationFrame(loop);

        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
            showStatus(error.message || '카메라 초기화 중 오류가 발생했습니다.', true);
            
            // 에러 발생 시 cleanup
            if (webcam) {
                webcam.stop();
            }
            document.getElementById('webcam-container').innerHTML = '';
            document.getElementById("startBtn").style.display = "block";
            document.getElementById("stopBtn").style.display = "none";
        }
    }

    async function loop() {
        if (!flag) return;
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        try {
            const prediction = await model.predict(webcam.canvas);
            let highestProbability = 0;
            let bestPrediction = null;

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

            if (bestPrediction) {
                labelContainer.childNodes[bestPrediction.index].innerHTML = 
                    `${bestPrediction.className}: ${bestPrediction.probability.toFixed(2)}%`;
            }
        } catch (error) {
            console.error('예측 중 오류 발생:', error);
            showStatus('예측 중 오류가 발생했습니다.', true);
        }
    }

    async function stop() {
        flag = false;
        if (webcam) {
            webcam.stop();
            document.getElementById('webcam-container').innerHTML = '';
            document.getElementById('label-container').innerHTML = '';
            showStatus('중지됨');
            document.getElementById("startBtn").style.display = "block";
            document.getElementById("stopBtn").style.display = "none";
        }
    }

    // 페이지 로드 시 초기 설정
    window.onload = function() {
        document.getElementById("stopBtn").style.display = "none";
        showStatus('시작 버튼을 눌러 카메라를 활성화하세요.');
    }
</script>