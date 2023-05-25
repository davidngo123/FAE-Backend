import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('filter page')
})

router.post('/', async (req, res) => {
    try {
        let formData = req.body

        const { subcategories, game, location, siteType, salary, experience, pageNumber, itemsPerPage } = formData

        const query = {
            roles: { $in: subcategories },
            siteType: { $in: siteType },
            "salary.currency": { $regex: salary.currency, "$options": "i" },
            "salary.compensationType": salary.compensationType,
            "salary.amount": { $gte: salary.min, $lte: salary.max === -1 ? Number.MAX_SAFE_INTEGER : salary.max },
            experience: { $in: experience }
        }


        if (game !== '') {
            query.game = { $regex: game, "$options": "i" }
        }

        if (location !== '') {
            query.region = { $regex: location, "$options": "i" }
        }

        const dataLength = await req.models.Profile.find(query).count()
        const users = await req.models.Profile.find(query).skip((pageNumber - 1) * itemsPerPage).limit(itemsPerPage)

        console.log(users, dataLength)

        res.send({ status: 'success', payload: JSON.stringify(users), dataLength: dataLength })
    } catch (error) {
        res.status(500).json({ "status": "error", "error": error })
    }
})

router.get('/search', async (req, res) => {
    try {
        const { category, value } = req.query

        const result = await req.models.Profile.find((() => {
            switch (category) {
                case 'role':
                    return { roles: { $in: [value] } }
                case 'name':
                    return { username: { $regex: value, "$options": "i" } }
                case 'tags':
                    return { tags: { $in: [value] } }
            }
        })())
        res.status(200).send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error: error })
    }
})

export default router