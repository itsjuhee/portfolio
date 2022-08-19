// header sticky
window.onscroll = function() {subHeader()};

const 
header = document.querySelector('.sub-header'),
project = document.querySelector('.pro'),
outro = document.querySelector('.end'),
rotate = document.querySelector('.end .main');
function subHeader() {
    if (window.pageYOffset > header.offsetTop) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    
    // black header
    if (window.pageYOffset > project.offsetTop-100 && window.pageYOffset < outro.offsetTop) {
        // project
        header.classList.add('black');
        $('.sub-header span').css('transform',`translateX(${$('nav a').eq(1).offset().left}px)`).css('width', `${$('nav a').eq(1).width()}px`);
        $('nav a').removeClass('active')
        $('nav a').eq(1).addClass('active')
    } else if (window.pageYOffset < project.offsetTop) {
        // about me
        header.classList.remove('black');
        $('.sub-header span').css('transform',`translateX(${$('nav a').eq(0).offset().left}px)`).css('width', `${$('nav a').eq(0).width()}px`);
        $('nav a').removeClass('active')
        $('nav a').eq(0).addClass('active')
    } else {
        // end
        header.classList.remove('black');
        $('.sub-header span').css('transform',`translateX(${$('nav a').eq(2).offset().left}px)`).css('width', `${$('nav a').eq(2).width()}px`);
        $('nav a').removeClass('active')
        $('nav a').eq(2).addClass('active')
    }
    
    // end letter
    if (window.pageYOffset > rotate.offsetTop-300) $('.end .main').addClass('active');
}

// the first bottom bar
$('.sub-header span').css('transform',`translateX(${$('nav a').eq(0).offset().left}px)`).css('width', `${$('nav a').eq(0).width()}px`);

// header scroll
$('nav a').on('click', pagemove);

let idx;
function pagemove(){
    event.preventDefault();

    let idx = $(this).index();
    let conTop = $(con).eq(idx).offset().top;
    $('html').animate({scrollTop: conTop},1000);

    $('nav a').removeClass('active');
    $(this).addClass('active');

    // bottom bar
    $('.sub-header span').css('transform',`translateX(${$(this).offset().left}px)`).css('width', `${$(this).width()}px`);
};


// slider
$(function(){
    let 
    liHeight = $('.slide ul li:first').height(),
    ulWidth = (($('.slide ul li').length-1) * 2 ) * $('.slide ul li:first').outerWidth(true),
    slideWidth = (($('.slide ul li').length-1) * 2 ) * $('.slide ul li:first').outerWidth(true) + $('.slide').width();

    $('.slide').width(slideWidth).height(liHeight).css('transform',`translateX(-${ulWidth/2}px)`);

    // drag start and stop
    $('.slide ul').draggable({ axis: "x", scroll: false, containment: ".slide" },
    {
        start: function(event, ui){
            $(this).data('dragging', true);
        },
        stop: function(event, ui){
            setTimeout(function(){
                $(event.target).data('dragging', false);
            }, 1);
        }
    });
});

// popup
let data;
$.ajax({
    url: './script/data.json', 
    success:function(data){        

        function slidePopup(idx){
            
            let code = $('.slide li').eq(idx).data('code');
            let p = data.project.filter(num => num.code == code);

            let elPopup = 
            `
                <p class="close">CLOSE</p>
                <div class="title">
                    <span>${p[0].cate}</span>
                    <p>${p[0].title}</p>
                </div>
                <div class="overview">
                    <div class="main-img">
                        <img src="${p[0].mainimg}" alt="mockup">
                    </div>
                    <div class="text">
                        <ul>
                            <li>
                                <p>PERIOD</p>
                                <span>${p[0].period}</span>
                            </li>
                            <li>
                                <p>PROJECT</p>
                                <span>${p[0].project}</span>
                            </li>
                            <li>
                                <p>CONTRIBUTION</p>
                                <span>${p[0].contri}</span>
                            </li>
                            <li>
                                <p>LANGUAGE</p>
                                <span>${p[0].lang}</span>
                            </li>
                            <li>
                                <p>COMPOSITION</p>
                                <span>${p[0].compo}</span>
                            </li>
                            <li>
                                <p>OVERVIEW</p>
                                <span>${p[0].overview}</span>
                            </li>
                        </ul>
                        <a href="${p[0].website}">GO TO WEBSITE</a>
                    </div>
                </div>
                <div class="detail">
                    <video src="${p[0].video}" autoplay loop></video>
                    <img src="${p[0].img1}" alt="detail">
                    <img src="${p[0].img2}" alt="detail">
                    <img src="${p[0].img3}" alt="detail">
                    <img src="${p[0].img4}" alt="detail">
                </div>
                <div class="button">
                    <span>PREV</span>
                    <span>NEXT</span>
                </div>
            `;
            
            $('.popup').html(elPopup);
            $('.popup').css('background',`${p[0].bg}`,'color',`${p[0].font}`);
            $('.popup p, .popup span, .popup a').css('color',`${p[0].font}`);

            $('.layer-popup').addClass('active');

            // no scroll
            $('html').css('overflow', 'hidden');

            // close
            $('.popup .close').on('click', function(){
                $('.layer-popup').removeClass('active');
                $('html').css('overflow', 'scroll');
            });

            // click out of popup 
            $(document).mouseup(function (p){
                let layer = $('.layer-popup');
                if(layer.has(p.target).length === 0){
                    layer.removeClass('active');
                    $('html').css('overflow', 'scroll');
                }
            });
            
            // button
            $('.button span').eq(0).on('click', function(){
                if(idx>0) idx--;
                slidePopup(idx)
            });
            $('.button span').eq(1).on('click', function(){
                if(idx<4) idx++;
                slidePopup(idx)
            });
        }
        $('.slide li').on('click', function(){
            if($('.slide ul').data('dragging')) return;
            slidePopup($(this).index())
        })
    }
});