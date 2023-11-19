async function adminGetData(req, res) {
    const body = req.body;
    const user = body?.user;
    const doc = await DBInstance.getData('urls');
    if (doc) {
        const result = await doc.where({ user: user.username })
        const data = result.map(item => {
            return {
                url: item.url,
                title: item.title,
                keyword: item.keyword,
                icon: item.icon
            }
        })
        res.json({ status: 1, data })
        return;
    }
    res.json({ status: 0 })

}
async function adminAddURL(req, res) {
    const body = req.body
    // const userId = Buffer.from(body?.user?.token, 'base64').toString('hex');
    const username = body?.user?.username
    let keyword = body.keyword;
    if (keyword == "") {
        keyword = makeKeyword()
    }
    const links = {
        user: username,
        url: body?.url,
        title: body?.title,
        keyword,
        icon: body?.icon
    }
    console.log(links);
    const doc = await DBInstance.addDocument('urls')
    if (doc) {
        const result = await doc.One(links);
        if (result.acknowledged) {
            res.json({ status: 1 })
            return;
        }
        res.json({ status: 0 })
    }
}
async function adminVerifyKeyword(req, res) {
    const keyword = req.params.keyword
    const DB = await DATABASE.getData('urls')
    if (DB) {
        const response = await DB.where({ keyword })
        if (response.length > 0) {
            res.json({ status: 0, data: response[0] })
        } else {
            res.json({ status: 1 })
        }
        return;
    }
    res.json({ status: 0 })
}
module.exports = {
    adminGetData,
    adminAddURL,
    adminVerifyKeyword
}