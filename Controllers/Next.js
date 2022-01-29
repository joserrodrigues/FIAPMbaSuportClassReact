
exports.getItems = (req, res, next) => {
    res.status(200).json([
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
    ]);
}
