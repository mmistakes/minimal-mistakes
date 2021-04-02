

function solution(bridge_length, weight, truck_weights) {
    var answer = 0;

    var eTruck = truck_weights.slice();

    var curr = Array.from({length: bridge_length}, () => 0);

    var time = 0;

    while( eTruck.length != 0) {
        
        answer ++;
        curr.splice(0, 1);

        var totalW = curr.reduce((a, c) => a + c);
        if( totalW + eTruck[0] <= weight) {
            
            curr.push(eTruck.splice(0,1)[0]);
        } else {
            curr.push(0);
        }
    }

    var lastW = curr.reduce((a, c) => a + c);
    if( lastW > 0) {
        while( curr.length > 0) {
            curr.splice(0, 1);
            answer ++;
        }
    }

    console.log('answer', answer);

    return answer;
}



// solution(2, 10, [7,4,5,6,2]);
// solution(2, 10, [1,2,3,4]);
// solution(100, 100, [10]);

function soultion2(n) {

    var arr = new Array(n);

    var curr = 1;

    for( var i = 1; i < n + 1; i ++) {
        var z = n - i + 1;
        if( z % 2 == 0) {
            for( var j = 1; j < z + 1; j ++) {
                
                console.log('j : ' + j + ', curr : ' + curr);
                curr ++;
            }
        } else {
            for( var j = 1; j < z + 1; j ++) {
                
                console.log('j : ' + j + ', curr : ' + curr);
                curr ++;
            }

        }
    }

}

soultion2(6)