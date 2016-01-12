# angular-es2015
An attempt to make angular 1.x Directives class-based &amp; object-oriented

Derived from Micahel Bromley's [angular-es6](https://github.com/michaelbromley/angular-es6) code. It was a great resource getting to scoping of compile and link to play nice. 

I drew some inspiration from Django CBV's (Class-Based-Views), which was a relatively new development in Django 1.5 to supplement the old FBV (Function-Based-Views). It was called in the url router as `Foo.as\_view()` instead of `foo()`. 

This is only proven with Browserify and Babel 6.0.x, and is untested with WebPack, JSPM, TypeScript, Traceur, or any other bundler/transpiler (for now).

## Usage

The Directive base-class is intended to be inherited.

    //index.js
    import { MyDirective } from './es2015-directive.js';
	
	angular.module('MyModule', [])
		.directive('myDirective', (new MyDirective()).asDirective());


    //es2015-directive.js
    import '../core/directive';

    export default class MyDirective extends Directive {

		/* @ngInject */
		constructor ($rootScope, $http, fooService) {
			//required to initialize directive properties
			super();

			//Uses es2015 Object.assign to attach services to be used in methods
			Object.assign(this, {$rootScope, $http, fooService})
			
			this.template = `<div class="my-directive-inner>
				<span>{{ message }}</span>
			</div>`;

			this.scope = {
				myMessage: '@'
			};
		}

		link (iScope, iElement, iAttrs) {
			iElement.addClass('my-directive');
		}
    }
