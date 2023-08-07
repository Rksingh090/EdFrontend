import { useEffect } from 'react';

export function useOutsideAlerter(ref, exceptRef, cb) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            // if(exceptRef.current && exceptRef.current.contains(event.target)){
            //     console.log("except click")
            // }else{
            //     cb();
            //     console.log("outside click")
            // }
        }
        console.log(exceptRef.current && exceptRef.current.contains(event.target));
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, exceptRef]);
  }