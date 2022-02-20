export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const waitRandom = (min: number = 500, max: number = 3000) => wait(Math.random() * (max - min) + min);

export const waitRandomGetResult = async (min: number = 500, max: number = 3000) => {
    await waitRandom(min, max);
    return Math.random() < 0.66; // 66% chance of success
}
