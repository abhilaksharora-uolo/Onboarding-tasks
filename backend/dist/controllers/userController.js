"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUsers = exports.addUser = void 0;
const uuid_1 = require("uuid");
let users = [];
// let users: User[] = [
//   {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     id: "JD1234",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     id: "JS5678",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Michael Johnson",
//     email: "michael.johnson@example.com",
//     id: "MJ9012",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Emily Brown",
//     email: "emily.brown@example.com",
//     id: "EB3456",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "David Wilson",
//     email: "david.wilson@example.com",
//     id: "DW7890",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Sarah Garcia",
//     email: "sarah.garcia@example.com",
//     id: "SG2345",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Daniel Martinez",
//     email: "daniel.martinez@example.com",
//     id: "DM6789",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Linda Davis",
//     email: "linda.davis@example.com",
//     id: "LD1234",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Robert Taylor",
//     email: "robert.taylor@example.com",
//     id: "RT5678",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
//   {
//     name: "Jennifer Thomas",
//     email: "jennifer.thomas@example.com",
//     id: "JT9012",
//     url: "https://s3-alpha-sig.figma.com/img/e295/ca2c/8a00e941c07e35d7f4b29b79fd54acd7?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WhZlyNGV-pFnrumff4yqK0CDYkUeGmljP5vx-zYuO7dL~l-l-nJLHIGcGMwejzyTdBmgeh1BbkZq8OKTDGK9RLWN1DGJnizCh~wBjk2nefqJQ6dlNnXrf3esuNBWkVy6Hx-zH1Bh~VWApC04S-HzG-vNKBR2Zd2Nh9gY2T~Uiog3lQyThL-KNcIZK49Ywkctf0JijpwzurqlRE8ZLz4YSP5lHABFleA2y2PmbhJHfHOqRszf63ZUzddbZ7lNGBKQKKFhU1J~119FzEI2yA-wIsDd9bCUFwjkl1SVXf-64KHJ6XFvULJPYtPorMIdO5KvEUOkHpFsv5lgoElT2cKluw__",
//   },
// ];
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = Object.assign(Object.assign({}, req.body), { id: (0, uuid_1.v4)() });
    users.push(newUser);
    res.status(201).json(users);
});
exports.addUser = addUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalPages = Math.ceil(users.length / limit);
    const results = users.slice(startIndex, endIndex);
    res.json({ results, totalPages });
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    users = users.filter((item) => item.id !== id);
    res.status(201).json(users);
});
exports.deleteUser = deleteUser;
