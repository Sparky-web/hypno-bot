import { composeWizardScene, handleMenuAction } from "./factory.js";
import { getKeyboard } from "../keyboards.js";
import scenes from "../scene-types.js";
import { handleBackBtn } from "../tg-helpers.js";
import { sendMessage } from "../tg-helpers.js";

const btnScenes = [
    scenes.REGRESSION,
    scenes.HYPNO,
    scenes.SELF
]

export const createHypnoTherapyScene = composeWizardScene(
    async (ctx) => {
        const button = ctx.config.MAIN_KEYBOARD.HYPNOTHERAPY_BTN
        await sendMessage({
            ctx,
            message: button.AFTER, 
            keyboard: getKeyboard("hypnotherapy").reply(),
            imageStrapi: button.IMAGE
        })
        ctx.wizard.next()
    },
    (ctx) => {
        const config = ctx.config

        handleMenuAction([
            ...config.HYPNOTHERAPY_KEYBOARD.map((btn, i) => ({
                message: btn.BTN_TEXT,
                handler: async (ctx) => {
                    ctx.session.btnClicked = btn
                    ctx.scene.enter(btnScenes[i])
                }
            })),
            handleBackBtn(ctx)
        ])(ctx)
    }
);