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
// TODOs:
// 1. enable localStorage for data caching
// 2. implement multiple decision matrixes
// 3. Allow editing of decision matrixes
import m from 'mithril';
import 'macian';

import Layout from './views/Layout';
import FirstScreen from './views/FirstScreen';
import SecondScreen from './views/SecondScreen';
import ThirdScreen from './views/ThirdScreen';
import FourthScreen from './views/FourthScreen';
import MatrixScreen from './views/MatrixScreen';

// import Option from './models/option';
// import Criteria from './models/criteria';

// Killer article on the topic of Mithril state management:
// https://kevinfiol.com/blog/simple-state-management-in-mithriljs/
const state = {
    // This will be the overarching problem-to-solve e.g., "Need to decide where to get dinner"
    problem: "",

    // This will be this list of potential options e.g., "McDonald's, Chick-Fil-A, Pei Wei, Habit"
    // An option needs to have a name and a rank for each criteria.
    options: [
        // new Option('Wendy\'s').addRank(0, 2).addRank(1, 2).addRank(2, 2),
        // new Option('McDonalds').addRank(0, 2).addRank(1, 1).addRank(2, 3),
        // new Option('Taco Bell').addRank(0, 3).addRank(1, 3).addRank(2, 2),
    ],

    // This is the list of Criteria, and the order is important, since the Rank will reference the index of this array
    criteria: [
        // new Criteria('Deliciousness', 3),
        // new Criteria('Wait Time', 1),
        // new Criteria('Healthiness', 2)
    ],

    // The pool of points to assign to criteria for weighting their significance on the decision
    weightPoints: 10
};

const actions = {
    setProblem: (problem) => state.problem = problem,
    addOption: (option) => state.options.push(option),
    removeOption: (index) => state.options.splice(index, 1),
    getOptionIterator: () => state.criteria.values(),
    addCriteria: (criteria) => state.criteria.push(criteria),
    removeCriteria: (index) => state.criteria.splice(index, 1),
    getCriteriaIterator: () => state.criteria.values(),
    decrementWeightPoints: (value) => state.weightPoints -= value,
    incrementWeightPoints: (value) => state.weightPoints += value
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

m.route(root, '/step-1', {
    '/step-1': {
        render: () => m(Layout, m(FirstScreen, {
            state,
            actions
        }))
    },
    '/step-2': {
        render: () => m(Layout, m(SecondScreen, {
            state,
            actions
        }))
    },
    '/step-3': {
        render: () => m(Layout, m(ThirdScreen, {
            state,
            actions
        }))
    },
    '/step-4': {
        render: () => m(Layout, m(FourthScreen, {
            state,
            actions
        }))
    },
    '/matrix': {
        render: () => m(Layout, m(MatrixScreen, {
            state,
            actions
        }))
    }
});

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
