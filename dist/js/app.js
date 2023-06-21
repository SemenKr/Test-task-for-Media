(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    $(document).ready((function() {
        var slider = $(".cases-slider");
        var progressBar = $(".progress-bar");
        var progressSlider = $(".progress-slider");
        var isDragging = false;
        progressSlider.mousedown((function() {
            isDragging = true;
        }));
        $(document).mousemove((function(event) {
            if (isDragging) {
                var containerWidth = progressBar.parent().width();
                var clickPosition = event.clientX - progressBar.parent().offset().left;
                var progress = clickPosition / containerWidth * 100;
                progress = Math.max(0, Math.min(progress, 100));
                progressSlider.css("left", progress + "%");
                progressBar.css("width", progress + "%");
                var slideCount = slider.find(".cases-slide").length;
                var targetSlide = Math.round(progress / 100 * (slideCount - 1));
                slider.slick("slickGoTo", targetSlide, true);
            }
        }));
        $(document).mouseup((function() {
            isDragging = false;
        }));
        slider.on("afterChange", (function(event, slick, currentSlide) {
            var slideCount = slick.slideCount;
            var progress = currentSlide / (slideCount - 1) * 100;
            progressSlider.css("left", progress + "%");
            progressBar.css("width", progress + "%");
        }));
        slider.slick({
            centerMode: true,
            centerPadding: "60px",
            dots: false,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            adaptiveHeight: true,
            responsive: [ {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1
                }
            } ]
        });
        setTimeout((function() {
            var thirdVisibleSlideIndex = slider.find(".slick-slide").eq(2).data("slick-index");
            slider.slick("slickGoTo", thirdVisibleSlideIndex, true);
        }), 0);
    }));
    $(document).ready((() => {
        const textarea = document.getElementById("myTextarea");
        textarea.addEventListener("input", (function() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        }));
        $("#myForm").submit((event => {
            event.preventDefault();
            if (validateForm()) {
                showLoader();
                const formData = new FormData($("#myForm")[0]);
                $.ajax({
                    url: "process-form.php",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: response => {
                        uploadFile();
                        setTimeout((() => {
                            sendForm();
                        }), 2e3);
                    },
                    error: () => {
                        alert("Ошибка при отправке данных.");
                        hideLoader();
                    }
                });
            }
        }));
        function validateForm() {
            const name = $("#name").val();
            const phone = $("#phone").val();
            const email = $("#email").val();
            const message = $("#message").val();
            if (name === "" || phone === "" || email === "" || message === "") {
                alert("Пожалуйста, заполните все поля формы.");
                return false;
            }
            return true;
        }
        function uploadFile() {
            setTimeout((() => {
                console.log("Файл успешно загружен.");
            }), 1500);
        }
        function sendForm() {
            hideLoader();
            $("#myForm")[0].reset();
            alert("Данные успешно отправлены.");
        }
        function showLoader() {
            $(".loader").show();
        }
        function hideLoader() {
            $(".loader").hide();
        }
    }));
    const modalContainer = document.getElementById("popupContainer");
    const modal = document.getElementById("popup");
    const closeButton = document.querySelector(".popup__close-btn");
    let sourceOfPopup = "";
    function openModal(source) {
        modalContainer.style.display = "flex";
        setTimeout((() => {
            modal.classList.add("active");
            modalContainer.classList.add("active");
            document.body.style.overflow = "hidden";
            modalContainer.style.overflow = "auto";
            $(".popup__slider").slick({
                dots: true,
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                appendArrows: $(".slider-popup__nav")
            });
            console.log("Open modal");
        }), 50);
        sourceOfPopup = source;
        document.body.classList.add("overflow-hidden");
    }
    function closeModal() {
        modal.classList.remove("active");
        setTimeout((() => {
            modalContainer.style.display = "none";
            modalContainer.classList.remove("active");
            document.body.style.overflow = "auto";
            console.log("Close modal");
        }), 300);
        document.body.classList.remove("overflow-hidden");
        sourceOfPopup = "";
    }
    const openButton = document.querySelector(".popup__button");
    openButton.addEventListener("click", (() => {
        openModal("openButton");
    }));
    const triggerElement = document.getElementById("triggerElement");
    triggerElement.addEventListener("click", (() => {
        openModal("triggerElement");
    }));
    closeButton.addEventListener("click", (() => {
        closeModal();
    }));
    document.addEventListener("keydown", (event => {
        if (event.key === "Escape") closeModal();
    }));
    modalContainer.addEventListener("click", (event => {
        if (event.target === modalContainer) closeModal();
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
})();