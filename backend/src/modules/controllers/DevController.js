const axios = require('axios');
const Dev = require('../Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, storem update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            let { name, avatar_url, bio } = apiResponse.data;
        
            name = !name ? apiResponse.data.login : name;
        
            bio = !bio ? "--Nothing to show--" : bio;
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        
        return response.json(dev);
    },

    /*async update() {
        const dev = await Dev.findAndModify();

        //TODO
    },

    async destroy() {
        const dev = await Dev.find();

        //TODO
    }*/
};