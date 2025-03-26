---
layout: default
title: "Like Test Page"
permalink: /like-test/
---

<button id="like-button">❤️ 좋아요 (<span id="like-count">0</span>)</button>

<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database-compat.js"></script>

<script>
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
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const likeBtn = document.getElementById('like-button');
  const likeCountEl = document.getElementById('like-count');
  const likesRef = firebase.database().ref('likes/test-page');

  likesRef.on('value', (snapshot) => {
    const count = snapshot.val() || 0;
    likeCountEl.textContent = count;
  });

  likeBtn.addEventListener('click', () => {
    likesRef.transaction((currentLikes) => {
      return (currentLikes || 0) + 1;
    });
  });
</script>
