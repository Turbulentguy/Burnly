function notFound(req, res, next) {
    res.status(404).json({
        "status": "error",
        "message": "Not found"
    });
}

export { notFound };