/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){
  var solution = [];
  if(n === 0){
    return solution;
  }
  var keyArray = _.range(0,n);

  var placeRook = function(keyArray, partialSolution, chooseIndex){
    if(keyArray.length === 0){
      return partialSolution;
    }else{
      var row = [];
      for(var i = 0; i < n; i++){
        if(i === keyArray[chooseIndex]){
          row.push(1);
        }else{
          row.push(0);
        }
      }
      partialSolution.push(row);

      return placeRook(keyArray.slice(1), partialSolution);
    }
  }
  solution = placeRook(keyArray, []);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  if(n <= 1){
    return 1;
  }

  // var solutionCount = _.reduce(_.range(1, n), function(product, value){
  //   return value * product;
  // }, 1);
  var product = 1;
  for(var i = n; i>0; i--){
    product = product * i;
  };
  return product;


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
