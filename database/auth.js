import { dbPromise } from "./db";

export const login = async (username, password) => {
  const db = await dbPromise;

  const result = await db.getAllAsync(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
  );
  console.log("user signed in", result);
  return result;
};
