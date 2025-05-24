import m from 'mithril';
import Navigation from './Navigation';
import Option from '../models/option';

export default function SecondScreen() {
    return {
        oncreate: ({ dom }) => {
            const input = dom.querySelector('#option');
            input.focus();
        },
        currentOption: null,
        view: ({ attrs: { state, actions } }) => {
            return m('#second-screen', [
                m('h2.lhs.mb3', 'List Solutions/Options'),
                m('div.r', [
                    m('div.c6.c6-m.mb3', [
                        m('label[for=option]', 'List the possible options or solutions:'),
                        m('br'),
                        m('input', {
                            id: 'option',
                            class: 'bg-blanc br1 mb2 p2 sh5-s vw7-s',
                            type: 'text',
                            placeholder: 'e.g., Upgrade Equipment',
                            oninput: (e) => {
                                this.currentOption = e.target.value;
                            },
                            onkeydown: (e) => {
                                if (e.key == 'Enter' && this.currentOption && this.currentOption.length) {
                                    const newOption = new Option(this.currentOption);
                                    actions.addOption(newOption);
                                    e.target.value = '';
                                    this.currentOption = null;
                                }
                            }
                        }),
                        m('p.sc', '(click next or press enter/return)')
                    ]),
                    m('div.c6.c6-m.vh7-m.vh5-s', [
                        m('h3', 'Potential Solutions:'),
                        m('ul', state.options.map((option) => {
                            return m('li', option.name);
                        }))
                    ])
                ]),
                m(Navigation, { nextCondition: () => state.options.length }),
            ]);
        }
    }
}
