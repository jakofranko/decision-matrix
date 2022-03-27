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
export default function Criteria(name, weight = 1) {
    this.name = name;
    this.weight = weight;
    this.setWeight = (weight) => {
        this.weight = weight;
    };
    this.toString = () => this.name;

    return this;
}
