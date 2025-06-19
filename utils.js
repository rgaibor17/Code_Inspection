export function calculateTotal(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

export function greet(name, role = 'user') {
  console.log(`Hello, ${role} ${name}`);
}
