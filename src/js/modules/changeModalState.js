"use strict";
import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    state.form = 0;
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll(".checkbox");

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case "SPAN": 
                        state[prop] = i;
                        break;
                    case "INPUT": 
                        if(item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, j) => j === i ? box.checked === true : box.checked = false);
                        } else {
                            state[prop] = item.value;
                            }
                        break;
                    case "SELECT":
                        state[prop] = item.value; 
                        break;
                }
                // if(item.length > 1) {
                //     state[prop] = i;
                // } else {
                //     state[prop] = item.value;
                // }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('input', windowHeight, 'height');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');

};

export default changeModalState;