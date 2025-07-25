
const textarea = document.querySelector('.chatbox__textarea');

textarea.addEventListener('input', function () {
	this.style.height = 'auto'; // Сброс
	this.style.height = Math.min(this.scrollHeight, 120) + 'px'; // Ограничение
});