/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper с node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, {Navigation} from 'swiper';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей с scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей с node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Список слайдеров
	// Проверяем, есть ли слайдер на странице
	if (document.querySelector('.swiper')) { // Указываем класс нужного слайдера
		// Создаем слайдер
		new Swiper('.swiper', { // Указываем класс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скролбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			/*
			// Брейкпоинты
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}



window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скрола на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
	const prevButton = document.querySelector('.swiper-button-prev');
	const nextButton = document.querySelector('.swiper-button-next');

	prevButton.addEventListener('mouseenter', function () {
		prevButton.classList.add('active');
	});

	prevButton.addEventListener('mouseleave', function () {
		prevButton.classList.remove('active');
	});

	prevButton.addEventListener('click', function () {
		prevButton.classList.add('fill');

		setTimeout(function () {
			prevButton.classList.remove('fill');
		}, 300);
	});

	nextButton.addEventListener('mouseenter', function () {
		nextButton.classList.add('active');
	});

	nextButton.addEventListener('mouseleave', function () {
		nextButton.classList.remove('active');
	});

	nextButton.addEventListener('click', function () {
		nextButton.classList.add('fill');

		setTimeout(function () {
			nextButton.classList.remove('fill');
		}, 300);
	});
});

