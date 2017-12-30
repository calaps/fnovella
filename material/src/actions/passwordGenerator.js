import generator from 'generate-password';

export default function generatePassword() {
  var password = generator.generate({
    length: 10,
    numbers: true
  });
  return password;
}
