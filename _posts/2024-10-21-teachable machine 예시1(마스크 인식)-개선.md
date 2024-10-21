---
title: "마스크 착용여부 확인 하기(디처블 머신, 코드 개선)"
categories:
#   - coding
 - Non-coding

tags:
  - AI
  - coding
  - 테디노트
  - Teachable Machine
  - 티처블 머신
 

last_modified_at: 2024-10-21T10:56:50-11:10
---

from [테디노트 TeddyNote](https://youtu.be/SpiYDdVGgcs?si=dstwPqCq_DxmRtBy){: target="_blank"}

## 과정
1. Teachable 머신에서 딥러닝 모델 간단히 생성
2. 생성된 모델을 다운로드
3. github 블로그 post를 위해, 모델 업로드 및 MD파일를 통해 코딩 및 모델 로딩
4. github post에서 동작 확인

---

## 마스크 착용 감지 웹 애플리케이션

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
    const URL = "../../my_model/";
    let model, webcam, labelContainer, maxPredictions;
    let flag = false;

    // 상태 메시지 표시 함수
    function showStatus(message, isError = false) {
        const statusDiv = document.getElementById('status-message');
        statusDiv.textContent = message;
        statusDiv.style.color = isError ? '#ff0000' : '#666';
    }

    // 카메라 권한 확인 및 요청 함수
    async function requestCameraPermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (err) {
            console.error('카메라 권한 요청 중 에러:', err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                showStatus('카메라 접근이 거부되었습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.', true);
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                showStatus('카메라를 찾을 수 없습니다. 카메라가 연결되어 있는지 확인해주세요.', true);
            } else {
                showStatus(`카메라 접근 중 오류가 발생했습니다: ${err.message}`, true);
            }
            return false;
        }
    }

    async function init() {
        if (document.getElementById('webcam-container').hasChildNodes()) {
            return;
        }

        showStatus("카메라 권한을 요청하는 중...");

        try {
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
                return;
            }

            showStatus("모델을 로딩하는 중...");

            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";

            try {
                model = await tmImage.load(modelURL, metadataURL);
            } catch (modelError) {
                console.error('모델 로딩 에러:', modelError);
                throw new Error(`모델 로딩에 실패했습니다. 파일 경로를 확인해주세요. 에러: ${modelError.message}`);
            }

            maxPredictions = model.getTotalClasses();

            showStatus("카메라를 초기화하는 중...");

            webcam = new tmImage.Webcam(350, 350, true);
            await webcam.setup();
            await webcam.play();
            
            flag = true;

            document.getElementById('webcam-container').appendChild(webcam.canvas);
            
            labelContainer = document.getElementById("label-container");
            labelContainer.innerHTML = '';
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }

            document.getElementById("startBtn").style.display = "none";
            document.getElementById("stopBtn").style.display = "block";

            showStatus("실행 중...");
            window.requestAnimationFrame(loop);

        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
            showStatus(error.message || '카메라 초기화 중 오류가 발생했습니다.', true);
            
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
