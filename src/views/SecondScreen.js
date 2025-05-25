import m from 'mithril';
import Navigation from './Navigation';
import Button from '../components/Button';
import Option from '../models/option';

function addNewOption(view, actions) {
    const optionInput = document.querySelector('#option');
    const newOption = new Option(view.currentOption);
    actions.addOption(newOption);
    optionInput.value = '';
    optionInput.focus();
    view.currentOption = null;
}

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
                                    addNewOption(this, actions);
                                }
                            }
                        }),
                        m(Button, {
                            onclick: () => addNewOption(this, actions),
                            classNames: 'mh2 mh0-m mh0-s mv2-s'
                        }, 'Add Option'),
                        m('p.sc', '(click button or press enter/return to add option)')
                    ]),
                    m('div.c6.c6-m.vh7-m.vh5-s', [
                        m('h3', 'Potential Solutions:'),
                        m('ul', state.options.map((option, i) => {
                            return m('li', [
                                option.name,
                                m('button', {
                                    onclick: () => actions.removeOption(i),
                                    class: 'red fwb ml3'
                                }, 'X')
                            ]);
                        }))
                    ])
                ]),
                m(Navigation, { nextCondition: () => state.options.length }),
            ]);
        }
    }
}
