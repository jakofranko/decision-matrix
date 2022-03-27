import m from 'mithril';

export default function FirstScreen() {
    return {
        oninit: () => console.log('first screen initialized'),
        view: ({ attrs: { state, actions } }) => m('#first-screen', [
            m('h1.lhs', 'This is the first screen!'),
            m('hr.mv4'),
            m('div.r', [
                m('div.c4.c4-m', [
                    m('label[for=problem]', 'What is the problem you\'re trying to solve?'),
                    m('br'),
                    m('input', {
                        id: 'problem',
                        type: 'text',
                        placeholder: 'What\'s the problem?',
                        value: state.problem,
                        autofocus: true,
                        oninput: (e) => {
                            actions.setProblem(e.target.value);
                        },
                        onkeydown: (e) => {
                            console.log(e);
                            if (e.key == 'Enter') {
                                console.log(state.problem);
                                m.route.set('/step-2');
                            }
                        }
                    })
                ]),
                m('div.c4.c4-m', [
                    state.problem.length ? m(m.route.Link, {
                        selector: 'button[type=button]',
                        href: '/step-2',
                        class: 'mh3 p3'
                    }, 'Next') : ''
                ])
            ]),
            m('h2.lhs', `The problem is: ${state.problem}`)
        ])
    }
}
