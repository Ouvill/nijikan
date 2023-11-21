/**
 * This function is used to retry a promise-based function a specified number of times with a specified interval.
 * If the function fails, it waits for the specified interval and then tries again.
 * The interval increases by 100ms after each attempt.
 * If all attempts fail, it throws the error from the last attempt.
 *
 * @template T The type of the result that the function returns when the promise resolves.
 *
 * @param {() => Promise<T>} func The function to retry. This function should return a promise.
 * @param {number} times The number of times to retry the function before giving up.
 * @param {number} interval The amount of time (in milliseconds) to wait between retries.
 *
 * @returns {Promise<T>} A promise that resolves with the result of the function if it eventually succeeds,
 * or rejects with the error from the last attempt if all attempts fail.
 */
export const retry = async <T>(
  func: () => Promise<T>,
  times: number,
  interval: number,
): Promise<T> => {
  try {
    return await func();
  } catch (e) {
    if (times === 0) throw e;
    await new Promise((resolve) => setTimeout(resolve, interval));
    return await retry(func, times - 1, interval + 100);
  }
};
