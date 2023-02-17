export function prepareForDB(user) {

	for (var key in user) {
		if (user.hasOwnProperty(key)) {
			if (typeof user[key] === 'string') {
				if (key === 'email') {
					user[key] = user[key].toLowerCase();
				}


				user[key] = user[key].trim();

			}
		}
	}

	return user;
}