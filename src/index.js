// Making a decisicion matrix basically involves 4 steps:
// 1. Define a list of options for solving, or facets to the problem at hand
// 2. Define a list of criteria for evaluating each option i.e., ease of implementation, complexity, impact on other systems
// 3. Assign a weight to each of the criteria; there are a comple of methods for how to do this, but basically, pick a number
// 4. Go through each option, and rank the problem according to the criteria, for each criteria. There are different methods for this too.
//
// A couple of guiding principles are that 1) when ranking a problem according to criteria, lower numbers mean you are
// less likely to pick that option. So make sure that the criteria are worded in such a way that low ranks are bad.
//
// For example if one option is "use a different technology", you might rank its "ease of use" criteria as a 4 -- a new
// technology might be much, much easier to use than the current tech. But its complexity is a 1...it might be very complicated to
// implement. But it becomes apparent that complexity is perhaps not a well-worded criteria, since a high rank does not mean high complexity.
// "Ease of implementation" is probably much better for a criteria here.
//
// To build the app:
// 1. define data structures
// 2. implement bare-bones CRUD GUI for some of these
// 3. define UI flow
// 4. implement UI
// 5. implement the 10 point weighting method for criteria
import m from 'mithril';
import 'macian';

// This will be the overarching problem-to-solve e.g., "Need to decide where to get dinner"
let problem = "";

/**
 * Option - An option or facet for solving the main problem.
 *
 * @constructor
 * @param    {string}   name    The name of the option
 * @property {string}   name    The name of the option
 * @property {array}    ranks   An array of Ranks
 * @property {function} addRank Adds a Rank to the ranks property
 * @returns  {Object}           The Option
 */
function Option(name) {
    this.name = name;
    this.ranks = [];
    this.addRank = (criteriaIndex, rankValue) => {
        const rank = new Rank(criteriaIndex, rankValue);
        this.ranks.push(rank);
    };
    this.toString = () => this.name;

    return this;
}


/**
 * Rank - A Rank for an option, assigned like `optionVariable.addRank(rank);`
 *
 * @param    {number} criteriaIndex The index of the Criteria in the `criteria` array.
 * @param    {number} rankValue     A numerical value ranking the Option according to the criteria
 * @property {number} criteriaIndex
 * @property {number} rankValue
 * @returns  {Object}               This Rank
 */
function Rank(criteriaIndex, rankValue) {
    this.criteriaIndex = criteriaIndex;
    this.rankValue = rankValue;

    return this;
}

// This will be this list of potential options e.g., "McDonald's, Chick-Fil-A, Pei Wei, Habit"
// An option needs to have a name and a rank for each criteria.
const options = [new Option('wendys'), new Option('taco bell')];


/**
 * Criteria - A metric to evaluate against an option, like "ease of implementation" or "wait time".
 *
 * @param    {string} name       Name of the criteria e.g., "wait time"
 * @param    {number} weight = 1 How important this criteria is when evaluating an option
 *                               e.g., how important is the wait time length to this decision?
 * @property {string} name
 * @property {number} weight
 * @property {func}   setWeight  Set the `weight` property
 * @returns  {Object}            This Criteria.
 */
function Criteria(name, weight = 1) {
    this.name = name;
    this.weight = weight;
    this.setWeight = (weight) => {
        this.weight = weight;
    };
    this.toString = () => this.name;

    return this;
}

// This is the list of Criteria, and the order is important, since the Rank will reference the index of this array
const criteria = [new Criteria('wait time'), new Criteria('deliciousness')];

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const firstScreen = {
    oninit: () => console.log('first screen initialized'),
    view: () => m('#first-screen', [
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
                    value: problem,
                    autofocus: true,
                    oninput: (e) => {
                        problem = e.target.value;
                    },
                    onkeydown: (e) => {
                        console.log(e);
                        if (e.key == 'Enter') {
                            console.log(problem);
                            m.route.set('/step-2');
                        }
                    }
                })
            ]),
            m('div.c4.c4-m', [
                problem.length ? m(m.route.Link, {
                    selector: 'button[type=button]',
                    href: '/step-2',
                    class: 'mh3 p3'
                }, 'Next') : ''
            ])
        ]),
        m('h2.lhs', `The problem is: ${problem}`)
    ])
}

const secondScreen = {
    oninit: () => {
        console.log('second screen initialized')
    },
    currentOption: null,
    view: (vnode) => {
        return m('#second-screen', [
            m('h1.lhs', 'This is the second screen!'),
            m('hr.mv4'),
            m('div.r', [
                m('div.c4.c4-m', [
                    m('label[for=option]', 'List the possible options or solutions:'),
                    m('br'),
                    m('input', {
                        id: 'option',
                        type: 'text',
                        placeholder: 'e.g., "Taco Bell"',
                        autofocus: true,
                        oninput: (e) => {
                            vnode.state.currentOption = e.target.value;
                        },
                        onkeydown: (e) => {
                            console.log(e);
                            if (e.key == 'Enter') {
                                console.log(vnode.state.currentOption);
                                const newOption = new Option(vnode.state.currentOption);
                                options.push(newOption);
                                e.target.value = '';
                            }
                        }
                    }),
                ]),
                m('div.c4.c4-m', [
                    m(m.route.Link, {
                        selector: 'button[type=button]',
                        href: '/step-3',
                        class: 'mh3 p3'
                    }, 'Next')
                ])
            ]),
            m('div.options', options.map((option) => {
                return m('p', option.name);
            }))
        ]);
    }
}

const thirdScreen = {
    oninit: () => {
        console.log('third screen initialized')
    },
    currentCriteria: null,
    view: (vnode) => {
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
                            vnode.state.currentCriteria = e.target.value;
                        },
                        onkeydown: (e) => {
                            console.log(e);
                            if (e.key == 'Enter') {
                                console.log(vnode.state.currentCriteria);
                                const newCriteria = new Criteria(vnode.state.currentCriteria);
                                criteria.push(newCriteria);
                                e.target.value = '';
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
            m('div.options', criteria.map((c) => {
                return m('p', c.name);
            }))
        ]);
    }
}

const fourthScreen = {
    oninit: (vnode) => {
        console.log('fourth screen initialized');
        vnode.state.optionsIterator = options.values();
        vnode.state.criteriaIterator = criteria.values();
        vnode.state.lastOption = vnode.state.optionsIterator.next();
        vnode.state.lastCriteria = vnode.state.criteriaIterator.next();
        console.log(vnode.state);
    },
    optionsIterator: null,
    lastOption: null,
    criteriaIterator: null,
    lastCriteria: null,
    currentRank: null,
    currentCriteriaIndex: 0,
    nextOption: (vnode) => {
        const { optionsIterator, lastOption } = vnode.state;

        if (optionsIterator === null) {
            console.log('no options!');
        } else if (lastOption !== null && !lastOption.done) {
            vnode.state.lastOption = optionsIterator.next();

            if (vnode.state.lastOption.done) {
                console.log('render matrix');
                m.route.set('/matrix');
            }
        }

        m.redraw();
    },
    nextCriteria: (vnode) => {
        // Only for reading and executing,
        // write to vnode.state directly.
        const {
            criteriaIterator,
            lastCriteria,
            nextOption
        } = vnode.state;

        if (criteriaIterator === null) {
            console.log('no criteria!');
        } else if (lastCriteria !== null && !lastCriteria.done) {
            vnode.state.lastCriteria = criteriaIterator.next();
            vnode.state.currentCriteriaIndex++;

            if (vnode.state.lastCriteria.done) {
                console.log('reloading criteria');
                vnode.state.criteriaIterator = criteria.values();
                vnode.state.lastCriteria = vnode.state.criteriaIterator.next();
                vnode.state.currentCriteriaIndex = 0;
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
            nextCriteria
        } = vnode.state;
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
                            vnode.state.currentRank = e.target.value;
                        }
                    }),
                    m('button[type=button]', {
                        onclick: (e) => {
                            const {
                                currentCriteriaIndex,
                                currentRank,
                                lastOption
                            } = vnode.state;

                            optionValue.addRank(currentCriteriaIndex, currentRank);
                            console.log(options);
                            nextCriteria(vnode);
                        },
                        class: 'mv3 p4'
                    }, `Assign ${optionValue} criteria ranking`)
                ]),
                m('div.c4.c4-m', [
                    m(m.route.Link, {
                        selector: 'button[type=button]',
                        href: '/step-1',
                        class: 'mh3 p3'
                    }, 'Next')
                ])
            ])
        ]);
    }
}

const matrix = {
    view: () => {
        return m('div#matrix', [
            m('h1.lhs', 'MATRIX'),
            m('table', [
                m('caption', problem),
                m('thead', criteria.map(c => m('th', c.name))),
                m('tbody', options.map(p => {
                    return m('tr', p.ranks.map(r => {
                        const thisCriteria = criteria[r.criteriaIndex];
                        return m('td', `${thisCriteria.name}: ${r.rankValue} * ${thisCriteria.weight} = ${r.rankValue * thisCriteria.weight}`)
                    }));
                }))
            ])
        ]);
    }
}

m.route(root, '/step-1', {
    '/step-1': firstScreen,
    '/step-2': secondScreen,
    '/step-3': thirdScreen,
    '/step-4': fourthScreen,
    '/matrix': matrix
});
