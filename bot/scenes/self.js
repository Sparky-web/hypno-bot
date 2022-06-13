import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { handleBackBtn } from "../tg-helpers.js";
import { sendMessage } from "../tg-helpers.js";

export const createSelfScene = composeWizardScene(
    async (ctx) => {
        const button = ctx.config.MAIN_KEYBOARD.SELF_KNOWLEDGE_BTN
        await sendMessage({
            ctx,
            message: button.AFTER, 
            keyboard: getKeyboard("self_knowledge").reply(),
            imageStrapi: button.IMAGE
        })
        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            ...config.SELF_KNOWLEDGE_KEYBOARD.map(btn => ({
                message: btn.BTN_TEXT,
                handler: async (ctx) => {
                    ctx.session.btnClicked1 = btn
                    ctx.scene.enter(scenes.PAYMENT_WITH_MONEY_FREEDOM)
                }
            })),
            handleBackBtn(ctx)
        ])(ctx)
    }
);