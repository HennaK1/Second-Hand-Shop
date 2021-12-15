'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const ul = document.querySelector('#list');
const imageModal = document.querySelector('#product-modal');
const modalImage = document.querySelector('#product-modal img');
const close = document.querySelector('#product-modal a');

// get user data for admin check
const user = JSON.parse(sessionStorage.getItem('user'));


// create product cards
const createProductCards = (products) => {
    // clear ul
    ul.innerHTML = '';
    products.forEach((product) => {
        // create li with DOM methods
        const p5 = document.createElement('p');
        p5.innerHTML = `Username: ${product.user_id}`;
        const img = document.createElement('img');
        img.src = url + '/../thumbnails/' + product.image_location;
        img.alt = "tuotekuva";
        img.classList.add('resp');

        //modal to show picture
        img.addEventListener('click', () => {
            modalImage.src = url + '/' + product.image_location;
            imageModal.alt = product.product_id;
            imageModal.classList.toggle('hide');
    });


        const figure = document.createElement('figure').appendChild(img);

        const p1 = document.createElement('p');
        p1.innerHTML = `Price: ${product.price} €`;

        const p2 = document.createElement('p');
        p2.innerHTML = `Location: ${product.gps}`;

        const p3 = document.createElement('p');
        p3.innerHTML = `Caption: ${product.caption}`;

        const li = document.createElement('li');
        li.classList.add('card-border');

        li.appendChild(p5);
        li.appendChild(figure);
        li.appendChild(p1);
        li.appendChild(p2);
        li.appendChild(p3);
        ul.appendChild(li);
    });

    // close modal
    close.addEventListener('click', (evt) => {
        evt.preventDefault();
        imageModal.classList.toggle('hide');
    });
};

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

