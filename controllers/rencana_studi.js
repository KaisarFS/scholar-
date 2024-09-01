const matkul = require('../database/model').matkul
const rencana_studi = require('../database/model').rencana_studi
const mahasiswa = require('../database/model').mahasiswa
const { get_id } = require('../helpers')
const Validator = require('validatorjs')
async function stores(req, res) {
    let { id_mahasiswa, id_matkul } = req.body
    let validation = new Validator({ id_mahasiswa, id_matkul }, { id_mahasiswa: "required|numeric|cek_mahasiswa", id_matkul: "required|numeric|cek_matkul", }, {});
    Validator.registerAsync(
        "cek_matkul",
        async function (id, attribute, req, passes) {
            try {
                let findOne = await matkul.findOne({ where: { id } })
                if (!findOne) {
                    passes(false, "matkul not found");
                }
                let countAvailable = await rencana_studi.count({ where: { id_matkul: id_matkul } })
                if (countAvailable >= 4) {
                    passes(false, "matkul is full");
                }
                passes(true);
            } catch (err) {
                passes(false, err.message);
            }
        }
    );

    Validator.registerAsync(
        "cek_mahasiswa",
        async function (id, attribute, req, passes) {
            try {
                let findOne = await mahasiswa.findOne({ where: { id } })
                if (!findOne) {
                    passes(false, "mahasiswa not found");
                }
                let countAvailable = await rencana_studi.count({ where: { id_mahasiswa: id_mahasiswa } })
                if (countAvailable >= 3) {
                    passes(false, "Matkul mahasiswa has full");
                }
                passes(true);
            } catch (err) {
                passes(false, err.message);
            }
        }
    );

    validation.checkAsync(
        async () => {
            try {
                const id = get_id()
                await rencana_studi.create({ id, id_mahasiswa, id_matkul })
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


async function lists(req, res) {
    let { page = 1, limit = 10 } = req.query;

    let validation = new Validator({ page, limit }, {
        page: 'numeric|min:1',
        limit: 'numeric|min:1',
    });

    validation.checkAsync(
        async () => {
            try {
                page = parseInt(page);
                limit = parseInt(limit);
                const offset = (page - 1) * limit;

                const { rows: data, count: totalItems } = await rencana_studi.findAndCountAll({
                    offset,
                    limit,
                    include: [
                        {
                            model: mahasiswa,
                            attributes: ['id', 'name'],
                        },
                        {
                            model: matkul,
                            attributes: ['id', 'name'],
                        }
                    ]
                });

                const groupedData = data.reduce((result, item) => {
                    const { id_mahasiswa, mahasiswa, matkul } = item;

                    if (!result[id_mahasiswa]) {
                        result[id_mahasiswa] = {
                            id: id_mahasiswa,
                            name: mahasiswa.name,
                            matkul: []
                        };
                    }

                    result[id_mahasiswa].matkul.push({
                        id: matkul.id,
                        name: matkul.name
                    });

                    return result;
                }, {});

                const responseData = Object.values(groupedData);

                const totalPages = Math.ceil(totalItems / limit);

                return res.status(200).json({
                    data: responseData,
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


module.exports = { stores, lists }