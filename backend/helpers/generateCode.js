//Lecture 72.10 define generateCode fn
function generateCode(length) {
  //Lecture 72.11 define code
  let code = "";
  //Lecture 72.12 define schema
  let schema = "0123456789";

  //Lecture 72.13 randomly pic 5 code
  for (let i = 0; i < length; i++) {
    code += schema.charAt(Math.floor(Math.random() * schema.length));
  }

  //Lecture 72.14 return code
  return code;
}
//Lecture 72.10 export generateCode fn
module.exports = generateCode;
