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