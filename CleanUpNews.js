const fs = require('fs/promises')


module.exports = function () {
    fs.readdir('./news').then(data => {
        data.forEach(each => {
            fs.unlink('./news/' + each,)
        })
    })
}