export const generateUserId = () => {
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    return `U${randomSixDigit}`;
};
export const generateOrderId = () => {
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    return `O${randomSixDigit}`;
};