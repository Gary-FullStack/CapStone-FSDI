import bcrypt from "bcrypt";

// this is the fuction to hash the passwords
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {    
            bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }else
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }else
                resolve(hash);
            })
        });
    });
};

// this compares the 1st instance password to the hash for subsequent log in
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};