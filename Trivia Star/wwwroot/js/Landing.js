document.querySelector("#startButton").addEventListener("click", function(e) 
{
    e.preventDefault();
    const overlay = document.getElementById("sweepOverlay")
    overlay.style.left = "0";
    
    const targetUrl = this.dataset.url;

    // Wait for animation to finish before navigating
    setTimeout(() => 
    {
        window.location.href = targetUrl;
    }, 800);    
});