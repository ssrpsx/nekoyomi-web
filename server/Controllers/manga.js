import anime from '../Models/manga.js'

export const ft_added = async (req, res) => {
    try {
        let { title } = req.body
        
        if (!title) {
            return res.status(400).send("Missing title");
        }

        const category_list = [
            "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance", "School Life",
            "Shounen", "Shoujo", "Supernatural", "Mystery", "Horror", "Sci-Fi", "Slice of Life",
            "Sports", "Historical", "Martial Arts", "Josei", "Seinen", "Isekai", "Reincarnation",
            "Psychological", "Tragedy", "Magic", "Survival", "Ecchi", "Mecha", "Crime",
            "Thriller", "Yaoi", "Yuri", "Webtoon", "Manhwa", "Manhua"
        ];

        function getRandomCategories() {
            const shuffled = [...category_list].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            return selected.join(', ');
        }
        
        const views = () => Math.floor(Math.random() * 100);
        title = title.replaceAll(' ', '-')

        console.log(title)
        let payload = new anime({
            title: title,
            category: getRandomCategories(),
            views: views()
        })

        console.log(payload)

        await payload.save()
        res.status(201).send("Sended")
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export const menu = async (req, res) => {
    try {
        const show = await anime.find({}).exec()
        res.send(show)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

export const menu_list = async (req, res) => {
    try {
        const show = await anime.find({}).exec()
        res.send(show)
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

export const episode = async (req, res) => {
    return 0;
}