### what is adapter pattern?

The Adapter Pattern is a structural design pattern that allows objects with incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces by converting the interface of one class into an interface that the client expects. This pattern is particularly useful when you want to use an existing class, but its interface does not match the one you need.

### when to use adapter pattern?
1. **Incompatible Interfaces**: When you have a class that you want to use, but its interface does not match the one required by your application.
2. **Legacy Code**: When you need to integrate legacy code with new code, and the legacy code has an incompatible interface.
3. **Third-Party Libraries**: When you want to use a third-party library that has an interface different from your application's requirements.
4. **Code Reusability**: When you want to reuse existing code without modifying it, and the existing code has an incompatible interface.

### example of adapter pattern
```js
 function printName(name) {
     console.log(`Name: ${name}`);
 }

 function printFullName({fname: firstName, lname: lastName}) {
     console.log(`Full Name: ${firstName} ${lastName}`);    

 }

 funntion printNameAdapter(fn) {

        return funnction(name) {

            if() (typeof name === 'string') {
                printName(name);
            } else if (typeof name === 'object' && name.fname && name.lname) {
                printFullName(name);
            } else {
                console.error('Invalid input');
            }

        }
     
 }
```