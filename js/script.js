$("#babylonjs-run-btn").click(async function () {
    $('#babylon-viewer').toggle();
})

$("#babylonjs-close-btn").click(async function () {
    $('#babylon-viewer').toggle();
})

const tiltableDivs = document.querySelectorAll('.col');

tiltableDivs.forEach(tiltableDiv => {
    tiltableDiv.addEventListener('mousemove', (e) => {
        const rect = tiltableDiv.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const maxTilt = 10;

        const tiltX = (mouseX - rect.width / 2) / (rect.width / 2) * maxTilt;
        const tiltY = (mouseY - rect.height / 2) / (rect.height / 2) * -maxTilt;

        tiltableDiv.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
    });

    tiltableDiv.addEventListener('mouseleave', () => {
        tiltableDiv.style.transform = 'none';
    });
});

AOS.init();

// 갤러리 이미지 데이터
const animationGallery = {
    monster: ["img/monster1.gif", "img/monster2.gif", "img/monster3.gif"],
    character: ["img/character1.gif", "img/character2.gif", "img/character3.gif"]
};

// 팝업창 표시 및 이미지 로딩
document.querySelectorAll('.animation-card').forEach(card => {
    card.addEventListener('click', () => {
        const animType = card.getAttribute('data-animations');
        const imagesContainer = document.getElementById('gallery-images');
        imagesContainer.innerHTML = ''; // 초기화

        animationGallery[animType].forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            imagesContainer.appendChild(img);
        });

        document.getElementById('popup-gallery').style.display = 'flex';
    });
});

// 닫기 버튼 기능
document.getElementById('gallery-close-btn').addEventListener('click', () => {
    document.getElementById('popup-gallery').style.display = 'none';
});

// 팝업창 바깥 클릭 시 닫기 기능
window.addEventListener('click', (e) => {
    const popup = document.getElementById('popup-gallery');
    if (e.target == popup) {
        popup.style.display = 'none';
    }
});