// 프로젝트 경력 모달 띄우기 (외부의 career.html 파일 불어오기 및 #career 해시 지원)
function setupCareerModalEvents() {
    const modalEl = document.getElementById('careerModal');
    if (!modalEl || modalEl.dataset.eventsBound) return;
    modalEl.dataset.eventsBound = 'true';

    // 모달이 닫힐 때 URL 해시가 #career면 주소창에서 깔끔하게 해시 제거
    modalEl.addEventListener('hidden.bs.modal', function () {
        if (window.location.hash === '#career') {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    });
}

function openCareerModal() {
    function showModal() {
        const modalEl = document.getElementById('careerModal');
        if (!modalEl) return;
        let careerModal = bootstrap.Modal.getInstance(modalEl);
        if (!careerModal) careerModal = new bootstrap.Modal(modalEl);
        careerModal.show();
    }

    if ($('#careerModal').length === 0) {
        $('#careerModalContainer').load('career.html', function (response, status, xhr) {
            if (status === "error") {
                console.error("경력사항 데이터를 불러오는데 실패했습니다: " + xhr.status + " " + xhr.statusText);
                return;
            }
            setupCareerModalEvents();
            showModal();
        });
    } else {
        showModal();
    }
}

function handleCareerHash() {
    if (window.location.hash === '#career') {
        openCareerModal();
    } else {
        const modalEl = document.getElementById('careerModal');
        if (modalEl) {
            const careerModal = bootstrap.Modal.getInstance(modalEl);
            if (careerModal) careerModal.hide();
        }
    }
}

$(document).ready(function () {
    $('#showCareerBtn').on('click', function (e) {
        e.preventDefault();
        if (window.location.hash === '#career') {
            openCareerModal();
        } else {
            window.location.hash = 'career';
        }
    });

    // 페이지 진입 시 #career 해시가 있으면 모달 자동 열기
    handleCareerHash();
    window.addEventListener('hashchange', handleCareerHash);
});

// 명함 뒤집기 기능
document.addEventListener('DOMContentLoaded', function () {
    const businessCard = document.getElementById('businessCard');

    if (businessCard) {
        businessCard.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });

        // 터치 이벤트도 지원
        businessCard.addEventListener('touchend', function (e) {
            e.preventDefault();
            this.classList.toggle('flipped');
        });
    }

    // Project card click → open modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // 카드 내부 링크 클릭은 모달 열지 않음
            if (e.target.closest('a')) return;

            const col = this.closest('.col');
            const link = col ? col.dataset.link : '';

            // Extract data from card
            const img = this.querySelector('.card-img-top');
            const title = this.querySelector('h4.card-title');
            const allH5 = this.querySelectorAll('h5.card-title');
            const allTools = this.querySelectorAll('.card-text-tools');
            const description = this.querySelector('.card-text');
            const toolIcons = this.querySelector('.tool-icons');
            const footer = this.querySelector('.card-footer small');

            // Populate modal
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('projectModalLabel');
            const modalRole = document.getElementById('modalRole');
            const modalTools = document.getElementById('modalTools');
            const modalDescription = document.getElementById('modalDescription');
            const modalToolIcons = document.getElementById('modalToolIcons');
            const modalPeriod = document.getElementById('modalPeriod');
            const modalLink = document.getElementById('modalExternalLink');

            modalImage.src = img ? img.src : '';
            modalImage.alt = img ? img.alt : '';
            modalTitle.textContent = title ? title.textContent : '';

            if (allH5.length > 0) {
                modalRole.innerHTML = Array.from(allH5).map(h => h.outerHTML).join('');
                modalRole.style.display = '';
            } else {
                modalRole.innerHTML = '';
                modalRole.style.display = 'none';
            }

            if (allTools.length > 0) {
                modalTools.innerHTML = Array.from(allTools).map(t => t.outerHTML).join('');
                modalTools.style.display = '';
            } else {
                modalTools.innerHTML = '';
                modalTools.style.display = 'none';
            }

            if (description) {
                modalDescription.innerHTML = description.outerHTML;
                modalDescription.style.display = '';
            } else {
                modalDescription.innerHTML = '';
                modalDescription.style.display = 'none';
            }

            if (toolIcons) {
                modalToolIcons.innerHTML = toolIcons.innerHTML;
                modalToolIcons.style.display = '';
            } else {
                modalToolIcons.innerHTML = '';
                modalToolIcons.style.display = 'none';
            }

            if (footer) {
                modalPeriod.textContent = footer.textContent;
                modalPeriod.style.display = '';
            } else {
                modalPeriod.textContent = '';
                modalPeriod.style.display = 'none';
            }

            if (link) {
                modalLink.href = link;
                modalLink.style.display = '';
            } else {
                modalLink.style.display = 'none';
            }

            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('projectModal'));
            modal.show();
        });
    });
});

const tiltableDivs = document.querySelectorAll('.col');

tiltableDivs.forEach(tiltableDiv => {
    tiltableDiv.addEventListener('mousemove', (e) => {
        const rect = tiltableDiv.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const maxTilt = 5;

        const tiltX = (mouseX - rect.width / 2) / (rect.width / 2) * maxTilt;
        const tiltY = (mouseY - rect.height / 2) / (rect.height / 2) * -maxTilt;

        tiltableDiv.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    });

    tiltableDiv.addEventListener('mouseleave', () => {
        tiltableDiv.style.transform = 'none';
    });
});

// Collapsible section toggle
document.querySelectorAll('.section-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const targetId = this.dataset.target;
        const content = document.getElementById(targetId);
        if (!content) return;

        const isCollapsed = this.classList.contains('collapsed');

        if (isCollapsed) {
            // Open
            this.classList.remove('collapsed');
            content.classList.remove('collapsed');
        } else {
            // Close
            this.classList.add('collapsed');
            content.classList.add('collapsed');
        }
    });
});

// Hash based section toggle mapping
const hashToSectionMap = {
    '#game': 'gmContent',
    '#modeling': 'cmContent',
    '#effect': 'efContent',
    '#etc': 'etcContent'
};

function handleHashChange() {
    const hash = window.location.hash;
    if (!hash || !hashToSectionMap[hash]) return;

    const targetId = hashToSectionMap[hash];

    // Close all content sections and remove active state from toggles
    document.querySelectorAll('.collapsible-content').forEach(content => {
        if (content.id !== targetId) {
            content.classList.add('collapsed');
        }
    });

    document.querySelectorAll('.section-toggle').forEach(toggle => {
        if (toggle.dataset.target !== targetId) {
            toggle.classList.add('collapsed');
        }
    });

    // Open target section
    const targetContent = document.getElementById(targetId);
    const targetToggle = document.querySelector(`.section-toggle[data-target="${targetId}"]`);

    if (targetContent && targetToggle) {
        targetContent.classList.remove('collapsed');
        targetToggle.classList.remove('collapsed');

        // Scroll to the toggle slightly offset for header
        setTimeout(() => {
            const yOffset = -20;
            const targetPosition = targetToggle.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
    document.querySelectorAll('.nav-anchor-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && hashToSectionMap[href]) {
                if (window.location.hash === href) {
                    e.preventDefault();
                    handleHashChange();
                }
            }
        });
    });
});
window.addEventListener('hashchange', handleHashChange);

// Video hover autoplay for effect cards
document.querySelectorAll('.card-video').forEach(video => {
    const card = video.closest('.project-card');
    if (!card) return;

    card.addEventListener('mouseenter', () => {
        video.play().catch(() => { });
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
    });
});

// 나만의 커스텀 태그 정의하기 (웹 컴포넌트)
class ToolIcon extends HTMLElement {
    connectedCallback() {
        const tool = this.getAttribute('tool');
        
        const iconData = {
            'unity': { src: 'img/icon_unity.png', title: 'Unity', alt: 'Unity' },
            'substance': { src: 'img/icon_substance.png', title: 'Substance Painter', alt: 'Substance Painter' },
            'max': { src: 'img/icon_max.png', title: '3DS Max', alt: '3DS Max' },
            'blender': { src: 'img/icon_blender.png', title: 'Blender', alt: 'Blender' },
            'zbrush': { src: 'img/icon_zbrush.png', title: 'Zbrush', alt: 'Zbrush' },
            'photoshop': { src: 'img/icon_photoshop.png', title: 'Photoshop', alt: 'Photoshop' },
            'krita': { src: 'img/icon_krita.png', title: 'Krita', alt: 'Krita' },
            'davinci': { src: 'img/icon_davinci.png', title: 'Davinci resolve', alt: 'Davinci resolve' }
        };

        const data = iconData[tool ? tool.toLowerCase() : ''];
        
        if (data) {
            this.innerHTML = `<img src="${data.src}" alt="${data.alt}" title="${data.title}" class="tool-icon">`;
        }
    }
}
customElements.define('tool-icon', ToolIcon);