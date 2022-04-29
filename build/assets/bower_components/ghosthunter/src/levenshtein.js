// Adapted from https://github.com/pseudonym117/Levenshtein
(function(root, factory){
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        define(function(){
            return factory(root);
        });
    } else if (typeof module == 'object' && module && module.exports) {
        module.exports = factory(root);
    } else {
        root.Levenshtein = factory(root);
    }
}(this, function(root){

    function forEach( array, fn ) { var i, length
        i = -1
        length = array.length
        while ( ++i < length )
            fn( array[ i ], i, array )
    }

    function map( array, fn ) { var result
        result = Array( array.length )
        forEach( array, function ( val, i, array ) {
            result.push( fn( val, i, array ) )
        })
        return result
    }

    function reduce( array, fn, accumulator ) {
        forEach( array, function( val, i, array ) {
            accumulator = fn( val, i, array )
        })
        return accumulator
    }

    // For string mode
    function getChar(str, idx) {
        return str.charAt(idx);
    }

    // For array mode
    function getArrayMember(arr, idx) {
        return arr[idx];
    }

    // Levenshtein distance
    function Levenshtein( str_m, str_n ) {
        var previous, current, matrix, getElem
        // Set to string or array mode
        if (typeof str_m === "string" && typeof str_n === "string") {
            getElem = getChar;
        } else if (typeof str_m === "object" && typeof str_n === "object") {
            getElem = getArrayMember;
        } else {
            throw "Levensthtein: input must be two strings or two arrays"
        }
        // Constructor
        matrix = this._matrix = []

        // Sanity checks
        if ( str_m == str_n )
            return this.distance = 0
        else if ( str_m == '' )
            return this.distance = str_n.length
        else if ( str_n == '' )
            return this.distance = str_m.length
        else {
            // Danger Will Robinson
            previous = [ 0 ]
            forEach( str_m, function( v, i ) { i++, previous[ i ] = i } )

            matrix[0] = previous
            forEach( str_n, function( n_val, n_idx ) {
                current = [ ++n_idx ]
                forEach( str_m, function( m_val, m_idx ) {
                    m_idx++
                    if ( getElem(str_m, m_idx - 1) == getElem(str_n, n_idx - 1) )
                        current[ m_idx ] = previous[ m_idx - 1 ]
                    else
                        current[ m_idx ] = Math.min
                            ( previous[ m_idx ] + 1        // Deletion
                            , current[ m_idx - 1 ] + 1     // Insertion
                            , previous[ m_idx - 1 ] + 1    // Subtraction
                            )
                })
                previous = current
                matrix[ matrix.length ] = previous
            })

            return this.distance = current[ current.length - 1 ]
        }
    }

    Levenshtein.prototype.toString = Levenshtein.prototype.inspect = function inspect ( no_print ) { var matrix, max, buff, sep, rows
        matrix = this.getMatrix()
        max = reduce( matrix,function( m, o ) {
            return Math.max( m, reduce( o, Math.max, 0 ) )
        }, 0 )
        buff = Array( ( max + '' ).length ).join( ' ' )

        sep = []
        while ( sep.length < (matrix[0] && matrix[0].length || 0) )
            sep[ sep.length ] = Array( buff.length + 1 ).join( '-' )
        sep = sep.join( '-+' ) + '-'

        rows = map( matrix, function( row ) { var cells
            cells = map( row, function( cell ) {
                return ( buff + cell ).slice( - buff.length )
            })
            return cells.join( ' |' ) + ' '
        })

        return rows.join( "\n" + sep + "\n" )
    }

    // steps to get from string 1 to string 2
    Levenshtein.prototype.getSteps = function()     {
        var steps, matrix, x, y, u, l, d, min
        steps = []
        matrix = this.getMatrix()
        x = matrix.length - 1
        y = matrix[0].length - 1
        while(x !== 0 || y !== 0)     {
            u = y > 0 ? matrix[x][y-1] : Number.MAX_VALUE
            l = x > 0 ? matrix[x-1][y] : Number.MAX_VALUE
            d = y > 0 && x > 0 ? matrix[x-1][y-1] : Number.MAX_VALUE
            min = Math.min(u, l, d)
            if(min === d) {
                if(d < matrix[x][y]) {
                    steps.push(['substitute', y, x])
                }//  else steps.push(['no-op', y, x])
                x--
                y--
            } else if(min === l) {
                steps.push(['insert', y, x])
                x--
            } else {
                steps.push(['delete', y, x])
                y--
            }
        }
        return steps
    }

    Levenshtein.prototype.getMatrix = function () {
        return this._matrix.slice()
    }

    Levenshtein.prototype.valueOf = function() {
        return this.distance
    }

    return Levenshtein

}));
