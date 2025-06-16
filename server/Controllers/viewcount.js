import anime from '../Models/viewcount.js'

export const added = async (req, res) => {
    try {
        const { title } = req.body

        var payload = new anime({
            title: title
        })

        await payload.save()
        res.status(201).send("Sended")
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export const list = async (req, res) => {
    try {
        const show = await anime.find({}).exec()
        res.send(show)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}