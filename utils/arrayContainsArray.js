function arrayContainsArray(superset, subset) {
  // console.log('\n====arrayContainsArray: superset====\n');
  // console.log(superset);
  // console.log('====arrayContainsArray: subset====\n');
  // console.log(subset);
  if (0 === subset.length || superset.length < subset.length) {
    // console.log('\n====subset.length || superset.length < subset.length: false====\n');
    return false;
  }
  for (var i = 0; i < subset.length; i++) {
    // console.log('\n====loop====\n');
    // console.log(subset[i] + ',superset.indexOf(subset[i]): ' + superset.indexOf(subset[i]));
    if (superset.indexOf(subset[i]) === -1) return false;
  }
  return true;
}

export default arrayContainsArray;
