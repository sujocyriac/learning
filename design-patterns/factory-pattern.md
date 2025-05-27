### 🏭 Factory Pattern

The Factory Pattern is a creational design pattern that provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.

---

#### 🚗 Example: Vehicle Factory (JavaScript)

```js
// Factory pattern example.
class Car {
   constructor() {
      this.builder();
   }
   builder() {
      console.log('A Car is built');
   }
}

class Bus {
   constructor() {
      this.builder();
   }
   builder() {
      console.log('A Bus is built');
   }
}

class Geep {
   constructor() {
      this.builder();
   }
   builder() {
      console.log('A Geep is built');
   }
}

class VechicleFactory {
   constructor(vechileType) {
      switch (vechileType) {
         case 'CAR':
            return new Car();
         case 'BUS':
            return new Bus();
         case 'GEEP':
            return new Geep();
         default:
            throw new Error('vechileType unknown');
      }
   }
}

new VechicleFactory('BUS');
new VechicleFactory('GEEP');
new VechicleFactory('CAR');
```

---

#### 🛠️ Simpler Factory Example

```js
class VechicleFactory {
   static createVechile(vechileType) {
      const avialbleVechileTypes = {
         CAR: Car,
         BUS: Bus,
         GEEP: Geep,
      };
      const vechile = avialbleVechileTypes[vechileType];
      if (vechile) {
         return new vechile();
      } else {
        throw new Error("invalid vechile");
      }
   }
}

VechicleFactory.createVechile('BUS');
VechicleFactory.createVechile('GEEP');
VechicleFactory.createVechile('CAR');
```

---

### ✅ Why it's a Factory Pattern
- The `VechicleFactory` class acts as a factory: it decides which subclass to instantiate (`Car`, `Bus`, or `Geep`) based on input (`vechileType`).
- This pattern encapsulates the object creation logic, so the calling code doesn't need to know the class names or construction details.

---

### ❓ “Where have you used the Factory Pattern in your React projects?”

#### ✅ Sample Answer
> "In one of my React projects, I used the Factory Pattern to render different UI components based on dynamic data types. For example, in a dashboard app, we had to render different widgets — like charts, tables, and text blocks — based on a configuration received from the backend. Instead of writing long conditional logic in JSX, I used a component factory to map types to components and return the appropriate one."

---

#### 🧩 React Example: Widget Factory

```js
// Components
const TextWidget = () => <div>Text Widget</div>;
const ChartWidget = () => <div>Chart Widget</div>;
const TableWidget = () => <div>Table Widget</div>;
const DefaultWidget = () => <div>Default Widget</div>;
```

```js
// Factory function to create widgets based on type
const WidgetFactory = ({type, ...props}) => {
    const widgetTypes = {
        text: TextWidget,
        chart: ChartWidget,
        table: TableWidget,
    };
    const WidgetComponent = widgetTypes[type] || DefaultWidget;
    return <WidgetComponent {...props} />;
}
```

```js
// Usage in a React component
const Dashboard = ({widgets}) => {
    return (
        <div>
            {widgets.map((widget, index) => (
                <WidgetFactory key={index} type={widget.type} className="text-2x" />
            ))}
        </div>
    );
};
```

---
