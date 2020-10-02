if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // storing the window size to check for mobile
    $(window).resize(function () {
        var windowWidth = $(window).width()
    });
    const intro_sound = new Howl({
        src: ['audio/title.mp3'],
        // html5: true,
        loop: false,
        // preload: true,
        // autoplay: true,
    });
    var title_id = intro_sound.play();

    // get the crawl div to check for animation end
    var crawl = document.getElementsByClassName('crawl')[0];
    setTimeout(() => {
        crawl.style.display = 'block'
        crawl.style.animation = 'crawl 1s linear'; // start the animation
    }, 3000)
    // Code for Chrome, Safari and Opera
    crawl.addEventListener("webkitAnimationEnd", endCrawlFunction);
    // Standard syntax
    crawl.addEventListener("animationend", endCrawlFunction);

    function endCrawlFunction(event) {
        // hide the text after done crawling and show a btn to see the website
        x = event.target;
        x.style.display = 'none';
        // show the btn
        var nxtBtn = document.getElementsByClassName('nxt-btn')[0];
        nxtBtn.style.visibility = 'visible';
        nxtBtn.style.opacity = 1;
        // add a listener to the btn
        nxtBtn.addEventListener('click', () => {
            $('.crawl-loaded-carrier').addClass('crawl-loaded');
            // stop the music if its playing
            intro_sound.stop();
            // storing id
            var light_id = light_sound.play();
            var dark_id = dark_sound.play();
            dark_sound.fade(1, 0, 100);
            var music_flag = 0;
        })
    }
    // Setup the new Howl.
    const light_sound = new Howl({
        src: ['audio/jedi.mp3'],
        // html5: true,
        loop: true,
        // preload: true,
        // autoplay: true,
    });
    const dark_sound = new Howl({
        src: ['audio/vader.mp3'],
        // html5: true,
        loop: true,
        // preload: true,
        // autoplay: true,
    });

    var stop_music_btn = document.getElementById('toggle-music');
    var music_flag = 0;
    console.log(stop_music_btn);
    stop_music_btn.addEventListener('click', () => {
        console.log('toggling-music');
        if (music_flag == 0) {
            // stop music
            Howler.mute(true);
            music_flag = 1;
        } else {
            Howler.mute(false);
            music_flag = 0;
        }
    })

    // add loaded class to body once music is loaded
    // $('body').addClass('loaded');
    setTimeout(() => {
        $('body').addClass('loaded');
    }, 1000)

    // getting all the elements
    var btn = document.getElementsByClassName('toggle-btn')[0];
    var flag = 0;

    btn.addEventListener('click', () => {
        // change the audio
        if (flag == 0) {
            // stop current audio
            light_sound.fade(1, 0, 1000);
            // play the dark side and set flag =1 and vice versa for else
            dark_sound.fade(0, 1, 1000);
            flag = 1;
            // if on mobile scroll to that div
            if ($(window).width() <= 400) {
                scroll_to_dark();
            }
        } else {
            dark_sound.fade(1, 0, 1000);
            light_sound.fade(0, 1, 1000);
            flag = 0;
            if ($(window).width() <= 400) {
                scroll_to_light();
            }
        }
        // get the tiles and side imgs after toggling btn
        let tiles = document.getElementsByClassName('tile');
        // let side_imgs = document.getElementsByClassName('side-img');
        console.log("b4 = ", tiles)
        // toggling every element
        document.documentElement.classList.toggle('dark-mode');
        // reverting the elements which are not supposed to invert
        document.querySelectorAll('.inverted').forEach((result) => {
            result.classList.toggle('invert');
        })
        // blurring the unfocused tile
        for (let index = 0; index < tiles.length; index++) {
            // using side imgs in this for loop coz the lentgh is same
            tiles[index].classList.toggle('not-focused');
            tiles[index].classList.toggle('tile-focused');
            // side_imgs[index].classList.toggle('d-none');
        }
    })

    function scroll_to_dark() {
        var $toElement = '.dark-side-col',
            $focusElement = '.dark-side-col',
            $offset = 200 * 1 || 0,
            $speed = 700 * 1 || 500;

        $('html, body').animate({
            scrollTop: $($toElement).offset().top + $offset
        }, $speed);

        if ($focusElement) $($focusElement).focus();
    }

    function scroll_to_light() {
        var $toElement = '.light-side-col',
            $focusElement = '.light-side-col',
            $offset = 10 * 1 || 0,
            $speed = 700 * 1 || 500;

        $('html, body').animate({
            scrollTop: $($toElement).offset().top + $offset
        }, $speed);

        if ($focusElement) $($focusElement).focus();
    }
}