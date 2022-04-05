import m from 'mithril';
import Navigation from './Navigation';

// TODO: either only display unranked option/casualty pairs,
// or display this differently so that all the options at once
// are shown with their rank, so that if it's already set
// then the number is filled in (instead of a blank input)
export default function FourthScreen() {
    return {
        oninit: ({ attrs: { state }}) => {
            this.optionsIterator = state.options.values();
            this.criteriaIterator = state.criteria.values();
            this.lastOption = this.optionsIterator.next();
            this.lastCriteria = this.criteriaIterator.next();
            this.currentCriteriaIndex = 0;
            this.currentRank = this.lastOption.value.ranks[0]
                ? this.lastOption.value.ranks[0].rankValue
                : 0;
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
                this.currentRank = this.lastOption.value.ranks[this.currentCriteriaIndex]
                    ? this.lastOption.value.ranks[this.currentCriteriaIndex].rankValue
                    : 0;

                if (this.lastCriteria.done) {
                    this.criteriaIterator = criteria.values();
                    this.lastCriteria = this.criteriaIterator.next();
                    this.currentCriteriaIndex = 0;
                    this.currentRank = this.lastOption.value.ranks[this.currentCriteriaIndex]
                        ? this.lastOption.value.ranks[this.currentCriteriaIndex].rankValue
                        : 0;
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
            const currentOptionRank = optionValue ? optionValue.ranks[currentCriteriaIndex] : null;

            return m('#fourth-screen', [
                m('h2.lhs.mb3', 'Rank Each Option'),
                m('div.r', [
                    m('div.c6.c6-m', [
                        m('label[for=rank]', `Rank ${optionValue} for ${criteriaValue}`),
                        m('br'),
                        m('input.mr4.mw3', {
                            id: 'rank',
                            type: 'number',
                            value: currentRank,
                            min: 1,
                            max: 3,
                            step: 1,
                            placeholder: '1 to 3',
                            oninput: (e) => {
                                this.currentRank = e.target.value;
                            },
                            onkeydown: (e) => {
                                if (e.key == 'Enter' && this.currentRank) {
                                    if (currentOptionRank) {
                                        currentOptionRank.rankValue = currentRank;
                                    } else {
                                        optionValue.addRank(currentCriteriaIndex, currentRank);
                                    }
                                    nextCriteria(vnode);
                                    e.target.value = '';
                                }
                            }
                        }),
                        m('p.sc', '(press enter/return)')
                    ])
                ]),
                m(Navigation, { nextCondition: () => this.lastOption.done || options.every((option) => option.ranks.length >= criteria.length) })
            ]);
        }
    }
}
