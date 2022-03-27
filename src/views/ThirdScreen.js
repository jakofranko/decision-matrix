import m from 'mithril';
import Navigation from './Navigation';
import Criteria from '../models/criteria';

export default function ThirdScreen() {
    return {
        oncreate: ({ dom }) => {
            const input = dom.querySelector('#criteria');
            input.focus();
        },
        currentCriteria: null,
        view: ({ attrs: { state, actions } }) => {
            return m('#third-screen', [
                m('div.r', [
                    m('div.c4.c4-m', [
                        m('label[for=criteria]', 'List the criteria for evaluating an option:'),
                        m('br'),
                        m('input', {
                            id: 'criteria',
                            type: 'text',
                            placeholder: 'e.g., "Wait Time"',
                            oninput: (e) => {
                                this.currentCriteria = e.target.value;
                            },
                            onkeydown: (e) => {
                                if (e.key == 'Enter' && this.currentCriteria && this.currentCriteria.length) {
                                    const newCriteria = new Criteria(this.currentCriteria);
                                    actions.addCriteria(newCriteria);
                                    e.target.value = '';
                                    this.currentCriteria = null;
                                }
                            }
                        }),
                    ]),
                    m('div.c4.c4-m', [
                        m('h3', 'Problem Criteria:'),
                        m('ul', state.criteria.map((c) => {
                            return m('li', c.name);
                        }))
                    ])
                ]),
                m(Navigation, { nextCondition: () => state.criteria.length })
            ]);
        }
    }
}
