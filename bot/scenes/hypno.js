import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { handleBackBtn } from "../tg-helpers.js";
import { sendMessage } from "../tg-helpers.js";

export const createHypnoScene = composeWizardScene(
    async (ctx) => {
        const button = ctx.config.HYPNOTHERAPY_KEYBOARD[1]
        await sendMessage({
            ctx,
            message: button.AFTER, 
            keyboard: getKeyboard(ctx, "hypno").reply(),
            imageStrapi: button.IMAGE
        })
        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            ...config.HYPNO_KEYBOARD.map(btn => ({
                message: btn.BTN_TEXT,
                handler: async (ctx) => {
                    ctx.session.btnClicked = btn
                    ctx.scene.enter(scenes.PAYMENT)
                }
            })),
            handleBackBtn(ctx)
        ])(ctx)
    }
);