import Rank from './rank';

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
export default function Option(name) {
    this.name = name;
    this.ranks = [];
    this.addRank = (criteriaIndex, rankValue) => {
        const rank = new Rank(criteriaIndex, rankValue);
        this.ranks.push(rank);
        return this;
    };
    this.toString = () => this.name;

    return this;
}
