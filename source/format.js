"use strict"

/**
 * @description Returns input values "values", splitted into "columnsNumber" columns
 * columnsNumber > 0
 * @param {Array.<Number>} values - Array of integers
 * @param {Number} columnsNumber - Columns number
 * @returns {String} String format table of input values with "columnsNumber" columns 
 */
const format = (values, columnsNumber) => {
	if (!Array.isArray(values)) {
		throw new TypeError(
			`Wrong type of first argument.
			Expected "Array<Number>", got "${typeof values}"`
		);
	}

	if (typeof columnsNumber !== "number" && !Number.prototype.isPrototypeOf(columnsNumber)) {
		throw new TypeError(
			`Wrong type of second argument.
			Expected "number", got "${typeof columnsNumber}"`
		);
	}

	if (columnsNumber < 1) {
		throw new TypeError(
			`Wrong value of second argument. "columnsNumber" must be > 0`
		); 
	}

	const startLengths = Array(columnsNumber).fill(0);
	// получаем максимальные длины по столбцам
	const maxLengths = values.reduce((previousValue, currentElement, index) => {
		const columnIndex = index % columnsNumber;
		if (typeof currentElement != "number" && !Number.prototype.isPrototypeOf(currentElement)) {
			throw new TypeError(
				`Wrong type of array values. Expected "Number", got "${typeof currentElement}"`
			);
		}

		const newLength = numberLength(currentElement);
		if (newLength > previousValue[columnIndex]) {
			previousValue[columnIndex] = newLength;
		}

		return previousValue;
	}, startLengths);	

	// формируем строку
	const stringsArray = values.reduce((resultArray, currentElement, index) => {
		const columnIndex = index % columnsNumber;
		const newValue = formatNumber(currentElement, maxLengths[columnIndex]);

		let last = resultArray.length - 1;
		if (columnIndex < columnsNumber - 1) {
			resultArray[last] += newValue;
			resultArray[last] += " ";
		} else {
			resultArray[last] += newValue;
			resultArray.push("");
		}

		return resultArray;
	}, [""]);

	const output = stringsArray.join("\n");

	return output.slice(0, -1);
}


/**
 * @description Creates table cell out of input number (adds " ")
 * @param {Number} number - Input number 
 * @param {Number} length - Table cell length
 * @returns {String} Table cell 
 */
const formatNumber = (number, length) => {
	const stringedNumber = number.toString();

	const spacesAmount = length - stringedNumber.length;
	if (spacesAmount > 0) {
		return `${" ".repeat(spacesAmount)}${stringedNumber}`;	
	}
	
	return stringedNumber;
}


/**
 * @description Returns number length
 * @param {Number} number - Input number 
 * @returns {Number} Number "length"
 */
const numberLength = (number) => {
	let length = number < 0 ? 2 : 1;
	while (~~(number / 10) != 0) {
		number /= 10;
		length++;
	}

	return length;
}
