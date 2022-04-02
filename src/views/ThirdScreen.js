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
                m('h2.lhs.mb3', 'List Criteria'),
                m('div.r.vh7', [
                    m('div.c6.c6-m', [
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
                        m('p.sc', '(press enter/return)')
                    ]),
                    m('div.c6.c6-m', [
                        m('h3', 'Problem Criteria:'),
                        m('p', `Weight Points: ${state.weightPoints}`),
                        m('ul', state.criteria.map((c) => {
                            return m('li', [
                                c.name,
                                m('br'),
                                m('label.mr2', `weight:`),
                                m('input[type=number].mw2', {
                                    value: c.weight,
                                    'data-lastweight': c.weight,
                                    placeholder: 'Weight',
                                    min: 1,
                                    oninput: (e) => {
                                        const { value, dataset } = e.target;
                                        if (value > dataset.lastweight) {
                                            // Don't exceed point pool
                                            if (state.weightPoints === 0) {
                                                return;
                                            }

                                            actions.decrementWeightPoints();
                                        } else if (value < dataset.lastweight) {
                                            // Shouldn't need to see if the input is
                                            // below zero, since the min is set to 1
                                            actions.incrementWeightPoints();
                                        }

                                        c.setWeight(value);
                                    }
                                })
                            ]);
                        }))
                    ])
                ]),
                m(Navigation, { nextCondition: () => state.criteria.length })
            ]);
        }
    }
}
