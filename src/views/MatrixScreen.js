import m from 'mithril';
import Navigation from './Navigation';
import Button from '../components/Button';

export default function MatrixScreen() {
    return {
        oncreate: (vnode) => {
            const table = vnode.dom.querySelector('table');
            const scores = [...table.querySelectorAll('.score')];
            let highestScore = 0;
            let highestScoreNode;
            scores.forEach(score => {
                const scoreValue = Number(score.innerHTML);
                if (scoreValue > highestScore) {
                    highestScore = scoreValue;
                    highestScoreNode = score;
                }
            });

            highestScoreNode.parentElement.classList.add('bg-grn');
            highestScoreNode.parentElement.classList.add('cl-1');
        },
        view: ({ attrs: { state, actions }}) => {
            return m('div#matrix', [
                m('h2.lhs.mb3', 'Results Matrix'),
                m('div', m('table', [
                    m('caption', state.problem),
                    m('thead', [
                        m('th'),
                        state.criteria.map(c => m('th', `${c.name} (${c.weight})`)),
                        m('th', 'Score')
                    ]),
                    m('tbody', state.options.map(p => {
                        return m('tr', [
                            m('th', p.name),
                            p.ranks.map(r => {
                                const thisCriteria = state.criteria[r.criteriaIndex];
                                return m('td.ac', `${r.rankValue} (${r.rankValue * thisCriteria.weight})`)
                            }),
                            m('td.score', p.ranks.reduce((total, r) => {
                                const thisCriteria = state.criteria[r.criteriaIndex];
                                return total + (r.rankValue * thisCriteria.weight)
                            }, 0))
                        ]);
                    }))
                ])),
                m(Navigation),
                m(Button, {
                    onclick: () => {
                        actions.resetState();
                        m.route.set('/step-1');
                    }
                }, 'New Decision')
            ]);
        }
    }
}
