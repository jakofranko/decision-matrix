import m from 'mithril';
import Navigation from './Navigation';

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
        view: ({ attrs: { state }}) => {
            return m('div#matrix', [
                m('h1.lhs.mb3', 'MATRIX'),
                m('table.mb3', [
                    m('caption', state.problem),
                    m('thead', [
                        m('th'),
                        state.criteria.map(c => m('th', c.name)),
                        m('th', 'Score')
                    ]),
                    m('tbody', state.options.map(p => {
                        return m('tr', [
                            m('th', p.name),
                            p.ranks.map(r => {
                                const thisCriteria = state.criteria[r.criteriaIndex];
                                return m('td', `${thisCriteria.name}: ${r.rankValue} * ${thisCriteria.weight} = ${r.rankValue * thisCriteria.weight}`)
                            }),
                            m('td.score', p.ranks.reduce((total, r) => {
                                const thisCriteria = state.criteria[r.criteriaIndex];
                                return total + (r.rankValue * thisCriteria.weight)
                            }, 0))
                        ]);
                    }))
                ]),
                m(Navigation)
            ]);
        }
    }
}
