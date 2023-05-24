import express from 'express';
var router = express.Router();
router.get('/', async function (req, res, next) {
    try {
        let directory = req.query.directory
        console.log(username)
        let allDirectories
        if (username == undefined) {
            allDirectories = await req.models.Directory.find()
        } else {
            allDirectories = await req.models.Directory.find({ 'name': directory })
        }

        let directories = [];
        for (let i = 0; i < allDirectories.length; i++) {
            directories.push({
                "id": allDirectories[i]._id,
                "name": allDirectories[i].name,
                "description": allDirectories[i].description
            })
        }
        res.send(directories)
    } catch (error) {
        res.status(500).json({ "status": "error", "error": error })
    }
});

router.get('/count', async (req, res) => {
    try {
        const broadcastingCount = { name: 'broadcasting' }
        const businessOperationsCount = { name: 'business operations' }
        const communicationsMarketingCount = { name: 'communications marketing' }
        const contentCreationCount = { name: 'content creation' }
        const performanceCount = { name: 'performance' }
        const tournamentEventsCount = { name: 'tournaments events' }

        broadcastingCount.count = await req.models.Profile.find({ roles: { $in: ['caster', 'host', 'observer', 'producer', 'replay operator', 'technical director'] } }).count()
        businessOperationsCount.count = await req.models.Profile.find({ roles: { $in: ['administrative', 'information technology', 'finance', 'operations', 'project management'] } }).count()
        communicationsMarketingCount.count = await req.models.Profile.find({ roles: { $in: ['community management', 'partnerships', 'social media'] } }).count()
        contentCreationCount.count = await req.models.Profile.find({ roles: { $in: ['editorial', 'graphic design', 'motion design', 'photography', 'video editing', 'videography'] } }).count()
        performanceCount.count = await req.models.Profile.find({ roles: { $in: ['coaching', 'health', 'nutrition', 'psychology', 'team manager'] } }).count()
        tournamentEventsCount.count = await req.models.Profile.find({ roles: { $in: ['event organizer', 'facilities management', 'tournament admin', 'tournament organizer'] } }).count()

        res.status(200).json({
            status: 'success', payload: JSON.stringify({
                "broadcasting": broadcastingCount,
                "business operations": businessOperationsCount,
                "communications marketing": communicationsMarketingCount,
                "content creation": contentCreationCount,
                "performance": performanceCount,
                "tournaments events": tournamentEventsCount
            })
        })

    } catch (error) {
        res.status(500).send({ status: 'error', error: error })
    }
})


router.post('/', async (req, res) => {
    try {
        const newPost = new req.models.Directory({
            name: req.body.name,
            description: req.body.description,
        })

        await newPost.save()
        console.log('sucess')
        res.json({ "status": "success" })

    } catch (error) {
        console.log("Error saving post: ", error)
        res.status(500).json({ "status": "error", "error": error })
    }


    // res.status(401).json({"status": "error", "error": "not logged in"})

})

router.get('/sanity-check', (req, res) => {
    res.status(200).send({
        status: "success",
        payload: {
            message: "If sanity check works, that means mongodb only connects on localhost and not on cyclic"
        }
    })
})

export default router;