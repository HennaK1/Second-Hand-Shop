'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

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

//const optionElement = document.querySelector(".add-category");

//optionElement.innerHTML = '';

//const CategoryData = (categories) => {
    //for (let i = 0; i < categories.length; i++) {
       // optionElement.innerHTML +=

       // `<option ${categories[i].CategoryName}</option>`;

   // }
//}



// select existing html elements
const addForm = document.querySelector('#addProductForm');
//const categoryList = document.querySelector('.add-category');


// create category options to <select>
 /*const createCategoryOptions = (category) => {

    categoryList.innerHTML = '';
    categoryList.forEach((Category) => {
        // create options with DOM methods
        const option = document.createElement('option');
        option.value = Category.CategoryName;
        option.innerHTML = Category.CategoryName;
        option.classList.add('border');
        categoryList.appendChild(option);
    });
    // load product data after categories
    getProduct(product_get());
};*/
// get categories to make options
const getCategories = async () => {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/category', options);
        const categories = await response.json();
        await getCategories(categories);
    } catch (e) {
        console.log(e.message);
    }

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
    const getCategoryData = async () => {
        try {
            const response = await fetch(url + '/product');
            const categories = await response.json();
            await getCategoryData(categories);
        } catch (e) {
            console.log(e.message);
        }
    }
};
