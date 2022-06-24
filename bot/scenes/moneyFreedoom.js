import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { handleBackBtn } from "../tg-helpers.js";
import { sendMessage } from "../tg-helpers.js";

export const createMoneyFreedoomScene = composeWizardScene(
    async (ctx) => {
        const button = ctx.config.MAIN_KEYBOARD.MONEY_FREEDOM_BTN
        await sendMessage({
            ctx,
            message: button.AFTER, 
            keyboard: getKeyboard(ctx, "money").reply(),
            imageStrapi: button.IMAGE
        })
        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            {
                button: config.MONEY_FREEDOOM_KEYBOARD.MANAGEMENT_BTN,
                handler: async (ctx) => {
                    ctx.session.btnClicked = config.MONEY_FREEDOOM_KEYBOARD.MANAGEMENT_BTN
                    ctx.scene.enter(scenes.QUESTION)
                }
            },
            {
                button: config.MONEY_FREEDOOM_KEYBOARD.COURSE_BTN,
                scene: scenes.COURSE
            },
            handleBackBtn(ctx)
        ])(ctx)
    }
);