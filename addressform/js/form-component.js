const url = "https://vnowacki.000webhostapp.com/polska/";

export const bindFormActions = (form) => {
    [...form.elements].forEach(control => {
        if(control.tagName === 'INPUT') {
            let list = document.querySelector(`div[name=${control.name}-list]`);
            control.addEventListener('focus', e => {
                fillList(form, control, list);
                list.style.display = 'flex';
            });
            control.addEventListener('keyup', e => {
                fillList(form, control, list);
            });
            control.addEventListener('focusout', e => {
                list.style.display = 'none';
            });
        } else if(control.tagName === 'BUTTON') {
            control.addEventListener('click', e => e.preventDefault());
        }
    });
    validateForm(form);
}

const fillList = (form, field, list) => {
    list.innerHTML = '';
    loadListData(list.getAttribute('name'), field.value, form.voivodeship.value, form.district.value, form.postalCode.value, form.place.value).then(response => response.forEach(elem => {
        let item = document.createElement('div');
        item.classList.add('form-component__select-item');
        switch(field.name) {
            case 'voivodeship':
                item.innerText = elem.wojewodztwo;
                break;
            case 'district':
                item.innerText = elem.powiat;
                break;
            case 'postalCode':
                item.innerText = elem.kod;
                break;
            case 'place':
                item.innerText = elem.miejscowosc;
                break;
            case 'address':
                item.innerText = elem.adres;
                break;
        }
        item.addEventListener('mousedown', e => { field.value = item.innerText; });
        list.appendChild(item);
    })).catch(error => { console.log(error); });
}

const loadListData = async (listName, fieldValue, voivodeship, district, postalCode, place) => {
    let data = await fetch(`${url}?list=${listName}&val=${fieldValue}&voivodeship=${voivodeship}&district=${district}&postalCode=${postalCode}&place=${place}`);
    return data.json();
}

export const validateForm = (form) => {
    [...form.elements].forEach((control, index) => {
        if(control.tagName === 'INPUT') {
            validateField(control, form.elements[index + 1]);
        }
    });
    setTimeout(() => {validateForm(form)}, 200);
}

const validateField = (field, nextField) => {
    loadFieldData(field).then(response => {
        if(response.fieldCorrect == 'yes') nextField.disabled = false;
        else { nextField.disabled = true; nextField.value = ''; }
    });
}

const loadFieldData = async (field) => {
    let data = await fetch(`${url}?field=${field.name}&val=${field.value}`);
    return data.json();
}