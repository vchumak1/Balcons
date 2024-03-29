"use strict";

const modals = () => {

    //создаем функцию вызова модальных окон по клику на кнопку или ссылки
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        //помещаем в переменные функции селекторы, которые были переданы в качестве аргументов
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll("[data-modal]");

        //делаем переиспользуемую функцию для закрытия модальных окон
        function closeModal() {
            windows.forEach(item => item.style.display = "none");
            modal.style.display = "none";
            //document.body.classList.remove("modal-open");
            document.body.style.overflow ="";
        }
        //обрабатываем события для всех кнопок или ссылок, которые открывают модальные окна
        trigger.forEach(item => {
            item.addEventListener('click', e => {
                //если кликаем на ссылку, то отменяем стандартное поведение браузера
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => item.style.display = "none");

                modal.style.display = "block";
                //document.body.classList.add("modal-open");
                document.body.style.overflow ="hidden";
            });
        });
        //закрываем окно при нажатии на крестик
        close.addEventListener("click", () => {
            closeModal();
        });

        //закрываем окно при нажатии на подложку
        modal.addEventListener("click", e => {
            if (e.target === modal && closeClickOverlay) {
                closeModal();
            }
        });
    }

    //реализуем появление модального окна через заданный промежуток времени
    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = "block";
            document.body.overflow ="";
        }, time);
    }
    bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
    bindModal(".phone_link", ".popup", ".popup .popup_close" );
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime(".popup", 60000);
};

export default modals;