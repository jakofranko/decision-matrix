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
