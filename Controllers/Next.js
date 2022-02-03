
exports.getItems = (req, res, next) => {
    res.status(200).json([
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
    ]);
}

exports.getUserInfo = (req, res, next) => {

    const id = req.params.id;
    const search = req.query.search;

    console.log(id);
    console.log(search);

    res.status(200).json({
        id: id,
        name: search + ' Doe',
        phone: '1198986565'
    }) 
}
