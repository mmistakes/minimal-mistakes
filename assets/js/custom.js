/* ----------------------------
home > categories-tab
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
const tabs = document.querySelectorAll(".category-tab");
const posts = document.querySelectorAll(".category-post");

if (!tabs.length || !posts.length) return;

function activateTab(targetId) {
    // 탭 active 처리
    tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.target === targetId);
    });

    // 콘텐츠 active 처리
    posts.forEach(post => {
    post.classList.toggle("active", post.id === targetId);
    });
}

// 탭 클릭 시 해시 변경
tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = tab.dataset.target;
    window.location.hash = (targetId === "all") ? "" : targetId; // URL 해시 변경
    activateTab(targetId);
    });
});

// 페이지 로드 시 해시 확인
function initFromHash() {
    let hash = window.location.hash.substring(1); // "#" 제거
    if (!hash || !document.getElementById(hash)) {
    hash = ""; // 없는 해시거나 빈 경우 전체 탭
    }
    if (document.getElementById(hash)) {
      activateTab(hash);
    }
}

window.addEventListener("hashchange", initFromHash);
initFromHash();
});


/* ----------------------------
home > sidebar > tags-filter
---------------------------- */
function filterTagSection(sectionId) {
    const isTagsPage = window.location.pathname.includes('/tags/');
    if (!isTagsPage) return;

    const sections = document.querySelectorAll('.taxonomy__section');
    const validSections = Array.from(sections).map(s => s.id);

    if (!validSections.includes(sectionId)) {
        window.location.hash = '';
        sectionId = null;
    }
    
    if (sectionId) {
        sections.forEach(function (section) {
            section.style.display = section.id === sectionId ? 'block' : 'none';
        });
    } else {
        sections.forEach(function (section) {
            section.style.display = 'block';
        });
    }
}
// 페이지 로드 시 실행
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.substring(1);
    var sectionId = (hash || window.location.pathname).replace(/\/$/, '').split('/').pop();
    filterTagSection(sectionId);
});

// tags 페이지 내에서 link로 이동시
document.querySelectorAll('.taxonomy-link').forEach(link => {
    link.addEventListener('click', function(e) {
    const sectionId = this.getAttribute('href').substring(1);
    filterTagSection(sectionId);
    });
});

// hash가 바뀔 때마다 실행
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const sectionId = (hash || window.location.pathname).replace(/\/$/, '').split('/').pop();
    filterTagSection(sectionId);
});