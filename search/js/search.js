'use strict';

//const url = 'http://localhost:3000';

const selectElement = document.querySelector("#categorylist");


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

selectElement.addEventListener('change', async ()=> {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem ('token'),
            },
        };
        const response = await fetch (url + '/product/search/' + selectElement.value, options);
        const categories = await response.json ();
        console.log(categories);
        createProductCards(categories)
    } catch (e) {
        console.log (e.message);
    }
})

