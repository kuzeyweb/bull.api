import withProtect from "../../middlewares/withProtect";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

function createCategories(categories, parent_id = null) {
    const categoryList = [];
    let category;

    if (parent_id == null) {
        category = categories.filter(cat => cat.parent_id == undefined);
    } else {
        category = categories.filter(cat => cat.parent_id == parent_id);
    }

    for (let cate of category) {
        categoryList.push({
            id: cate.id,
            name: cate.name,
            slug: cate.slug,
            description: cate.description,
            subCategories: createCategories(categories, cate.id)
        });
    }
    return categoryList;
}

async function getCategories(req, res) {

    const { application } = req.headers;

    try {
        const categories = await prisma.categories.findMany({
            where: {
                application_id: Number(application)
            }
        });

        const payload = createCategories(categories);

        return respondWithSuccess({ res: res, message: "Categories listed successfully", payload: { categories: payload } })

    } catch (err) {
        return respondWithError({ res: res, message: res.message, httpCode: 500 });
    }
}

export default withProtect(getCategories);
