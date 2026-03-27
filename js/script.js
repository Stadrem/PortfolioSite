$("#babylonjs-run-btn").click(async function () {
    $('#babylon-viewer').toggle();
})

$("#babylonjs-close-btn").click(async function () {
    $('#babylon-viewer').toggle();
})

// 명함 뒤집기 기능
document.addEventListener('DOMContentLoaded', function() {
    const businessCard = document.getElementById('businessCard');
    
    if (businessCard) {
        businessCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // 터치 이벤트도 지원
        businessCard.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.toggle('flipped');
        });
    }

    // Project card click → open modal
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
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

AOS.init();