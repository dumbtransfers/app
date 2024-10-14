// Add this polyfill to ensure TextEncoder and TextDecoder are available
import { TextEncoder, TextDecoder } from 'text-encoding';

// Polyfill TextEncoder and TextDecoder if not already available globally
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

// Other global imports and configurations
