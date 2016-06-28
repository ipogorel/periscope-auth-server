

function _s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

exports.createGuid = function () {
    return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' +
        _s4() + '-' + _s4() + _s4() + _s4();
}
