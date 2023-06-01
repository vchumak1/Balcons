"use strict";

const forms = () => {
   //получаем все формы и их поля ввода 
   const form = document.querySelectorAll("form"),
         inputs = document.querySelectorAll("input"),
         phoneInputs = document.querySelectorAll("input[name='user_phone']");
    //реализуем функциональность цифрового ввода в поле для телефона
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '').substring(0, 9);
        });
    });
    //задаем объект для реакции сервера на наши ПОСТ запросы в модальном окне
    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с Вами свяжемся",
        failure: "Что то пошло не так"
    };
    //реализуем функцию отправки данных на сервер
    const postData = async (url, data) => {
        document.querySelector(".status").textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };
    //реализуем функцию удаления статусного сообщения
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };
    //реализуем функцию взаимодействия с формами
    form.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();
            //создаем сообщение о статусе отправки данных
            let statusMessage = document.createElement('div');
            statusMessage.classList.add("status");
            item.appendChild(statusMessage);
            //создаем переменную для отправки данных с формы
            const formData = new FormData(item);
            //передаем данные на сервер
            postData("assets/server.php", formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;