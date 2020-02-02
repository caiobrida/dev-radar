const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        
        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = response.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }
    return res.json(dev);
    },

    async update(req, res) {
        let dev = await Dev.findById(req.params.id);

        if(!dev) return res.status(400).send('Dev not found');

        const { name, avatar_url, techs, latitude, longitude, bio } = req.body;

        const techsArray = parseStringAsArray(techs);     
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        dev.name = name;
        dev.avatar_url = avatar_url;
        dev.techs = techsArray;
        dev.location = location;
        dev.bio = bio;

        await dev.save();

        return res.json(dev);
    },

    async destroy(req, res) {
        const dev = await Dev.findByIdAndDelete(req.params.id);
        res.send(dev);
    }
}