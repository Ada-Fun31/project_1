window.addEventListener("load", function () {
    console.log("The page is ready!");

    let button_One = this.document.getElementById('button_one');
    button_One.addEventListener('click', function () {

        // 1. check dropdown menu (species)
        let animalTag = document.getElementById("animal_tag").innerText;

        let result_dog = animalTag.includes("Dog");
        let result_cat = animalTag.includes("Cat");
        let result_any = animalTag.includes("Any");

        console.log("the animal is:" + animalTag);
        console.log("dog status:" + result_dog);
        console.log("cat status:" + result_cat);
        console.log("any status:" + result_any);

        // 2. check input box text (breed)
        let input_breed = document.getElementById("input_one").value;
        console.log("input words are: " + input_breed);

        // 3. fecth data according to "species" & "breed"

        // --- fetch dog --- //
        if (result_dog) {
            let img_1_url = "https://dog.ceo/api/breed/hound/" + input_breed + "/images/random";
            // console.log(img_1_url);
            fetch(img_1_url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    dogData = data;

                    // ***url arrays*** //
                    console.log(dogData.message); // newest url
                    dog_image_array.push(dogData.message);
                    console.log(dog_image_array); // checked: work, array of urls

                    // ***p5 code*** //

                    // ---* Edition-2: 用class load & create image, DOM button push into "image_array_dog"
                    // background(230); //button clicked, canvas clear 
                    let img = new Image_create_dog(180, height / 2); // create image
                    image_array_dog.push(img);

                    // ---* Edition-1: use DOM button load image
                    // loadImage(dogData.message, function (url_p) {
                    //     imageMode(CENTER);
                    //     image(url_p, width / 3, height / 2, 200, 200);
                    //     console.log("pressed!");
                    // });


                    // ***draw outside canvas
                    // let imageElement = document.getElementById("image_1");
                    // imageElement.src = dogData;
                })
        }; // if "Dog!"

        // --- fetch cat --- //
        if (result_cat) {
            fetch("cat-data-15.json")
                .then(response => response.json())
                .then(data => {
                    catData = data; // the cat array

                    console.log(catData);

                    for (let i = 0; i < catData.length; i++) {
                        if (catData[i].name == input_breed) {
                            catImage_url = catData[i].image.url;
                            console.log(catImage_url);
                        }
                    }

                    // ***p5 code*** //
                    // background(230);
                    let img = new Image_create_cat(820, height / 2);
                    image_array_cat.push(img);

                });
        }; // if "Cat!"

        // --- fetch any --- //
        if (result_any) {
            fetch('any-data-8.json')
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    anyData = data; // the cat array

                    console.log(anyData);

                    for (let i = 0; i < anyData.length; i++) {
                        if (anyData[i].animal == input_breed) {
                            anyImage_url = anyData[i].photo;
                            console.log(anyImage_url);
                        }
                    }

                    // ***p5 code*** //
                    // background(230);
                    let img = new Image_create_any(width/2, height/2);
                    image_array_any.push(img);

                })
        }; // if "any!"

    })


    //--------------------*** Dropdown menu code down here ***--------------------//
    let animal_selection;

    // get all dropdowns from the documents
    const dropdowns = document.querySelectorAll('.dropdown');
    // all dropdown elements
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelectorAll('.menu li');
        const selected = dropdown.querySelector('.selected');
        // add a click event to "select elt"
        select.addEventListener("click", () => {
            // vaiables trigger css method
            select.classList.toggle('select-cliked');  // classlist means??
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        });

        // loop option elements, create "option" for each
        options.forEach(option => {
            // add a click event to the "option elt"
            option.addEventListener('click', () => {

                selected.innerText = option.innerText;
                animal_selection = selected.innerText;

                select.classList.remove('select-cliked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                options.forEach(option => {
                    option.classList.remove('active');
                });
                // add active class to new clicked option elt
                option.classList.add('active');
            });
        });
    });

    //--------------------*** canvas_clear_button code down here ***--------------------//

    let button_clear = this.document.getElementById('canvas_clear');
    button_clear.addEventListener('click', function () {
        console.log("button_clear!!")
        background(230);
        stroke(164, 173, 191)
        strokeWeight(10);
        line(width/2-160, 0, width/2-160, height);
        line(width/2+160, 0, width/2+160, height);
    })
})

console.log("is the page fully loaded?");

let catImage_url,anyImage_url;

let dogData, catData,anyData;
let image_array_dog = [];// used: number of dog images
let image_array_cat = [];// used: number of cat images
let image_array_any = [];// used: number of any images

let dog_image_array = []; // not used: array of urls

//--------------------*** p5 code down here ***--------------------//

function setup() {
    console.log("p5-setup!!")

    const myCanvas = createCanvas(1000, 400);
    myCanvas.parent("canvas-container");
    background(230);
    stroke(164, 173, 191)
    strokeWeight(10);
    line(width/2-160, 0, width/2-160, height);
    line(width/2+160, 0, width/2+160, height);
}

function draw() {

    for (let add_Elements of image_array_dog) {
        add_Elements.show();
    }

    // image_array_cat[0].show();
    for (let add_Elements of image_array_cat) {
        add_Elements.show();
    }
    
      for (let add_Elements of image_array_any) {
        add_Elements.show();
    }

}

// function clean() {
//     setup();
// }

function mouseClicked() {

    for (let add_Elements of image_array_dog) {
        if (mouseX < (width / 3 - 50) && mouseY < height) {
            add_Elements.move(mouseX, mouseY, 100, 100);
        }
    }

    for (let add_Elements of image_array_cat) {
        if (mouseX > (width-width / 3 + 50)) {
            add_Elements.move(mouseX, mouseY, 100, 100);
        }
    }

    for (let add_Elements of image_array_any) {
        if (mouseX > (width/3+50) && mouseX<(width-width/3 -50)) {
            add_Elements.move(mouseX, mouseY, 100, 100);
        }
    }
}

// ---* Edition-1: 直接用 DOM button load image
// function mouseClicked() {
//     loadImage(dogData.message, url_p => {
//         imageMode(CENTER);
//         image(url_p, width / 3, height / 2, 200, 200);
//         console.log("pressed!");
//     });
// }

function loading() {
    textAlign(CENTER);
    textSize(28);
    fill(255);
    text("loading...", 200, height / 2);
}

//---*** image class down here ***---//
class Image_create_dog {
    constructor(x, y, w = 300, h = 300) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        loadImage(dogData.message, url_p => {
            imageMode(CENTER);
            image(url_p, this.x, this.y, this.w, this.h);
        });
        // how to access each object within "dog_image_array" ?
    };

    move(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

class Image_create_cat {
    constructor(x, y, w = 300, h = 300) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        loadImage(catImage_url, url_p => {
            imageMode(CENTER);
            image(url_p, this.x, this.y, this.w, this.h);
        });
    };

    move(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

class Image_create_any {
    constructor(x, y, w = 300, h = 300) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        loadImage(anyImage_url, url_p => {
            imageMode(CENTER);
            image(url_p, this.x, this.y, this.w, this.h);
        });
    };

    move(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}
