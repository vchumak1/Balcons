"use strict";

const images = () => {
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');
    
    imgPopup.classList.add('popup');

    imgPopup.style.cssText = "display: none; justify-content: center; align-items: center;";

    if(window.innerWidth <= 700) {
        bigImage.style.cssText = 'width: 80vw; height: 50vh';
    } else {
        bigImage.style.cssText = 'height: 70vh';
    }


    workSection.appendChild(imgPopup);
    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();

        let target = e.target;
        if(target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex';
            const path = target.parentNode.getAttribute('href');
            bigImage.setAttribute('src', path);
            document.body.style.overflow ="hidden";
        }

        if(target && target.classList.contains('popup')) {
            imgPopup.style.display = 'none';
            document.body.style.overflow ="";
        }
    });
};

export default images;