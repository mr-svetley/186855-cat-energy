// Menu open/close

var menu = document.querySelector(".header__navigation");
var menu_btn = menu.querySelector(".navigation__btn");
var menu_list = menu.querySelector(".navigation__list");

menu_btn.classList.remove("navigation__btn--hidden"); // Показываем кнопку
menu_btn.classList.remove("navigation__btn--close"); // Сбрасываем состояние кнопку на значение по умолчанию (гамбургер)
menu_list.classList.add("navigation__list--hidden"); // Скрываем меню

menu_btn.addEventListener("click", function() {
  menu_btn.classList.toggle("navigation__btn--close"); // Меняем состояние кнопки
  menu_list.classList.toggle("navigation__list--hidden"); // Меняем состояние меню
});
