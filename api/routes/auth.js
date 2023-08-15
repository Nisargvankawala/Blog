const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER POST "/api/auth/register"
router.post("/register", async (req, res) => {
    try {

        //generating a salt using bcrypt
        const salt = await bcrypt.genSalt(10);

        //hashing the salt with the password generating a one way hash
        const hashedPass = await bcrypt.hash(req.body.password, salt);


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user);


    } catch (err) {
        res.status(500).json(err)
    }
})


//LOGIN POST "/api/auth/login"
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(400).json("Wrong Credentials1")

        const validate = await bcrypt.compare(req.body.password, user.password);
        if (!validate) return res.status(400).json("Wrong Credentials2")

        //after this user has entered correct password
        const {password,...other} = user._doc;
        res.status(200).json(other);

    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router;