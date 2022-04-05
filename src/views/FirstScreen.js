import m from 'mithril';
import Navigation from './Navigation';

export default function FirstScreen() {
    return {
        oncreate: ({ dom }) => {
            const input = dom.querySelector('#problem');
            input.focus();
        },
        view: ({ attrs: { state, actions } }) => m('#first-screen', [
            m('h2.lhs.mb3', `The problem is: ${state.problem}`),
            m('div', [
                m('label[for=problem]', 'What is the problem you\'re trying to solve?'),
                m('br'),
                m('input', {
                    id: 'problem',
                    type: 'text',
                    placeholder: 'What\'s the problem?',
                    value: state.problem,
                    oninput: (e) => {
                        actions.setProblem(e.target.value);
                    },
                    onkeydown: (e) => {
                        if (e.key == 'Enter') {
                            m.route.set('/step-2');
                        }
                    }
                }),
            ]),
            m(Navigation, { nextCondition: () => state.problem.length })
        ])
    }
}
