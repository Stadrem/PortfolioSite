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