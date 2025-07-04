import m from 'mithril';
import Button from '../components/Button';

// Contains the flow for the app, but attrs for
// previousCondition and nextCondition may be passed in
// to define when it's ok to move on to the next screen.
export default function Navigation() {
    const navFlow = [
        '/step-1',
        '/step-2',
        '/step-3',
        '/step-4',
        '/matrix'
    ];
    const currentRoute = m.route.get();
    const flowIndex = navFlow.indexOf(currentRoute);
    const nextScreenIndex = (flowIndex + 1) % navFlow.length;
    const previousScreenIndex = (flowIndex - 1) % navFlow.length;

    return {
        view: ({ attrs: {
            previousCondition = () => true,
            nextCondition = () => true
        }}) => {
            const next = flowIndex != navFlow.length - 1 && nextCondition()
                ? m(Button, {
                    classNames: 'm0',
                    onclick: () => m.route.set(navFlow[nextScreenIndex])
                }, 'Next')
                : null;
            const prev = flowIndex != 0 && previousCondition()
                ? m(Button, {
                    classNames: 'mr3',
                    onclick: () => m.route.set(navFlow[previousScreenIndex])
                }, 'Back')
                : null;

            return m('nav.mv3.sh5.pss.psf-s.b0-s', [
                prev,
                next
            ]);
        }
    }
}
