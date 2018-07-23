let light_state: boolean = true;
let blink: boolean = true;

touchbit.lightModeManual();

touchbit.setLight(touchbit.TouchPad.right, 1);
touchbit.setLight(touchbit.TouchPad.c, 1);

touchbit.onPress(touchbit.TouchPad.b, () => {
    touchbit.setLight(touchbit.TouchPad.b, light_state ? 1 : 0);
    light_state = !light_state;
})

basic.forever(() => {
    touchbit.poll();
    touchbit.setLight(touchbit.TouchPad.a, blink ? 1 : 0);
    blink = !blink;
    basic.pause(10);
})