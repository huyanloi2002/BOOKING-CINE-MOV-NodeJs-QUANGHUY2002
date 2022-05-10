import { use } from "express/lib/application";
import res from "express/lib/response";
import db from "../models";
import filmService from "../services/filmService"

let handleGetAllFilms = async (req, res) => {
    try {
        let films = await filmService.getAllFilms();
        return res.status(200).json(films)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server',
        })
    }

}
let handleGetTopFilms = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await filmService.getTopFilms(+limit)//convert string to number (limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        })
    }
}
let handleCreateNewFilm = async (req, res) => {
    let message = await filmService.createNewFilm(req.body);
    return res.status(200).json(message);
}
let handleEditFilm = async (req, res) => {
    let message = await filmService.updateFilm(req.body);
    return res.status(200).json(message);
}
let handleDeleteFilm = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required paramaters!"
        })
    }
    let message = await filmService.deleteFilm(req.body.id);
    return res.status(200).json(message);
}
let handleSaveInforFilm = async (req, res) => {
    try {
        let response = await filmService.saveInforFilm(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing required parameters'
        })
    }
}
let handleGetInforFilmById = async (req, res) => {
    try {
        let infor = await filmService.getInforFilmById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}
let handleGetMarkdownInforFilm = async (req, res) => {
    try {
        let markdown = await filmService.getMarkdownInforFilm(req.query.filmId);
        return res.status(200).json(markdown)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}
let handleGetBanner = async (req, res) => {
    try {
        let banner = await filmService.getBannerFilm(req.query.filmId);
        return res.status(200).json(banner)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}
let handleAllBanner = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await filmService.getBannerFilms(+limit)//convert string to number (limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...',
        })
    }
}
let handleSaveBanner = async (req, res) => {
    try {
        let response = await filmService.saveBannerFilm(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing required parameters'
        })
    }
}
//News
let handleGetTopNews = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await filmService.getTopNews(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetAllNews = async (req, res) => {
    try {
        let newss = await filmService.getAllNews();
        return res.status(200).json(newss)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleCreateNews = async (req, res) => {
    let message = await filmService.createNews(req.body);
    return res.status(200).json(message);
}
let handleEditNews = async (req, res) => {
    let message = await filmService.updateNews(req.body);
    return res.status(200).json(message);
}
let handleDeleteNews = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required paramaters!"
        })
    }
    let message = await filmService.deleteNews(req.body.id);
    return res.status(200).json(message);
}
module.exports = {

    handleGetAllFilms: handleGetAllFilms,
    handleCreateNewFilm: handleCreateNewFilm,
    handleEditFilm: handleEditFilm,
    handleDeleteFilm: handleDeleteFilm,
    handleGetTopFilms: handleGetTopFilms,
    handleSaveInforFilm: handleSaveInforFilm,
    handleGetInforFilmById: handleGetInforFilmById,
    handleGetMarkdownInforFilm: handleGetMarkdownInforFilm,
    handleGetBanner: handleGetBanner,
    handleSaveBanner: handleSaveBanner,
    handleAllBanner: handleAllBanner,
    handleGetTopNews: handleGetTopNews,
    handleGetAllNews: handleGetAllNews,
    handleCreateNews: handleCreateNews,
    handleEditNews: handleEditNews,
    handleDeleteNews: handleDeleteNews,
    // getAllCode: getAllCode,
}