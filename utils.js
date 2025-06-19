function calculateTotal(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}

function sayHello() {
  console.log("Hello, world!");
}

function greetUser(name) {
  console.log("Hello, " + name);
}

function greetAdmin(name) { // ❗ Duplicated logic
  console.log("Hello, " + name);
}

module.exports = {
  calculateTotal,
  sayHello
};
