import React, { useEffect, useState } from 'react';
import { ComponentEvent } from '../eventBus/componentEvent';

export const useEventBus = () => {
   const [events, setEvents] = useState<ComponentEvent<any>[]>([]);

   useEffect(() => {
      return () => {
         events.map(item => {
            document.removeEventListener(item.eventType, item.handler)
         })
      }
   }, [])

   const onHandler = (event: string, handler: (data?: any) => void) => {
      setEvents([...events, {eventType: event, handler}])
      document.addEventListener(event, handler)
   }

   const dispatchHandler = (event: string, data?: any) => {
      document.dispatchEvent(new CustomEvent(event, {detail: data}))
   }

   return {
      on: onHandler,
      dispatch: dispatchHandler
   }
}