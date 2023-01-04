export interface Cryptography {
  encrypt: (value: string) => Promise<string>
};

export interface Decryptography {
  decrypt: (value: string) => Promise<Boolean>
};
