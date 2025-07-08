import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

export const DB_PATH = join(process.cwd(), "database", "users.json")

export async function readUsers() {
    const data = await readFile(DB_PATH, "utf-8")
    return JSON.parse(data)
}

export async function writeUsers(users) {
    await writeFile(DB_PATH, JSON.stringify(users, null, 2))
}