/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */

function sumSalary(salaries) {
  let sumOfSalaries = 0;
    
  for (let key in salaries) {
    
    if (typeof salaries[key] == "number" && !isNaN(salaries[key]) && isFinite(salaries[key])) {
      
      sumOfSalaries += salaries[key]; 
    } 

  }

  return sumOfSalaries
}


