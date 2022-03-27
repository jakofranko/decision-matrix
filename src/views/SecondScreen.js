import m from 'mithril';
import Option from '../models/option';

export default function SecondScreen() {
    return {
        oninit: () => {
            console.log('second screen initialized')
        },
        currentOption: null,
        view: ({ attrs: { state, actions } }) => {
            return m('#second-screen', [
                m('h1.lhs', 'This is the second screen!'),
                m('hr.mv4'),
                m('div.r', [
                    m('div.c4.c4-m', [
                        m('label[for=option]', 'List the possible options or solutions:'),
                        m('br'),
                        m('input', {
                            id: 'option',
                            type: 'text',
                            placeholder: 'e.g., "Taco Bell"',
                            autofocus: true,
                            oninput: (e) => {
                                this.currentOption = e.target.value;
                            },
                            onkeydown: (e) => {
                                console.log(e);
                                if (e.key == 'Enter' && this.currentOption && this.currentOption.length) {
                                    console.log(this.currentOption);
                                    const newOption = new Option(this.currentOption);
                                    actions.addOption(newOption);
                                    e.target.value = '';
                                    this.currentOption = null;
                                }
                            }
                        }),
                    ]),
                    m('div.c4.c4-m', [
                        m(m.route.Link, {
                            selector: 'button[type=button]',
                            href: '/step-3',
                            class: 'mh3 p3'
                        }, 'Next')
                    ])
                ]),
                m('div.options', state.options.map((option) => {
                    return m('p', option.name);
                }))
            ]);
        }
    }
}
