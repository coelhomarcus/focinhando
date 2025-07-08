import {
    handleGetUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser
} from "../controller/users.js"

export async function usersRouter(req, res) {
    if (req.url === "/users") {
        if (req.method === "GET") {
            await handleGetUsers(req, res)
            return true
        }
        if (req.method === "POST") {
            await handleCreateUser(req, res)
            return true
        }
    }

    if (req.url.startsWith("/users/")) {
        const idUser = req.url.split("/")[2]

        if (req.method === "PUT") {
            await handleUpdateUser(req, res, idUser)
            return true
        }
        if (req.method === "DELETE") {
            await handleDeleteUser(req, res, idUser)
            return true
        }
    }

    return false
}
