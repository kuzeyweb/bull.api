import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import slugify from "slugify";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function updateStore(req, res) {

    const { id } = req.query;
    const { name, slug, banner, icon, status } = req.body;

    //processing the data
    let data = {};
    if (name && slug) { data.name = name; data.slug = slugify(slug) }
    else if (name && !slug) { data.name = name; data.slug = slugify(name) }
    else if (!name && slug) { data.slug = slugify(slug) };
    if (banner) data.banner = banner;
    if (icon) data.icon = icon;
    if (status) data.status = status;

    if (!id)
        return respondWithError({ res: res, message: 'Id parameter can not be empty', httpCode: 401 });

    try {
        const store = await prisma.stores.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        return respondWithSuccess({ res: res, message: 'Store updated successfully', payload: { store: store } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateStore, "stores-update"))
