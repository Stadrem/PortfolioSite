// 프로젝트 경력 모달 띄우기 (외부의 career.html 파일 불어오기)
$(document).ready(function () {
    $('#showCareerBtn').click(function () {
        if ($('#careerModal').length === 0) {
            $('#careerModalContainer').load('career.html', function (response, status, xhr) {
                if (status == "error") {
                    console.error("경력사항 데이터를 불러오는데 실패했습니다: " + xhr.status + " " + xhr.statusText);
                    return;
                }
                const careerModal = new bootstrap.Modal(document.getElementById('careerModal'));
                careerModal.show();
            });
        } else {
            let careerModal = bootstrap.Modal.getInstance(document.getElementById('careerModal'));
            if (!careerModal) careerModal = new bootstrap.Modal(document.getElementById('careerModal'));
            careerModal.show();
        }
    });
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

document.addEventListener('DOMContentLoaded', handleHashChange);
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