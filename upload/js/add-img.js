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

optionElement.innerHTML = '';

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

    categoryList.innerHTML = '';
    Categories.forEach((Category) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = Category.CategoryName;
        option.innerHTML = Category.CategoryName;
        option.classList.add('border');
        categoryList.appendChild(option);
    });
    // load product data after users
    getProduct(ProductId);
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
        const response = await fetch(url + '/recipe');
        const recipes = await response.json();
        getGategoryData(Categories);
    } catch (e) {
        console.log(e.message);
    }
};

const getCategories = async () => {
    try {
        const response = await fetch(url + '/category');
        const categories = await response.json();
        getCategoryData(Categories);
    } catch (e) {
        console.log(e.message);
    }
};

getCategories();