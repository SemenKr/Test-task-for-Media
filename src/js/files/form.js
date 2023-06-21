
$(document).ready(() => {
	function autoResize() {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + "px";
	}

	const textarea = document.getElementById("myTextarea");

	textarea.addEventListener("input", function () {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + "px";
	});


	// Обработчик отправки формы
	$('#myForm').submit((event) => {
		event.preventDefault(); // Отменить стандартное поведение отправки формы

		if (validateForm()) {
			showLoader(); // Показать загрузчик

			// Получение данных формы
			const formData = new FormData($('#myForm')[0]);

			// Отправка данных формы
			$.ajax({
				url: 'process-form.php', // Замените на путь к обработчику формы на сервере
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: (response) => {
					// Имитация загрузки файла
					uploadFile();

					// Имитация отправки данных формы
					setTimeout(() => {
						sendForm();
					}, 2000);
				},
				error: () => {
					alert('Ошибка при отправке данных.');
					hideLoader(); // Скрыть загрузчик в случае ошибки
				}
			});
		}
	});

	// Функция для проверки заполнения формы
	function validateForm() {
		const name = $('#name').val();
		const phone = $('#phone').val();
		const email = $('#email').val();
		const message = $('#message').val();

		if (name === '' || phone === '' || email === '' || message === '') {
			alert('Пожалуйста, заполните все поля формы.');
			return false;
		}

		return true;
	}

	// Функция для имитации загрузки файла
	function uploadFile() {
		setTimeout(() => {
			console.log('Файл успешно загружен.');
		}, 1500);
	}

	// Функция для имитации отправки данных формы
	function sendForm() {
		hideLoader(); // Скрыть загрузчик
		$('#myForm')[0].reset(); // Сбросить значения полей формы
		alert('Данные успешно отправлены.');
	}

	// Функция для показа загрузчика
	function showLoader() {
		$('.loader').show();
	}

	// Функция для скрытия загрузчика
	function hideLoader() {
		$('.loader').hide();
	}
});
