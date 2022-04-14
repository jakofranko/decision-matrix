import m from 'mithril';

const Button = {
    view: ({
        children,
        attrs: {
            onclick,
            type = 'button'
        }
    }) => {
        return m('button', {
            class: 'bg-blu blanc pv2 ph3 f5 f4-s br1 bsb',
            type,
            onclick
        }, children)
    }
}

export default Button;
