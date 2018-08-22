import { Component } from "react"
import extend from "extend"
import util from "util.react"
const spreadProps = require('react-spread-props')
require('./index.css')
class Table extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {}
    }
    render() {
        const self = this
        var rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')
        let domProps = spreadProps(
            self.props,
            {},
            {
                ignore: [
                    'prefixClassName',
                    'themes',
                    'data',
                    'columns',
                    'emptyText'
                ]
            }
        )

        return (
            <table
                {...domProps}
                ref="root"
                className={rootClassName}
            >
                <thead className={`${self.props.prefixClassName}-thead`} >
                    <tr className={`${self.props.prefixClassName}-thead-tr`}>
                        {
                            self.props.columns.map(function (item, index) {
                                let hasRender = false
                                let rowData = []
                                if (typeof item.title === 'function') {
                                    hasRender = true
                                    self.props.data.forEach(function (col) {
                                        rowData.push(col[item.key])
                                    })
                                }
                                let style = item.style || {}
                                if (typeof item.width !== 'undefined') {
                                    style.width = item.width
                                }
                                return (
                                    <th
                                        className={`${self.props.prefixClassName}-th ${item.className||''}`}
                                        key={index}
                                        style={style}
                                    >
                                        {
                                            hasRender?
                                            item.title(rowData, item)
                                            :
                                            item.title || item.key
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody className={`${self.props.prefixClassName}-tbody`} >
                    {
                        self.props.data.length === 0?
                        (
                            <tr className={`${self.props.prefixClassName}-tr`}>
                                <td className={`${self.props.prefixClassName}-td`} colSpan={self.props.columns.length} >
                                    <div className={`${self.props.prefixClassName}-td-empty`}>
                                        {self.props.emptyText}
                                    </div>
                                </td>
                            </tr>
                        ):null
                    }
                    {
                        self.props.data.map(function (currentData, index) {
                            return (
                                <tr className={`${self.props.prefixClassName}-tr`} key={index}  >
                                    {
                                        self.props.columns.map(function (column, index) {
                                            return (
                                                <td className={`${self.props.prefixClassName}-td`} key={index}  >
                                                    {
                                                        (function(){
                                                            var target = undefined
                                                            Object.keys(currentData).some(function (key) {
                                                                if (key === column.key) {
                                                                    target = currentData[key]
                                                                    return true
                                                                }
                                                            })
                                                            if (typeof column.render === 'function') {
                                                                return column.render(target, currentData)
                                                            }
                                                            else {
                                                                return target
                                                            }
                                                        })()
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}
require('./props').default(Table)
export default Table
module.exports= Table
