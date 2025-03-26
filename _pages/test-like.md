---
layout: default
title: "Like Test"
permalink: /like-test/
---

<h2>❤️ Firebase 좋아요 버튼 테스트</h2>

<p>이 버튼을 눌러서 Firebase Realtime Database 연결이 제대로 작동하는지 확인해보세요.</p>

<button id="like-button" style="font-size: 1.2rem; padding: 10px 20px; border-radius: 10px;">❤️ 좋아요 (<span id="like-count">0</span>)</button>

<!-- ✅ Firebase SDK 불러오기 -->
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>

<!-- ✅ Firebase 설정 및 동작 코드 -->
<script>
  // Firebase 설정 - 너의 프로젝트 정보!
  const firebaseConfig = {
    apiKey: "AIzaSyDXB4ilHCdpWzc93i_ZuXy28XF0WD5sRmw",
    authDomain: "csi500.firebaseapp.com",
    databaseURL: "https://csi500-default-rtdb.firebaseio.com",
    projectId: "csi500",
    storageBucket: "csi500.firebasestorage.app",
    messagingSenderId: "156115395881",
    appId: "1:156115395881:web:9b02926e36e8cec3564338",
    measurementId: "G-M76XFGXLWD"
  };

  // Firebase 초기화
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const likeBtn = document.getElementById('like-button');
  const likeCountEl = document.getElementById('like-count');
  const likesRef = db.ref('likes/test-page'); // 경로: likes/test-page

  // 좋아요 숫자 실시간 불러오기
  likesRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    likeCountEl.textContent = count;
  });

  // 버튼 누르면 +1
  likeBtn.addEventListener('click', () => {
    likesRef.transaction((currentLikes) => {
      return (currentLikes || 0) + 1;
    });
  });
</script>
