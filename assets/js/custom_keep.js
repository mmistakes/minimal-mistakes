// CUSTOM - categories filter
function filterSection(sectionId) {
    const isCategoriesPage = window.location.pathname.includes('/categories/');
    if (!isCategoriesPage) return;

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
    filterSection(sectionId);
});

// categories 페이지 내에서 link로 이동시
document.querySelectorAll('.taxonomy-link').forEach(link => {
    link.addEventListener('click', function(e) {
    const sectionId = this.getAttribute('href').substring(1);
    filterSection(sectionId);
    });
});

// hash가 바뀔 때마다 실행
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    const sectionId = (hash || window.location.pathname).replace(/\/$/, '').split('/').pop();
    filterSection(sectionId);
});