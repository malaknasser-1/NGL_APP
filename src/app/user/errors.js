import { AppError } from '../../lib/error/error.js';

export const userNotExist =new AppError ('user not exist',404);
export const userAleardyVerfied = new AppError("user alearady Verfied",409)
export const  userAleardyExist=new AppError("user Aleardy Exist",400)
export const userNotVerified = new AppError('user Not Verified',403);




/*
class User {
    userName;
    email;
    password;
    
    

 constructor(userName, email, password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}

class Customer extends User {
    phone;
    age;
    address;
    isVerified;
    isDeleted;

    constructor(userName, email, password,phone, age, address) {
        this.phone = phone;
        this.age = age;
        this.address = address;
        this.isVerified = false;
        this.isDeleted =false; 
    }
}

const customer1  = new Customer('Ahmed','Ahmed@g.com','12345','01024708090', 25, 'Helwan');
const customer2  = new Customer('omar','omar@g.com','12345','01024708091', 26, 'Maddi');

console.log(customer1);
console.log(customer2);
*/
