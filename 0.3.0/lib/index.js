import { Component } from "react"
import extend from "extend"
import util from "util.react"
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

        return (
            <table
                ref="root"
                className={rootClassName}
            >
                <thead className={`${self.props.prefixClassName}-thead`} >
                    <tr className={`${self.props.prefixClassName}-thead-tr`}>
                        {
                            self.props.columns.map(function (item, index) {
                                return (
                                    <th
                                        className={`${self.props.prefixClassName}-th`}
                                        key={index}
                                         style={{width: item.width}} 
                                    >
                                        {
                                            typeof item.title === 'function'?
                                            item.title(item)
                                            :
                                            item.title
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
                                    <div class={`${self.props.prefixClassName}-td-empty`}>
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
                                                            var target = currentData
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
