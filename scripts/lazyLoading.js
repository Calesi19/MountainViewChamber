// Lazy Loading

const images = document.querySelectorAll('img[data-src]');

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) {
        return;
    }

    img.src = src;
    img.removeAttribute('data-src');
    img.classList.add('loaded'); // add the 'loaded' class to the image
}

const imgOptions = {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px 0px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});