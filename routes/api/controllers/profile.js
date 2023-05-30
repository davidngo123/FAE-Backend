import express from 'express';
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        let userId = req.query.id;
        let allProfiles
        if (userId == undefined) {
            allProfiles = await req.models.Profile.find()
        } else {
            allProfiles = await req.models.Profile.find({ '_id': userId })
        }

        let profiles = [];

        for (let i = 0; i < allProfiles.length; i++) {
            profiles.push({
                "id": allProfiles[i]._id,
                "name": allProfiles[i].username,
                "bio": allProfiles[i].bio,
                "pronouns": allProfiles[i].pronouns,
                "twitch": allProfiles[i].twitch,
                "youtube": allProfiles[i].youtube,
                "discord": allProfiles[i].discord,
                "twitter": allProfiles[i].twitter,
                "profilePic": allProfiles[i].profilePic,
                "email": allProfiles[i].email,
                "salary": { ...allProfiles[i].salary },
                "game": allProfiles[i].game,
                "region": allProfiles[i].region,
                "experience": allProfiles[i].experience,
                "siteType": allProfiles[i].siteType,
                "tags": allProfiles[i].tags,
                "events": allProfiles[i].events,
                "roles": allProfiles[i].roles,

                // Added on my own
                "showcase": allProfiles[i].showcase,
                "design": allProfiles[i].design,
                "articles": allProfiles[i].articles,
                "observer": allProfiles[i].observer,
                "editing": allProfiles[i].editing,
                "casting": allProfiles[i].casting,

            })
        }
        res.send(profiles)
    } catch (error) {
        res.status(500).json({ "status": "error", "error": error })
    }
});


router.post('/', async (req, res) => {
    try {
        const userId = req.body.id;
        const profileReqObj = {
            username: req.body.username,
            pronouns: req.body.pronouns,
            bio: req.body.bio,
            twitch: req.body.twitch,
            youtube: req.body.youtube,
            discord: req.body.discord,
            twitter: req.body.twitter,
            profilePic: req.body.profilePic,
            email: req.body.email,
            roles: req.body.roles,
            tags: req.body.tags,
            game: req.body.game,
            region: req.body.region,
            salary: req.body.salary,
            experience: req.body.experience,
            siteType: req.body.siteType,
            events: req.body.events,

            // Added on my own
            showcase: req.body.showcase,
            design: req.body.design,
            articles: req.body.articles,
            observer: req.body.observer,
            editing: req.body.editing,
            casting: req.body.casting,
        };
        const profile = await req.models.Profile.findOne({ _id: userId });
        if (profile) {
            profile.set(profileReqObj);
            await profile.save();
            res.json({ status: "success" });
        } else {
            // Handle the case when the profile is not found
            res.status(404).json({ status: "error", error: "Profile not found" });
        }

    } catch (error) {
        console.log("Error saving post: ", error)
        res.status(500).json({ "status": "error", "error": error })
    }


    // res.status(401).json({"status": "error", "error": "not logged in"})

})

export default router;