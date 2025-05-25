import m from 'mithril';
import Navigation from './Navigation';
import Button from '../components/Button';
import Criteria from '../models/criteria';

function addNewCriteria(view, actions) {
    const criteriaInput = document.querySelector('#criteria');
    const newCriteria = new Criteria(view.currentCriteria);
    actions.addCriteria(newCriteria);
    criteriaInput.value = '';
    criteriaInput.focus();
    view.currentCriteria = null;
}

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
                m('div.r', [
                    m('div.c6.c6-m.mb3', [
                        m('label[f.or=criteria]', 'List the criteria for evaluating an option:'),
                        m('br'),
                        m('input', {
                            id: 'criteria',
                            class: 'bg-blanc br1 mb2 p2 sh5-s vw7-s',
                            type: 'text',
                            placeholder: 'e.g., Cost to Implement',
                            oninput: (e) => {
                                this.currentCriteria = e.target.value;
                            },
                            onkeydown: (e) => {
                                if (e.key == 'Enter' && this.currentCriteria && this.currentCriteria.length) {
                                    addNewCriteria(this, actions);
                                }
                            }
                        }),
                        m(Button, {
                            onclick: () => addNewCriteria(this, actions),
                            classNames: 'mh2 mh0-s mv2-s'
                        }, 'Add Criteria'),
                        m('p.sc.mb3', '(click next or press enter/return)'),
                        m('p.m', 'Optionally, assign weights to each criteria, but you cannot exceed the amount of weight points available. If you do, you will not be able to move on to the next step until you have adjusted the weights appropriately.'),
                        m('p.ba.bso.mv2.p2', `Weight points left: ${state.weightPoints}`)
                    ]),
                    m('div.c6.c6-m', [
                        m('h3', 'Problem Criteria:'),
                        m('ul', state.criteria.map((c) => {
                            return m('li', [
                                c.name,
                                m('br'),
                                m('label.mr2', `weight:`),
                                m('input[type=number].mw2', {
                                    class: 'bg-blanc br1 p2 vw2',
                                    value: c.weight,
                                    'data-lastweight': c.weight,
                                    placeholder: 'Weight',
                                    min: 1,
                                    oninput: (e) => {
                                        const { value, dataset } = e.target;
                                        if (value > dataset.lastweight) {
                                            // Don't exceed point pool
                                            if (state.weightPoints <= 0) {
                                                return;
                                            }

                                            actions.decrementWeightPoints(value - dataset.lastweight);
                                        } else if (value < dataset.lastweight) {
                                            // Shouldn't need to see if the input is
                                            // below zero, since the min is set to 1
                                            actions.incrementWeightPoints(dataset.lastweight - value);
                                        }

                                        c.setWeight(value);
                                    }
                                })
                            ]);
                        }))
                    ])
                ]),
                m(Navigation, { nextCondition: () => state.criteria.length && state.weightPoints >= 0 })
            ]);
        }
    }
}
