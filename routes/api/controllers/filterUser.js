import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('filter page')
})

router.post('/', async (req, res) => {
    try {
        console.log('received request')
        let formData = req.body

        const { subcategories } = formData


        const users = await req.models.Profile.find({
            roles: { $in: subcategories }
        })



        res.send({ status: 'success', payload: JSON.stringify(users) })
    } catch (error) {
        res.status(500).json({ "status": "error", "error": error })
    }
})

export default router


// if (profileName == undefined) {
        //     allProfiles = await req.models.Profile.find()
        // } else {
        //     allProfiles = await req.models.Profile.find({ 'username': profileName })
        // }

        // let profiles = [];

        // for (let i = 0; i < allProfiles.length; i++) {
        //     profiles.push({
        //         "id": allProfiles[i]._id,
        //         "name": allProfiles[i].username,
        //         "bio": allProfiles[i].bio,
        //         "pronouns": allProfiles[i].pronouns,
        //         "twitch": allProfiles[i].twitch,
        //         "youtube": allProfiles[i].youtube,
        //         "discord": allProfiles[i].discord,
        //         "twitter": allProfiles[i].twitter,
        //         "profilePic": allProfiles[i].profilePic,
        //         "email": allProfiles[i].email,
        //         "salary": { ...allProfiles[i].salary },
        //         "game": allProfiles[i].game,
        //         "region": allProfiles[i].region,
        //         "experience": allProfiles[i].experience,
        //         "siteType": allProfiles[i].siteType,
        //         "tags": allProfiles[i].tags,
        //         "events": allProfiles[i].events,
        //         "roles": allProfiles[i].roles,

        //     })
        // }