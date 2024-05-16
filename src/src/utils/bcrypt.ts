import { randomBytes, pbkdf2, createHash } from "node:crypto";
async function hashPasswordFn(
    password: string
): Promise<{ hashPassword: string; saltPassword: string }> {
    const saltPassword = randomBytes(16).toString("hex");
    return new Promise((resolve, reject) => {
        pbkdf2(password, saltPassword, 1000, 64, "sha512", (error, derivedKey) => {
            if (error) {
                return reject(error);
            }
            return resolve({ hashPassword: derivedKey.toString("hex"), saltPassword });
        });
    });
}

async function comparePassword(
    password: string,
    salt: string,
    hash: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        pbkdf2(password, salt, 1000, 64, "sha512", (error, derivedKey) => {
            if (error) {
                return reject(error);
            }
            return resolve(hash === derivedKey.toString("hex"));
        });
    });
}

function md5hash(text: string) {
    return createHash("md5").update(text).digest("hex");
}

export { hashPasswordFn, comparePassword, md5hash };
