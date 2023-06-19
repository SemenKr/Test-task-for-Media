$(document).ready(function () {
	// Обработчик отправки формы
	$('#myForm').submit(function (event) {
		event.preventDefault(); // Отменить стандартное поведение отправки формы

		if (validateForm()) {
			showLoader(); // Показать загрузчик

			// Получение данных формы
			var formData = new FormData($('#myForm')[0]);

			// Отправка данных формы
			$.ajax({
				url: 'process-form.php', // Замените на путь к обработчику формы на сервере
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function (response) {
					// Имитация загрузки файла
					uploadFile();

					// Имитация отправки данных формы
					setTimeout(function () {
						sendForm();
					}, 2000);
				},
				error: function () {
					alert('Ошибка при отправке данных.');
					hideLoader(); // Скрыть загрузчик в случае ошибки
				}
			});
		}
	});

	// Функция для проверки заполнения формы
	function validateForm() {
		var name = $('#name').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		var message = $('#message').val();

		if (name === '' || phone === '' || email === '' || message === '') {
			alert('Пожалуйста, заполните все поля формы.');
			return false;
		}

		return true;
	}

	// Функция для имитации загрузки файла
	function uploadFile() {
		setTimeout(function () {
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