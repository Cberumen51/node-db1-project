const express = require("express")
const db = require("./data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const budgets = await db.select("*").from("accounts")
        res.json(budgets)
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const budget = await db("accounts").where("id", req.params.id).first()
        res.json(budget)
    } catch(err) {
        next(err)
    }
    })

    router.post("/", async (req, res, next) => {
        try { 
            const payload = {
                name: req.body.name,
                budget: req.body.budget,
            }
    
            const [id] = await db("accounts").insert(payload)
            const message = await db("accounts").where("id", id).first()
            res.json(message)
        } catch(err) {
            next(err)
        }
    })

    router.put("/:id", async (req, res, next) => {
        try {
            const payload = {
                name: req.body.name,
                budget: req.body.budget,
            }
            await db("accounts").where("id", req.params.id).update(payload)
            const updatedMessage = await db("accounts").where("id", req.params.id).first()
            res.json(updatedMessage)
        } catch(err) {
            next(err)
        }
    })

    router.delete("/:id", async (req, res, next) => {
        try {
            // `DELETE FROM "messages" WHERE "id" = ?`
            await db("accounts").where("id", req.params.id).del()
            res.status(204).end()
        } catch(err) {
            next(err)
        }
    })
    

module.exports = router