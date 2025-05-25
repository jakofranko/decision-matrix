import m from 'mithril';

export default function Layout() {
    return {
        view: ({ children }) => {
            return m('div.mt5.mh6-l.mh5-m.mh4-s', children)
        }
    }
}
