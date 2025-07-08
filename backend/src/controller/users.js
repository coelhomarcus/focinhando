import { randomUUID } from "node:crypto"
import { readUsers, writeUsers } from "../config/db.js"

export async function handleGetUsers(req, res) {
    const users = await readUsers()
    res.end(JSON.stringify(users))
}

export async function handleCreateUser(req, res) {
    let body = ""
    req.on("data", chunk => body += chunk)

    req.on("end", async () => {
        try {
            const { fullName, email, number, subject, message } = JSON.parse(body)

            if (!fullName || !email || !number || !subject || !message) {
                res.statusCode = 400
                return res.end(JSON.stringify({ message: "Campos obrigatórios faltando no corpo da requisição" }))
            }

            const users = await readUsers()
            const user = {
                id: randomUUID(),
                fullName,
                email,
                number,
                subject,
                message
            }

            users.push(user)
            await writeUsers(users)

            res.statusCode = 201
            return res.end(JSON.stringify(user))
        } catch {
            res.statusCode = 400
            return res.end(JSON.stringify({ message: "JSON inválido" }))
        }
    })
}

export async function handleUpdateUser(req, res, idUser) {
    let body = ""
    req.on("data", chunk => body += chunk)

    req.on("end", async () => {
        try {
            const { fullName, email, number, subject, message } = JSON.parse(body)

            const users = await readUsers()
            const index = users.findIndex(u => u.id === idUser)

            if (index === -1) {
                res.statusCode = 404
                return res.end(JSON.stringify({ message: "Usuário não encontrado" }))
            }

            users[index] = {
                id: idUser,
                fullName,
                email,
                number,
                subject,
                message
            }

            await writeUsers(users)
            res.end(JSON.stringify(users[index]))
        } catch {
            res.statusCode = 400
            res.end(JSON.stringify({ message: "JSON inválido" }))
        }
    })
}

export async function handleDeleteUser(req, res, idUser) {
    const users = await readUsers()
    const index = users.findIndex(u => u.id === idUser)

    if (index === -1) {
        res.statusCode = 404
        return res.end(JSON.stringify({ message: "Usuário não encontrado" }))
    }

    users.splice(index, 1)
    await writeUsers(users)

    res.end(JSON.stringify({ message: "Usuário removido" }))
}