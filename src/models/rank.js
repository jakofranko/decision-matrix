/**
 * Rank - A Rank for an option, assigned like `optionVariable.addRank(rank);`
 *
 * @param    {number} criteriaIndex The index of the Criteria in the `criteria` array.
 * @param    {number} rankValue     A numerical value ranking the Option according to the criteria
 * @property {number} criteriaIndex
 * @property {number} rankValue
 * @returns  {Object}               This Rank
 */
export default function Rank(criteriaIndex, rankValue) {
    this.criteriaIndex = +criteriaIndex;
    this.rankValue = +rankValue;

    return this;
}
