$(document).ready(function () {
	var slider = $('.cases-slider');
	var progressBar = $('.progress-bar');
	var progressSlider = $('.progress-slider');
	var isDragging = false;

	progressSlider.mousedown(function () {
		isDragging = true;
	});

	$(document).mousemove(function (event) {
		if (isDragging) {
			var containerWidth = progressBar.parent().width();
			var clickPosition = event.clientX - progressBar.parent().offset().left;
			var progress = (clickPosition / containerWidth) * 100;
			progress = Math.max(0, Math.min(progress, 100));
			progressSlider.css('left', progress + '%');
			progressBar.css('width', progress + '%');

			var slideCount = slider.find('.cases-slide').length;
			var targetSlide = Math.round((progress / 100) * (slideCount - 1));
			slider.slick('slickGoTo', targetSlide, true);
		}
	});

	$(document).mouseup(function () {
		isDragging = false;
	});

	slider.on('afterChange', function (event, slick, currentSlide) {
		var slideCount = slick.slideCount;
		var progress = (currentSlide / (slideCount - 1)) * 100;
		progressSlider.css('left', progress + '%');
		progressBar.css('width', progress + '%');
	});

	slider.slick({
		centerMode: true,
		centerPadding: '60px',
		dots: false,
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	// Установка третьего видимого слайда в качестве активного
	setTimeout(function () {
		var thirdVisibleSlideIndex = slider.find('.slick-slide').eq(2).data('slick-index');
		slider.slick('slickGoTo', thirdVisibleSlideIndex, true);
	}, 0);
});
