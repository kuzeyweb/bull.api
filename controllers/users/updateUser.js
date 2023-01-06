import CryptoJS from 'crypto-js'
import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function updateUser(req, res) {

    const { first_name, last_name, password, email, status } = req.body;
    const { id } = req.params;
    const { application } = req.headers;
    try {

        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_JS_SECRET_KEY).toString();

        const currentUser = await prisma.users.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (currentUser.application_id !== Number(application))
            return respondWithError({ res: res, message: "Forbidden", httpCode: 403 });

        const user = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                status: status
            }
        });

        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'User updated successfully', payload: { user } });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(updateUser, "users-update"));