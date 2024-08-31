/**
 * @typedef {Object} Student
 * @property {number} id
 * @property {string} name
 * @property {string} surname
 * @property {string} patronymic
 * @property {string} birthdate
 * @property {number} groupid
 */

/**
 * @typedef {Object} StudentPost
 * @property {string} name
 * @property {string} surname
 * @property {string} patronymic
 * @property {string} birthdate
 * @property {number} groupid
 */

/**
 * @typedef {Object} ColumnSchema
 * @property {string} columnName
 * @property {number} columnSize
 * @property {string} columnType
 * @property {boolean} isNullable
 */

/**
 * @typedef {Object} TableData
 * @property {Student[] | []} students
 * @property {ColumnSchema[]} schema
 */

/**
 * @typedef {Object} RowData
 * @property {Student} student
 * @property {ColumnSchema[]} schema
 */

