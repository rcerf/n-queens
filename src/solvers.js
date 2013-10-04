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

  var solutionsArray = [];
  var masterKey =_.range(0,n);
  var currentLevel = n;

  var keyGenerator = function(partialSolution, currentLevel, masterKey){
    if(currentLevel === 0){
      solutionsArray.push(partialSolution);
      return;
    }
    for(var i = 0; i < masterKey.length; i++){
      // building the entire matrix e.g. [0, 1, 2]
      var subResults = [];
      subResults.push(masterKey[i]);
      keyGenerator(partialSolution.concat(subResults), currentLevel - 1, masterKey.slice(0,i).concat(masterKey.slice(i+1)));
    }
  };
  keyGenerator([], n, masterKey);


  console.log('Number of solutions for ' + n + ' rooks:', solutionsArray.length);
  return solutionsArray.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = this.countNQueensSolutions(n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  if(n <= 1){
    return 1;
  }
  n = 4;

  var solutionsArray = [];
  var masterKey = _.range(0, n);
  var currentLevel = n;
  var keyGenerator = function(partialSolution, currentLevel, masterKey){
    if(currentLevel === 0){
      solutionsArray.push(partialSolution);
      console.log(partialSolution);
      return;
    }
    
    // call queenKey here
    var queenKey = queenKeyGenerator(masterKey, partialSolution, currentLevel);

    for(var i = 0; i < queenKey.length; i++){
      // building the entire matrix e.g. [0, 1, 2]
      var subResults = [];
      //i === location of queen
      subResults.push(queenKey[i]);
      // trim for queens
      var returnKey = _.filter(masterKey, function(value){
        if(value !== queenKey[i]){
          return value;
        }
      });
      keyGenerator(partialSolution.concat(subResults), currentLevel - 1, returnKey);
    }
  };

  var queenKeyGenerator = function(masterKey, partialSolution, currentLevel){
    var difference = n - currentLevel;
    var queenKey =  masterKey.slice(0);
    for(var j = 0; j < partialSolution.length; j++){
      var minorDiag = partialSolution[j] - difference;
      var majorDiag = partialSolution[j] + difference;
      difference--;
      queenKey = _.filter(queenKey, function(value) {
        if(value !== minorDiag && value !== majorDiag){
          return value;
        }
      });
    }
    return queenKey;
  }
  debugger;
  keyGenerator([], n, masterKey);
  console.log('Number of solutions for ' + n + ' queens:', solutionsArray.length);
  return solutionsArray.length;

  // var keyTrim = function(keyArray, i, currentLevel){
  //   var difference = n - currentLevel;
  //   if(currentLevel === 0){
  //     return keyArray.slice(1);
  //   }
  //   var subKey = keyArray.slice(0);
  //   subKey[n - currentLevel - (n - subKey.length)] = _.filter(subKey[n-currentLevel - (n - subKey.length)], function(value){
  //     if(value !== i-difference && value !== i && value !== i + difference){
  //       return value;
  //     }
  //   });
  //   return keyTrim(subKey, i, currentLevel -1);
  // }

  

  // if(n <= 1){
  //   return 1;
  // }
  // var keyArray = _.range(0, n);
  // var possibleSolutions = [];
  // var currentLevel = n;

  // var keyGenerator = function(partialSolution, currentLevel, keyArray){
  //   if(currentLevel === 0){
  //     possibleSolutions.push(partialSolution);
  //     return;
  //   }
  //   for(var i = (n-currentLevel); i < n; i++){
  //     // // building the entire matrix e.g. [0, 1, 2]
  //     var row = [];
  //     // build row
  //     for(var j = 0; j < n; j++){
  //       if(j === keyArray[i]){
  //         row.push(1);
  //       }else{
  //         row.push(0);
  //       }
  //     }
  //     var tempSolution =  [];
  //     tempSolution.push(row);
  //     keyGenerator(partialSolution.concat(tempSolution), currentLevel - 1, keyArray);
  //   }
  // };
  // keyGenerator([], n, keyArray);
  
  // var queenMatrix = _.filter(possibleSolutions, function(matrix){
  //   var tempBoard = new Board(matrix);
  //   if(!tempBoard.hasAnyMajorDiagonalConflicts() && !tempBoard.hasAnyMinorDiagonalConflicts()){
  //     console.log('check matrix', matrix);
  //     return matrix;
  //   }
  // });

  // console.log('Number of solutions for ' + n + ' queens:', queenMatrix.length);
  // return queenMatrix.length;
};
