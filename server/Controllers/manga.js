import anime from '../Models/manga.js'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        const page = Number(req.params.pageNumber) || 1
        const limit = 30
        const skip = (page - 1) * limit

        const shows = await anime.find().skip(skip).limit(limit).exec()
        const total = await anime.countDocuments()

        const lastTotalPage = Math.ceil(total / limit)
        res.status(200).send({
            shows,
            lastTotalPage
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}


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