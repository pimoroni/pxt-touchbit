# touch:bit

 [![Build Status](https://travis-ci.org/pimoroni/pxt-touchbit.svg?branch=master)](https://travis-ci.org/pimoroni/pxt-touchbit)

This package adds support for the Pimoroni touchbit:bit to makecode.microbit.org.

An touch:bit is required to use this package, grab yours here: https://shop.pimoroni.com/products/touch-bit

To use this package, go to https://makecode.microbit.org/, click "Advanced" then "Add Package" and search for touch:bit. 

## JavaScript Reference

Touch:bit has 6 touch sensitive buttons paired with 6 LEDs.

### Do something when a button is pressed/released

You can call a function when a button is pressed or released using `touchbit.on`.

Example:

```typescript
touchbit.on(touchbit.TouchPad.d, touchbit.TouchEvent.pressed, () => {
    touchbit.setLight(touchbit.TouchPad.d, 1);
});

touchbit.on(touchbit.TouchPad.d, touchbit.TouchEvent.released, () => {
    touchbit.setLight(touchbit.TouchPad.d, 0);
});
```

### Light up an LED

After switching LEDs to manual control (see below) you can turn them on/off at will.

Each LED is referred to by its associated pad. If you wanted to turn the left-most LED on, you would do:

```typescript
touchbit.setLight(touchbit.TouchPad.left, 1)
```

If you wanted to turn the LED associated with pad "C" off, you would do:

```typescript
touchbit.setLight(touchbit.TouchPad.c, 0)
```

### Switch LEDs to manual or automatic control

By default the LEDs are linked to their respective buttons, lighting up when a button is touched.

To change them to manual mode, use:

```typescript
touchbit.lightModeManual()
```

To switch them back to automatic, use:

```typescript
touchbit.lightModeAutomatic()
```

## License

MIT License

Copyright (c) 2018 Pimoroni Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Supported targets

* for PXT/microbit

```package
touchbit=github:pimoroni/pxt-touchbit
```
