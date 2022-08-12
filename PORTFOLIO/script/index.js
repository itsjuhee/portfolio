// header sticky
window.onscroll = function() {subHeader()};

const 
header = document.querySelector('.sub-header'),
project = document.querySelector('.pro'),
outro = document.querySelector('.end');

function subHeader() {
    if (window.pageYOffset > header.offsetTop) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    // black header
    if (window.pageYOffset > project.offsetTop-10 && window.pageYOffset < outro.offsetTop) {
        header.classList.add('black');
    } else {
        header.classList.remove('black');
    }
}

// header scroll
$('nav a').on('click', pagemove);

let idx;

function pagemove(){
    event.preventDefault();

    let idx = $(this).index();
    let conTop = $(con).eq(idx).offset().top;
    $('html').animate({scrollTop: conTop},1000);
};

// slider
$(function() {
    $('.slide').draggable({ axis: "x", });
});