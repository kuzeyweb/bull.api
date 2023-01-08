import CryptoJS from 'crypto-js'
import withProtect from "../../middlewares/withProtect"
import withPermission from "../../middlewares/withPermission"
import { prisma } from "../../prisma/client";
import { respondWithError, respondWithSuccess } from "../../resources/apiResponse";

async function createUser(req, res) {

    const { application } = req.headers;
    const { first_name, last_name, password, email, status } = req.body;

    try {

        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_JS_SECRET_KEY).toString();

        const user = await prisma.users.create({
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                application_id: Number(application),
                password: hashedPassword,
                status: status
            }
        });

        prisma.$disconnect();
        return respondWithSuccess({ res: res, message: 'User created successfully', payload: { user } });
    } catch (err) {
        prisma.$disconnect();
        return respondWithError({ res: res, message: err.message, httpCode: 500 });
    }
}

export default withProtect(withPermission(createUser, "user-create"));