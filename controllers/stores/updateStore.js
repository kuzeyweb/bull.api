import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import slugify from "slugify";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";
import fs from 'fs';

async function updateStore(req, res) {

    if (req.files) {
        req.files.icon && (req.body.icon = `${process.env.CDN_URL}${req.files?.icon[0]?.filename}`)
        req.files.banner && (req.body.banner = `${process.env.CDN_URL}${req.files?.banner[0]?.filename}`)
    }

    const { id } = req.params;
    const { name, slug, banner, icon, status } = req.body;

    if (!id)
        return respondWithError({ res: res, message: 'Id parameter can not be empty', httpCode: 401 });

    //processing the data
    let data = {};
    if (name && slug) { data.name = name; data.slug = slugify(slug) }
    else if (name && !slug) { data.name = name; data.slug = slugify(name) }
    else if (!name && slug) { data.slug = slugify(slug) };
    if (banner) data.banner = banner;
    if (icon) data.icon = icon;
    if (status) data.status = status;

    const currentStore = await prisma.stores.findFirst({
        where: {
            id: Number(id)
        },
    });

    try {
        const store = await prisma.stores.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        if (currentStore?.banner || currentStore?.icon) {
            if (currentStore.banner && banner)
                fs.unlink(`./uploads/${currentStore.banner.split('/').pop()}`, err => {
                    if (err) {
                        console.error(err);
                    }
                });
            if (currentStore?.icon && icon)
                fs.unlink(`./uploads/${currentStore.icon.split('/').pop()}`, err => {
                    if (err) {
                        console.error(err);
                    }
                });
        }

        return respondWithSuccess({ res: res, message: 'Store updated successfully', payload: { store: store } });
    } catch (err) {
        if (req.files?.icon)
            fs.unlink(`./uploads/${req.files.icon[0]?.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        if (req.files?.banner)
            fs.unlink(`./uploads/${req.files.banner[0]?.filename}`, err => {
                if (err) {
                    console.error(err);
                }
            });
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateStore, "store-update"))
