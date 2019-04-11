let express = require('express')
let router = express.Router()
let CatalogModel = require('../../models/codekeep/Catalog')
let CodeModel = require('../../models/codekeep/Code')

// 统一返回格式
let responseData;
router.use((req, res, next) => {
	responseData = {
		code: 0,
		message: ''
	}
	next();
})

// 新增目录接口
router.post('/catalog', async (req, res) => {
    // 目录名称
    let name = req.body.name
    if (name === '') {
        responseData.code = 1
        responseData.message = '目录名称不能为空'
        res.send(responseData)
    }
    let isExist = await CatalogModel.find({ name: name })
    if (isExist.length === 0) {
        try {
            let catalog = await CatalogModel.create({ name: name })
            responseData.message = '新建目录成功'
            responseData.data = catalog
        } catch (error) {
            responseData.code = 1
            responseData.message = '数据库写入失败'
        }
    } else {
        responseData.code = 1
        responseData.message = '目录名称已存在'
    }
    res.send(responseData)
})

// 查询目录接口
router.get('/catalog', async (req, res) => {
    try {
        let result = await CatalogModel.aggregate([
            {
                $lookup: {
                    from: 'codes',
                    localField: 'codeList',
                    foreignField: '_id',
                    as: 'children'
                }
            },
            {
                $project: {
                    _id: 0,
                    label: '$name',
                    value: '$_id',
                    children: 1
                }
            }
        ])
        responseData.data = result
    } catch (error) {
        responseData.code = 1
        responseData.message = '代码块目录获取失败'
    }
    res.send(responseData)
})

// 代码块名称唯一性校验
router.post('/uniqueName', async (req, res) => {
    let name = req.body.name
    let codeId = req.body.codeId
    let result = await CodeModel.find({ _id: { $ne: codeId }, name: name })
    if (result.length === 1) {
        responseData.code = 1
        responseData.message = '代码块名称已存在'
    }
    res.send(responseData)
})

// 新增代码块接口
router.post('/code', async (req, res) => {
    // 代码块名称
    let name = req.body.name
    // 目录id
    let pid = req.body.pid
    // 唯一性校验
    let result = await CodeModel.find({ name: name })
    if (result.length === 1) {
        responseData.code = 1
        responseData.message = '代码块名称已存在'
    } else {
        // 代码块数据写入
        try {
            let code = await CodeModel.create({ name: name })
            await CatalogModel.updateOne({ _id: pid }, {
                $push: {
                    codeList: code._id
                }
            })
            responseData.message = '新建代码块成功'
            responseData.data = code
        } catch (error) {
            responseData.code = 1
            responseData.message = '数据库写入失败'
        }
    }
    res.send(responseData)
})

// 删除代码块接口
router.delete('/code/:pid/:id', async (req, res) => {
    // 代码块id
    let pid = req.params.pid
    let codeId = req.params.id
    try {
        await CodeModel.remove({ _id: codeId })
        await CatalogModel.updateOne({ _id: pid }, {
            $pull: {
                codeList: codeId
            }
        })
        responseData.message = '代码块删除成功'
    } catch (error) {
        responseData.code = 1
        responseData.message = '代码块删除失败'
    }
    res.send(responseData)
})

// 修改代码块接口
router.put('/code/:id', async (req, res) => {
    // 代码块id
    let codeId = req.params.id
    // 代码块名称
    let name = req.body.name
    // 代码块描述
    let description = req.body.description
    // 代码块内容
    let content = req.body.content
    try {
        await CodeModel.updateOne({ _id: codeId }, {
            name: name,
            description: description,
            content: content
        })
        responseData.message = '代码块修改成功'
    } catch (error) {
        responseData.code = 1
        responseData.message = '代码块修改失败'
    }
    res.send(responseData)
})

// 查询代码块
router.get('/code/:id', async (req, res) => {
    // 代码块Id
    let codeId = req.params.id
    try {
        let code = await CodeModel.findById(codeId)
        responseData.message = '查询代码块成功'
        responseData.data = code
    } catch (error) {
        responseData.code = 1
        responseData.message = '查询代码块失败'
    }
    res.send(responseData)
})

module.exports = router