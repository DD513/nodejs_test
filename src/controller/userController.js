class userController {
    getUser = (req, res) => {
        res.status(200).json({ Message: "hi12345678" });
    }
}

export default new userController();