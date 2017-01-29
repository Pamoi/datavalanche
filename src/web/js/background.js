$(function() {
  console.log('Loading');

  var windowHeight = $(window).height();

  var bgs = $('.bg');
  for (var i = 0; i < bgs.length; i++) {
    $(bgs[i]).css({
      top: (i * windowHeight) + 'px',
      height: windowHeight + 'px',
    });
  }

  var texts = $('.slide-container');
  var paddingHeight = $(texts[0]).css('padding-top').replace('px', '');
  for (var i = 0; i < texts.length; i++) {
    $(texts[i]).css({
      height: (windowHeight - paddingHeight) + 'px',
    });
  }

  var currentSlideIndex = 0;

  function nextSlide() {
    if (currentSlideIndex < texts.length - 1) {
      currentSlideIndex += 1;
      $(texts[currentSlideIndex]).animatescroll({scrollSpeed:300});
    }
  }

  function previousSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex -= 1;
      $(texts[currentSlideIndex]).animatescroll({scrollSpeed:300});
    }
  }

  function firstSlide() {
    currentSlideIndex = 0;
    $(texts[currentSlideIndex]).animatescroll({scrollSpeed:300});
  }

  // Assign function to buttons
  var btns = $('.down-link');
  for (var i = 0; i < btns.length; i++) {
    $(btns[i]).off('click').on('click', function(e) {
      lockScroll();
      nextSlide();
    });
  }

  var btns = $('.top-link');
  for (var i = 0; i < btns.length; i++) {
    $(btns[i]).off('click').on('click', function(e) {
      lockScroll();
      firstSlide();
    });
  }

  // Scroll handling
  var scrolling = false;
  var lastScroll = 0;

  function lockScroll() {
    scrolling = true;
    setTimeout(function () {
      scrolling = false;
    }, 500);
  }

  $(window).on('scroll', function(e) {
    e.preventDefault();

    scrollDown = true;
    scrollPos = $(document).scrollTop();

    if (lastScroll - scrollPos > 0) {
      scrollDown = false;
    }
    lastScroll = scrollPos;

    if (!scrolling) {
      lockScroll();

      if (scrollDown) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
  });
});
