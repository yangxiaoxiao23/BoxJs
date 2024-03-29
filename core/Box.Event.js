/**
 * Created by YHB on 2014/9/7.
 */

Box.Event = Object.create({
   eventHash: {}
});

Box.include(Box.Event, {

    addEvents: function(events){
        if(Box.isArray(events)){
            Box.each(events, function(index, e, es){
                this.doAddEvent(e);
            });
        } else {
            this.doAddEvent(events);
        }
    },

    doAddEvent: function(event){
        if(Box.isString(event) && typeof Box.Event.eventHash.event === 'undefined'){
            return Box.Event.eventHash.event = [];
        }
    },

    addListen: function(eventName, fn, scope, single){
        var currentEventStack = Box.Event.eventHash.eventName;
        if(typeof currentEventStack === 'undefined'){
            currentEventStack = this.doAddEvent(eventName);
        }

        currentEventStack.push({
            fn: fn,
            scope: scope,
            single: !!single
        });
    },

    one: function(eventName, fn, scope){
        this.addListen(eventName, fn, scope, true);
    },

    fireEvent: function(eventName, scope, param1, param2){
        var currentEventStack = Box.Event.eventHash.eventName;
        if(typeof currentEventStack === 'undefined'){
            throw new Error('not found ' + eventName);
        } else {
            var params = [];
            Box.each(arguments, function(index, param, args){
                if(index > 1){
                    params.push(param);
                }
            });
            Box.each(currentEventStack, function(index, e, es){
                e.fn.apply(scope || e.scope || window, params);
                if(e.single){
                    this.removeListen(eventName, e.fn);
                }
            });
        }
    },

    removeListen: function(eventName, fn){
        var currentEventStack = Box.Event.eventHash.eventName;
        if(typeof currentEventStack === 'undefined'){
            throw new Error('not found ' + eventName);
        } else {
            Box.each(currentEventStack, function(index, e, es){
               if(e.fn == fn){
                   Box.Event.eventHash.eventName.splice(index, 1);
               }
            });
        }
    },

    removeAllListen: function(){
        delete Box.Event.eventHash.eventName;
    }
});

Box.Event.on = Box.Event.addListen;
Box.Event.un = Box.Event.removeListen;
Box.Event.unAll = Box.Event.removeAllListen;