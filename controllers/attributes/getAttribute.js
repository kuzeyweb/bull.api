import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function getAttribute(req, res) {
    const { id } = req.params;

    try {
        const attributes = await prisma.category_has_attributes.findMany({
            where: {
                category_id: Number(id)
            },
            select: {
                attributes: true
            }
        });

        const iteratedAttrs = attributes.map((attr) => ({ ...attr.attributes }))
        const groupedAttributes = iteratedAttrs.reduce((acc, attribute) => {
            if (attribute.parent_id === null) {
                acc[attribute.id] = {
                    ...attribute,
                    subAttributes: []
                };
            } else {
                acc[attribute.parent_id].subAttributes.push(attribute);
            }
            return acc;
        }, {});

        return respondWithSuccess({ res: res, message: 'Attributes listed successfully', payload: { attributes: groupedAttributes } });
    } catch (err) {
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(getAttribute, "attribute-read"))

