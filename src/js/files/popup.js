// Получаем ссылки на элементы модального окна
const modalContainer = document.getElementById("popupContainer");
const modal = document.getElementById("popup");
const closeButton = document.querySelector(".popup__close-btn");

let sourceOfPopup = "";


// Функция для открытия модального окна
function openModal(source) {
	modalContainer.style.display = "flex";
	setTimeout(() => {
		modal.classList.add("active");
		modalContainer.classList.add("active");
		// Заблокировать прокрутку страницы
		document.body.style.overflow = "hidden";
		// Разрешить прокрутку внутри модального окна
		modalContainer.style.overflow = "auto";
		$('.popup__slider').slick({
			dots: true,
			arrows: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: false,
			appendArrows: $(".slider-popup__nav")
		});

		console.log("Open modal");
	}, 50);

	// Сохраняем информацию о вызывающем элементе
	sourceOfPopup = source;

	// Блокируем прокрутку страницы
	document.body.classList.add("overflow-hidden");
}

// Функция для закрытия модального окна
function closeModal() {
	modal.classList.remove("active");
	setTimeout(() => {
		modalContainer.style.display = "none";
		modalContainer.classList.remove("active");
		// Разблокировать прокрутку страницы
		document.body.style.overflow = "auto";
		console.log("Close modal");
	}, 300);

	// Разблокируем прокрутку страницы
	document.body.classList.remove("overflow-hidden");

	// Очищаем информацию о вызывающем элементе
	sourceOfPopup = "";
}

// Обработчик клика по кнопке "оформить заявку"
const openButton = document.querySelector(".popup__button");
openButton.addEventListener("click", () => {
	openModal("openButton");
});

// Обработчик клика по элементу, который открывает попап
const triggerElement = document.getElementById("triggerElement");
triggerElement.addEventListener("click", () => {
	openModal("triggerElement");
});

// Обработчик клика по кнопке "Закрыть"
closeButton.addEventListener("click", () => {
	closeModal();
});

// Обработчик нажатия клавиши Esc
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeModal();
	}
});

// Обработчик клика вне модального окна
modalContainer.addEventListener("click", (event) => {
	if (event.target === modalContainer) {
		closeModal();
	}
});

// Функция для открытия модального окна из любого места в коде
function openModalFromAnywhere(source) {
	openModal(source);
}

// Функция для закрытия модального окна из любого места в коде
function closeModalFromAnywhere() {
	closeModal();
}
