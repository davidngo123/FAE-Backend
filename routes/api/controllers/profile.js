import express from 'express';
var router = express.Router();
router.get('/', async function(req, res, next) {
    try{  
      let profileName = req.query.user
      let allProfiles
      if(profileName == undefined){
        allProfiles = await req.models.Profile.find()
      } else {
        allProfiles = await req.models.Profile.find({'username' : profileName})
      }

      let profiles = [];

      for (let i = 0; i < allProfiles.length; i++) {
        profiles.push({
                    "id" : allProfiles[i]._id,
                    "name" : allProfiles[i].username,
                    "bio" : allProfiles[i].bio,
                    "pronouns" : allProfiles[i].pronouns,
                    "twitch" : allProfiles[i].twitch,
                    "youtube" : allProfiles[i].youtube,
                    "discord" : allProfiles[i].discord,
                    "twitter" : allProfiles[i].twitter,
                    "profilePic" : allProfiles[i].profilePic,
                    "email" : allProfiles[i].email,
                    "salary" : allProfiles[i].salary,
                    "tags" : allProfiles[i].tags,
                    "events" : allProfiles[i].events,
                    "roles" : allProfiles[i].roles,
                    
                })
      }
      res.send(profiles)
    }catch(error){
      res.status(500).json({"status": "error", "error": error})
    }
  });


router.post('/', async (req, res) => {
    try {
      const newPost = new req.models.Profile({
          username: req.body.username,
          pronouns: req.body.pronouns,
          bio: req.body.bio,
          twitch : req.body.twitch,
          youtube : req.body.youtube,
          discord : req.body.discord,
          twitter : req.body.twitter,
          profilePic : req.body.profilePic,
          email : req.body.email,
          roles: req.body.roles,
          tags: req.body.tags,
          salary: req.body.salary,
          events: req.body.events,
          
      })
      
      await newPost.save()
      console.log('sucess')
      res.json({"status": "success"})

    } catch(error) {
        console.log("Error saving post: ", error)
        res.status(500).json({"status": "error", "error": error})
    }


    // res.status(401).json({"status": "error", "error": "not logged in"})

})

export default router;