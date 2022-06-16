import { Key, Keyboard } from "telegram-keyboard"
import _config, { getConfig } from "../modules/config.js"
import _ from "lodash"

const toButtons = (obj) => obj.map(e => e.BTN_TEXT).filter(e => e)

const getKeyboard = (keyboard = "main", addButtons) => {
    const config = getConfig()

    let result

    switch (keyboard) {
        case 'main': {
            result = ([
                [...toButtons(Object.values(config.MAIN_KEYBOARD))]
            ])
            break
        }
        case 'relationship': {
            result = ([
                ..._.chunk(toButtons(config.RELATIONSHIP_KEYBOARD), 2),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'hypno': {
            result = ([
                ..._.chunk(toButtons(config.HYPNO_KEYBOARD), 2),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'hypnotherapy': {
            result = ([
                ..._.chunk(toButtons(config.HYPNOTHERAPY_KEYBOARD), 2),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'regression': {
            result = ([
                ..._.chunk(toButtons(config.REGRESSION_KEYBOARD), 2),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'self': {
            result = ([
                ..._.chunk(toButtons(config.SELF_KNOWLEDGE_KEYBOARD), 2),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'money': {
            result = ([
                ..._.chunk(toButtons(Object.values(config.MONEY_FREEDOOM_KEYBOARD)), 2),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'course': {
            result = [
                ..._.chunk(toButtons(Object.values(config.COURSE_KEYBOARD)), 2),
                toButtons([config.BACK_BTN])
            ]
            break
        }
        case 'payment': {
            result = ([
                toButtons(Object.values(config.PAYMENT_KEYBOARD)),
                toButtons([config.BACK_BTN])
            ])
            break
        }
        case 'question': {
            result = ([
                toButtons([config.PAYMENT_KEYBOARD.QUESTION_BTN]),
                toButtons([config.BACK_BTN])
            ])
            break;
        }
        case 'back': {
            result = ([
                [config.BACK_BTN.BTN_TEXT]
            ])
            break
        }
    }

    if (addButtons) result = [...result, toButtons(addButtons)]

    return Keyboard.make(result)


    // let paymentKeyboard = Keyboard.make([
    //     Key.callback(this.config.I_PAID_BTN, "payment")
    // ])
    // let exitKeyboard = Keyboard.make([this.config.BACK_BTN])
    // return { keyboard, paymentKeyboard, exitKeyboard }
}

export { getKeyboard }