'use strict';
const url = 'https://10.114.34.21/app/'; // change url when uploading to server

//const Categories = [
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

const selectElement = document.querySelector("#categorylist");




// select existing html elements
const addForm = document.querySelector('#addProductForm');
//const categoryList = document.querySelector('.add-category');


// create category options to <select>
 const createOptions = (table, target) => {

    target.innerHTML = '';
    table.forEach((item) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = item.category_id;
        option.innerHTML = item.category_name;
        target.appendChild(option);
    });
};
// get categories to make options
const getCategories = async () => {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem ('token'),
            },
        };
        const response = await fetch (url + '/product/category', options);
        const categories = await response.json ();
        console.log(categories);
        createOptions(categories, selectElement)
    } catch (e) {
        console.log (e.message);
    }
}
getCategories();

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

