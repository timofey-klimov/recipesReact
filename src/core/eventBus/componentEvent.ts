export class ComponentEvent<T> {

   constructor(eventType: string, handler: (data: T) => void) {
      this.eventType = eventType;
      this.handler = handler;
   }

   public eventType: string;
   public handler: (data: T) => void;
}