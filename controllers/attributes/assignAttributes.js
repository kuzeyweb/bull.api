import withProtect from "../../middlewares/withProtect";
import withPermission from "../../middlewares/withPermission";
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function assignAttributes(req, res) {

    const { attribute_ids, category_id } = req.body;

    try {
        const attributes = await prisma.attributes.findMany({
            select: {
                id: true
            }
        });
        // if the request has invalid role ids, getting only valid ones to a variable
        const attributeIds = attributes.map((rl) => rl.id);
        const availableAttributes = attribute_ids?.filter((id) => attributeIds.includes(id)) ?? [];
        const result = availableAttributes.map((rl) => ({ category_id: Number(category_id), attribute_id: Number(rl) }));

        if (availableAttributes.length < 1)
            return respondWithError({ res: res, message: "Invalid attribute id", httpCode: 404 })

        await prisma.category_has_attributes.deleteMany({
            where: {
                OR: result
            }
        })

        await prisma.category_has_attributes.createMany({
            data: result
        });

        await prisma.category_has_attributes.deleteMany({
            where: {
                OR: {
                    category_id: category_id
                },
                NOT: result,
            }
        });
        prisma.$disconnect();
        if (!attribute_ids.every((val, index) => val === availableAttributes[index]))
            return respondWithSuccess({ res: res, message: "The request contains attributes that do not exist. Only valid ones were assigned." })

        return respondWithSuccess({ res: res, message: "Attributes assigned successfully" })
    } catch (err) {
        prisma.$disconnect();
        if (err.meta?.field_name === 'category_id')
            return respondWithError({ res: res, message: "Requested category is not found", httpCode: 404 });
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(assignAttributes, "attribute-assign"))
