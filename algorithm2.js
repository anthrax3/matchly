var clone = require('clone');

var Rumble = {
  calculatematchScore: function(visitor, host) {
    // console.log(visitor);
    // console.log(host);
    var score=0;
    // console.log(visitor.Characteristics['State'],'visitor State');
    // console.log(host.Characteristics['State'], 'host State');
    if(visitor.Characteristics['Gender'] === host.Characteristics['Gender']) {
        // console.log('Gender fires');
        score++;
    }
    if(visitor.Characteristics['State'] === host.Characteristics['State']) {
        // console.log('State fires');
        score++;
    }
    if(visitor.Characteristics['City'] === host.Characteristics['City']) {
        // console.log('City fires');
        score++;
    }    
    if(visitor.Characteristics['Industry'] === host.Characteristics['Industry']) {
        // console.log('Industry fires');
        score++;
    }
    if(visitor.Characteristics['Employer'] === host.Characteristics['Employer']) {
        // console.log('Employer fires');
        score++;
    }
    if(visitor.Characteristics['Undergrad'] === host.Characteristics['Undergrad']) {
        // console.log('Undergrad fires');
        score++;
    }if(visitor.Characteristics['Citizenship'] === host.Characteristics['Citizenship']) {
        // console.log('Citizenship fires');
        score++;
    }
    if(visitor.Characteristics['Country'] === host.Characteristics['Country']) {
        // console.log('Country fires');
        score++;
    }
    if(visitor.Characteristics['Military'] === host.Characteristics['Military']) {
        // console.log('Military fires');
        score++;
    }
    // console.log(score, 'this is the score');
    // console.log('host',host.Characteristics,'visitor',visitor.Characteristics,'score',score);
    return score;
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
  ClassAvailable:function(constraintObject, specificClass,score) {
    // console.log('ClassAvailable',constraintObject[specificClass],score);
    if(constraintObject[specificClass].availableSpots>0 || score > constraintObject[specificClass].lowestScore ){
      return true;
    }
    return false;
  },


  visitorHostParings: function(visitorArray,hostArray) {
    function Match(visitorFirstName,visitorLastName, hostFirstName, hostLastName, hostEmail, section, visitTime) {
      this.visitorName=visitorFirstName+" "+visitorLastName;
      this.hostName=hostFirstName+" "+hostLastName;
      this.hostEmail=hostEmail;
      this.section=section;
      this.visitTime=visitTime;
    }
    var matches = visitorArray.map(function(visitor){
      var host=hostArray[visitor.MatchInfo.matchIndex];
      var m = new Match(visitor.Contact.First,visitor.Contact.Last,host.Contact.First,host.Contact.Last,host.Contact.Email,host.MatchInfo.Section,visitor.MatchInfo.classVisitTime);
      return m;
    });

    return matches;
  },
  SectionCapacity:function(constraintObject) {
    var sections=['A','B','C','D','E'];
    var capacity=[];
    for(var l=0;l<sections.length;l++) {
      for(var m=1;m<4;m++) {
        var section=sections[l]+m.toString();
        // console.log(section,'section');
        capacity.push([constraintObject[section].availableSpots,section]);
      }
    }
    return capacity;
  },

  SectionReport:function(constraintObject,originalCapacity) {
    //this is not working it is giving incorrect numbers for visitors
    var sections=['A','B','C','D','E'];
    var classVisitorNumbers=[];
    for(var l=0;l<sections.length;l++) {
      for(var m=1;m<4;m++) {
        var section=sections[l]+m.toString();
        console.log(originalCapacity);
        var numberOfVisitors=originalCapacity[l][0] - constraintObject[section].availableSpots;
        console.log(numberOfVisitors);
        classVisitorNumbers.push(numberOfVisitors);
        //need to know how many stdudent we could have had
      }
    }
    return classVisitorNumbers;
  },
  
  rumble: function(visitorArray, hostArray, constraintObject) {
    visitorArray=visitorArray.sort(function(a,b){
      return a.Contact.First - b.Contact.First;
    });

    constraintObject=constraintObject[0];
    var bool = true;
    var whileCount=0;
    var originalCapacity=this.SectionCapacity(constraintObject);
    console.log(originalCapacity,'originalCapacity');

    while(bool) {
      
      whileCount++;
      console.log('whileCount ', whileCount);
      bool=false;
      
      for(var i = 0; i<visitorArray.length; i++) {
        var unmatched=0;
        var availableSpots=0;
        for(var j=0;j<visitorArray.length;j++) {
        if(visitorArray[j].MatchInfo.matchIndex === null) {
          unmatched++;
        }
      }
      availableSpots=availableSpots+constraintObject.A3.availableSpots;
      availableSpots=availableSpots+constraintObject.B3.availableSpots;
      availableSpots=availableSpots+constraintObject.C3.availableSpots;
      availableSpots=availableSpots+constraintObject.D3.availableSpots;
      availableSpots=availableSpots+constraintObject.E3.availableSpots;
      availableSpots=availableSpots+constraintObject.A2.availableSpots;
      availableSpots=availableSpots+constraintObject.B2.availableSpots;
      availableSpots=availableSpots+constraintObject.C2.availableSpots;
      availableSpots=availableSpots+constraintObject.D2.availableSpots;
      availableSpots=availableSpots+constraintObject.E2.availableSpots;
      availableSpots=availableSpots+constraintObject.A1.availableSpots;
      availableSpots=availableSpots+constraintObject.B1.availableSpots;
      availableSpots=availableSpots+constraintObject.C1.availableSpots;
      availableSpots=availableSpots+constraintObject.D1.availableSpots;
      availableSpots=availableSpots+constraintObject.E1.availableSpots;
      
      // console.log('unmatched ', unmatched, ' availableSpots ',availableSpots);
        if(visitorArray[i].MatchInfo.matchIndex === null) {
          bool = true;
          var bestmatchScore=-1;
          var bestMatchIndex;
          var classNumber=visitorArray[i].MatchInfo.classVisitTime;
          for(var k =0; k<hostArray.length; k++) {
            var currentScore=this.calculatematchScore(visitorArray[i],hostArray[k]);
            // console.log(currentScore,'currentScore');
            var hostCurrentScore=hostArray[k].MatchInfo;
            //constraint determining if visitor choose current host as best match
              //is the current host a better match than your existing best match
              //is the current visitor a better match than the current hosts existing match
              //is the specific class not full or is the potential match better than the worst match in the specific class
              var hostCurrentmatchScore=hostArray[k].MatchInfo[classNumber].matchScore;
              
              var hostClass=this.SpecificClass(visitorArray[i],hostArray[k]);
              var classAvailable=this.ClassAvailable(constraintObject,hostClass,currentScore);
              // console.log('visitor', i,'host',k,'host existing score',hostCurrentmatchScore, 'currentScore',currentScore,'bestscore',bestmatchScore,'bestmatch', bestMatchIndex,classAvailable,'classAvailable');

            if (currentScore>bestmatchScore && currentScore>hostCurrentmatchScore &&  classAvailable===true) {
              bestmatchScore=currentScore;
              bestMatchIndex=k;
            }//closes currentScore>bestmatchScore
          }//closes var j =0; j<hostArray.length; j++
          var visitor=visitorArray[i];
          var host=hostArray[bestMatchIndex]; 
          //determineQuadrant determines which quadrant we are in for assigning matches
          //this looks like 'firstClass'
          
          var specificClass = this.SpecificClass(visitorArray[i],hostArray[bestMatchIndex]);
          var hostEmail=hostArray[bestMatchIndex].Contact.Email;
          var quadrant=this.determineQuadrant(visitor, host, constraintObject);
          // console.log(quadrant,"this is the quadrant");
          switch (quadrant) {
            case "matchedFull":
            // console.log('matchedFull fires', 'host',bestMatchIndex,'visitor',i);
              //pick up old match info
              var originalMatchIndex=hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex;
              // console.log(originalMatchIndex,'originalMatchIndex');
              //unmatch original Match
              visitorArray[originalMatchIndex].MatchInfo.matchIndex=null;
              visitorArray[originalMatchIndex].MatchInfo.matchScore=-1;
              //assign host to new visitor
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              //assign new visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              //determine lowest score
              var lowestScore=constraintObject[specificClass].lowestScore;
              for(var match in constraintObject[specificClass].matches){

                // console.log(match,'match');
                // console.log(constraintObject[specificClass].matches[match].matchScore,'matchScore');
                if(match.matchScore<lowestScore){
                  lowestScore=match.matchScore;
                  lowestIndex=match;
                
                constraintObject[specificClass].lowestScore=lowestScore;
                constraintObject[specificClass].lowestIndex=lowestIndex;
                }
              }
              // returnObject.push(clone(constraintObject));
              break;
            case "matchedNotFull":
            // console.log('matchedNotFull fires','host',bestMatchIndex,'visitor',i);
              //pickup old match info
              var originalMatchIndex=hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex;
              //unmatch original Match
              visitorArray[originalMatchIndex].MatchInfo.matchIndex=null;
              visitorArray[originalMatchIndex].MatchInfo.matchScore=-1;
              //assign new visitor to host
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              var worstmatchScore=constraintObject[specificClass].worstmatchScore;
              if(bestmatchScore<worstmatchScore) {
                constraintObject[specificClass].lowestScore=bestmatchScore;
                constraintObject[specificClass].lowestIndex=hostEmail;
              }
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              //delete exists
              delete constraintObject[specificClass].matches.exists;
              // returnObject.push(clone(constraintObject));
              break;
            case "notMatchedFull":
            // console.log("notMatchedFull fires",'host',bestMatchIndex,'visitor',i);
              //run quadrant 3 function
              //find worst match and unmatch
              var classHostEmail=constraintObject[specificClass].lowestIndex;
              // console.log(classHostEmail,'class host email');
              //host index
              // console.log(constraintObject[specificClass],'specificClass');

              var hostIndex=constraintObject[specificClass].matches[classHostEmail].hostIndex;
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
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              //delete exists from object
              delete constraintObject[specificClass].matches.exists;
              //determine lowest index and assign new host to lowest index
              var lowestScore=constraintObject[specificClass].lowestScore;
              for(var match in constraintObject[specificClass].matches){
                if(match.matchScore<lowestScore){
                  lowestScore=match.matchScore;
                  lowestIndex=match;
                
                constraintObject[specificClass].lowestScore=lowestScore;
                constraintObject[specificClass].lowestIndex=lowestIndex;
                }
              }
              // returnObject.push(clone(constraintObject));
              break;
            case "notMatchedNotFull":
              // console.log("notMatchedNotFull fires",'host',bestMatchIndex,'visitor',i);
              //assign host to visitor
              visitorArray[i].MatchInfo.matchIndex=bestMatchIndex;
              visitorArray[i].MatchInfo.matchScore=bestmatchScore;
              //assign visitor to host
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchIndex=i;
              hostArray[bestMatchIndex].MatchInfo[classNumber].matchScore=bestmatchScore;
              //assign both to class
              // console.log('before if');
              var lowestScore=constraintObject[specificClass].lowestScore;
              if(bestmatchScore<lowestScore){
              // console.log('if fires');
                constraintObject[specificClass].lowestScore=bestmatchScore;
                constraintObject[specificClass].lowestIndex=hostEmail;  
              }
              // console.log('afte if');
              // console.log(hostEmail,'Email');
              constraintObject[specificClass].matches[hostEmail]={
                hostIndex: bestMatchIndex,
                hostClass: classNumber,
                visitorIndex: i,
                matchScore: bestmatchScore
              };
              delete constraintObject[specificClass].matches.exists;
              // console.log(constraintObject[specificClass].matches['rob'],'rob');
              // console.log(constraintObject,'constraintObject immediately after');
              // console.log(constraintObject[specificClass].matches['rob'],'rob');
              constraintObject[specificClass].availableSpots--;
              // returnObject.push(clone(constraintObject));
              //
              break;
          }
          // console.log(constraintObject,'constraintObject');
        }//close visitorArray[i].MatchInfo.matchIndex === null
      }//close first for loop
      // break;
    }//while loop
    // console.log('end of rumble');
    var visitorHostParings=this.visitorHostParings(visitorArray,hostArray,constraintObject);
    var sectionReport=this.SectionReport(constraintObject,originalCapacity);
    return [visitorHostParings,sectionReport];
  }//close rumble
};

//to do:
//add worst matchScore=-1 and worst match index=null to constraintObject
//add if statement to matching to determin if you are the best match for the host and better than the worst match in the class or is there room
module.exports=Rumble;



