import crypto from 'crypto';
const pin = '1234';
const nodeHash = crypto.createHash('sha256').update(pin).digest('hex');
console.log('NODE hashPin(1234):', nodeHash);
// GAS equivalent for comparison (document expected output):
// SHA-256('1234') standard = 03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
