//% weight=100 color=#000000 icon="\uf0a6" block="Touch:Bit"
namespace touchbit {
    const ADDR: number = 0x2C;
    const enum REG {
        MAIN_CONTROL = 0x00,
        GENERAL_STATUS = 0x02,
        INPUT_STATUS = 0x03,
        LED_STATUS = 0x04,

        NOISE_FLAG_STATUS = 0x0A,
        
        // Read-only delta counts for all inputs
        INPUT_1_DELTA   = 0x10,
        INPUT_2_DELTA   = 0x11,
        INPUT_3_DELTA   = 0x12,
        INPUT_4_DELTA   = 0x13,
        INPUT_5_DELTA   = 0x14,
        INPUT_6_DELTA   = 0x15,
        INPUT_7_DELTA   = 0x16,
        INPUT_8_DELTA   = 0x17,

        // B7     = N/A
        // B6..B4 = Sensitivity
        // B3..B0 = Base Shift
        SENSITIVITY = 0x1f,

        // B7 = Timeout
        // B6 = Wake Config ( 1 = Wake pin asserted )
        // B5 = Disable Digital Noise ( 1 = Noise threshold disabled )
        // B4 = Disable Analog Noise ( 1 = Low frequency analog noise blocking disabled )
        // B3 = Max Duration Recalibration ( 1 =  Enable recalibration if touch is held longer than max duration )
        GENERAL_CONFIG = 0x20,
            
        INPUT_ENABLE = 0x21,

        // Values for bits 3 to 0 of R_INPUT_CONFIG2
        // Determines minimum amount of time before
        // a "press and hold" event is detected.

        // Also - Values for bits 3 to 0 of R_INPUT_CONFIG
        // Determines rate at which interrupt will repeat
        //
        // Resolution of 35ms, max = 35 + (35 * 0b1111) = 560ms
        INPUT_CONFIG = 0x22,
        INPUT_CONFIG2 = 0x23,

        SAMPLING_CONFIG = 0x24,
        CALIBRATION = 0x26,
        INTERRUPT_EN = 0x27,
        REPEAT_EN = 0x28,
        MTOUCH_CONFIG = 0x2A,
        MTOUCH_PAT_CONF = 0x2B,
        MTOUCH_PATTERN = 0x2D,
        COUNT_O_LIMIT = 0x2E,
        RECALIBRATION = 0x2FF,

        // R/W Touch detection thresholds for inputs
        INPUT_1_THRESH  = 0x30,
        INPUT_2_THRESH  = 0x31,
        INPUT_3_THRESH  = 0x32,
        INPUT_4_THRESH  = 0x33,
        INPUT_5_THRESH  = 0x34,
        INPUT_6_THRESH  = 0x35,
        INPUT_7_THRESH  = 0x36,
        INPUT_8_THRESH  = 0x37,
        
        // R/W Noise threshold for all inputs
        NOISE_THRESH    = 0x38,
        
        // R/W Standby and Config Registers
        STANDBY_CHANNEL = 0x40,
        STANDBY_CONFIG  = 0x41,
        STANDBY_SENS    = 0x42,
        STANDBY_THRESH  = 0x43,
        
        // B7 = Linked LED Transition Controls ( 1 = LED trigger is !touch )
        // B6 = Alert Polarity ( 1 = Active Low Open Drain, 0 = Active High Push Pull )
        // B5 = Reduce Power ( 1 = Do not power down between poll )
        // B4 = Link Polarity/Mirror bits ( 0 = Linked, 1 = Unlinked )
        // B3 = Show RF Noise ( 1 = Noise status registers only show RF, 0 = Both RF and EMI shown )
        // B2 = Disable RF Noise ( 1 = Disable RF noise filter )
        // B1..B0 = N/A
        CONFIGURATION2  = 0x44,
        
        // Read-only reference counts for sensor inputs
        INPUT_1_BCOUNT  = 0x50,
        INPUT_2_BCOUNT  = 0x51,
        INPUT_3_BCOUNT  = 0x52,
        INPUT_4_BCOUNT  = 0x53,
        INPUT_5_BCOUNT  = 0x54,
        INPUT_6_BCOUNT  = 0x55,
        INPUT_7_BCOUNT  = 0x56,
        INPUT_8_BCOUNT  = 0x57,
        
        // LED Controls - For CAP1188 and similar
        LED_OUTPUT_TYPE = 0x71,
        LED_LINKING     = 0x72,
        LED_POLARITY    = 0x73,
        LED_OUTPUT_CON  = 0x74,
        LED_LTRANS_CON  = 0x77,
        LED_MIRROR_CON  = 0x79,
        
        // LED Behaviour
        LED_BEHAVIOUR_1 = 0x81, // For LEDs 1-4
        LED_BEHAVIOUR_2 = 0x82, // For LEDs 5-8
        LED_PULSE_1_PER = 0x84,
        LED_PULSE_2_PER = 0x85,
        LED_BREATHE_PER = 0x86,
        LED_CONFIG      = 0x88,
        LED_PULSE_1_DUT = 0x90,
        LED_PULSE_2_DUT = 0x91,
        LED_BREATHE_DUT = 0x92,
        LED_DIRECT_DUT  = 0x93,
        LED_DIRECT_RAMP = 0x94,
        LED_OFF_DELAY   = 0x95,
        
        // R/W Power buttonc ontrol
        POWER_BUTTON    = 0x60,
        POW_BUTTON_CONF = 0x61,
        
        // Read-only upper 8-bit calibration values for sensors
        INPUT_1_CALIB   = 0xB1,
        INPUT_2_CALIB   = 0xB2,
        INPUT_3_CALIB   = 0xB3,
        INPUT_4_CALIB   = 0xB4,
        INPUT_5_CALIB   = 0xB5,
        INPUT_6_CALIB   = 0xB6,
        INPUT_7_CALIB   = 0xB7,
        INPUT_8_CALIB   = 0xB8,
        
        // Read-only 2 LSBs for each sensor input
        INPUT_CAL_LSB1  = 0xB9,
        INPUT_CAL_LSB2  = 0xBA,
        
        // Product ID Registers
        PRODUCT_ID      = 0xFD,
        MANUFACTURER_ID = 0xFE,
        REVISION        = 0xFF
    }


    let is_setup: boolean = false;
    let handlers_pressed: Action[] = [
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
    ];
    let handlers_released: Action[] = [
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
    ];
    /*let handlers_held: Action[] = [
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
        () => { },
    ];*/
    let last_button_states: number = 0;

    //% block
    export enum TouchEvent {
        released = 0,
        pressed = 1
        //held = 2
    }

    //% block
    export enum TouchPad {
        left = 0,
        a = 1,
        b = 2,
        c = 3,
        d = 4,
        right = 5
    }

    /**
     * Set touch:bit lights,
     * either to automatic or manual mode.
     */
    //% blockId=touchbit_light_mode_automatic
    //% block="Set lights to automatic"
    //% weight=40
    export function lightModeAutomatic(): void {
        setup();
        smbus.writeByte(ADDR, REG.LED_LINKING, 0b00111111);
    }

    //% blockId=touchbit_light_mode_manual
    //% block="Set lights to manual"
    //% weight=60
    export function lightModeManual(): void {
        setup();
        smbus.writeByte(ADDR, REG.LED_LINKING, 0b00000000);
        smbus.writeByte(ADDR, REG.LED_OUTPUT_CON, 0b00000000);
    }

    //% blockId=touchbit_set_light
    //% block="Set light %light| to %state"
    //% state.min=0 state.max=1 state.defl=0
    //% light.fieldEditor="gridpicker" light.fieldOptions.columns=6
    //% weight=80
    export function setLight(light: TouchPad, state: number): void {
        setup();
        let current_led_status = smbus.readByte(ADDR, REG.LED_OUTPUT_CON);
        current_led_status &= bitwiseInvert(0b1 << light);
        if (state) {
            current_led_status |= (0b1 << light);
        }    
        smbus.writeByte(ADDR, REG.LED_OUTPUT_CON, current_led_status);
    }

    function bitwiseInvert(input: number, length: number = 8): number {
        return ((1 << length) - 1) - input;
    }

    //% blockId=touchbit_on
    //% block="When touch pad %touchpad| is %event"
    //% touchpad.fieldEditor="gridpicker" touchpad.fieldOptions.columns=6
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=2
    //% weight=100
    export function on(touchpad: TouchPad, event: TouchEvent, handler: Action) {
        setup();
        switch (event) {
            case TouchEvent.released:
                handlers_released[touchpad] = handler;
                break;
            case TouchEvent.pressed:
                handlers_pressed[touchpad] = handler;
                break;
            //case TouchEvent.held:
            //    handlers_held[touchpad] = handler;
            //    break;
        }
    }

    function setup(): void {
        if (is_setup) return;
        is_setup = true;

        smbus.writeByte(ADDR, REG.CALIBRATION, 0xFF); // Force recalibration on startup
        smbus.writeByte(ADDR, REG.LED_LINKING, 0b00111111); // Link LEDs by default

        control.inBackground(() => {
            while (true) {
                poll();
                basic.pause(10);
            }    
        })
    }

    function poll() {
        if (smbus.readByte(ADDR, REG.MAIN_CONTROL) & 0b1) {
            smbus.writeByte(ADDR, REG.MAIN_CONTROL, 0x00);

            //let threshold: any = smbus.readBuffer(ADDR, REG.INPUT_1_THRESH, 6);
            //let delta: any = smbus.readBuffer(ADDR, REG.INPUT_1_DELTA, 6);

            let button_states = smbus.readByte(ADDR, REG.INPUT_STATUS);
            let changed = button_states ^ last_button_states;
            last_button_states = button_states;
            for (let x = 0; x < 6; x++){
                let mask = 0b1 << x;
                if (changed & mask) {
                    triggerHandler(x, (button_states & mask) ? TouchEvent.pressed : TouchEvent.released);
                }
            }
        }    
    }

    function triggerHandler(touchpad: TouchPad, event: TouchEvent) {
        switch (event) {
            case TouchEvent.released:
                handlers_released[touchpad]();
                break;
            case TouchEvent.pressed:
                handlers_pressed[touchpad]();
                break;
            //case TouchEvent.held:
            //    handlers_held[touchpad]();
            //    break;
        }
    }
}

namespace smbus {
    export function writeByte(addr: number, register: number, value: number): void {
        let temp = pins.createBuffer(2);
        temp[0] = register;
        temp[1] = value;
        pins.i2cWriteBuffer(addr, temp, false);
    }
    export function readByte(addr: number, register: number): number {
        return smbus.readBuffer(addr, register, 1)[0];
    }
    export function writeBuffer(addr: number, register: number, value: Buffer): void {
        let temp = pins.createBuffer(value.length + 1);
        temp[0] = register;
        for (let x = 0; x < value.length; x++) {
            temp[x + 1] = value[x];
        }
        pins.i2cWriteBuffer(addr, temp, false);
    }
    export function readBuffer(addr: number, register: number, len: number): Buffer {
        let temp = pins.createBuffer(1);
        temp[0] = register;
        pins.i2cWriteBuffer(addr, temp, false);
        return pins.i2cReadBuffer(addr, len, false);
    }
    function readNumber(addr: number, register: number, fmt: NumberFormat = NumberFormat.UInt8LE): number {
        let temp = pins.createBuffer(1);
        temp[0] = register;
        pins.i2cWriteBuffer(addr, temp, false);
        return pins.i2cReadNumber(addr, fmt, false);
    }
    export function unpack(fmt: string, buf: Buffer): number[] {
        let le: boolean = true;
        let offset: number = 0;
        let result: number[] = [];
        let num_format: NumberFormat = 0;
        for (let c = 0; c < fmt.length; c++) {
            switch (fmt.charAt(c)) {
                case '<':
                    le = true;
                    continue;
                case '>':
                    le = false;
                    continue;
                case 'c':
                case 'B':
                    num_format = le ? NumberFormat.UInt8LE : NumberFormat.UInt8BE; break;
                case 'b':
                    num_format = le ? NumberFormat.Int8LE : NumberFormat.Int8BE; break;
                case 'H':
                    num_format = le ? NumberFormat.UInt16LE : NumberFormat.UInt16BE; break;
                case 'h':
                    num_format = le ? NumberFormat.Int16LE : NumberFormat.Int16BE; break;
            }
            result.push(buf.getNumber(num_format, offset));
            offset += pins.sizeOf(num_format);
        }
        return result;
    }
}