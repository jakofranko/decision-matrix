import m from 'mithril';
import Navigation from './Navigation';

export default function FourthScreen() {
    return {
        oninit: ({ attrs: { state }}) => {
            this.optionsIterator = state.options.values();
            this.criteriaIterator = state.criteria.values();
            this.lastOption = this.optionsIterator.next();
            this.lastCriteria = this.criteriaIterator.next();
            this.currentCriteriaIndex = 0;
            this.currentRank = 0;
        },
        oncreate: ({ dom }) => {
            const input = dom.querySelector('#rank');
            input.focus();
        },
        nextOption: () => {
            const { optionsIterator, lastOption } = this;

            if (lastOption !== null && !lastOption.done) {
                this.lastOption = optionsIterator.next();

                if (this.lastOption.done) {
                    m.route.set('/matrix');
                }
            }

            m.redraw();
        },
        nextCriteria: (vnode) => {
            const {
                criteriaIterator,
                lastCriteria,
            } = this;
            const {
                nextOption
            } = vnode.state;
            const { state: { criteria } } = vnode.attrs;

            if (lastCriteria !== null && !lastCriteria.done) {
                this.lastCriteria = criteriaIterator.next();
                this.currentCriteriaIndex++;

                if (this.lastCriteria.done) {
                    this.criteriaIterator = criteria.values();
                    this.lastCriteria = this.criteriaIterator.next();
                    this.currentCriteriaIndex = 0;
                    nextOption(vnode);
                }
            }

            m.redraw();
        },
        view: (vnode) => {
            const {
                lastOption: { value: optionValue } = {},
                lastCriteria: { value: criteriaValue } = {},
                currentCriteriaIndex,
                currentRank,
            } = this;
            const { nextCriteria } = vnode.state;
            const { state: { criteria, options } } = vnode.attrs;

            return m('#fourth-screen', [
                m('div.r', [
                    m('div.c4.c4-m', [
                        m('label[for=rank]', 'Rank this option according to the criteria:'),
                        m('br'),
                        m('span.mr4', `${optionValue} ${criteriaValue}`),
                        m('input.mr4.mw3', {
                            id: 'rank',
                            type: 'number',
                            min: 1,
                            max: 3,
                            step: 1,
                            placeholder: '1 to 3',
                            oninput: (e) => {
                                this.currentRank = e.target.value;
                            },
                            onkeydown: (e) => {
                                if (e.key == 'Enter' && this.currentRank) {
                                    optionValue.addRank(currentCriteriaIndex, currentRank);
                                    nextCriteria(vnode);
                                    e.target.value = '';
                                    this.currentRank = null;
                                }
                            }
                        }),
                        m('button[type=button]', {
                            onclick: () => {
                                optionValue.addRank(currentCriteriaIndex, currentRank);
                                nextCriteria(vnode);
                                vnode.dom.querySelector('#rank').value = '';
                                this.currentRank = null;
                            },
                            class: 'mv3 p4'
                        }, `Assign ${optionValue} criteria ranking`)
                    ])
                ]),
                m(Navigation, { nextCondition: () => this.lastOption.done || options.every((option) => option.ranks.length >= criteria.length) })
            ]);
        }
    }
}
