import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { handleBackBtn, sendAdminNotification, sendMessage } from "../tg-helpers.js";

export const createQuestionScene = composeWizardScene(
    async (ctx) => {
        const button = ctx.session.btnClicked
        await sendMessage({
            ctx,
            message: button.AFTER,
            keyboard: getKeyboard("question").reply(),
            imageStrapi: button.IMAGE
        })
        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            {
                button: config.PAYMENT_KEYBOARD.QUESTION_BTN,
                handler: async ctx => {
                    ctx.session.btnClicked1 = config.PAYMENT_KEYBOARD.QUESTION_BTN
                    await sendAdminNotification(ctx, "вошел в чат")
                    ctx.scene.enter(scenes.OPERATOR)
                }
            },
            handleBackBtn(ctx)
        ])(ctx)
    }
);