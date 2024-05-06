setInterval(() => {
    const photos = document.querySelector('.photos');
    const firstPhoto = photos.firstElementChild;
    photos.removeChild(firstPhoto);
    photos.appendChild(firstPhoto);
}, 3000);