import anime from '../Models/manga.js'
import User from '../Models/auth.js'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const menu = async (req, res) => {
    try {
        const { category, pageNumber } = req.params;
        const newCategory = category.replaceAll(' ', '-');
        const page = Number(pageNumber) || 1;
        const limit = 30;
        const skip = (page - 1) * limit;

        let shows;
        let total;

        if (newCategory === 'menu') {
            shows = await anime.find().skip(skip).limit(limit).exec()
        }
        else if (newCategory === 'favorites') {
            shows = await anime.find({}).exec()
        }
        else if (newCategory === 'popular') {
            shows = await anime
                .find({})
                .sort({ views: -1 })
                .skip(skip)
                .limit(limit)
                .exec()
            total = await anime.countDocuments()
        }
        else if (newCategory === 'menu_list') {
            shows = await anime.find().skip(skip).limit(limit).exec()
            total = await anime.countDocuments()
        }
        else {
            const regex = new RegExp(newCategory, "i");

            shows = await anime.find({
                $or: [
                    { category: { $regex: regex } },
                    { title: { $regex: regex } }
                ]
            })
                .skip(skip)
                .limit(limit)
                .exec();

            total = await anime.countDocuments({
                $or: [
                    { category: { $regex: regex } },
                    { title: { $regex: regex } }
                ]
            });

        }

        const lastTotalPage = Math.ceil(total / limit);

        res.status(200).send({
            shows,
            lastTotalPage,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

export const list = async (req, res) => {
    try {
        const name = req.params.title;
        const data = await anime.findOne({ title: name });

        if (!data) return res.status(404).send("Not Found")

        const ROOT_PATH = path.resolve(__dirname, '..', '..');
        const BASE_PATH = path.join(ROOT_PATH, 'public', 'schema', name);

        try {
            await fs.access(BASE_PATH);
        }
        catch {
            return res.status(404).send("Folder not found")
        }

        const files = await fs.readdir(BASE_PATH, { withFileTypes: true });
        const folders = files
            .filter(f => f.isDirectory())
            .map(f => f.name)
            .sort((a, b) => {
                const numA = parseInt(a.replace('episode', ''), 10);
                const numB = parseInt(b.replace('episode', ''), 10);
                return numA - numB;
            });

        await anime.updateOne(
            { title: name },
            { $inc: { views: 1 } }
        )

        res.status(200).json({
            data,
            folders
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
};


export const episode = async (req, res) => {
    try {
        const name = req.params.title;
        const episode = req.params.pageNumber;

        const ROOT_PATH = path.resolve(__dirname, '..', '..');

        const BASE_PATH_EP = path.join(ROOT_PATH, 'public', 'schema', name);
        const BASE_PATH_IMAGE = path.join(BASE_PATH_EP, episode);

        try {
            await fs.access(BASE_PATH_EP);
            await fs.access(BASE_PATH_IMAGE);
        }
        catch {
            return res.status(404).send("Folder not found or image not found")
        }

        const files = await fs.readdir(BASE_PATH_EP, { withFileTypes: true });
        const image = await fs.readdir(BASE_PATH_IMAGE, { withFileTypes: true });

        const folders = files
            .filter(f => f.isDirectory())
            .map(f => f.name)
            .sort((a, b) => {
                const numA = parseInt(a.replace('episode', ''), 10);
                const numB = parseInt(b.replace('episode', ''), 10);
                return numA - numB;
            });

        const imageFiles = image
            .filter(file => file.isFile() && file.name.endsWith('.jpg'))
            .map(file => file.name)
            .sort((a, b) => {
                const numA = parseInt(a.replace('image_', ''), 10);
                const numB = parseInt(b.replace('image_', ''), 10);
                return numA - numB;
            });

        res.status(200).json({
            episodes: folders,
            images: imageFiles
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
}

export const getToggleFavorite = async (req, res) => {
    try {
        const { id, mangaName } = req.body

        const user = await User.findOne({ _id: id })
        if (!user) return res.status(400).send("User not found")

        if (!user.mangaReadProgress) {
            user.mangaReadProgress = [];
        }

        const existingIndex = user.mangaReadProgress.findIndex(item => item.mangaName === mangaName);

        if (existingIndex !== -1) {
            user.mangaReadProgress[existingIndex].favorite = !user.mangaReadProgress[existingIndex].favorite;
        }
        else {
            user.mangaReadProgress.push({
                mangaName,
                lastReadEpisode: 1,
                favorite: true,
            });
        }

        await user.save();

        return res.status(200).send({
            mangaReadProgress: user.mangaReadProgress
        })
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
}

export const getFavorite = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: id })

        res.status(200).send(user.mangaReadProgress)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server Error")
    }
}