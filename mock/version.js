import { mock, Random } from 'mockjs'

const List = []
for (let i = 0; i < 50; i++) {
  List.push(mock({
    'id': i,
    'version_id': 'v1.' + i, // 生成版本id，自增1
    'switchType1': Random.boolean(), // true 和 false 几率各位50%
    'switchType2': Random.boolean(),
    'switchType3': Random.boolean(),
    'switchType4': Random.boolean(),
    'switchType5': Random.boolean(),
    'switchType6': Random.boolean(),
    'switchType7': Random.boolean()
  }))
}
export default [
  // 版本列表
  {
    url: '/version/queryVersionList',
    type: 'post',
    response: config => {
      const { version_id, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (version_id && item.version_id !== +version_id) return false
        return true
      })
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList,
          pageNum: page,
          pageSize: limit
        }
      }
    }
  },
  // 添加版本
  {
    url: '/version/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 编辑版本
  {
    url: '/version/edit',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除版本
  {
    url: '/version/delete',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

