'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

const Categories = [
    {
        title: 'Paidat',
    },
    {
        title: 'Mekot',
    },
    {
        title: 'Takit',
    },

];

const optionElement = document.querySelector(".add-category");

optionElement.innerHTML = '';

// lisätään tarvittava html-koodi, katso tarvittavat tagit esim. task-b.html
for (let i= 0; i < Categories.length; i++){
    optionElement.innerHTML +=
        `<option>
        ${Categories[i].title}
        </option>`;
}


// select existing html elements
const addForm = document.querySelector('#addProductForm');
const categoryList = document.querySelector('.add-category');

// create user options to <select>
const createCategoryOptions = (Categories) => {
    // clear user list
    categoryList.innerHTML = '';
    Categories.forEach((Category) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = Category.CategoryName;
        option.innerHTML = Category.CategoryName;
        option.classList.add('border');
        categoryList.appendChild(option);
    });
    // load cat data after users
    getProduct(ProductId);
};

// get users to make options
const getCategories = async () => {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user', options);
        const Categories = await response.json();
        createCategoryOptions(Categories);
    } catch (e) {
        console.log(e.message);
    }
};

// submit add product form
addForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const fd = new FormData(addForm);
    const fetchOptions = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        body: fd,
    };
    const response = await fetch(url + '/product', fetchOptions);
    const json = await response.json();
    alert(json.message);
    location.href = '../front/front.html';
});
