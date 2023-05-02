import mongoose from 'mongoose';

let models = {};

main().catch(err => console.log(err))
async function main(){
    console.log('connecting to mongodb')
    await mongoose.connect('mongodb+srv://dngo2:info441pass@cluster0.eihrtuv.mongodb.net/fae2?retryWrites=true&w=majority')

    console.log('succesfully connected to mongodb!')

    const directorySchema = new mongoose.Schema({
        name: String,
        description: String
        
    })

    models.Directory = mongoose.model('Directory', directorySchema)
    const profileSchema = new mongoose.Schema({
        username: String,
        role: String,
        tag: [String],
        salary: Number, 
        events: [String],
        portfolio_images: [String],
        bio: String
        
    })
    models.Profile = mongoose.model('Profile', profileSchema)
    console.log('mongoose models created')
}

export default models;