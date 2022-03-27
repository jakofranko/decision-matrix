import m from 'mithril';

export default function FourthScreen() {
    return {
        oninit: ({ attrs: { state }}) => {
            console.log('fourth screen initialized');
            this.optionsIterator = state.options.values();
            this.criteriaIterator = state.criteria.values();
            this.lastOption = this.optionsIterator.next();
            this.lastCriteria = this.criteriaIterator.next();
            this.currentCriteriaIndex = 0;
            this.currentRank = 0;
        },
        nextOption: () => {
            const { optionsIterator, lastOption } = this;

            if (optionsIterator === null) {
                console.log('no options!');
            } else if (lastOption !== null && !lastOption.done) {
                this.lastOption = optionsIterator.next();

                if (this.lastOption.done) {
                    console.log('render matrix');
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

            if (criteriaIterator === null) {
                console.log('no criteria!');
            } else if (lastCriteria !== null && !lastCriteria.done) {
                this.lastCriteria = criteriaIterator.next();
                this.currentCriteriaIndex++;

                if (this.lastCriteria.done) {
                    console.log('reloading criteria');
                    this.criteriaIterator = criteria.values();
                    this.lastCriteria = this.criteriaIterator.next();
                    this.currentCriteriaIndex = 0;
                    nextOption(vnode);
                }
            }

            m.redraw();
        },
        view: (vnode) => {
            console.log('vnode state', vnode.state);
            const {
                lastOption: { value: optionValue } = {},
                lastCriteria: { value: criteriaValue } = {},
                currentCriteriaIndex,
                currentRank,
            } = this;
            const { nextCriteria } = vnode.state;

            return m('#fourth-screen', [
                m('h1.lhs', 'This is the fourth screen!'),
                m('hr.mv4'),
                m('div.r', [
                    m('div.c4.c4-m', [
                        m('label[for=rank]', 'Rank this option according to the criteria:'),
                        m('br'),
                        m('span.mr4', `${optionValue} ${criteriaValue}`),
                        m('input.mr4', {
                            id: 'rank',
                            type: 'number',
                            min: 1,
                            max: 3,
                            placeholder: '1 to 3',
                            autofocus: true,
                            oninput: (e) => {
                                this.currentRank = e.target.value;
                            }
                        }),
                        m('button[type=button]', {
                            onclick: () => {
                                optionValue.addRank(currentCriteriaIndex, currentRank);
                                nextCriteria(vnode);
                            },
                            class: 'mv3 p4'
                        }, `Assign ${optionValue} criteria ranking`)
                    ]),
                    m('div.c4.c4-m', [
                        m(m.route.Link, {
                            selector: 'button[type=button]',
                            href: '/matrix',
                            class: 'mh3 p3'
                        }, 'Next')
                    ])
                ])
            ]);
        }
    }
}
