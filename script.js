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

AOS.init();