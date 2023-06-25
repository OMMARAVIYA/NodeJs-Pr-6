const CrudTbl = require('../models/Crudtbl');

const fs = require('fs')

const index = async (req, res) => {
    try {
        let data = await CrudTbl.find({});
        if (data) {
            return res.render('form', {
                data,
                single: ""
            });
        }
        else {
            console.log("Data Not Found");
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const AddData = async (req, res) => {
    try {
        const { editid, name, description } = req.body;
        if (editid) {
            if (req.file) {
                if (!name || !description) {
                    console.log("Please Fill All Data");
                    return res.redirect('back');
                }
                else {
                    let dltimg = await CrudTbl.findById(editid)
                    if (dltimg) {
                        fs.unlinkSync(dltimg.image);
                    }
                    else {
                        console.log("image not unlink");
                        return res.redirect('back')
                    }
                    let image = "";
                    if (req.file) {
                        image = req.file.path;
                    }
                    let editdata = await CrudTbl.findByIdAndUpdate(editid, {
                        name: name,
                        description: description,
                        image: image
                    })
                    if (editdata) {
                        console.log("Data Updated");
                        return res.redirect('/');
                    }
                    else {
                        console.log("Data not Updated");
                        return false;
                    }
                }
            }
            else {
                let image = "";
                let singledata = await CrudTbl.findById(editid);
                if (singledata) {
                    image = singledata.image;
                    if (!name || !description || !image) {
                        console.log("Please Fill All Data");
                        return res.redirect('back');
                    }
                    let editdata = await CrudTbl.findByIdAndUpdate(editid, {
                        name: name,
                        description: description,
                        image: image
                    })
                    if (editdata) {
                        console.log("Data Updated");
                        return res.redirect('/');
                    }
                    else {
                        console.log("Data not Updated");
                        return false;
                    }
                }
                else {
                    console.log("Data not Found");
                    return res.redirect('back');
                }
            }
        }
        else {
            let image = "";
            if (req.file) {
                image = req.file.path;
            }
            if (!name || !description || !image) {
                console.log("Please Fill All Data");
                return res.redirect('back');
            }
            let data = await CrudTbl.create({
                name: name,
                description: description,
                image: image
            })
            if (data) {
                console.log("Blog Successfully Inserted");
                return res.redirect('/');
            }
            else {
                console.log(err);
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const DeleteData = async (req, res) => {
    try {
        let id = req.query.id;
        let dltimg = await CrudTbl.findById(id)
        if (dltimg) {
            fs.unlinkSync(dltimg.image)
        }
        else {
            console.log("image not delete");
            return res.redirect('/')
        }
        let dledata = await CrudTbl.findByIdAndDelete(id)
        if (dledata) {
            console.log("Blog Deleted");
            return res.redirect('/');
        }
        else {
            console.log("Blog Not Deleted");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const EditData = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await CrudTbl.findById(id);
        let alldata = await CrudTbl.find({});
        if (single) {
            return res.render('form', {
                single,
                data: alldata
            })
        }
        else {
            console.log("Data Not Found");
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    index,
    AddData,
    DeleteData,
    EditData
}