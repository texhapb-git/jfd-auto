export function formatPhone(phone, matrix = '+7 (XXX) XXX-XX-XX') {
	let formattedPhone = '';

	let i = 0;

	for (let j = 0; j < matrix.length; j++) {

		if (matrix[j] === 'X') {

			formattedPhone += phone[i];
			i++;

		} else {
			formattedPhone += matrix[j];
		}
	}

	return formattedPhone;
}