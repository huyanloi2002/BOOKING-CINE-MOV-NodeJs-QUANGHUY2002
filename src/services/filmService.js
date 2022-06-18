import db from "../models/index"
require('dotenv').config();
import _, { reject } from 'lodash';
import schedule from "../models/schedule";
import raw from "body-parser/lib/types/raw";
import res from "express/lib/response";

const MAX_NUMBER_BOOKING_TIME = process.env.MAX_NUMBER_BOOKING_TIME;

let getAllFilms = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let films = await db.Film.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'genreData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'showData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: films
            })
        } catch (e) {
            reject(e);
        }
    })
}
// let getNowShowingFilm = () => {

// }
let getMoviesNowAndComing = (showIdInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!showIdInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters !"
                })
            } else {
                let movies = await db.Film.findAll({
                    where: { showId: showIdInput },
                    order: [['createdAt', 'DESC']],
                    include: [
                        { model: db.Allcode, as: 'genreData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'showData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: true,
                    nest: true,
                });
                resolve({
                    errCode: 0,
                    data: movies
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getTopFilms = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let films = await db.Film.findAll({
                // where :{genreId:'G0'} sap xep phim theo the loai
                limit: limitInput,
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'genreData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'showData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true,
            })

            resolve({
                errCode: 0,
                data: films
            })
        } catch (e) {
            reject(e);
        }
    })
}
let createNewFilm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Film.create({
                nameVi: data.nameVi,
                nameEn: data.nameEn,
                image: data.avatar,
                genreId: data.genreId,
                showId: data.showId,
                director: data.director,
                actor: data.actor,
                dayShow: data.dayShow,
                duration: data.duration,
                language: data.language,
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })

        } catch (e) {
            reject(e);
        }
    })
}
let deleteFilm = (filmId) => {
    return new Promise(async (resolve, reject) => {
        let foundFilm = await db.Film.findOne({
            where: { id: filmId }
        })
        if (!foundFilm) {
            resolve({
                errCode: 2,
                errMessage: `The film isn't exist`
            })
        }
        await db.Film.destroy({
            where: { id: filmId }
        })
        resolve({
            errCode: 0,
            errMessage: `The film is deleted`
        })

    })
}
let updateFilm = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let film = await db.Film.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (film) {
                film.nameVi = data.nameVi;
                film.nameEn = data.nameEn;
                film.genreId = data.genreId;
                film.showId = data.showId;
                film.director = data.director;
                film.actor = data.actor;
                film.dayShow = data.dayShow;
                film.duration = data.duration;
                film.language = data.language;
                if (data.avatar) {
                    film.image = data.avatar;
                }
                await film.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the film succeeds'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `Film not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let saveInforFilm = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.filmId || !inputData.contentHTML
                || !inputData.contentMarkdown || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        filmId: inputData.filmId
                    })
                } else if (inputData.action === 'EDIT') {
                    let FilmMarkdown = await db.Markdown.findOne({
                        where: { filmId: inputData.filmId },
                        raw: false
                    })
                    if (FilmMarkdown) {
                        FilmMarkdown.contentHTML = inputData.contentHTML;
                        FilmMarkdown.contentMarkdown = inputData.contentMarkdown;
                        FilmMarkdown.description = inputData.description;
                        await FilmMarkdown.save()
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor succeed !',

                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getMarkdownInforFilm = (inputInforId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputInforId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Markdown.findOne({
                    where: {
                        filmId: inputInforId,
                    }
                })
                if (!data) data = ''
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getInforFilmById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            }
            else {
                let data = await db.Film.findOne({
                    where: {
                        id: inputId,
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'genreData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer.from(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let saveBannerFilm = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.filmId || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.Banner.create({
                        imagebanner: inputData.imagebanner,
                        description: inputData.description,
                        filmId: inputData.filmId
                    })
                } else if (inputData.action === 'EDIT') {
                    let Banners = await db.Banner.findOne({
                        where: { filmId: inputData.filmId },
                        raw: false
                    })
                    if (Banners) {
                        Banners.description = inputData.description;
                        if (inputData.imagebanner) {
                            Banners.imagebanner = inputData.imagebanner

                        }
                        await Banners.save()
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor succeed !',

                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getBannerFilm = (inputBannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputBannerId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Banner.findOne({
                    where: {
                        filmId: inputBannerId,
                    }
                })
                if (!data) data = ''
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getBannerFilms = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banners = await db.Banner.findAll({
                // where :{genreId:'G0'} sap xep phim theo the loai
                limit: limitInput,
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: db.Film, attributes: ['nameVi', 'nameEn', 'showId'] },
                ],
                raw: true,
                nest: true,
            })

            resolve({
                errCode: 0,
                data: banners
            })
        } catch (e) {
            reject(e);
        }
    })
}

//NEWS
let getTopNews = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.New.findAll({
                limit: limitInput,
                order: [['updatedAt', 'DESC']],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: news
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getAllNews = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let news = await db.New.findAll({
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                data: news
            })
        } catch (e) {
            reject(e)
        }
    })
}
let createNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.New.create({
                contentHTML: data.contentHTML,
                contentMarkdown: data.contentMarkdown,
                description: data.description,
                imageNew: data.imageNew,
                imageAuthor: data.imageAuthor,
                nameAuthor: data.nameAuthor
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })

        } catch (e) {
            reject(e);
        }
    })
}
let deleteNews = (newsId) => {
    return new Promise(async (resolve, reject) => {
        let foundNews = await db.New.findOne({
            where: { id: newsId }
        })
        if (!foundNews) {
            resolve({
                errCode: 2,
                errMessage: `The film isn't exist`
            })
        }
        await db.New.destroy({
            where: { id: newsId }
        })
        resolve({
            errCode: 0,
            errMessage: `The film is deleted`
        })

    })
}
let updateNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let newss = await db.New.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (newss) {
                newss.contentHTML = data.contentHTML,
                    newss.contentMarkdown = data.contentMarkdown,
                    newss.description = data.description,
                    newss.nameAuthor = data.nameAuthor
                if (data.imageNew) {
                    newss.imageNew = data.imageNew;
                }
                if (data.imageAuthor) {
                    newss.imageAuthor = data.imageAuthor;
                }
                await newss.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the film succeeds'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `Film not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
//CONTACT US
let getAllContactUs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let contacts = await db.ContactUs.findAll({
                order: [['updatedAt', 'DESC']],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 1,
                data: contacts
            })
        } catch (e) {
            reject(e)
        }
    })
}
let createContactUs = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: "Invalid email !"
                })

            } else if (!data.messages) {
                resolve({
                    errCode: 2,
                    errMessage: "Invalid message !"
                })
            }
            else {
                await db.ContactUs.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    messages: data.messages,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create a new message succeed !'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
//BOOKING_TIME
let createBulkTimeBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrBookingTime
                || !data.filmId
                || !data.formatedDate
                || !data.cinemaTech
                || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let bookingTime = data.arrBookingTime;
                if (bookingTime && bookingTime.length > 0) {
                    bookingTime = bookingTime.map(item => {
                        item.maxNumber = MAX_NUMBER_BOOKING_TIME;
                        return item;
                    })
                }
                // get data da ton tai
                let existing = await db.Schedule.findAll({
                    where: {
                        filmId: data.filmId,
                        date: data.formatedDate,
                        cinemaTech: data.cinemaTech,
                        timeType: data.timeType
                    },
                    attributes: ['timeType', 'date', 'filmId', 'maxNumber', 'cinemaTech', 'price', 'seat', 'seatType'],
                    raw: true,
                })
                //check data truyen len co giong voi data cu
                let toCreate = _.differenceWith(bookingTime, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date && a.cinemaTech === b.cinemaTech && a.price === b.price && a.seat === b.seat && a.seatType === b.seatType;
                });
                //tao data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })

            }

        } catch (e) {
            reject(e)
        }
    })
}
let getBookingTimeByDate = (filmId, date, cinemaTech) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!filmId && !date && !cinemaTech) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let dataTime = await db.Schedule.findAll({
                    where: {
                        filmId: filmId,
                        date: date,
                        cinemaTech: cinemaTech,
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Price, as: 'priceDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'seatDataAll', attributes: ['valueEn', 'valueVi'] },
                    ],
                    nest: true,
                    raw: false
                })
                if (!dataTime) dataTime = [];
                resolve({
                    errCode: 0,
                    dataTime: dataTime
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getBookingTimeBySeat = (filmId, date, cinemaTech, timeType) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!filmId && !date && !cinemaTech && !timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let dataSeat = await db.Schedule.findAll({
                    where: {
                        filmId: filmId,
                        date: date,
                        cinemaTech: cinemaTech,
                        timeType: timeType
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Price, as: 'priceDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'seatDataAll', attributes: ['valueEn', 'valueVi'] },
                    ],
                    nest: true,
                    raw: false
                })
                if (!dataSeat) dataSeat = [];
                resolve({
                    errCode: 0,
                    dataSeat: dataSeat
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getBookingTimeByPrice = (filmId, date, cinemaTech, timeType, seat) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!filmId && !date && !cinemaTech && !timeType && !seat) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let dataPrice = await db.Schedule.findAll({
                    where: {
                        filmId: filmId,
                        date: date,
                        cinemaTech: cinemaTech,
                        timeType: timeType,
                        seat: seat,
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Price, as: 'priceDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'seatDataAll', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'seatTypeDataAll', attributes: ['valueEn', 'valueVi'] },
                    ],
                    nest: true,
                    raw: false
                })
                if (!dataPrice) dataPrice = [];
                resolve({
                    errCode: 0,
                    dataPrice: dataPrice
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
//CINEMA-TECH
let createCinemaTech = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Cinematechnology.create({
                name: data.name,
                description: data.description,
                image: data.image
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getCinemaTech = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let cinematechs = await db.Cinematechnology.findAll({
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['image', 'timeType']
                },
                raw: true,
                nest: true,
            });
            if (!cinematechs) cinematechs = [];
            resolve({
                errCode: 0,
                data: cinematechs
            })
        } catch (e) {
            reject(e);
        }
    })
}
let editCinemaTech = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let cinematechs = await db.Cinematechnology.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (cinematechs) {
                cinematechs.name = data.name,
                    cinematechs.description = data.description
                if (data.image) {
                    cinematechs.image = data.image;
                }
                await cinematechs.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the film succeeds'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `Film not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let deleteCinemaTech = (cinemaTechId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundCinemaTech = await db.Cinematechnology.findOne({
                where: { id: cinemaTechId }
            })
            if (!foundCinemaTech) {
                resolve({
                    errCode: 2,
                    errMessage: `The cinema isn't exist`
                })
            }
            await db.Cinematechnology.destroy({
                where: { id: cinemaTechId }
            })
            resolve({
                errCode: 0,
                errMessage: `The cinema is deleted`
            })
        } catch (e) {
            reject(e)
        }
    })
}
//BUY COMBO
let createBuyCombo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.price) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter !'
                })
            }
            await db.Buycombo.create({
                name: data.name,
                price: data.price,
                description: data.description,
                cout: data.cout,
                image: data.image
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getBuyCombo = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let buycombos = await db.Buycombo.findAll({
                // order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Price, as: 'priceDataCombo', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            });
            if (!buycombos) buycombos = [];
            resolve({
                errCode: 0,
                data: buycombos
            })
        } catch (e) {
            reject(e)
        }
    })
}
let editBuyCombo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter !'
                })
            }
            let buycombos = await db.Buycombo.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (buycombos) {
                buycombos.name = data.name;
                buycombos.price = data.price;
                buycombos.description = data.description;
                if (data.image) {
                    buycombos.image = data.image
                }
                await buycombos.save()
                resolve({
                    errCode: 0,
                    errMessage: 'Update combo succeed !'
                })
            } else {
                resolve({
                    errCode: -2,
                    errMessage: 'Combo not found!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteBuyCombo = (buyComboId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let foundCombos = await db.Buycombo.findOne({
                where: { id: buyComboId }
            })
            if (!foundCombos) {
                resolve({
                    errCode: -2,
                    errMessage: `The combo isn't exist`
                })
            }
            await db.Buycombo.destroy({
                where: { id: buyComboId }
            })
            resolve({
                errCode: 0,
                errMessage: 'Delete combo succeed !'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getBuyComboById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            }
            else {
                let dataCombo = await db.Buycombo.findOne({
                    where: {
                        id: inputId,
                    },
                    include: [
                        { model: db.Price, as: 'priceDataCombo', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })
                if (dataCombo && dataCombo.image) {
                    dataCombo.image = new Buffer.from(dataCombo.image, 'base64').toString('binary');
                }
                if (!dataCombo) dataCombo = {};
                resolve({
                    errCode: 0,
                    dataCombo: dataCombo
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
//payment-types
let getAllPaymentTypes = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let paymenttypes = await db.PaymentType.findAll()
            if (!paymenttypes) paymenttypes = []
            resolve({
                errCode: 0,
                data: paymenttypes
            })
        } catch (e) {
            reject(e)
        }
    })
}
let createPaymentType = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.valueVi || !data.valueEn) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter !'
                })
            }
            await db.PaymentType.create({
                valueVi: data.valueVi,
                valueEn: data.valueEn,
                keyMap: data.keyMap,
                image: data.image
            })
            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
//price
let getAllPrice = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let prices = await db.Price.findAll()
            if (!prices) prices = []
            resolve({
                errCode: 0,
                data: prices
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllFilms: getAllFilms,
    createNewFilm: createNewFilm,
    deleteFilm: deleteFilm,
    updateFilm: updateFilm,
    getTopFilms: getTopFilms,
    getMoviesNowAndComing: getMoviesNowAndComing,
    //
    saveInforFilm: saveInforFilm,
    getInforFilmById: getInforFilmById,
    getMarkdownInforFilm: getMarkdownInforFilm,
    getBannerFilm: getBannerFilm,
    saveBannerFilm: saveBannerFilm,
    getBannerFilms: getBannerFilms,
    getTopNews: getTopNews,
    getAllNews: getAllNews,
    updateNews: updateNews,
    createNews: createNews,
    deleteNews: deleteNews,
    createContactUs: createContactUs,
    getAllContactUs: getAllContactUs,
    createBulkTimeBooking: createBulkTimeBooking,
    getBookingTimeByDate: getBookingTimeByDate,
    getBookingTimeBySeat: getBookingTimeBySeat,
    getBookingTimeByPrice: getBookingTimeByPrice,
    //cinem-tech
    createCinemaTech: createCinemaTech,
    getCinemaTech: getCinemaTech,
    editCinemaTech: editCinemaTech,
    deleteCinemaTech: deleteCinemaTech,
    //Buy combo
    createBuyCombo: createBuyCombo,
    getBuyCombo: getBuyCombo,
    editBuyCombo: editBuyCombo,
    deleteBuyCombo: deleteBuyCombo,
    //Payment-type
    getAllPaymentTypes: getAllPaymentTypes,
    createPaymentType: createPaymentType,
    //Price
    getAllPrice: getAllPrice,
    getBuyComboById: getBuyComboById,


}