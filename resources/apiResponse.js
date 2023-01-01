export function respondWithSuccess({ res, message, payload }) {
    res.status(200).send({
        message: message ?? "",
        error: false,
        payload: payload ?? []
    });
};

export function respondWithError({ res, message, httpCode }) {
    res.status(httpCode).send({
        message: message ?? "",
        error: true,
        payload: []
    });
};