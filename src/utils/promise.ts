export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const waitRandom = (min: number = 500, max: number = 3000) => wait(Math.random() * (max - min) + min);
