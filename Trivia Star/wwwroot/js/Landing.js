document.addEventListener("DOMContentLoaded", function() 
{
    const overlay=document.getElementById('sweepOverlay');
    
    
    setTimeout(() => 
    {
        overlay.style.left = "100%";
    }, 100)
    
    const startButton=document.getElementById('startButton');

    startButton.addEventListener('click', function(e)
    {
        e.preventDefault();
        overlay.style.left = '0';
        const targetUrl = this.getAttribute('data-url');

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800);
    });
});