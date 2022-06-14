import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import filmController from "../controllers/filmController"
import { route } from "express/lib/router";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    //user
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser); //rest Api
    router.get('/api/allcode', userController.getAllCode);
    //film
    router.get('/api/get-all-films', filmController.handleGetAllFilms);
    router.post('/api/create-new-film', filmController.handleCreateNewFilm);
    router.put('/api/edit-film', filmController.handleEditFilm);
    router.delete('/api/delete-film', filmController.handleDeleteFilm); //rest Api
    router.get('/api/get-top-films', filmController.handleGetTopFilms);

    router.post('/api/save-infor-film', filmController.handleSaveInforFilm);
    router.get('/api/get-infor-film-by-id', filmController.handleGetInforFilmById);
    router.get('/api/get-markdown-infor-film', filmController.handleGetMarkdownInforFilm);
    router.get('/api/get-banner', filmController.handleGetBanner);
    router.post('/api/save-banner', filmController.handleSaveBanner);
    router.get('/api/get-all-banners', filmController.handleAllBanner);
    //news
    router.get('/api/get-top-news', filmController.handleGetTopNews);
    router.get('/api/get-all-news', filmController.handleGetAllNews);
    router.post('/api/create-news', filmController.handleCreateNews);
    router.put('/api/edit-news', filmController.handleEditNews);
    router.delete('/api/delete-news', filmController.handleDeleteNews);
    //contact-us
    router.post('/api/create-contact-us', filmController.handleCreateContactUs);
    router.get('/api/get-contact-us', filmController.handleGetContactUs);
    // router.delete('/api/delete-contact-us', filmController.handleDeleteContactUs)
    //Time-Booking
    router.post('/api/bulk-create-time-booking', filmController.handleBulkCreateTimeBooking);
    router.get('/api/get-booking-time-by-date', filmController.handleGetBookingTimeByDate);
    router.get('/api/get-booking-time-by-seat', filmController.handleGetBookingTimeBySeat);
    router.get('/api/get-booking-time-by-price', filmController.handleGetBookingTimeByPrice)
    //CinemaTech
    router.post('/api/create-cinema-tech', filmController.handleCreateCinemaTech);
    router.get('/api/get-all-cinema-tech', filmController.handleGetAllCinemaTech);
    router.put('/api/edit-cinema-tech', filmController.handleEditCinemaTech);
    router.delete('/api/delete-cinema-tech', filmController.handleDeleteCinemaTech);
    //Buy Combo
    router.post('/api/creat-buy-combo', filmController.handleCreateBuyCombo);
    router.get('/api/get-buy-combo', filmController.handleGetBuyCombo);
    router.put('/api/edit-buy-combo', filmController.handleEditBuyCombo);
    router.delete('/api/delete-buy-combo', filmController.handleDeleteBuyCombo);
    router.get('/api/get-buy-combo-by-id', filmController.handleGetBuyComboById);
    //paymenttype
    router.get('/api/get-all-payment-types', filmController.handleGetAllPaymentTypes);
    router.post('/api/creat-payment-types', filmController.handleCreatePaymentTypes);
    //price 
    router.get('/api/get-all-price', filmController.handleGetAllPrice);

    return app.use("/", router);
}
module.exports = initWebRoutes;