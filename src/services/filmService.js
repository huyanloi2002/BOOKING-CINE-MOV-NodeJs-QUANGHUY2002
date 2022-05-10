import { reset } from "nodemon";
import db from "../models/index"


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
let getNowShowingFilm = () => {

}
let getTopFilms = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let films = await db.Film.findAll({
                // where :{genreId:'G0'} sap xep phim theo the loai
                limit: limitInput,
                order: [['createdAt', 'DESC']],
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
                showId: data.showId
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
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Film, attributes: ['nameVi', 'nameEn'] },
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
module.exports = {
    getAllFilms: getAllFilms,
    createNewFilm: createNewFilm,
    deleteFilm: deleteFilm,
    updateFilm: updateFilm,
    getTopFilms: getTopFilms,
    saveInforFilm: saveInforFilm,
    getInforFilmById: getInforFilmById,
    getMarkdownInforFilm: getMarkdownInforFilm,
    getBannerFilm: getBannerFilm,
    saveBannerFilm: saveBannerFilm.apply,
    getBannerFilms: getBannerFilms,
    getTopNews: getTopNews,
    getAllNews: getAllNews,
    updateNews: updateNews,
    createNews: createNews,
    deleteNews: deleteNews


}