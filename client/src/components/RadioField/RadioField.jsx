import PropTypes from 'prop-types';

import styles from './RadioField.module.scss';

function RadioField({ name, label, valuesList, value, withImage, required, register, error, errorMessage }) {

	const inputRegister = register(name);
	const fullLabel = label + (required ? '*' : '');

	return (
		<div className={`${styles.radioField} ${error ? styles.error : ''}`}>
			<div className={styles.radioFieldContainer}>
				<div className={styles.radioFieldLabel}>{fullLabel}</div>
				{error && <div className={styles.radioFieldError}>{errorMessage}</div>}

				<ul className={`${withImage && styles.withImageUl}`}>
					{valuesList.map((val, index) => {

						const checked = value ?
							value === val.id ? 'checked' : '' :
							required && index === 0 ? 'checked' : '';

						return <li key={`radio-${val.id}`} className={`${withImage && styles.withImageLi}`}>
							<label>
								<input className="" defaultChecked={checked} type="radio" {...inputRegister} value={val.id} />
								<div className={`${withImage && styles.withImage}`}>
									{withImage && <img loading="lazy" alt={val.title} className="radio-pict-content__img" src={`/assets${val.image}`} />}
									<span className="">{val.title}</span>
								</div>
							</label>
						</li>;
					})}
				</ul>
			</div>

		</div>
	);

}

RadioField.defaultProps = {

};

RadioField.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.any,
	required: PropTypes.bool,
	withImage: PropTypes.bool,
	register: PropTypes.func,
	error: PropTypes.bool,
	errorMessage: PropTypes.string
};

export { RadioField };