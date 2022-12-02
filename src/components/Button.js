import m from 'mithril';

const Button = {
    view: ({
        children,
        attrs: {
            onclick,
            type = 'button',
            classNames = '',
        }
    }) => {
        return m('button', {
            class: classNames + ' bg-blu blanc mh3 pv2 ph3 f5 f4-s br1 bsb',
            type,
            onclick
        }, children)
    }
}

export default Button;
