'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

//onst Categories = [
//    {
//       title: 'Paidat',
//  },
//  {
//      title: 'Mekot',
//  },
//  {
//      title: 'Takit',
//   },

//];

const optionElement = document.querySelector(".add-category");

//optionElement.innerHTML = '';

//for (let i= 0; i < Category.length; i++){
    //optionElement.innerHTML +=
        //`<option>
        //${Category[i].CategoryName}
        //</option>`;
//}

// select existing html elements
const addForm = document.querySelector('#addProductForm');
const categoryList = document.querySelector('.add-category');

// create user options to <select>
const createCategoryOptions = (categories) => {

    categoryList.innerHTML = '';
    categories.forEach((categories) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = categories.CategoryName;
        option.innerHTML = categories.CategoryName;
        option.classList.add('border');
        categoryList.appendChild(option);
    });
    // load product data after categories
    getProduct(ProductId);
};
// get categories to make options
const getCategories = async () => {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/categories', options);
        const categories = await response.json();
        createCategoryOptions(categories);
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
//AJAX CALLS
const getGategoryData = async () => {
    try {
        const response = await fetch(url + '/product');
        const categories = await response.json();
        getGategoryData(categories);
    } catch (e) {
        console.log(e.message);
    }
};

const getCategories = async () => {
    try {
        const response = await fetch(url + '/product');
        const categories = await response.json();
        getCategoryData(categories);
    } catch (e) {
        console.log(e.message);
    }
};

getCategories();