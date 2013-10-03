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

  var placeRook = function(keyArray, partialSolution){
    if(keyArray.length === 0){
      return partialSolution;
    }else{
      var row = [];
      // build row
      for(var i = 0; i < n; i++){
        if(i === keyArray[0]){
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

  var keysArray = [];
  var currentLevel = n;

  var keyGenerator = function(partialSolution, currentLevel){
    if(currentLevel === 0){
      keysArray.push(partialSolution);
      return;
    }
    for(var i = (n-currentLevel); i < n; i++){
      // building the entire matrix e.g. [0, 1, 2]
      var subResults = [];
      subResults.push(i);
      keyGenerator(partialSolution.concat(subResults), currentLevel - 1);
    }
  };
  keyGenerator([], n);


  console.log('Number of solutions for ' + n + ' rooks:', keysArray.length);
  return keysArray.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = [];
  
  var possibleSolutions = this.countNRooksSolutions(n);

  // possibleSolutions.each(
  //   if tests pass
  //     great!
  // )
  

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  if(n <= 1){
    return 1;
  }
  var keyArray = _.range(0, n);
  var possibleSolutions = [];
  var currentLevel = n;

  var keyGenerator = function(partialSolution, currentLevel, keyArray){
    if(currentLevel === 0){
      possibleSolutions.push(partialSolution);
      return;
    }
    for(var i = (n-currentLevel); i < n; i++){
      // // building the entire matrix e.g. [0, 1, 2]
      // var subResults = [];
      // subResults.push(i);
      // keyGenerator(partialSolution.concat(subResults), currentLevel - 1);
      var row = [];
      // build row
      for(var j = 0; j < n; j++){
        if(j === keyArray[i]){
          row.push(1);
        }else{
          row.push(0);
        }
      }
      var tempSolution =  [];
      tempSolution.push(row);
      keyGenerator(partialSolution.concat(tempSolution), currentLevel - 1, keyArray);
    }
  };
  keyGenerator([], n, keyArray);
  
  var queenMatrix = _.filter(possibleSolutions, function(matrix){
    var tempBoard = new Board(matrix);
    if(!tempBoard.hasAnyMajorDiagonalConflicts() && !tempBoard.hasAnyMinorDiagonalConflicts()){
      console.log('check matrix', matrix);
      return matrix;
    }
  });

  console.log('Number of solutions for ' + n + ' queens:', queenMatrix.length);
  return queenMatrix.length;
};
