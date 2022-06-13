import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { handleBackBtn } from "../tg-helpers.js";
import { sendMessage } from "../tg-helpers.js";

export const createPaymentWithMoneyFreedomScene = composeWizardScene(
    async (ctx) => {
        const button = ctx.session.btnClicked1
        await sendMessage({
            ctx,
            message: button.AFTER, 
            keyboard: getKeyboard("paymentWithMoneyFreedom").reply(),
            imageStrapi: button.IMAGE
        })

        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            { button: config.MONEY_FREEDOOM_BTN, scene: scenes.MONEY_FREEDOM },
            {
                button: config.PAYMENT_KEYBOARD.PAY_BTN,
                handler: async ctx => {
                    await sendMessage({
                        ctx,
                        message: config.PAYMENT_KEYBOARD.PAY_BTN.AFTER
                    })
                    await sendAdminNotification(ctx, "вошел в чат")
                    ctx.scene.enter(scenes.OPERATOR)
                }
            },
            {
                button: config.PAYMENT_KEYBOARD.QUESTION_BTN,
                handler: async ctx => {
                    await sendMessage({
                        ctx,
                        message: config.PAYMENT_KEYBOARD.QUESTION_BTN.AFTER
                    })
                    await sendAdminNotification(ctx, "вошел в чат")
                    ctx.scene.enter(scenes.OPERATOR)
                }
            },
            handleBackBtn(ctx)
        ])(ctx)
    }
);