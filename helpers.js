function get_id() {
    return Math.floor(Date.now() * Math.random());
}

module.exports = { get_id }