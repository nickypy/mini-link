const utils = {
    addHttp: function (url) {
        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
        }
        return url;
    }
}

module.exports = utils;