'use strict';

export default class Directive {

    constructor () {
        this.restrict = '';
        this.template = '';
        this.templateNamespace = 'html';
        this.templateUrl = '';
    }

    controller () {}
    link (iScope, iElement, iAttrs, controller, transcludeFn) {}
    compile (tElement, tAttrs, transclude) {}

    asDirective () {
        var constructor = this.constructor;
        var ogCompile = this._cloneFn(this.constructor.prototype.compile);

        this._override(constructor.prototype, 'compile', function () {
            return function () {
                ogCompile.apply(this, arguments);

                if (constructor.prototype.link) {
                    return constructor.prototype.link.bind(this);
                }
            };
        });

        let injectables = constructor.$inject || [];
        let factoryArray = injectables.slice();

        factoryArray.push((...args) => {
            var instance = new constructor(...args);
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }

    _cloneFn (original) {
        return function () {
            return original.apply(this, arguments);
        };
    }

    _override(object, methodName, callback) {
        object[methodName] = callback(object[methodName]);
    }
}
