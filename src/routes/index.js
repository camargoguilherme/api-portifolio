const express = require('express');
const routes = express.Router();
const path = require('path');

const AboutRoute = require('./About');
const BlogRoute = require('./Blog');
const DetailRoute = require('./Detail');
const LoginRoute = require('./Login');
const MediaRoute = require('./Media');
const MenuRoute = require('./Menu');
const PortifolioRoute = require('./Portifolio');
const ProfileRoute = require('./Profile');
const SkillRoute = require('./Skill');
const UserRoute = require('./User');

routes.get('/', (req, res) => {
	res.json({ status: true, message: 'api is running' })
})

routes.use('/files', express.static(path.resolve(__dirname, '..', '..', 'upload')));

routes.use(LoginRoute);
routes.use(AboutRoute);
routes.use(BlogRoute);
routes.use(DetailRoute);
routes.use(MediaRoute);
routes.use(MenuRoute);
routes.use(PortifolioRoute);
routes.use(ProfileRoute);
routes.use(SkillRoute);
routes.use(UserRoute);

module.exports = routes;