import m from 'mithril';
import Criteria from '../models/criteria';

export default function ThirdScreen() {
    return {
        oninit: () => {
            console.log('third screen initialized')
        },
        currentCriteria: null,
        view: ({ attrs: { state, actions } }) => {
            return m('#third-screen', [
                m('h1.lhs', 'This is the third screen!'),
                m('hr.mv4'),
                m('div.r', [
                    m('div.c4.c4-m', [
                        m('label[for=criteria]', 'List the criteria for evaluating an option:'),
                        m('br'),
                        m('input', {
                            id: 'criteria',
                            type: 'text',
                            placeholder: 'e.g., "Wait Time"',
                            autofocus: true,
                            oninput: (e) => {
                                this.currentCriteria = e.target.value;
                            },
                            onkeydown: (e) => {
                                console.log(e);
                                if (e.key == 'Enter' && this.currentCriteria && this.currentCriteria.length) {
                                    console.log(this.currentCriteria);
                                    const newCriteria = new Criteria(this.currentCriteria);
                                    actions.addCriteria(newCriteria);
                                    e.target.value = '';
                                    this.currentCriteria = null;
                                }
                            }
                        }),
                    ]),
                    m('div.c4.c4-m', [
                        m(m.route.Link, {
                            selector: 'button[type=button]',
                            href: '/step-4',
                            class: 'mh3 p3'
                        }, 'Next')
                    ])
                ]),
                m('div.options', state.criteria.map((c) => {
                    return m('p', c.name);
                }))
            ]);
        }
    }
}
