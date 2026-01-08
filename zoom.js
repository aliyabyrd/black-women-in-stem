document.addEventListener("DOMContentLoaded", function () {
    let currentZoom = 1.0;
    let body = document.body;
    
    function applyZoom() {
        body.style.transform = `scale(${currentZoom})`;
        body.style.transformOrigin = "top left";
        document.documentElement.style.overflowX = "auto"; // this is for left-right scrolling
    }

    document.getElementById("zoom-in").addEventListener("click", function () {
        if (currentZoom < 2.0) { // Max Zoom Limit
            currentZoom += 0.1;
            applyZoom();
        }
    });

    document.getElementById("zoom-out").addEventListener("click", function () {
        if (currentZoom > 0.5) { // Min Zoom Limit
            currentZoom -= 0.1;
            applyZoom();
        }
    });
});
