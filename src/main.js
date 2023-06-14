console.log("main function");

arr = [1, 2, 3];
const sum = (arr) => {
    arr.reduce((pre, cur) => pre + cur, 0);
};
