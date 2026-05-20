/*const button = document.querySelector(".read-more-btn");

const moreText = document.querySelector(".more-text");

button.addEventListener("click", ()=>{

    if(moreText.style.display === "inline"){

        moreText.style.display = "none";

        button.textContent = "Read More";

    }else{

        moreText.style.display = "inline";

        button.textContent = "View Less";

    }

});*/


const buttons = document.querySelectorAll(".read-more-btn");

buttons.forEach((button)=>{

    button.addEventListener("click", ()=>{

        const moreText =
        button.previousElementSibling.querySelector(".more-text");

        if(moreText.style.display === "inline"){

            moreText.style.display = "none";

            button.textContent = "Read More";

        }else{

            moreText.style.display = "inline";

            button.textContent = "View Less";

        }

    });

});


/* PAGINATION */

const pageNumbers =
document.querySelectorAll(".page-num");


// selecting previous button

const prevBtn =
document.querySelector(".prev-btn");


// selecting next button

const nextBtn =
document.querySelector(".next-btn");


// current active page

let currentPage = 1;


// total number of pages

const totalPages = pageNumbers.length;





// ================= MAIN FUNCTION =================

function updatePagination(){


    // remove active class from all buttons

    pageNumbers.forEach((page)=>{

        page.classList.remove("active");

    });




    // add active class to current page

    pageNumbers[currentPage - 1]
    .classList.add("active");





    // hide previous button on first page

    if(currentPage === 1){

        prevBtn.classList.add("hide");

    }else{

        prevBtn.classList.remove("hide");

    }




    // hide next button on last page

    if(currentPage === totalPages){

        nextBtn.classList.add("hide");

    }else{

        nextBtn.classList.remove("hide");

    }

}





// ================= PAGE NUMBER CLICK =================

pageNumbers.forEach((page, index)=>{

    page.addEventListener("click", ()=>{

        currentPage = index + 1;

        updatePagination();

    });

});




// ================= NEXT BUTTON =================

nextBtn.addEventListener("click", ()=>{

    if(currentPage < totalPages){

        currentPage++;

        updatePagination();

    }

});




// ================= PREVIOUS BUTTON =================

prevBtn.addEventListener("click", ()=>{

    if(currentPage > 1){

        currentPage--;

        updatePagination();

    }

});




// ================= INITIAL FUNCTION CALL =================

updatePagination()


// ================= SEARCH =================

const searchInput = document.querySelector('.search-box input')
const searchBtn = document.querySelector('.search-box button')
const categories = document.querySelectorAll('.category-item')
const searchMessage = document.querySelector('.search-message')

function searchCategories(){
    const searchValue = searchInput.value.toLocaleLowerCase()

    let found = false
    categories.forEach((category)=>{
        const categoryName = category.querySelector('a').textContent.toLowerCase()
        if(categoryName.includes(searchValue)){
            category.style.display = 'flex'
            found = true
        }else{
            category.style.display = 'none'
        }
    })
    if(found){
        searchMessage.textContent = ''
    }else{
        searchMessage.textContent = 'Category not found. We will launch soon.';
    }
}

searchBtn.addEventListener('click',()=>{
    searchCategories();
})

searchInput.addEventListener('input',()=>{
    searchCategories();
})


function openContact() {
    window.location.href = "contact.html";
}