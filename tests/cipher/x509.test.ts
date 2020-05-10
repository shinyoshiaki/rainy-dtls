import { generateKeySignature } from "../../src/cipher/x509";
import * as forge from "node-forge";

const rawPrivateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAxIA2BrrnR2sIlATsp7aRBD/3krwZ7vt9dNeoDQAee0s6SuYP
6MBx/HPnAkwNvPS90R05a7pwRkoT6Ur4PfPhCVlUe8lV+0Eto3ZSEeHz3HdsqlM3
bso67L7Dqrc7MdVstlKcgJi8yeAoGOIL9/igOv0XBFCeznm9nznx6mnsR5cugw+1
ypXelaHmBCLV7r5SeVSh57+KhvZGbQ2fFpUaTPegRpJZXBNS8lSeWvtOv9d6N5UB
ROTAJodMZT5AfX0jB0QB9IT/0I96H6BSENH08NXOeXApMuLKvnAf361rS7cRAfRL
rWZqERMP4u6Cnk0Cnckc3WcW27kGGIbtwbqUIQIDAQABAoIBAGF7OVIdZp8Hejn0
N3L8HvT8xtUEe9kS6ioM0lGgvX5s035Uo4/T6LhUx0VcdXRH9eLHnLTUyN4V4cra
ZkxVsE3zAvZl60G6E+oDyLMWZOP6Wu4kWlub9597A5atT7BpMIVCdmFVZFLB4SJ3
AXkC3nplFAYP+Lh1rJxRIrIn2g+pEeBboWbYA++oDNuMQffDZaokTkJ8Bn1JZYh0
xEXKY8Bi2Egd5NMeZa1UFO6y8tUbZfwgVs6Enq5uOgtfayq79vZwyjj1kd29MBUD
8g8byV053ZKxbUOiOuUts97eb+fN3DIDRTcT2c+lXt/4C54M1FclJAbtYRK/qwsl
pYWKQAECgYEA4ZUbqQnTo1ICvj81ifGrz+H4LKQqe92Hbf/W51D/Umk2kP702W22
HP4CvrJRtALThJIG9m2TwUjl/WAuZIBrhSAbIvc3Fcoa2HjdRp+sO5U1ueDq7d/S
Z+PxRI8cbLbRpEdIaoR46qr/2uWZ943PHMv9h4VHPYn1w8b94hwD6vkCgYEA3v87
mFLzyM9ercnEv9zHMRlMZFQhlcUGQZvfb8BuJYl/WogyT6vRrUuM0QXULNEPlrin
mBQTqc1nCYbgkFFsD2VVt1qIyiAJsB9MD1LNV6YuvE7T2KOSadmsA4fa9PUqbr71
hf3lTTq+LeR09LebO7WgSGYY+5YKVOEGpYMR1GkCgYEAxPVQmk3HKHEhjgRYdaG5
lp9A9ZE8uruYVJWtiHgzBTxx9TV2iST+fd/We7PsHFTfY3+wbpcMDBXfIVRKDVwH
BMwchXH9+Ztlxx34bYJaegd0SmA0Hw9ugWEHNgoSEmWpM1s9wir5/ELjc7dGsFtz
uzvsl9fpdLSxDYgAAdzeGtkCgYBAzKIgrVox7DBzB8KojhtD5ToRnXD0+H/M6OKQ
srZPKhlb0V/tTtxrIx0UUEFLlKSXA6mPw6XDHfDnD86JoV9pSeUSlrhRI+Ysy6tq
eIE7CwthpPZiaYXORHZ7wCqcK/HcpJjsCs9rFbrV0yE5S3FMdIbTAvgXg44VBB7O
UbwIoQKBgDuY8gSrA5/A747wjjmsdRWK4DMTMEV4eCW1BEP7Tg7Cxd5n3xPJiYhr
nhLGN+mMnVIcv2zEMS0/eNZr1j/0BtEdx+3IC6Eq+ONY0anZ4Irt57/5QeKgKn/L
JPhfPySIPG4UmwE4gW8t79vfOKxnUu2fDD1ZXUYopan6EckACNH/
-----END RSA PRIVATE KEY-----
`;

test("cipher_x509_generateKeySignature", async () => {
  const clientRandom = Buffer.from([
    0x00,
    0x01,
    0x02,
    0x03,
    0x04,
    0x05,
    0x06,
    0x07,
    0x08,
    0x09,
    0x0a,
    0x0b,
    0x0c,
    0x0d,
    0x0e,
    0x0f,
    0x10,
    0x11,
    0x12,
    0x13,
    0x14,
    0x15,
    0x16,
    0x17,
    0x18,
    0x19,
    0x1a,
    0x1b,
    0x1c,
    0x1d,
    0x1e,
    0x1f,
  ]);
  const serverRandom = Buffer.from([
    0x70,
    0x71,
    0x72,
    0x73,
    0x74,
    0x75,
    0x76,
    0x77,
    0x78,
    0x79,
    0x7a,
    0x7b,
    0x7c,
    0x7d,
    0x7e,
    0x7f,
    0x80,
    0x81,
    0x82,
    0x83,
    0x84,
    0x85,
    0x86,
    0x87,
    0x88,
    0x89,
    0x8a,
    0x8b,
    0x8c,
    0x8d,
    0x8e,
    0x8f,
  ]);
  const publicKey = Buffer.from([
    0x20,
    0x9f,
    0xd7,
    0xad,
    0x6d,
    0xcf,
    0xf4,
    0x29,
    0x8d,
    0xd3,
    0xf9,
    0x6d,
    0x5b,
    0x1b,
    0x2a,
    0xf9,
    0x10,
    0xa0,
    0x53,
    0x5b,
    0x14,
    0x88,
    0xd7,
    0xf8,
    0xfa,
    0xbb,
    0x34,
    0x9a,
    0x98,
    0x28,
    0x80,
    0xb6,
    0x15,
  ]);
  const expectedSignature = Buffer.from([
    0x6f,
    0x47,
    0x97,
    0x85,
    0xcc,
    0x76,
    0x50,
    0x93,
    0xbd,
    0xe2,
    0x6a,
    0x69,
    0x0b,
    0xc3,
    0x03,
    0xd1,
    0xb7,
    0xe4,
    0xab,
    0x88,
    0x7b,
    0xa6,
    0x52,
    0x80,
    0xdf,
    0xaa,
    0x25,
    0x7a,
    0xdb,
    0x29,
    0x32,
    0xe4,
    0xd8,
    0x28,
    0x28,
    0xb3,
    0xe8,
    0x04,
    0x3c,
    0x38,
    0x16,
    0xfc,
    0x78,
    0xe9,
    0x15,
    0x7b,
    0xc5,
    0xbd,
    0x7d,
    0xfc,
    0xcd,
    0x83,
    0x00,
    0x57,
    0x4a,
    0x3c,
    0x23,
    0x85,
    0x75,
    0x6b,
    0x37,
    0xd5,
    0x89,
    0x72,
    0x73,
    0xf0,
    0x44,
    0x8c,
    0x00,
    0x70,
    0x1f,
    0x6e,
    0xa2,
    0x81,
    0xd0,
    0x09,
    0xc5,
    0x20,
    0x36,
    0xab,
    0x23,
    0x09,
    0x40,
    0x1f,
    0x4d,
    0x45,
    0x96,
    0x62,
    0xbb,
    0x81,
    0xb0,
    0x30,
    0x72,
    0xad,
    0x3a,
    0x0a,
    0xac,
    0x31,
    0x63,
    0x40,
    0x52,
    0x0a,
    0x27,
    0xf3,
    0x34,
    0xde,
    0x27,
    0x7d,
    0xb7,
    0x54,
    0xff,
    0x0f,
    0x9f,
    0x5a,
    0xfe,
    0x07,
    0x0f,
    0x4e,
    0x9f,
    0x53,
    0x04,
    0x34,
    0x62,
    0xf4,
    0x30,
    0x74,
    0x83,
    0x35,
    0xfc,
    0xe4,
    0x7e,
    0xbf,
    0x5a,
    0xc4,
    0x52,
    0xd0,
    0xea,
    0xf9,
    0x61,
    0x4e,
    0xf5,
    0x1c,
    0x0e,
    0x58,
    0x02,
    0x71,
    0xfb,
    0x1f,
    0x34,
    0x55,
    0xe8,
    0x36,
    0x70,
    0x3c,
    0xc1,
    0xcb,
    0xc9,
    0xb7,
    0xbb,
    0xb5,
    0x1c,
    0x44,
    0x9a,
    0x6d,
    0x88,
    0x78,
    0x98,
    0xd4,
    0x91,
    0x2e,
    0xeb,
    0x98,
    0x81,
    0x23,
    0x30,
    0x73,
    0x39,
    0x43,
    0xd5,
    0xbb,
    0x70,
    0x39,
    0xba,
    0x1f,
    0xdb,
    0x70,
    0x9f,
    0x91,
    0x83,
    0x56,
    0xc2,
    0xde,
    0xed,
    0x17,
    0x6d,
    0x2c,
    0x3e,
    0x21,
    0xea,
    0x36,
    0xb4,
    0x91,
    0xd8,
    0x31,
    0x05,
    0x60,
    0x90,
    0xfd,
    0xc6,
    0x74,
    0xa9,
    0x7b,
    0x18,
    0xfc,
    0x1c,
    0x6a,
    0x1c,
    0x6e,
    0xec,
    0xd3,
    0xc1,
    0xc0,
    0x0d,
    0x11,
    0x25,
    0x48,
    0x37,
    0x3d,
    0x45,
    0x11,
    0xa2,
    0x31,
    0x14,
    0x0a,
    0x66,
    0x9f,
    0xd8,
    0xac,
    0x74,
    0xa2,
    0xcd,
    0xc8,
    0x79,
    0xb3,
    0x9e,
    0xc6,
    0x66,
    0x25,
    0xcf,
    0x2c,
    0x87,
    0x5e,
    0x5c,
    0x36,
    0x75,
    0x86,
  ]);

  const sig = await generateKeySignature(
    clientRandom,
    serverRandom,
    publicKey,
    29,
    rawPrivateKey,
    "sha256"
  );

  expect(sig).toEqual(expectedSignature);
});
