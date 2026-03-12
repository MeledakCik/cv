import fpPromise from '@fingerprintjs/fingerprintjs';

export const getFingerprint = async () => {
  const fp = await fpPromise.load();
  const result = await fp.get();
  return result.visitorId; // Ini adalah ID unik browser Anda
};