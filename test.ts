let light_state: boolean = true;
let blink: boolean = true;

touchbit.lightModeManual();

touchbit.setLight(touchbit.TouchPad.right, 1);
touchbit.setLight(touchbit.TouchPad.c, 1);

touchbit.on(touchbit.TouchPad.b, touchbit.TouchEvent.pressed, () => {
    touchbit.setLight(touchbit.TouchPad.b, light_state ? 1 : 0);
    light_state = !light_state;
});

touchbit.on(touchbit.TouchPad.d, touchbit.TouchEvent.pressed, () => {
    touchbit.setLight(touchbit.TouchPad.d, 1);
});

touchbit.on(touchbit.TouchPad.d, touchbit.TouchEvent.released, () => {
    touchbit.setLight(touchbit.TouchPad.d, 0);
});

basic.forever(() => {
    touchbit.setLight(touchbit.TouchPad.a, blink ? 1 : 0);
    blink = !blink;
    basic.pause(1000);
});