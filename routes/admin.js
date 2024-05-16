const { Router } = require('express');
const router = Router();
const controller = require('../controller/admin');
const adminMiddleware = require('../middlewares/admin');

router.post('/admin/signup', controller.signUp);

router.post('/admin/signin', controller.signIn);

router.post('/admin/courses', adminMiddleware, controller.addCourses);

router.get('/admin/courses', adminMiddleware, controller.getCourses);

module.exports = router;