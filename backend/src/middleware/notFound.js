export function notFound(req, res) {
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ message: "Rota não encontrada" }))
}