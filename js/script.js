$("#btnAbout").click(async function () {
    $('#aboutTextToggle').toggle();
})

$("#btnCM").click(async function () {
    $('#cmToggle').toggle();
})

$("#btnGM").click(async function () {
    $('#gmToggle').toggle();
    $('#sectionCap').toggle();
})

$("#babylonjs-run-btn").click(async function () {
    $('#babylon-viewer').toggle();
})

$("#babylonjs-close-btn").click(async function () {
    $('#babylon-viewer').toggle();
})

AOS.init();