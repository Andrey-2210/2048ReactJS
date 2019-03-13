function getTouches(evt) {
    return evt.touches
}   

class Swipe{
    constructor(){
        this.xDown = null;                                                        
        this.yDown = null;
    }

                                                  

    handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        this.xDown = firstTouch.clientX;                                      
        this.yDown = firstTouch.clientY;                                      
    };                                                

    handleTouchMove(evt) {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        let xUp = evt.touches[0].clientX;                                    
        let yUp = evt.touches[0].clientY;

        let xDiff = this.xDown - xUp;
        let yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
            
            } else {
                /* right swipe */
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* up swipe */ 
            } else { 
                /* down swipe */
            }                                                                 
        }
        this.xDown = null;
        this.yDown = null;                                             
    };
}

export default new Swipe();