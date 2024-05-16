const z = require("zod");

const validAdmin = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const validCourse = z.object({
  title: z.string(),
  description: z.string().max(100),
  price: z.number(),
  imageLink: z.string(),
});

module.exports = {
  validAdmin,
  validCourse,
};
