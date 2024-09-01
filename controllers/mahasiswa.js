const db = require('../database/model')
const Mahasiswa = db.mahasiswa
const { get_id } = require('../helpers')
const Validator = require('validatorjs')
async function stores(req, res) {
    let { name } = req.body
    let validation = new Validator({ name }, { name: "required|string", }, {});
    validation.checkAsync(
        async () => {
            try {
                let { name } = req.body
                let id = get_id()
                await Mahasiswa.create({ id, name })
                return res.status(200).json({ message: 'success' })
            } catch (err) {
                return res.status(500).json({ message: err.message })
            }
        },
        () => {
            let message = [];
            for (var key in validation.errors.all()) {
                var value = validation.errors.all()[key];
                message.push(value[0]);
            }
            return res.status(401).json({ message });
        });
}

async function info(req, res) {
    let { id } = req.query
    let validation = new Validator({ id }, { name: "required|numeric", }, {});
    validation.checkAsync(
        async () => {
            try {
                let data = await Mahasiswa.findOne({ where: { id } })
                if (!data) {
                    return res.status(404).json({ message: 'data not found' })
                }
                return res.status(200).json({ data })
            } catch (err) {
                return res.status(500).json({ message: err.message })
            }
        },
        () => {
            let message = [];
            for (var key in validation.errors.all()) {
                var value = validation.errors.all()[key];
                message.push(value[0]);
            }
            return res.status(401).json({ message });
        });
}

async function lists(req, res) {
    let { page = 1, limit = 10 } = req.query;
    const rules = {
        page: 'numeric|min:1',
        limit: 'numeric|min:1',
    };

    const validation = new Validator({ page, limit }, rules);

    validation.checkAsync(
        async () => {
            try {
                page = parseInt(page);
                limit = parseInt(limit);

                const offset = (page - 1) * limit;
                const { rows: data, count: totalItems } = await Mahasiswa.findAndCountAll({
                    offset,
                    limit,
                });

                const totalPages = Math.ceil(totalItems / limit);
                return res.status(200).json({
                    data,
                    pagination: {
                        totalItems,
                        totalPages,
                        currentPage: page,
                        itemsPerPage: limit,
                    },
                });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        },
        () => {
            let message = [];
            for (let key in validation.errors.all()) {
                let value = validation.errors.all()[key];
                message.push(value[0]);
            }
            return res.status(400).json({ message });
        }
    );
}


async function deleteMahasiswa(req, res) {
    let { id } = req.query; 
    let validation = new Validator({ id }, { id: "required|numeric" });
    validation.checkAsync(
        async () => {
            try {
                const mahasiswa = await Mahasiswa.findOne({ where: { id } });
                if (!mahasiswa) {
                    return res.status(404).json({ message: 'data not found' });
                }
                await Mahasiswa.destroy({ where: { id } });
                return res.status(200).json({ message: 'successfully deleted' });
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        },
        () => {
            let message = [];
            for (let key in validation.errors.all()) {
                let value = validation.errors.all()[key];
                message.push(value[0]);
            }
            return res.status(401).json({ message });
        }
    );
}



module.exports = { stores, lists, info, deleteMahasiswa }