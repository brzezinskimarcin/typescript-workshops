/*
  3 - Classes
*/
// --- 1
// Define abstract class Shape, that contains:
//   name of the shape
//   public logInfo() method, that logs the name of the shape and result from getArea() method
//   abstract getArea method that should be implemented by all subclasses
// Define Circle and Rectangle classes, inheriting from Shape
// Define Square class inheriting from Rectangle
// Define logShapeInfo function, which will accept the class name as the parameter, will construct that class and call its logInfo method.
// For now, when defining function above you can use "any" type for binding constructor arguments (for example 'circle', 2 in line below) to constructor function.

logShapeInfo(Circle, 'circle', 2); // "Name: circle, area: 12.56"
logShapeInfo(Rectangle, 'rectangle', 10, 5); // "Name: rectangle, area: 50" 
logShapeInfo(Square, 'square', 7); // "Name: square, area: 49"

// --- 2

// A couple years ago browsers started introducing the concept od web components.
// Web Components are basically custom HTML elements that you can use in your template,
// just like other default elements (i.e. paragraph <p>).
// You can define them by creating class extending from HTMLElement and then calling
// window.customElements.define('tag', ClassDeclaration);
// After the line above is executed, each <tag></tag> occurence will be replaced with
// your implementation.

// Web Components introduce also the concept of Shadow DOM, which works just as the normal DOM, but
// it's encapsulated and rendered separately from the main document. In this way you can keep your
// element features private, without fear of collision with other parts of the document.

// When defining web components you can also specify callback functions,which affect its behavior:
//   connectedCallback(): void; Invoked when the custom element is first connected to the document's DOM.
//   disconnectedCallback(): void; Invoked when the custom element is disconnected from the document's DOM.
//   adoptedCallback(): void; Invoked when the custom element is moved to a new document.
//   attributeChangedCallback(): void; Invoked when one of the custom element's observed attributes is added, removed, or changed.
//   you can specify observed attributes in static getter called `observedAttributes`, that should return array of strings with observed attribute names

// --- Example
// https://codepen.io/MarcinBrze/pen/XWVBzJz


// Define 'todo-list' web component that can be used as follows:
// <todo-list
//   title="TODO"
//   list-items='["First item on the list", "Second item on the list", "Third item on the list", "Fourth item on the list", "Fifth item on the list"]'
//   add-item-text="Add new list item:"
// >
// </todo-list>
// 'title' is shown at the top of the list and should be reactive (so when changing the attribute the title should get updated).
// 'list-items' is initial list of todos and do not need to be reactive. 
// 'add-item-text' is a text shown next to input, that allows to add new todos to the list.
// on the right side of each todo there should be a button that allows to remove the todo from the list.

// --- 3
// BONUS question: why there is an error below?

class MyClass {
  someMethod() { }
}
let x: MyClass;

// @ts-expect-error
x = MyClass; // Property 'someMethod' is missing in type 'typeof MyClass' but required in type 'MyClass'.

// ignore this
export {};