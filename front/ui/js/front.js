'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));

// create cat cards
const createProductCards = (products) => {
    // clear ul
    ul.innerHTML = '';
    products.forEach((product) => {
        // create li with DOM methods
        const img = document.createElement('img');
        img.src = url + '/thumbnails/' + product.ImageLocation;
        img.alt = product.PictureId;
        img.classList.add('resp');

        // open image in single.html
        img.addEventListener('click', () => {
            location.href = 'single.html?id=' + product.PictureId;
        });

        const figure = document.createElement('figure').appendChild(img);

        const p1 = document.createElement('p');
        p1.innerHTML = `Price: ${product.Price}`;

        const p2 = document.createElement('p');
        p2.innerHTML = `Location: ${product.Gps}`;

        const p3 = document.createElement('p');
        p3.innerHTML = `Caption: ${product.Caption}`;

        const li = document.createElement('li');
        li.classList.add('light-border');

        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        ul.appendChild(li);

    });
};

// AJAX call
const getProduct = async () => {
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
        };
        const response = await fetch(url + '/product', fetchOptions);
        const products = await response.json();
        createProductCards(products);
    } catch (e) {
        console.log(e.message);
    }
};
getProduct();
