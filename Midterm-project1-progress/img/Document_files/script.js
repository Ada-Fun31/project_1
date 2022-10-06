// window.addEventListener("load", function () {
//     console.log("The page is ready!");

//     // fetch("dog-breeds-data.json")
//     //     .then(function (response) {
//     //         return response.json();
//     //     })
//     //     .then(data => {
//     //         console.log(data);
//     //     })

//     fetch("breeds.json")
//         .then(function (response) {
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             number = data; // define global variable in callback function
//         })
// })

// let number;

// get all dropdowns from the documents
const dropdowns = document.querySelectorAll('.dropdown');

// all dropdown elements
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelector('.menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener("click", () => {
        // vaiables trigger css method
        select.classList.toggle('select-cliked');  // classlist means??
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    })
})



// p5 code down here//
// let Circle;
// let initialX,initialY;


// function setup() {
//     createCanvas(800, 400);
//     initialX = random(100,200);
//     initialY = random(100,200);
// }

// function draw() {
//     background(50, 70, 100, 150);

//     // 1. show circle
//     // 2. click on circle, circle move with mouse, click again, circle stay 
//     Circle = ellipse(initialX, initialY, 50);
//     let distance = dist(initialX, initialY,mouseX,mouseY);

//     if (distance<25 && mouseIsPressed === true){
//         Circle = ellipse(mouseX, mouseY, 50);
//     } 
// }
