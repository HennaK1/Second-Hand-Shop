'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const addForm = document.querySelector('#addProductForm');
const categoryList = document.querySelector('.add-category');

// create user options to <select>
const createCategoryOptions = (users) => {
    // clear user list
    categoryList.innerHTML = '';
    users.forEach((user) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = Category.CategoryId;
        option.innerHTML = Category.CategoryName;
        option.classList.add('light-border');
        categoryList.appendChild(option);
    });
    // load cat data after users
    getProduct(ProductId);
};

// get users to make options
const getCategory = async () => {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/user', options);
        const users = await response.json();
        createCategoryOptions(users);
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
