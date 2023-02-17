export function formatPrice(value) {
	return value.toLocaleString('ru-RU') + ' ₽';
}

export function formatNumber(value) {
	return value.toLocaleString('ru-RU');
}

export function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}