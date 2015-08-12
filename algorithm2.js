
var Rumble = {
  calculateMatchScore: function(visitor, host) {
    // console.log(visitor);
    // console.log(host);
    var score=0;
    // console.log(visitor.Characteristics['State'],'visitor State');
    // console.log(host.Characteristics['State'], 'host State');
    if(visitor.Characteristics['Gender'] === host.Characteristics['Gender']) {
        console.log('Gender fires');
        score++;
    }
    if(visitor.Characteristics['State'] === host.Characteristics['State']) {
        console.log('State fires');
        score++
    }
    if(visitor.Characteristics['City'] === host.Characteristics['City']) {
        console.log('City fires');
        score++;
    }    
    if(visitor.Characteristics['Industry'] === host.Characteristics['Industry']) {
        console.log('Industry fires');
        score++;
    }
    if(visitor.Characteristics['Employer'] === host.Characteristics['Employer']) {
        console.log('Employer fires');
        score++;
    }
    if(visitor.Characteristics['Undergrad'] === host.Characteristics['Undergrad']) {
        console.log('Undergrad fires');
        score++;
    }if(visitor.Characteristics['Citizenship'] === host.Characteristics['Citizenship']) {
        console.log('Citizenship fires');
        score++;
    }
    if(visitor.Characteristics['Country'] === host.Characteristics['Country']) {
        console.log('Country fires');
        score++;
    }
    if(visitor.Characteristics['Military'] === host.Characteristics['Military']) {
        console.log('Military fires');
        score++;
    }
    console.log(score, 'this is the score');
    return score;
  },

  findTotalScore: function(group1) {
    var score=0;
    for(var i = 0; i<group1.length; i++) {
      score = score + group1[i].matchScore;
    }
    return score;
  },

  checkSectionScore: function(visitor, host, constraintObject, currentScore) {
    var sectionKey = host.MatchInfo.section+visitor.MatchInfo.classVisitTime;
    if(currentScore > constraintObject[sectionKey].lowestScore){
      return true;
    } else {
      return false;
    }
  },  

  determineQuadrant: function(visitor,host,constraintObject) {
    
    var hostMatched;
    var classFull;
    var section=host.MatchInfo.Section;
    var classVisitTime=visitor.MatchInfo.classVisitTime.toString();
    var sectionVisit=section+classVisitTime;
    if(host.MatchInfo[classVisitTime].matchIndex===null) {
      hostMatched='notMatched';
    } else {
      hostMatched='matched';
    }
    if(constraintObject[sectionVisit].availableSpots>0){
      classFull='NotFull';
    } else {
      classFull='Full';
    }
    var situation=hostMatched+classFull;
    return situation;
  },
  SpecificClass:function(visitor, host) {
    var section = host.MatchInfo.Section;
    var sectionNumber = visitor.MatchInfo.classVisitTime;
    var specificClass=section+sectionNumber;
    return specificClass;

  },
  
  rumble: function(visitorArray, hostArray, constraintObject) {
    constraintObject=constraintObject[0];
    var bool = true;
    while(bool) {
      bool=false;
      for(var i = 0; i<visitorArray.length; i++) {
        if(visitorArray[i].MatchInfo.matchIndex === null) {
          bool = true;
          var bestMatchScore=-1;
          var bestMatchIndex;
          for(var k =0; k<hostArray.length; k++) {
            var currentScore=this.calculateMatchScore(visitorArray[i],hostArray[k]);
            // console.log(currentScore,'currentScore');
            var hostCurrentScore=hostArray[k].MatchInfo;
            if (currentScore>bestMatchScore) {
              bestMatchScore=currentScore;
              bestMatchIndex=k;
            }//closes currentScore>bestMatchScore
          }//closes var j =0; j<hostArray.length; j++
          var visitor=visitorArray[i];
          var host=hostArray[bestMatchIndex]; 
          //determineQuadrant determines which quadrant we are in for assigning matches
          //this looks like 'firstClass'
          var classNumber=visitorArray[i].MatchInfo.classVisitTime;
          var specificClass = this.SpecificClass(visitorArray[i],hostArray[bestMatchIndex]);
          var hostEmail=hostArray[bestMatchIndex].Contact.Email;
          var quadrant=this.determineQuadrant(visitor, host, constraintObject);
          switch (quadrant) {
            case "matchedFull":
              //pick up old match info
              var originalMatchIndex=hostArray[bestMatchIndex].MatchInfo[classNumber];
              //unmatch original Match
              visitorArray[originalMatchIndex].MatchInfo.matchIndex=null;
              visitorArray[originalMatchIndex].MatchInfo.matchScore=-1;
              //assign new visitor to host
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestMatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestMatchScore;
              //assign both to class
              
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestMatchScore
              };
              //delete exists from object
              delete constraintObject[specificClass].matches.exists;
              //determine lowest index and assign new host to lowest index
              var lowestScore=1000000000;
              var lowestIndex;
              for(var match in constraintObject[specificClass].matches){
                if(match[matchscore]<lowestScore){
                  lowestScore=match.matchscore;
                  lowestIndex=match;
                }
                constraintObject[specificClass].worstMatchScore=lowestScore;
                constraintObject[specificClass].worstMatchIndex=lowestIndex;
              }

              break;
            case "matchedNotFull":
              //run quadrant 2 function
              //pickup old match info
              var originalMatchIndex=hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex;
              //unmatch original Match
              visitorArray[originalMatchIndex].MatchInfo.matchIndex=null;
              visitorArray[originalMatchIndex].MatchInfo.matchScore=-1;
              //assign new visitor to host
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestMatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestMatchScore;
              //assign both to class
              var worstMatchScore=constraintObject[specificClass].worstMatchScore;
              if(bestMatchScore<worstMatchScore) {
                constraintObject[specificClass].worstMatchScore=bestMatchScore;
                constraintObject[specificClass].worstMatchIndex=hostEmail;
              }
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestMatchScore
              };
              constraintObject.availableSpots--;
              break;
            case "notMatchedFull":
              //run quadrant 3 function
              //find worst match and unmatch
              var classHostEmail=constraintObject[specificClass].worstMatchIndex;
              //host index
              var hostIndex=constraintObject[specificClass].matches[classHostEmail].hostindex;
              //host specific class
              var hostClass=constraintObject[specificClass].matches[classHostEmail].hostClass;
              //visitor index
              var visitorIndex=constraintObject[specificClass].matches[classHostEmail].visitorIndex;
              //delete match from contraint object
              delete constraintObject[specificClass].matches[classHostEmail];
              //unmatch host
              hostArray[hostIndex].MatchInfo[hostClass].matchIndex=null;
              hostArray[hostIndex].MatchInfo[hostClass].matchScore=-1;
              //unmatch visitor
              visitorArray[visitorIndex].MatchInfo.matchIndex=null;
              visitorArray[visitorIndex].MatchInfo.matchScore=-1;
              //assign host to visitor
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestMatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestMatchScore;
              //assign both to class
              
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestMatchScore
              };
              //delete exists from object
              delete constraintObject[specificClass].matches.exists;
              //determine lowest index and assign new host to lowest index
              var lowestScore=1000000000;
              var lowestIndex;
              for(var match in constraintObject[specificClass].matches){
                if(match[matchscore]<lowestScore){
                  lowestScore=match.matchscore;
                  lowestIndex=match;
                }
                constraintObject[specificClass].worstMatchScore=lowestScore;
                constraintObject[specificClass].worstMatchIndex=lowestIndex;
              }

              break;
            case "notMatchedNotFull":
              //assign host to visitor
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestMatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestMatchScore;
              //assign both to class
              var worstMatchScore=constraintObject[specificClass].worstMatchScore;
              if(bestMatchScore<worstMatchScore) {
                constraintObject[specificClass].worstMatchScore=bestMatchScore;
                constraintObject[specificClass].worstMatchIndex=hostEmail;
              }
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestMatchScore
              };
              constraintObject.availableSpots--;
              
              break;
          }

        }//close visitorArray[i].MatchInfo.matchIndex === null
      }//close first for loop
      // break;
    }//while loop
    console.log('end of rumble');
    return[visitorArray,hostArray,constraintObject];
  }//close rumble

};

//to do:
//add worst matchscore=-1 and worst match index=null to constraintObject
//add if statement to matching to determin if you are the best match for the host and better than the worst match in the class or is there room
module.exports=Rumble;



