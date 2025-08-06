document.addEventListener('DOMContentLoaded', () =>
{
    const overlay = document.getElementById('sweepOverlay');

    setTimeout(() =>{
        overlay.style.left = '100%';
    }, 100);

    const homeButton = document.getElementById('homeButton');
    const playButton = document.getElementById('playButton');

    homeButton.addEventListener('click', function(e)
    {
        e.preventDefault();
        overlay.style.left = '0';
        const targetUrl = this.getAttribute('data-url');

        setTimeout(() => 
        {
            window.location.href = targetUrl;
        }, 800);
    });

    playButton.addEventListener('click', function(e)
    {
        e.preventDefault();
        overlay.style.left = '0';
        const targetUrl = this.getAttribute('data-url');

        setTimeout(() => 
        {
            window.location.href = targetUrl;
        }, 800);
    });
});