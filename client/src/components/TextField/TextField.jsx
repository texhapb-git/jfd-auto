import PropTypes from 'prop-types';

import { useCallback, useState } from 'react';

import { useToggle } from '../../hooks/useToggle';

import { SvgIcon } from '../SvgIcon';
import { Button } from '../Button';

import styles from './TextField.module.scss';

function TextField({ type, name, label, value, required, comment, register, error, errorMessage }) {
	const [showPassword, toggleShowPassword] = useToggle(false);
	const [isFocus, setIsFocus] = useState(!!value?.toString().length);

	const inputRegister = register(name);
	const fullLabel = label + (required ? '*' : '');

	const getHiddenButtonClasses = () => {
		return showPassword ? styles.textFieldHiddenButton_show : styles.textFieldHiddenButton;
	};

	const handleFocus = useCallback(() => {
		setIsFocus(true);
	}, []);

	const handleBlur = useCallback((event) => {
		inputRegister.onBlur(event);
		if (!event.target.value.length) {
			setIsFocus(false);
		}

	}, [inputRegister]);

	const numberInputOnWheelPreventChange = (e) => {
		e.target.blur();
		e.stopPropagation();
		setTimeout(() => {
			e.target.focus();
		}, 0);
	};

	return (
		<div className={`${styles.inputField} ${isFocus ? styles.focused : ''} ${error ? styles.error : ''}`}>
			<div className={styles.inputFieldContainer}>
				<label>
					<span>{fullLabel}</span>

					{type === 'textarea' ?
						<textarea
							defaultValue={value}
							{...inputRegister}
							onFocus={handleFocus}
							onBlur={handleBlur}></textarea>
						:
						<input
							type={showPassword ? 'text' : type}
							defaultValue={value}
							{...inputRegister}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onWheel={numberInputOnWheelPreventChange}
						/>
					}


					{type === 'password' && (
						<Button
							className={getHiddenButtonClasses()}
							type="none"
							buttonType="button"
							onClick={toggleShowPassword}
						>
							<SvgIcon
								svgClass="text-field__password"
								name="password"
								width="20"
								height="20"
							/>
						</Button>
					)}
				</label>
				<fieldset>
					<legend><span>{fullLabel}</span></legend>
				</fieldset>
			</div>

			{error && <div className={styles.inputFieldError}>{errorMessage}</div>}

			{comment?.length && <div className={styles.inputFieldComment}>{comment}</div>}
		</div>
	);

}

TextField.defaultProps = {
	type: 'text',
};

TextField.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.any,
	required: PropTypes.bool,
	comment: PropTypes.string,
	register: PropTypes.func,
	error: PropTypes.bool,
	errorMessage: PropTypes.string
};

export { TextField };