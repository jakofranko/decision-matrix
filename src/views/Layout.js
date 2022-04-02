import m from 'mithril';

export default function Layout() {
    return {
        view: ({ children }) => {
            return m('div.mt4.mh6-l.mh5-m.mh1-s', children)
        }
    }
}
