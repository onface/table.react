var React = require('react')
var Table = require('table.react')
var Button = require('button.react')
class Basic extends React.Component {
    render () {
        return (
            <div>
                <Table
                    data={[
                        {
                            id: 'ssdw-23da-asd2-asd2',
                            name: 'nimo',
                            age: 24,
                            color: 'blue'
                        },
                        {
                            id: 'gjd2-g1x2-sg1d-afgo',
                            name: 'nico',
                            age: 18,
                            color: 'red'
                        }
                    ]}
                    columns={[
                        {
                            title: '姓名',
                            key: 'name',
                        },
                        {
                            title: '年龄',
                            key: 'age',
                            width: 50
                        },
                        {
                            title: '颜色',
                            key: 'color',
                            render: function (color, item) {
                                return (<div style={{color: color}} >▇</div>)
                            }
                        },
                        {
                            title: '操作',
                            key: 'action',
                            render: function (action, item) {
                                return (
                                    <Button size="small" >
                                        删除
                                    </Button>
                                )
                            }
                        }
                    ]}
                />
                <hr />
                <Table
                    data={[]}
                    columns={[
                        {
                            title: '姓名',
                            key: 'name'
                        }
                    ]}
                />
                <Table
                    data={[
                        {
                            name: 'nimo'
                        }
                    ]}
                    columns={[
                        {
                            title: function (rowData, item) {
                                return (<em>姓名-{item.key}</em>)
                            },
                            key: 'name'
                        }
                    ]}
                />
                <Table
                    data={[
                        {
                            name: 'nimo',
                            age: 12
                        },
                        {
                            name: 'nico',
                            age: 24
                        }
                    ]}
                    columns={[
                        {
                            title: '姓名',
                            key: 'name'
                        },
                        {
                            key: 'age',
                            // th style
                            style: {color: 'red'},
                            className: 'th-some',
                            title: function (rowData) {
                                // rowData: [12, 24]
                                var ageSum = rowData.reduce(function (pre, cur) {
                                    return pre + cur
                                })
                                return '年龄（' + ageSum + ')'
                            }
                        }
                    ]}
                />
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
