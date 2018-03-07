import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        prefixClassName: 'face-table',
        themes: '',
        data: [],
        columns:[],
        emptyText: '暂无数据',
    }
    app.propTypes = {
        prefixClassName: p.string,
        themes: p.string,
        data: p.arrayOf(p.Object),
        columns: p.arrayOf(p.Object),
        emptyText: p.string,
    }
}
