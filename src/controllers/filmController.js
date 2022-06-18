import { use } from "express/lib/application";
import req from "express/lib/request";
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
let handleGetNowComingMovies = async (req, res) => {
    try {
        let response = await filmService.getMoviesNowAndComing(req.query.showId)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server...!"
        })
    }
}
//
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
        let responses = await filmService.saveBannerFilm(req.body);
        return res.status(200).json(responses)
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
    try {
        let message = await filmService.createNews(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing required parameters'
        })
    }
}
let handleEditNews = async (req, res) => {
    try {
        let message = await filmService.updateNews(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing required parameters'
        })
    }
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
//Contact Us
let handleGetContactUs = async (req, res) => {
    try {
        let getContact = await filmService.getAllContactUs();
        return res.status(200).json(getContact)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Missing requied parameter !'
        })
    }
}
let handleCreateContactUs = async (req, res) => {
    try {
        let response = await filmService.createContactUs(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Missing required parameters"
        })
    }
}
//Booking Time
let handleBulkCreateTimeBooking = async (req, res) => {
    try {
        let response = await filmService.createBulkTimeBooking(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetBookingTimeByDate = async (req, res) => {
    try {
        let response = await filmService.getBookingTimeByDate(req.query.filmId, req.query.date, req.query.cinemaTech);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetBookingTimeBySeat = async (req, res) => {
    try {
        let response = await filmService.getBookingTimeBySeat(req.query.filmId, req.query.date, req.query.cinemaTech, req.query.timeType);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetBookingTimeByPrice = async (req, res) => {
    try {
        let response = await filmService.getBookingTimeByPrice(req.query.filmId, req.query.date, req.query.cinemaTech, req.query.timeType, req.query.seat);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
//Cinema-Tech
let handleCreateCinemaTech = async (req, res) => {
    try {
        let response = await filmService.createCinemaTech(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleGetAllCinemaTech = async (req, res) => {
    try {
        let response = await filmService.getCinemaTech();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleEditCinemaTech = async (req, res) => {
    try {
        let response = await filmService.editCinemaTech(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let handleDeleteCinemaTech = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required paramaters!"
        })
    }
    let response = await filmService.deleteCinemaTech(req.body.id);
    return res.status(200).json(response);
}
//Buy combo
let handleCreateBuyCombo = async (req, res) => {
    try {
        let response = await filmService.createBuyCombo(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from server...!'
        })
    }
}
let handleGetBuyCombo = async (req, res) => {
    try {
        let response = await filmService.getBuyCombo();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server..!'
        });
    }
}
let handleEditBuyCombo = async (req, res) => {
    try {
        let response = await filmService.editBuyCombo(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from server...'
        })
    }
}
let handleDeleteBuyCombo = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required paramaters!"
        })
    }
    let response = await filmService.deleteBuyCombo(req.body.id);
    return res.status(200).json(response);
}
let handleGetBuyComboById = async (req, res) => {
    try {
        let infor = await filmService.getBuyComboById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server ...'
        })
    }
}
//payment-types
let handleGetAllPaymentTypes = async (req, res) => {
    try {
        let response = await filmService.getAllPaymentTypes()
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...!'
        })
    }
}
let handleCreatePaymentTypes = async (req, res) => {
    try {
        let response = await filmService.createPaymentType(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from server...!'
        })
    }
}
//price
let handleGetAllPrice = async (req, res) => {
    try {
        let response = await filmService.getAllPrice()
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...!'
        })
    }
}
module.exports = {

    handleGetAllFilms: handleGetAllFilms,
    handleCreateNewFilm: handleCreateNewFilm,
    handleEditFilm: handleEditFilm,
    handleDeleteFilm: handleDeleteFilm,
    handleGetTopFilms: handleGetTopFilms,
    handleSaveInforFilm: handleSaveInforFilm,
    handleGetInforFilmById: handleGetInforFilmById,
    handleGetNowComingMovies: handleGetNowComingMovies,
    //
    handleGetMarkdownInforFilm: handleGetMarkdownInforFilm,
    handleGetBanner: handleGetBanner,
    handleSaveBanner: handleSaveBanner,
    handleAllBanner: handleAllBanner,
    handleGetTopNews: handleGetTopNews,
    handleGetAllNews: handleGetAllNews,
    handleCreateNews: handleCreateNews,
    handleEditNews: handleEditNews,
    handleDeleteNews: handleDeleteNews,
    handleCreateContactUs: handleCreateContactUs,
    handleGetContactUs: handleGetContactUs,
    // handleDeleteContactUs: handleDeleteContactUs,
    handleBulkCreateTimeBooking: handleBulkCreateTimeBooking,
    handleGetBookingTimeByDate: handleGetBookingTimeByDate,
    handleGetBookingTimeBySeat: handleGetBookingTimeBySeat,
    handleGetBookingTimeByPrice: handleGetBookingTimeByPrice,
    //cinema-tech
    handleCreateCinemaTech: handleCreateCinemaTech,
    handleGetAllCinemaTech: handleGetAllCinemaTech,
    handleEditCinemaTech: handleEditCinemaTech,
    handleDeleteCinemaTech: handleDeleteCinemaTech,
    //buy-combo
    handleCreateBuyCombo: handleCreateBuyCombo,
    handleGetBuyCombo: handleGetBuyCombo,
    handleEditBuyCombo: handleEditBuyCombo,
    handleDeleteBuyCombo: handleDeleteBuyCombo,
    //payment-types
    handleGetAllPaymentTypes: handleGetAllPaymentTypes,
    handleCreatePaymentTypes: handleCreatePaymentTypes,
    //price
    handleGetAllPrice: handleGetAllPrice,
    handleGetBuyComboById: handleGetBuyComboById

}