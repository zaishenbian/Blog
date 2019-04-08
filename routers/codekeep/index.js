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
        res.json(responseData)
    }
    let isExist = await CatalogModel.find({ name: name })
    if (isExist.length === 0) {
        try {
            await CatalogModel.create({ name: name })
            responseData.message = '新建目录成功'
        } catch (error) {
            responseData.code = 1
            responseData.message = '数据库写入失败'
        }
    } else {
        responseData.code = 1
        responseData.message = '目录名称已存在'
    }
    res.json(responseData)
})

// 查询目录接口
router.get('/catalog', async (req, res) => {
    let result = await CatalogModel.aggregate([
        {
            $lookup: {
                from: 'code',
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
    res.json(result)
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
    res.json(responseData)
})

// 新增代码块接口
router.post('/code', async (req, res) => {
    // 代码块名称
    let name = req.body.name
    // 唯一性校验
    let result = await CodeModel.find({ name: name })
    if (result.length === 1) {
        responseData.code = 1
        responseData.message = '代码块名称已存在'
    } else {
        // 代码块数据写入
        try {
            await CodeModel.create({ name: name })
            responseData.message = '新建代码块成功'
        } catch (error) {
            responseData.code = 1
            responseData.message = '数据库写入失败'
        }
    }
    res.json(responseData)
})

// 删除代码块接口
router.delete('/code/:id', async (req, res) => {
    // 代码块id
    let codeId = req.param.id
    try {
        await CodeModel.remove({ _id: codeId })
        responseData.message = '代码块删除成功'
    } catch (error) {
        responseData.code = 1
        responseData.message = '代码块删除失败'
    }
    res.json(responseData)
})

// 修改代码块接口
router.put('/code/:id', async (req, res) => {
    // 代码块id
    let codeId = req.param.id
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
    res.json(responseData)
})

// 查询代码块
router.get('/code/:id', async (req, res) => {
    // 代码块Id
    let codeId = req.param.id
    try {
        await CodeModel.findById(codeId)
        responseData.message = '查询代码块成功'
    } catch (error) {
        responseData.code = 1
        responseData.message = '查询代码块失败'
    }
    res.json(responseData)
})

module.exports = router